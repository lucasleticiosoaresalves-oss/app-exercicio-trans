/* =====================================================================
   NORTE — service worker

   Existe por dois motivos, nesta ordem:

   1. O app funcionar sem internet. Ele é um arquivo só e todo o seu dado
      já mora no aparelho — não fazia sentido precisar de rede para abrir.
      Quem usa ônibus, metrô, dado contado ou simplesmente está num lugar
      sem sinal passa a conseguir marcar o treino e anotar a comida.

   2. Diminuir o que sai daqui. A tela de privacidade declara, honesta,
      que ao abrir o navegador busca a tipografia no Google e que as
      miniaturas vêm do YouTube. Declarar é melhor que esconder, mas não
      acontecer é melhor que declarar: com o cache, a fonte é buscada uma
      vez e cada miniatura uma vez, em vez de a cada abertura.

   ESTRATÉGIA, e por quê:

   - A PÁGINA vai na rede primeiro, com o cache como rede de segurança.
     É um app que muda toda semana; cache primeiro prenderia a pessoa
     numa versão velha sem ela saber por quê. Sem rede, abre do cache.
   - FONTE, ÍCONE e MINIATURA vêm do cache primeiro. São arquivos que
     nunca mudam de conteúdo para a mesma URL.
   - O RESTO não é tocado. Open Food Facts, PubMed e YouTube de verdade
     passam direto para a rede: são coisas que a pessoa escolheu abrir
     naquele instante, e guardar isso seria guardar o que ela leu.
   ===================================================================== */
const VERSAO = 'norte-v1';
const CASCA = VERSAO + '-casca';
const MIDIA = VERSAO + '-midia';

/* O mínimo para o app abrir sozinho. */
const ESSENCIAIS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icone-192.png',
  './icone-512.png'
];

/* Domínios cujas respostas valem guardar: a tipografia e as miniaturas. */
const GUARDAR = [
  'https://fonts.googleapis.com/',
  'https://fonts.gstatic.com/',
  'https://i.ytimg.com/'
];

/* Teto de miniaturas guardadas. Sem teto, quem rolar todas as telas de
   vídeo acumula centenas de imagens no aparelho sem nunca ter pedido. */
const TETO_MIDIA = 220;

self.addEventListener('install', function (ev) {
  ev.waitUntil(
    caches.open(CASCA)
      .then(function (c) { return c.addAll(ESSENCIAIS); })
      /* Se um dos arquivos faltar, o app ainda instala: melhor um service
         worker parcial do que nenhum. */
      .catch(function () { })
      .then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (ev) {
  ev.waitUntil(
    caches.keys().then(function (nomes) {
      return Promise.all(nomes.map(function (n) {
        if (n !== CASCA && n !== MIDIA) return caches.delete(n);
      }));
    }).then(function () { return self.clients.claim(); })
  );
});

/* Mantém o cache de mídia dentro do teto, jogando fora o mais antigo. */
function podarMidia() {
  return caches.open(MIDIA).then(function (c) {
    return c.keys().then(function (ks) {
      if (ks.length <= TETO_MIDIA) return;
      return Promise.all(ks.slice(0, ks.length - TETO_MIDIA).map(function (k) {
        return c.delete(k);
      }));
    });
  });
}

function guardavel(url) {
  return GUARDAR.some(function (p) { return url.indexOf(p) === 0; });
}

self.addEventListener('fetch', function (ev) {
  const req = ev.request;
  if (req.method !== 'GET') return;
  const url = req.url;

  /* A página: rede primeiro, cache como rede de segurança. */
  if (req.mode === 'navigate') {
    ev.respondWith(
      fetch(req).then(function (r) {
        const copia = r.clone();
        caches.open(CASCA).then(function (c) { c.put('./index.html', copia); });
        return r;
      }).catch(function () {
        return caches.match('./index.html').then(function (r) {
          return r || caches.match('./');
        });
      })
    );
    return;
  }

  /* Os próprios arquivos do app: cache primeiro, e atualiza por trás. */
  if (url.indexOf(self.registration.scope) === 0) {
    ev.respondWith(
      caches.match(req).then(function (emCache) {
        const daRede = fetch(req).then(function (r) {
          if (r && r.ok) {
            const copia = r.clone();
            caches.open(CASCA).then(function (c) { c.put(req, copia); });
          }
          return r;
        }).catch(function () { return emCache; });
        return emCache || daRede;
      })
    );
    return;
  }

  /* Tipografia e miniatura: cache primeiro, buscadas uma vez só. */
  if (guardavel(url)) {
    ev.respondWith(
      caches.match(req).then(function (emCache) {
        if (emCache) return emCache;
        return fetch(req).then(function (r) {
          /* 'opaque' é o que volta de outro domínio sem CORS: dá para
             guardar e devolver, só não dá para ler o conteúdo aqui. */
          if (r && (r.ok || r.type === 'opaque')) {
            const copia = r.clone();
            caches.open(MIDIA).then(function (c) {
              c.put(req, copia).then(podarMidia);
            });
          }
          return r;
        }).catch(function () { return emCache; });
      })
    );
    return;
  }

  /* Todo o resto passa direto. Nada do que a pessoa abre fica guardado. */
});

/* A página pede para trocar de versão na hora quando a pessoa aceita. */
self.addEventListener('message', function (ev) {
  if (ev.data === 'assumir') self.skipWaiting();
});

/* Gera o index.html do GitHub Pages a partir do rota-forte.html.
   O rota-forte.html é a versão que vai para o Claude: ela não tem <!doctype>,
   <head> nem <body>, porque a plataforma do Claude injeta isso sozinha.
   Aqui esse invólucro é escrito na mão, para a página funcionar em qualquer lugar.

   Para atualizar o site depois de mexer no app:  node build-pages.js
*/
const fs = require('fs');
const path = require('path');

const ORIGEM = path.join(__dirname, 'rota-forte.html');
const DESTINO = path.join(__dirname, 'index.html');

let conteudo = fs.readFileSync(ORIGEM, 'utf8');

// título: sai do corpo e vai para o <head>
const mTitulo = conteudo.match(/<title>([\s\S]*?)<\/title>/i);
const titulo = mTitulo ? mTitulo[1].trim() : 'Rota Trans';
conteudo = conteudo.replace(/<title>[\s\S]*?<\/title>\s*/i, '');

// meta própria do Claude: não faz sentido fora dele
conteudo = conteudo.replace(/<meta name="claude:[^>]*>\s*/gi, '');

// as fontes vão para o <head> para começarem a carregar antes
const links = [];
conteudo = conteudo.replace(/<link\b[^>]*>\s*/gi, (m) => { links.push(m.trim()); return ''; });

const descricao = 'Treino, alimentação, voz e pele organizados dia a dia, o ano inteiro.';

const html = `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="description" content="${descricao}">
<meta name="theme-color" content="#9fdffb" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#123c53" media="(prefers-color-scheme: dark)">
<meta name="robots" content="noindex">
<title>${titulo}</title>
${links.join('\n')}
<style>
/* O mesmo reset mínimo que a plataforma do Claude aplica, escrito aqui na mão. */
:root{color-scheme:light;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}
body{margin:0;font:14px system-ui,-apple-system,"Segoe UI",sans-serif}
img{max-width:100%}
[hidden]{display:none!important}
</style>
</head>
<body>
${conteudo.trim()}
</body>
</html>
`;

fs.writeFileSync(DESTINO, html, 'utf8');

const kb = (s) => Math.round(s / 1024) + ' KB';
console.log('index.html gerado a partir de rota-forte.html');
console.log('  título: ' + titulo);
console.log('  fontes movidas para o head: ' + links.length);
console.log('  tamanho: ' + kb(Buffer.byteLength(html)));

# Rota Trans

App pessoal de rotina: treino, alimentação, voz e pele organizados dia a dia, o ano inteiro.
Roda inteiro no navegador, em um arquivo só, sem servidor e sem banco de dados.

## O que tem dentro

- **Treino** — plano de 4 fases cobrindo 365+ dias, cada dia com destino definido (treino, descanso ativo ou descanso total). Três versões do mesmo plano: em casa, na academia e calistenia.
- **Demonstração de cada exercício** — animação do movimento desenhada em SVG, com passo a passo, erros comuns e vídeos escolhidos no YouTube.
- **Alimentação** — metas calculadas por Mifflin-St Jeor, diário por refeição, 45 receitas com gramagem e modo de preparo, busca de receitas pelo que tem em casa, cardápio do dia, água e lista de compras.
- **Voz** — ciclo de 7 dias de treino vocal com registro de frequência em Hz.
- **Pele** — rotina de manhã e noite por tipo de pele, com nomes de produtos.
- **Corpo** — uso seguro de binder, barba e pelos, e a relação ombro/cintura.
- **Progresso** — peso, medidas, resumo de 30 dias e conquistas.

## Como os dados são guardados

Tudo fica no `localStorage` do navegador, no aparelho onde você usa. Nada é enviado para lugar nenhum.
Os dados não somem ao fechar a aba, mas também não viajam sozinhos entre aparelhos: para isso existem
os botões **Copiar meus dados** e **Importar dados**, no Perfil.

Limpar os dados do site no navegador apaga tudo. Vale exportar de vez em quando.

## Os dois arquivos

| Arquivo | Para que serve |
|---|---|
| `rota-forte.html` | Versão publicada como artifact no Claude. Não tem `<!doctype>` nem `<head>`: a plataforma do Claude injeta isso. Lá o app também salva na conta e aceita fotos. |
| `index.html` | Versão do GitHub Pages, gerada a partir da de cima com o invólucro HTML completo. É esta que o site serve. |

Depois de mexer no app, regenere a página do site:

```
node build-pages.js
```

O script copia o conteúdo, move o `<title>` e as fontes para o `<head>` e adiciona o mínimo de CSS
que a plataforma do Claude aplicava.

## Publicar

```
node build-pages.js
git add -A
git commit -m "atualiza o app"
git push
```

No GitHub: **Settings → Pages → Source: Deploy from a branch → main / (root) → Save**.

O repositório é público, então o código fica visível. Seus registros não: eles nunca entram no arquivo,
ficam só no seu navegador. A página tem `noindex`, então não aparece em buscador — quem tiver o link, entra.

## Aviso

Organiza treino e alimentação com base em orientações gerais. Não substitui nutricionista, educador físico,
fonoaudiólogo, dermatologista ou médico, e não orienta nada sobre uso de hormônios.

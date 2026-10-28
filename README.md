# Norte

App pessoal de rotina: treino, alimentação, higiene, voz e pele organizados dia a dia, o ano inteiro.
Três trilhas — masculinizar, feminilizar ou só melhorar — e cada uma muda o plano de verdade, não só o rótulo.
Um arquivo HTML só, sem servidor, sem conta e sem build. Abre e usa.

**No ar em:** https://lucasleticiosoaresalves-oss.github.io/app-exercicio-trans/

## O que tem

- **Treino** — plano de 4 fases cobrindo 365+ dias. Todo dia do calendário tem destino: treino, descanso ativo ou descanso total. Três versões do mesmo plano: em casa, na academia e calistenia.
- **Cada exercício** — demonstração do movimento, passo a passo, erros comuns, e vídeos de execução que tocam dentro da própria página.
- **Alimentação** — metas por Mifflin-St Jeor, diário por refeição, 45 receitas com gramagem e preparo, busca de receita pelo que tem em casa, cardápio do dia, água e lista de compras.
- **Higiene** — 15 tarefas com três níveis cada, feitas para dias ruins: o nível mínimo já conta como feito, e o modo "hoje está difícil" reduz o dia à lista essencial.
- **Voz** — ciclo de 7 dias de treino vocal, com registro de frequência em Hz e gráfico.
- **Pele** — rotina de manhã e noite por tipo de pele, com nomes de produtos de farmácia.
- **Corpo** — o que cada trilha precisa: binder e barba, ou depilação e proporções, ou nada disso.
- **Progresso** — peso, medidas, fotos de evolução, resumo de 30 dias e conquistas. Tudo recalculado a cada pesagem.
- **Base científica** — no Perfil, uma tela que mostra de onde veio cada número do app e o quanto o estudo por trás é firme. Os selos espalhados pelas telas abrem a ficha do número que está ali do lado.

## Sobre os números

Cada recomendação quantitativa do app aponta para o estudo de origem, classificada em quatro níveis:
evidência forte, moderada, limitada, ou sem estudo que fixe o número. O último nível existe de propósito —
o déficit de 20% para emagrecer, por exemplo, é convenção de prática e está dito assim na tela.

Onde a evidência contrariou o app, o app mudou. A meta de água era 35 ml por quilo, conta que circula
muito e não vem de recomendação oficial nenhuma; agora parte da ingestão adequada de referência da EFSA.
Os ciclos de treino foram refeitos para que cada grupo muscular grande apareça duas vezes por semana,
que é a frequência com melhor respaldo.

## Onde ficam os dados

Tudo no navegador do aparelho onde você usa. Nada é enviado para lugar nenhum, não existe servidor
nem conta.

- Texto (treinos, comida, higiene, peso, medidas) no `localStorage`
- Fotos de evolução no `IndexedDB`, que aguenta arquivos grandes

Os dados não somem ao fechar a aba, mas também não viajam sozinhos entre aparelhos. Para mover,
use **Copiar meus dados** e **Importar dados**, no Perfil. Limpar os dados do site no navegador apaga tudo,
então vale exportar de vez em quando.


## Usar como aplicativo no celular

Abra o endereço no navegador e use **Adicionar à tela de início**. Passa a abrir em tela cheia,
sem barra de endereço.

## Aviso

Organiza treino, alimentação e cuidados com base em estudos e orientações gerais, mas nenhum desses
estudos foi feito pensando em você especificamente. Não substitui nutricionista, educador físico,
fonoaudiólogo, dermatologista, psicólogo ou médico, e não orienta nada sobre uso de hormônios.

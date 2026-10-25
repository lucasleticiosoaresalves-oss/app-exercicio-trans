# Rota Trans

App pessoal de rotina masculinizante: treino, alimentação, voz e pele organizados dia a dia, o ano inteiro.
Um arquivo HTML só, sem servidor, sem conta e sem build. Abre e usa.

**No ar em:** https://lucasleticiosoaresalves-oss.github.io/app-exercicio-trans/

## O que tem

- **Treino** — plano de 4 fases cobrindo 365+ dias. Todo dia do calendário tem destino: treino, descanso ativo ou descanso total. Três versões do mesmo plano: em casa, na academia e calistenia.
- **Cada exercício** — demonstração animada do movimento em SVG, passo a passo, erros comuns, e vídeos de execução que tocam dentro da própria página.
- **Alimentação** — metas por Mifflin-St Jeor, diário por refeição, 45 receitas com gramagem e preparo, busca de receita pelo que tem em casa, cardápio do dia, água e lista de compras.
- **Voz** — ciclo de 7 dias de treino vocal, com registro de frequência em Hz e gráfico.
- **Pele** — rotina de manhã e noite por tipo de pele, com nomes de produtos de farmácia.
- **Corpo** — uso seguro de binder, barba e pelos, e a relação ombro/cintura.
- **Progresso** — peso, medidas, fotos de evolução, resumo de 30 dias e conquistas.

## Onde ficam os dados

Tudo no navegador do aparelho onde você usa. Nada é enviado para lugar nenhum, não existe servidor
nem conta.

- Texto (treinos, comida, peso, medidas) no `localStorage`
- Fotos de evolução no `IndexedDB`, que aguenta arquivos grandes

Os dados não somem ao fechar a aba, mas também não viajam sozinhos entre aparelhos. Para mover,
use **Copiar meus dados** e **Importar dados**, no Perfil. Limpar os dados do site no navegador apaga tudo,
então vale exportar de vez em quando.

## Mexer no app

O app inteiro é o `index.html`: estilo, dados e código no mesmo arquivo. Edite e abra no navegador.

Para conferir antes de publicar, sirva a pasta em vez de abrir o arquivo direto — alguns recursos
não funcionam no `file://`:

```
npx serve .
```

Para publicar:

```
git add -A
git commit -m "atualiza o app"
git push
```

O GitHub Pages republica sozinho em um ou dois minutos.

## Usar como aplicativo no celular

Abra o endereço no navegador e use **Adicionar à tela de início**. Passa a abrir em tela cheia,
sem barra de endereço.

## Aviso

Organiza treino e alimentação com base em orientações gerais. Não substitui nutricionista,
educador físico, fonoaudiólogo, dermatologista ou médico, e não orienta nada sobre uso de hormônios.

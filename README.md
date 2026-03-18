# Docelícia Frontend

Projeto React criado a partir da pasta `figma` do workspace, preservando as páginas, componentes e estilos exportados no material original.

## Referências

A landing page foi baseada em:

- `Don't Make Me Think` — Steve Krug
- `Designing Interfaces` — Jennifer Tidwell
- `Mobile First` — Luke Wroblewski

Além dessas referências, o dashboard considera os seguintes princípios:

| Princípio | Aplicação |
| --- | --- |
| **BAN pattern** | KPI cards com label acima do número grande para contexto imediato |
| **Context for numbers** | Comparações (delta %), tendências (sparklines) e totais de referência |
| **Section grouping** | Headers de seção ("Operacional", "Detalhamento") organizam áreas do dashboard |
| **Appropriate charts** | Area chart para evolução temporal, barras para comparação, progress bars para utilização |
| **Data-ink ratio** | Gridlines minimizadas, eixos limpos, cores com propósito semântico |
| **Direct labeling** | Valores e percentuais diretamente nos elementos visuais |
| **Actionable alerts** | Painel de alertas com severidade, cores e links para ação |
| **Detail on demand** | Tooltips nos gráficos, links "Ver todos" para drill-down |

## Execução

```bash
npm install
npm run dev
```

## Rotas

- `/` para a landing page
- `/dashboard` para o dashboard

## Observação

O export recebido na pasta `figma` não inclui os binários dos imports `figma:asset/*`. Para manter o projeto fiel ao material exportado e ainda permitir build em Vite, esses imports foram preservados com fallback visual quando o asset não estiver disponível.

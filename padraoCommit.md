# Convenções de Commit

As convenções de commit ajudam a manter o código mais organizado e compreensível. Aqui estão os tipos mais comuns de commits semânticos:

## Tipos de Commit

- **build**: Alterações que afetam o sistema de construção ou dependências externas (exemplos: gulp, broccoli, npm, nuget).
- **docs**: Referem-se a inclusão ou alteração somente de arquivos de documentação.
- **feat**: Adições de novas funcionalidades ou quaisquer outras novas implementações ao código.
- **fix**: Correção de bugs.
- **perf**: Alteração de código que melhora o desempenho.
- **refactor**: Mudanças no código sem alterar a funcionalidade final da tarefa impactada.
- **style**: Alterações relacionadas à formatação do código que não afetam o significado do código, como espaços em branco, formatação e ponto e vírgula ausente.
- **test**: Adição ou correção de testes automatizados (TDD).
- **chore**: Atualização de tarefas e funcionalidades.

## Tipos de Commit Específicos

- **raw**: Mudanças relacionadas a arquivos de configurações, dados, features, parâmetros.
- **cleanup**: Remoção de código comentado, trechos desnecessários ou qualquer outra forma de limpeza do código-fonte, visando aprimorar sua legibilidade e manutenibilidade.
- **remove**: Exclusão de arquivos, diretórios ou funcionalidades obsoletas ou não utilizadas, reduzindo a complexidade do projeto.

## Exemplos de Commits

- `git commit -m "chore: Campo CPF no cadastro de usuário"`
- `git commit -m "feat: Contas a receber"`
- `git commit -m "fix: Valor total do pedido"`
- `git commit -m "refactor: Método de inicialização de pedidos com melhor desempenho"`

# DevUtils (Chrome Extension)

Extensão simples de popup para gerar CNPJ, CPF e e-mail válidos e copiar rapidamente para a área de transferência.

## Como usar

1. Na página `chrome://extensions`, ative o **Modo do desenvolvedor**.
2. Clique em **Carregar sem compactação** e selecione esta pasta do projeto.
3. Abra o ícone da extensão na barra do Chrome. Cada aba gera um dado diferente:
   - **CNPJ:** escolha entre modelo antigo (numérico com dígitos verificadores) ou novo (alfanumérico) e habilite/disable a máscara.
   - **CPF:** gera um CPF válido; botão para alternar a máscara.
   - **E-mail:** monta um endereço aleatório já no formato correto.
4. Use o botão **Copiar** para enviar o valor ao clipboard; o botão confirma o sucesso por alguns segundos.

## Scripts úteis

- `npm run build`: não há build; apenas mensagem informativa.
- `npm run zip`: cria `dist/br-generators.zip` com os arquivos da extensão.

Não há dependências externas ou etapa de compilação; basta abrir o popup e usar.

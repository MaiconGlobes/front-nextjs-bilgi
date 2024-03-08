## Instalação ⚒️

Para instalação e implantação do container docker com o banco MySQL e API em NodeJS sáo necessário que baixe o diretório do projeto com git clone, acesse o diretório
onde se encontra o projeto da API e execute os comandos a seguir. 🤘

> É recomendado deixar a execução finalziar por completo para um melhor gerenciamento de dependências.

```bash
# Rode o comendo abaixo se for a primeira vez
docker-compose up -d 

# Rode o comendo abaixo se já tiver subido antes o container
docker-compose up -d --build

```
O front é uma aplicação já desenvolvida e editada o formulario e listagens de usuario para projeto teste da Bilgi.

Toda arquitetura e configurações da mesma já foram criadas anteriormente em outro projeto.
A ela a ser analisada é a tela de lisgem de usuario e form de cadastro/atualização e a deleção do registro.
É possível navegar entre as paginas de login e de criação de contas, ambas inoperantes com back-end.

```bash
# Rode os comandos
yarn
yarn build
yarn start

# Para debug
yarn dev

```
## Importante 🌍
Ao longo das alterações, alguns bugs se apresentaram, como a inserçao do registro e o mesmo não aparecer na lsiagem e sim, somente a ops atualzia 
a página (o que nçao deve a contecer devido o react corrigir isso), assim como na deleção do registro.
Os avisos de erros retornados da API não foram implementados de momento, mas é possível ver os mesmos pelo console.log().

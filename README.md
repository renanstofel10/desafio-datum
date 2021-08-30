# SUPERTEST_ desafio-datum

Repositório destinado para os testes automatizados de API utilizando SuperTest.


## Pré-requisitos para rodar localmente

*  [Instalação do node](https://nodejs.org/en/download/)
*  [Instalação do npm](https://www.npmjs.com/get-npm)

#### Atenção: É necessário que a máquina esteja com todas as dependencias instaladas:

* Usar o comando abaixo onde existam os arquivos `package.json`

```npm install``` 

(raíz: `/desafio-datum`)


## Rodando os testes com mocha

* Para facilitar o caminho de execução da lib, instalermos o mocha globalmente com o comando: `npm install -g mocha`

* Entrar na pasta specs do projeto `/desafio-datum/specs/users`

* Executar o comando `mocha *.js` para executar todos testes


## Rodando todos testes de integração

* Entrar na raíz do projeto `/desafio-datum`
* Usar os comandos:
```npm run test-integration```

## Visualizar report detalhado de execução dos testes

* Após execução do comando `npm run test-integration`, será criado uma pasta com o nome `reports` na raíz do projeto
* Entrar na pasta `reports` e abrir o arquivo `index.html`

## Resumindo o projeto

* A pasta principal é a `desafio-datum` e dentro dela temos as pastas `specs` e  `schemas`

* Na pasta `schemas` fica todos os arquivos `schema.js` que são utilizados na realização dos contratos de API.

*  Já na pasta `specs` temos alguns arquivos são eles:

   *  Arquivos `spec.js` são os arquivos que contém os cenários de testes executados.

   *  Arquivos `.json` contém as validações e entradas dos testes

*  Na raiz do projeto também é possível visualizar os seguintes arquivos:

   *  `package.json` e `package-lock.json` arquivo com nossas dependências e os scripts
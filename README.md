# OpenPBL

[![Build Status](https://travis-ci.org/DuduMonkey/OpenPBL.svg?branch=master)](https://travis-ci.org/DuduMonkey/OpenPBL)

OpenPBL Educational Tool

## Configurar o ambiente de desenvolvimento
Para ambiente Windows é necessário ter o Python 2.7 instalado
e apontar o executável à variavel de ambiente PYTHON
`npm config set python c:/Caminho/Para/Python27/Python.exe`

Instalar grunt-cli e bower

```sh
$ npm install -g grunt-cli bower
```

Instalar pacotes do node

```sh
$ npm install
```

Instalar pacotes do bower

```sh
$ bower install
```

### Configurar a conexão com o Mongodb

Instância local
```sh
$ export CONN_STRING=localhost:<port>
```
Mongolab
```sh
$ export CONN_STRING= mongodb://<dbuser>:<dbpassword>@123.mongolab.com:4232/base
```

## Rodando o express

Para subir uma instância do `express` no endereço `localhost:9000`:

```sh
$ grunt s
```

## Métricas

Para exibir um relatório de métricas de qualidade de código utilizando [plato](https://github.com/jsoverson/plato), execute o comando a seguir:

#### Windows

```sh
grunt metrics:win
```

##### Linux/OSX

```sh
$ grunt metrics:darwin
```

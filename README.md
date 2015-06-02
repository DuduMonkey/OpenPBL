# OpenPBL

[![Build Status](https://travis-ci.org/DuduMonkey/OpenPBL.svg?branch=master)](https://travis-ci.org/DuduMonkey/OpenPBL)
[![Build Status](https://drone.io/github.com/DuduMonkey/OpenPBL/status.png)](https://drone.io/github.com/DuduMonkey/OpenPBL/latest)

OpenPBL Educational Tool

## Configurar o ambiente de desenvolvimento


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

Instância local, por default a conexão é a local.
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

## Lint

Para validar o lint do código:
```sh
grunt jshint
```

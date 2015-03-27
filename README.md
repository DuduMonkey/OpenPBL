# OpenPBL

[![Build Status](https://travis-ci.org/DuduMonkey/OpenPBL.svg?branch=master)](https://travis-ci.org/DuduMonkey/OpenPBL)

OpenPBL Educational Tool

## Configurar o ambiente de desenvolvimento
Instalar grunt-cli e bower

`npm install -g grunt-cli bower`

Instalar pacotes do node

`npm install`

Instalar pacotes do bower

`bower install`

### Configurar a conexão com a base de dados
Local
```sh
$ export CONN_STRING=localhost:<port>
```
Mongolab
```sh
$export CONN_STRING= mongodb://<dbuser>:<dbpassword>@123.mongolab.com:4232/base
```

## Rodar servidor HTTP local

`grunt s`

Sobe um servidor HTTP no endereço `localhost:9000`

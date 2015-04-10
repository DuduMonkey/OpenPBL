# OpenPBL

[![Build Status](https://travis-ci.org/DuduMonkey/OpenPBL.svg?branch=master)](https://travis-ci.org/DuduMonkey/OpenPBL)

OpenPBL Educational Tool

## Configurar o ambiente de desenvolvimento
Para ambiente Windows é necessário ter o Python 2.7 instalado
e apontar o executável à variavel de ambiente PYTHON
`npm config set python c:/Caminho/Para/Python27/Python.exe`

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

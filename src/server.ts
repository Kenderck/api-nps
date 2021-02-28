//*----------------CONFIGURAÇÕES INICIAIS----------*
// 1° usar o yarn init -y
//2°baixar o express = yarn add express
//baixar o @types/express = yarn add @types/express -D
//ao rodar a primeira vez o server, baixar o typescript = yarn add typescript -D
//adicionar o yarn add ts-node-dev -D converter o código para typescript
//e no package.json adicionar um script com dev e ts-node-dev server.ts
//----------------------------------------------------------------------
//----------------------------------------------------------------------
//----------------------------------------------------------------------
//*-----------------------BANCO DE DADOS-------------------------*
//usar o TYPEORM parecido com hibernate para banco de dados
//yarn add typeorm reflect-metadata (dois modulos)
//yarn add sqlite3 - podendo ser qualquer um (Mysql, postgress...)
//criar um arquivo ormconfig.json/js e criar o tipo de bd
//----------------------------------------------------------------------
//----------------------------------------------------------------------
//----------------------------------------------------------------------
//migration = histórico de tudo o que a gente faz no banco de dados
//usar monulo de cli do node para usar a migrations (ver no package.json)
// colocar o comando yarn typeorm migration:create -n CreateUsers
//criar as tabelas e rodar o comando = yarn typeorm migration:run
//o comando = yarn typeorm migration:revert retorna a ultima migration feita
//----------------------------------------------------------------------
//----------------------------------------------------------------------
//----------------------------------------------------------------------
//*-------------------------TESTES---------------------------------*
//adicionar yarn add jest @types/jest -D e dar um yarn jest --init e responder as perguntas
//ir no jest.config.ts e configurar: 
//bail: true; se encontrar um teste que falhou os outros não irão rodar;
//testEnvoriment: node; desabilitado
//testMatch: habilitado: caminho onde ficarão os testes
//criar as pastas e aquivos de teste
//adicionar yarn add ts-jest -D 
//ir no tsconfig.ts e habilitar types: ["jest", "node"]
//ir no arquivo jest.config.ts e habilitar preset: "ts-jest"
//utilizar o supertest para imitar um servidor.
//yarn add supertest @types/supertest -D    
//alterar o server.ts deixando o servidor sozinho sem as rotas. para separa os servidores testes e original
//e alterar o index.ts apra saber qual servidor será rodado.
//adicione o "yarn add cross-env -D 
//colocar um cross-env NODE_ENV=test jest no package.json test
//colcoar "posttest" : "rimraf ./src/database/database.test.sqlite" no package.json
//para apagar o banco de dados TESTE toda vez que rodar um teste.
//----------------------------------------------------------------------
//----------------------------------------------------------------------
//----------------------------------------------------------------------
//*-------------------------ENVIAR E-MAIL---------------------------------*
//usar o donemailer e ethereal
//yarn add nodemailer
//yarn add hanlderbars para templates customizados
//----------------------------------------------------------------------
//----------------------------------------------------------------------
//----------------------------------------------------------------------
//*-------------------------TRAMANETO DE ERROS---------------------------------*
//adicionar o yup = yarn add yup.
//criar o shape e validações
//verficiar as validações com try cath
//criar uma classe de error = AppError
//Quando quiser lancar uma exceção colcoar THROW NEW APPERROR()
//passando os parametros desejados
//adicionar ao app.ts um tratamento para esses erros.
//adicionar yarn add express-async-errors
//e importar para o app.ts logo abaixo da importação de tratamento que é:
//import express, { NextFunction, Request, Response } from 'express';
//----------------------------------------------------------------------
//----------------------------------------------------------------------
//----------------------------------------------------------------------
//*-------------------------CONFIGURAÇÕES DO VS---------------------------------*
//OMNI da rockseat
//material icon
//bracket Pair colorizer

import { app } from "./app";

app.listen(3333, () => console.log("Server is running"));

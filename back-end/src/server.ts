import express from 'express';
import 'reflect-metadata';
import 'dotenv/config';
import cors from 'cors';

import './shared/utils/module-alias';
import { application } from '@src/infra/config/application';
import { AppDataSource } from '@src/infra/database/data-source';
import { router } from './router';
import { UNKNOWN_ERROR, knownErrors } from './error';

// TODO
// Posteriormente substituir o atual tratamento de erros por um mais adequado para que em caso de ocorrer uma except inesperada,
// o serviço trate e retorne um erro 500, invés de deixar a aplicação crashar e ficar fora do ar.
// Pois, o atual serviço deixa crashar para ser reinicializado automaticamente pelo docker.
// Não se esquecer de jogar parte do código para outro arquivo

export const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', router);

const server = app.listen(application.port, () => {
  console.log('Server is running');
});

AppDataSource.initialize()
  .then(() => {
    console.log('Connected with successful');
  })
  .catch((error) => {
    console.log('Error to connect with the database');
    console.log(error);
  });

const shutdown = async () => {
  server.close(async () => {
    await AppDataSource.destroy();
    console.log('DB closed with success');
    process.exit(0);
  });
};

process.on('SIGINT', () => shutdown());
process.on('SIGTERM', () => shutdown());

knownErrors.forEach(({ exitCode, event }) => {
  process.on(event, (error) => {
    if (exitCode === UNKNOWN_ERROR) {
      process.exit(exitCode);
      return;
    }

    process.exit(exitCode);
  });
});

import { app } from './providers/web-server';
import { rabbitMQ } from './providers/messager-broker-access';

rabbitMQ.init().then(() => {
  app.listen(3000, () => {
    console.log('API Gateway rodando na porta 3000 ');
  });
}).catch((err) => {
  console.error('Erro ao iniciar o RabbitMQ:', err);
});

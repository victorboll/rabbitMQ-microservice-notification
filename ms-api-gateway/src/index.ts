import { app } from './providers/web-server';
import { rabbitMQ } from './providers/messager-broker-access';

rabbitMQ.init().then(() => {
  app.listen(3000, () => {
    console.log('API Gateway rodando na porta 3000 ');
  });

  // Adiciona a rota para a raiz
  app.get('/', (req, res) => {
    res.send('API Gateway está funcionando!');
  });

}).catch((err) => {
  console.error('Erro ao iniciar o RabbitMQ:', err);
});

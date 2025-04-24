import { Router } from 'express';
import { SendCreateUserController } from '../../../app/send-create-user/send-create-user.controller';
import { SendCreateUserApplication } from '../../../app/send-create-user/send-create-user.application';
import { rabbitMQ } from '../../messager-broker-access';

const routes = Router();

const application = new SendCreateUserApplication(rabbitMQ);
const controller = new SendCreateUserController(application);

routes.post('/user', (req, res) => controller.handle(req, res));

export { routes };

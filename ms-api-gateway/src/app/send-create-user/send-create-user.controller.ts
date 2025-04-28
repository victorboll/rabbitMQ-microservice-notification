import { Request, Response } from "express";
import { SendCreateUserApplication } from "./send-create-user.application";

export class SendCreateUserController {
  constructor(private readonly sendCreateUser: SendCreateUserApplication) {}

    /**
    * Handle
    * @param req
    * @param resp
    */

  async handle(req: Request, resp: Response): Promise<Response> {
    try {
      console.log('[CONTROLLER] Recebendo requisição de criação de usuário:', req.body);

      const { name, email, password, cellPhone } = req.body;

      const { code, response } = await this.sendCreateUser.handle({
        name,
        email,
        password,
        cellPhone,
      });

      console.log('[CONTROLLER] Requisição enviada para Application. Retornando resposta.');

      return resp.status(code).send(response);
    } catch (error) {
      console.error('Erro no Controller:', error);
      return resp.status(500).send({ error: 'Erro interno no servidor' });
    }
  } 
}

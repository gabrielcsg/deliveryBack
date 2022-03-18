import { Router } from "express";
import { AuthenticateClientController } from "./modules/accounts/authenticateClient/authenticateClientController";
import { CreateClientController } from "./modules/clients/useCases/createClient/createClientController";

const routes = Router();

const createClientController = new CreateClientController();
const authenticateClientController = new AuthenticateClientController();

routes.post("/clients/", createClientController.handle);
routes.post("/authenticate/", authenticateClientController.handle);

export { routes };

import { Router } from "express";
import { AuthenticateClientController } from "./modules/accounts/authenticateClient/authenticateClientController";
import { CreateClientController } from "./modules/clients/useCases/createClient/createClientController";
import { CreateDeliverymanController } from "./modules/deliverymans/useCases/createDeliveryman/createDeliverymanController";

const routes = Router();

const authenticateClientController = new AuthenticateClientController();
const createClientController = new CreateClientController();
const createDeliverymanController = new CreateDeliverymanController();

routes.post("/authenticate/", authenticateClientController.handle);
routes.post("/clients/", createClientController.handle);
routes.post("/deliverymans/", createDeliverymanController.handle);

export { routes };

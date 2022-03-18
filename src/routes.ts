import { Router } from "express";
import { AuthenticateClientController } from "./modules/accounts/authenticateClient/authenticateClientController";
import { AuthenticateDeliverymanController } from "./modules/accounts/authenticateDeliveryman/authenticateDeliverymanController";
import { CreateClientController } from "./modules/clients/useCases/createClient/createClientController";
import { CreateDeliverymanController } from "./modules/deliverymans/useCases/createDeliveryman/createDeliverymanController";

const routes = Router();

const authenticateClientController = new AuthenticateClientController();
const authenticateDeliverymanController =
  new AuthenticateDeliverymanController();

const createClientController = new CreateClientController();
const createDeliverymanController = new CreateDeliverymanController();

routes.post("/clients/", createClientController.handle);
routes.post("/deliverymans/", createDeliverymanController.handle);

routes.post("/clients/authenticate/", authenticateClientController.handle);
routes.post(
  "/deliverymans/authenticate/",
  authenticateDeliverymanController.handle
);

export { routes };

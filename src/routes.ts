import { Router } from "express";
import { ensureAuthenticateClient } from "./middlewares/ensureAuthenticateClient";
import { ensureAuthenticateDeliveryman } from "./middlewares/ensureAuthenticateDeliveryman";
import { AuthenticateClientController } from "./modules/accounts/authenticateClient/authenticateClientController";
import { AuthenticateDeliverymanController } from "./modules/accounts/authenticateDeliveryman/authenticateDeliverymanController";
import { CreateClientController } from "./modules/clients/useCases/createClient/createClientController";
import { CreateDeliveryController } from "./modules/deliveries/useCases/createDelivery/CreateDeliveryController";
import { FindAllAvaiableController } from "./modules/deliveries/useCases/findAllAvaiable/findAllAvaiableController";
import { UpdateDeliverymanController } from "./modules/deliveries/useCases/updateDeliveryman/updateDeliverymanController";
import { CreateDeliverymanController } from "./modules/deliverymans/useCases/createDeliveryman/createDeliverymanController";

const routes = Router();

const authenticateClientController = new AuthenticateClientController();
const authenticateDeliverymanController =
  new AuthenticateDeliverymanController();

const createClientController = new CreateClientController();
const createDeliverymanController = new CreateDeliverymanController();
const createDeliveryController = new CreateDeliveryController();

const findAllAvaiableController = new FindAllAvaiableController();
const updateDeliverymanController = new UpdateDeliverymanController();

routes.post("/clients/", createClientController.handle);
routes.post("/deliverymans/", createDeliverymanController.handle);
routes.post(
  "/deliveries/",
  ensureAuthenticateClient,
  createDeliveryController.handle
);

routes.post("/clients/authenticate/", authenticateClientController.handle);
routes.post(
  "/deliverymans/authenticate/",
  authenticateDeliverymanController.handle
);

routes.put(
  "/delivery/:id_delivery",
  ensureAuthenticateDeliveryman,
  updateDeliverymanController.handle
);

routes.get(
  "/delivery/avaiable/",
  ensureAuthenticateDeliveryman,
  findAllAvaiableController.handle
);

export { routes };

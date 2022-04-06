import { Request, Response } from "express";
import { FindAllAvaiableUseCase } from "./findAllAvaiableUseCase";

export class FindAllAvaiableController {
  async handle(request: Request, response: Response) {
    const findAllAvaiableUseCase = new FindAllAvaiableUseCase();

    const deliveries = await findAllAvaiableUseCase.execute();

    return response.json(deliveries);
  }
}

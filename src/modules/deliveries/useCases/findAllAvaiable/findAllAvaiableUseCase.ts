import { prisma } from "../../../../database/prismaClient";

export class FindAllAvaiableUseCase {
  async execute() {
    return await prisma.delivery.findMany({ where: { end_at: null } });
  }
}

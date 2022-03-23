import { prisma } from "../../../../database/prismaClient";

interface CreateDeliveryDto {
  item_name: string;
  id_client: string;
}

export class CreateDeliveryUseCase {
  async execute({ item_name, id_client }: CreateDeliveryDto) {
    const delivery = await prisma.delivery.create({
      data: {
        item_name,
        id_client,
      },
    });

    return delivery;
  }
}

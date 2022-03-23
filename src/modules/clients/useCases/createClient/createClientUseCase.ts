import { hash } from "bcrypt";
import { prisma } from "../../../../database/prismaClient";

interface ICreateClient {
  username: string;
  password: string;
}

export class CreateClientUseCase {
  async execute({ username, password }: ICreateClient) {
    // validate username
    const clientExist = await prisma.client.findFirst({
      where: {
        username: {
          equals: username,
          mode: "insensitive",
        },
      },
    });

    if (clientExist) throw new Error("Client already exists");

    // encrypt password
    const hashPassword = await hash(password, 10);

    // save client
    const client = await prisma.client.create({
      data: {
        username,
        password: hashPassword,
      },
    });

    return client;
  }
}

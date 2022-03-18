import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { prisma } from "../../../database/prismaClient";

interface IAuthenticateClient {
  username: string;

  password: string;
}

export class AuthenticateClientUseCase {
  async execute({ username, password }: IAuthenticateClient) {
    // check that the username is registered
    const client = await prisma.client.findFirst({ where: { username } });

    if (!client) throw new Error("Username or password invalid");

    // check passwords match
    const passwordMatchs = await compare(password, client.password);

    if (!passwordMatchs) throw new Error("Username or password invalid");

    // generate token
    const token = sign({ username }, process.env.TOKEN_HASH!, {
      subject: client.id,
      expiresIn: "1d",
    });

    return token;
  }
}

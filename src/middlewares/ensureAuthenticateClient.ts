import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { prisma } from "../database/prismaClient";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticateClient(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeaders = request.headers.authorization;

  if (!authHeaders)
    return response.status(401).json({ message: "Token missing" });

  const [, token] = authHeaders.split(" ");

  try {
    const { sub } = verify(token, process.env.TOKEN_HASH!) as IPayload;

    const client = await prisma.client.findFirst({ where: { id: sub } });

    if (!client)
      return response.status(401).json({ message: "User is not client" });

    request.id_client = sub;

    return next();
  } catch (error) {
    return response.status(401).json({ message: "Invalid token" });
  }
}

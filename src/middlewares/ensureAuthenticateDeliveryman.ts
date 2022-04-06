import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { prisma } from "../database/prismaClient";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticateDeliveryman(
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

    const deliveryman = await prisma.deliveryman.findFirst({
      where: { id: sub },
    });

    if (!deliveryman)
      return response.status(401).json({ message: "User is not deliveryman" });

    request.id_deliveryman = sub;

    return next();
  } catch (error) {
    return response.status(401).json({ message: "Invalid token" });
  }
}

import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

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

    request.id_client = sub;

    return next();
  } catch (error) {
    return response.status(401).json({ message: "Invalid token" });
  }
}

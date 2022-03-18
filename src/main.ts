import express from "express";
import { routes } from "./routes";

const app = express();

app.use(express.json());

app.get("/", (_request, response) => {
  return response.json({
    message: "Hello World",
  });
});

app.use(routes);

app.listen(3000, () => console.log("Server started"));

import fastifyCors from "@fastify/cors";
import fastify from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";
import { createItemRoute } from "./routes/create-item.ts";
import { createProjectRoute } from "./routes/create-project.ts";
import { listProjectsRoute } from "./routes/list-projects.ts";
import { listProjectsItemsRoute } from "./routes/list-project-items.ts";
import { getProjectRoute } from "./routes/get-project.ts";
import { deleteProjectRoute } from "./routes/delete-project.ts";
import { deleteSelectedItemsRoute } from "./routes/delete-selected-items.ts";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
});

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.register(createProjectRoute);
app.register(createItemRoute);
app.register(getProjectRoute);
app.register(listProjectsRoute);
app.register(listProjectsItemsRoute);
app.register(deleteProjectRoute);
app.register(deleteSelectedItemsRoute);

app.get("/health", () => {
  return "OK";
});

app.listen({ port: 3333 }).then(() => {
  console.log("HTTP server running");
});

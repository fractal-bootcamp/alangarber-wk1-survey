import { Elysia, t } from "elysia";
import swagger from "@elysiajs/swagger";
import cors from "@elysiajs/cors";
import { getAllSurveys, createSurvey, type Survey, getSurveyById, answerSurvey, getSurveyResults } from "./prisma/services";

const app = new Elysia()
  .use(swagger())
  .use(cors({
    origin: 'localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  }))
  .get("/", () => "Hello Elysia")
  .get("/surveys", () => getAllSurveys())
  .post("/surveys", ({ body }) => {
    createSurvey(body as Survey);
    return { success: true };
  }, {
    body: t.Object({
      question: t.String()
    })
  })
  .get("/surveys/:id", ({ params: { id } }) => {
    const survey = getSurveyById(id);
    if (!survey) {
      throw new Error("Survey not found");
    }
    return survey;
  }, {
    params: t.Object({
      id: t.String()
    })
  })
  .post("surveys/:id/answer", ({ params: { id }, body})  => {
    answerSurvey(id, body.answer);
    return { success: true };
  }, {
    params: t.Object({
      id: t.String()
    }),
    body: t.Object({
      answer: t.String()
    })
  })
  .get("/surveys/:id/results", ({ params: { id } }) => {
    const results = getSurveyResults(id);
    if (!results) {
      throw new Error("Survey not found");
    }
    return results;
  }, {
    params: t.Object({
      id: t.String()
    })
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

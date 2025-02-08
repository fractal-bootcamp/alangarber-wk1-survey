import {
  type RouteConfig,
  index,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  ...prefix("/surveys", [
    index("routes/surveys/index.tsx"),
    route("/new", "routes/surveys/new.tsx"),
    route(":id", "routes/surveys/survey.tsx"),
    route(":id/results", "routes/surveys/results.tsx"),
  ]),
] satisfies RouteConfig;

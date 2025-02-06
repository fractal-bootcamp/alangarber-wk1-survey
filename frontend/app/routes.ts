import {
  type RouteConfig,
  index,
  prefix,
  route,
} from "@react-router/dev/routes";

// export default [index("routes/home.tsx")] satisfies RouteConfig;

export default [
  index("routes/home.tsx"),
  ...prefix("/surveys", [
    index("routes/surveys/index.tsx"),
    route("/new", "routes/surveys/new.tsx"),
  ]),
] satisfies RouteConfig;

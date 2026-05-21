import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  layout("routes/site-layout.tsx", [
    route("about", "routes/about.tsx"),
    route("menu", "routes/menu.tsx"),
    route("contact", "routes/contact.tsx"),
  ]),
] satisfies RouteConfig;

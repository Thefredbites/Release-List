import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("survey", "routes/survey.tsx"),
  route("admin/login", "routes/admin-login.tsx"),
  route("admin/logout", "routes/admin-logout.tsx"),
  route("admin/leads.csv", "routes/admin-leads-csv.ts"),
  route("admin/surveys.csv", "routes/admin-surveys-csv.ts"),
  route("admin/surveys", "routes/admin-surveys.tsx"),
  route("admin", "routes/admin.tsx"),
  route("api/keepalive", "routes/api-keepalive.ts"),
  layout("routes/site-layout.tsx", [
    route("about", "routes/about.tsx"),
    route("menu", "routes/menu.tsx"),
    route("contact", "routes/contact.tsx"),
  ]),
] satisfies RouteConfig;

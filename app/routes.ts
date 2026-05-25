import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("admin/login", "routes/admin-login.tsx"),
  route("admin/logout", "routes/admin-logout.tsx"),
  route("admin/leads.csv", "routes/admin-leads-csv.ts"),
  route("admin", "routes/admin.tsx"),
  layout("routes/site-layout.tsx", [
    route("about", "routes/about.tsx"),
    route("menu", "routes/menu.tsx"),
    route("contact", "routes/contact.tsx"),
  ]),
] satisfies RouteConfig;

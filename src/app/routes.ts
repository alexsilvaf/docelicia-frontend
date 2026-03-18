import { createBrowserRouter } from "react-router";
import { LandingPage } from "./components/LandingPage";
import { DashboardLayout } from "./components/DashboardLayout";

export const router = createBrowserRouter([
  { path: "/", Component: LandingPage },
  { path: "/dashboard", Component: DashboardLayout },
]);

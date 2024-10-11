import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import {
  Profile,
  HomePage,
  Login,
  MemberShip,
  Plans,
  Turns,
  Inventary,
  Stats,
  Notifications
} from "./pages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/home",
    element: <HomePage />,
  },
  {
    path: "/acount",
    element: <Profile />,
  },
  {
    path: "/plans",
    element: <Plans />,
  },
  {
    path: "/membership",
    element: <MemberShip />,
  },
  {
    path: "/turns",
    element: <Turns />,
  },
  {
    path: "/inventary",
    element: <Inventary />,
  },
  {
    path: "/stats",
    element: <Stats />,
  },
  {
    path: "/notifications",
    element: <Notifications />,
  },
]);

import { createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "./components";
import App from "./App";
import {
  Profile,
  HomePage,
  MemberShip,
  Plans,
  Turns,
  Inventary,
  Stats,
  Notifications,
  MyPlans,
} from "./pages";
//RUTAS PROTEGIDAS
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/home",

    element: (
      <HomePage />
      // <ProtectedRoute>
      // </ProtectedRoute>
    ),
  },
  {
    path: "/acount",

    element: (
      <Profile />
      // <ProtectedRoute>
      // </ProtectedRoute>
    ),
  },
  {
    path: "/plans",
    element: (
      <Plans />
      // <ProtectedRoute>
      // </ProtectedRoute>
    ),
  },
  {
    path: "/plans/myplans",
    element: (
      <MyPlans />
      // <ProtectedRoute>
      // </ProtectedRoute>
    ),
  },
  {
    path: "/membership",
    element: (
      <MemberShip />
      // <ProtectedRoute>
      // </ProtectedRoute>
    ),
  },
  {
    path: "/turns",
    element: (
      <Turns />
      // <ProtectedRoute>
      // </ProtectedRoute>
    ),
  },
  {
    path: "/inventary",
    element: (
      <Inventary />
      // <ProtectedRoute>
      // </ProtectedRoute>
    ),
  },
  {
    path: "/stats",
    element: (
      <Stats />
      // <ProtectedRoute>
      // </ProtectedRoute>
    ),
  },
  {
    path: "/notifications",
    element: (
      <Notifications />
      // <ProtectedRoute>
      // </ProtectedRoute>
    ),
  },
]);

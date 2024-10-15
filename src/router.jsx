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
} from "./pages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/home",

    element: (
      <ProtectedRoute>
        <HomePage />,
      </ProtectedRoute>
    ),
  },
  {
    path: "/acount",

    element: (
      <ProtectedRoute>
        <Profile />,
      </ProtectedRoute>
    ),
  },
  {
    path: "/plans",
    element: (
      <ProtectedRoute>
        <Plans />,
      </ProtectedRoute>
    ),
  },
  {
    path: "/membership",
    element: (
      <ProtectedRoute>
        <MemberShip />,
      </ProtectedRoute>
    ),
  },
  {
    path: "/turns",
    element: (
      <ProtectedRoute>
        <Turns />,
      </ProtectedRoute>
    ),
  },
  {
    path: "/inventary",
    element: (
      <ProtectedRoute>
        <Inventary />,
      </ProtectedRoute>
    ),
  },
  {
    path: "/stats",
    element: (
      <ProtectedRoute>
        <Stats />,
      </ProtectedRoute>
    ),
  },
  {
    path: "/notifications",
    element: (
      <ProtectedRoute>
        <Notifications />,
      </ProtectedRoute>
    ),
  },
]);

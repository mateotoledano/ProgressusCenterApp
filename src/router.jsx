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
  CreateallExercise
} from "./pages";
import { HomePlans } from "./pages/plans/HomePlans";
import { Users } from "./pages/usuarios/Users";

//RUTAS PROTEGIDAS
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/home",

    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/account",

    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    ),
  },
  {
    path: "/plans",
    element: (
      <ProtectedRoute>
        <HomePlans />
      </ProtectedRoute>
    ),
  },
  {
    path: "/plans/createPlans/",
    element: (
      <ProtectedRoute>
        <Plans />
      </ProtectedRoute>
    ),
  },
  {
    path: "/plans/createPlans/myPlans",
    element: (
      <ProtectedRoute>
        <MyPlans />
      </ProtectedRoute>
    ),
  },
  {
    path: "/plans/createallExercise",
    element: (
      <ProtectedRoute>
        <CreateallExercise />
      </ProtectedRoute>
    ),
  },
  {
    path: "/membership",
    element: (
      <ProtectedRoute>
        <MemberShip />
      </ProtectedRoute>
    ),
  },
  {
    path: "/turns",
    element: (
      <ProtectedRoute>
        <Turns />
      </ProtectedRoute>
    ),
  },
  {
    path: "/inventary",
    element: (
      <ProtectedRoute>
        <Inventary />
      </ProtectedRoute>
    ),
  },
  {
    path: "/stats",
    element: (
      <ProtectedRoute>
        <Stats />
      </ProtectedRoute>
    ),
  },
  {
    path: "/users",
    element: (
      <ProtectedRoute>
        <Users/>
      </ProtectedRoute>
    ),
  },
  {
    path: "/notifications",
    element: (
      <ProtectedRoute>
        <Notifications />
      </ProtectedRoute>
    ),
  },
]);

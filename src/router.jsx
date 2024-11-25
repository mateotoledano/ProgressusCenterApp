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
      <ProtectedRoute allowedRoles={["ADMIN" , "ENTRENADOR" , "SOCIO"]}>
        <HomePage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/account",

    element: (
      <ProtectedRoute allowedRoles={["ADMIN" , "ENTRENADOR" , "SOCIO"]}>
        <Profile />
      </ProtectedRoute>
    ),
  },
  {
    path: "/plans",
    element: (
      <ProtectedRoute allowedRoles={["ENTRENADOR" , "SOCIO"]}>
        <Plans />
      </ProtectedRoute>
    ),
  },
  {
    path: "/plans/createPlans/",
    element: (
      <ProtectedRoute allowedRoles={["ENTRENADOR" ]}>
        <Plans />
      </ProtectedRoute>
    ),
  },
  {
    path: "/plans/createPlans/myPlans",
    element: (
      <ProtectedRoute allowedRoles={["ENTRENADOR", "SOCIO" ]}>
        <MyPlans />
      </ProtectedRoute>
    ),
  },
  {
    path: "/plans/createallExercise",
    element: (
      <ProtectedRoute allowedRoles={["ENTRENADOR" ]}>
        <CreateallExercise />
      </ProtectedRoute>
    ),
  },
  {
    path: "/membership",
    element: (
      <ProtectedRoute allowedRoles={["ADMIN" , "SOCIO"]}>
        <MemberShip />
      </ProtectedRoute>
    ),
  },
  {
    path: "/turns",
    element: (
      <ProtectedRoute allowedRoles={["SOCIO"]}>
        <Turns />
      </ProtectedRoute>
    ),
  },
  {
    path: "/inventary",
    element: (
      <ProtectedRoute allowedRoles={["ADMIN" ]}>
        <Inventary />
      </ProtectedRoute>
    ),
  },
  {
    path: "/stats",
    element: (
      <ProtectedRoute allowedRoles={["ADMIN" , "ENTRENADOR" ]}>
        <Stats />
      </ProtectedRoute>
    ),
  },
  {
    path: "/users",
    element: (
      <ProtectedRoute allowedRoles={["ADMIN" ]}>
        <Users/>
      </ProtectedRoute>
    ),
  },
  {
    path: "/notifications",
    element: (
      <ProtectedRoute allowedRoles={["ADMIN" , "SOCIO" , "ENTRENADOR"]}>
        <Notifications />
      </ProtectedRoute>
    ),
  },
]);

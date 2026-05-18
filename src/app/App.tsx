import {
  RouterProvider,
  createBrowserRouter,
} from "react-router";

import { HomePage } from "@/features/home/HomePage";

import {
  ProjectsPage,
} from "@/features/projects/ProjectsPage";

import {
  Dashboard,
} from "@/features/dashboard/DashboardPage";

import {
  SignInPage,
} from "@/features/auth/SignInPage";

import {
  SignUpPage,
} from "@/features/auth/SignUpPage";

import {
  UserSettingsPage,
} from "@/features/auth/UserSettingsPage";

import {
  PaymentPage,
} from "@/features/payment/pages/PaymentPage";

import {
  SuccessPage,
} from "@/features/payment/pages/SuccessPage";

import {
  CancelPage,
} from "@/features/payment/pages/CancelPage";

import {
  AdminPage,
} from "@/features/admin/AdminPage";

import {
  AuthGuard,
} from "@/features/auth/components/AuthGuard";

const router = createBrowserRouter([
  {
    path: "/",

    children: [
      {
        index: true,
        Component: HomePage,
      },

      {
        path: "projects",

        element: (
          <AuthGuard>
            <ProjectsPage />
          </AuthGuard>
        ),
      },

      {
        path: "dashboard/:projectId",

        element: (
          <AuthGuard>
            <Dashboard />
          </AuthGuard>
        ),
      },

      {
        path: "signin",
        Component: SignInPage,
      },

      {
        path: "signup",
        Component: SignUpPage,
      },

      {
        path: "payment",
        element: (
          <AuthGuard>
            <PaymentPage />
          </AuthGuard>
        ),
      },

      {
        path: "payment/success",
        Component: SuccessPage,
      },

      {
        path: "payment/cancel",
        Component: CancelPage,
      },

      {
        path: "settings",
        element: (
          <AuthGuard>
            <UserSettingsPage />
          </AuthGuard>
        ),
      },

      {
        path: "admin",
        Component: AdminPage,
      },
    ],
  },
]);

export default function App() {
  return (
    <RouterProvider router={router} />
  );
}
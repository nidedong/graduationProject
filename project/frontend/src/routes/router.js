import HomePage from "@/pages/User/HomePage/homePage.jsx";
import Login from "@/pages/User/Login/login.jsx";
import Register from "@/pages/User/Register/register.jsx";
import Main from "@/pages/Main/main.jsx";
import LoginLayout from "@/components/layout/loginLayout/loginLayout.jsx";
import MainLayout from "@/components/layout/mainLayout/mainLayout.jsx";

export default [
  {
    path: "/",
    component: LoginLayout,
    children: [
      { path: "/", component: HomePage, exact: true },
      { path: "/login", component: Login, exact: true },
      { path: "/register", component: Register, exact: true },
      {
        path: "/main",
        component: MainLayout,
        children: [{ path: "/main", component: Main, exact: true }]
      }
    ]
  }
];

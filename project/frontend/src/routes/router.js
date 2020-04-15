import HomePage from "@/pages/User/HomePage/homePage.jsx";
import Login from "@/pages/User/Login/login.jsx";
import Register from "@/pages/User/Register/register.jsx";
import Main from "@/pages/Main/main.jsx";
import LoginLayout from "@/components/layout/loginLayout/loginLayout.jsx";
import MainLayout from "@/components/layout/mainLayout/mainLayout.jsx";
import Profile from "@/pages/Profile/profile.jsx";
import Message from "@/pages/Message/message.jsx";
import Explore from "@/pages/Explore/explore.jsx";
import AddFriend from "@/pages/AddFriend/addFriend.jsx";
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
        children: [
          { path: "/main", component: Main, exact: true },
          { path: "/main/explore", component: Explore, exact: true },
          { path: "/main/message", component: Message, exact: true },
          { path: "/main/addFriend", component: AddFriend, exact: true },
          { path: "/main/profile", component: Profile, exact: true },
        ],
      },
    ],
  },
];

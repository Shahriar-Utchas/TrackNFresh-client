import { createBrowserRouter } from "react-router";
import Root from "../Layouts/Root";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Registration from "../pages/Registration/Registration";
import Fridge from "../pages/Fridge/Fridge";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: Root,
        children: [
            {
                index: true,
                Component: Home,
            },
            {
                path: "login",
                Component: Login,
            },
            {
                path: "register",
                Component: Registration,
            },
            {
                path: "fridge",
                Component: Fridge,
            }
        ]
    },
]);
import { createBrowserRouter } from "react-router";
import Root from "../Layouts/Root";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Registration from "../pages/Registration/Registration";
import Fridge from "../pages/Fridge/Fridge";
import AddFood from "../pages/AddFood/AddFood";
import MyItem from "../pages/MyItem/MyItem";
import PrivateRoutes from "./PrivateRoutes";

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
                loader: () => fetch("http://localhost:3000/food/all"),
                hydrateFallbackElement: <div className="flex justify-center items-center h-screen">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
                </div>,
                Component: Fridge,
            },
            {
                path: "add-food",
                element: <PrivateRoutes><AddFood></AddFood></PrivateRoutes>
            },
            {
                path: "my-items",
                element: <PrivateRoutes><MyItem></MyItem></PrivateRoutes>
            }
        ]
    },
]);
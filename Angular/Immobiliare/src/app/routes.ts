import { Routes } from "@angular/router";
import { Home } from "./home/home";
import { Details } from "./details/details";

const routeConfig: Routes = [
    {
        path: "",
        component: Home,
        title: "Home Page",
    },
    {
        path: "details/:id",
        component: Details,
        title: "Home Details",
    },
];
export default routeConfig;
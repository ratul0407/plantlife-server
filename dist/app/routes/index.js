"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = require("../modules/user/user.route");
const auth_route_1 = require("../modules/auth/auth.route");
const plant_route_1 = require("../modules/plant/plant.route");
// import { CartRoutes } from "../modules/cart/cart.route";
const wishlist_route_1 = require("../modules/wishlist/wishlist.route");
const cart_route_1 = require("../modules/cart/cart.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/user",
        routes: user_route_1.UserRoutes,
    },
    {
        path: "/auth",
        routes: auth_route_1.authRoutes,
    },
    {
        path: "/plant",
        routes: plant_route_1.PlantRoutes,
    },
    {
        path: "/wishlist",
        routes: wishlist_route_1.WishlistRoutes,
    },
    {
        path: "/cart",
        routes: cart_route_1.CartRoutes,
    },
];
moduleRoutes.forEach((route) => {
    router.use(route.path, route.routes);
});
exports.default = router;

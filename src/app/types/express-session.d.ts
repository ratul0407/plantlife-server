import "express-session";
import { ICartItem } from "../modules/cart/cart.interface";

declare module "express-session" {
  interface SessionData {
    cart?: ICartItem[];
  }
}

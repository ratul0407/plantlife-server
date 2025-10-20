import { Cart } from "../cart/cart.model";
import { Plant } from "../plant/plant.model";
import { User } from "../user/user.model";
import { Wishlist } from "../wishlist/wishlist.model";

const getUserAnalytics = async () => {
  const totalUsers = await User.countDocuments({});

  return {
    totalUsers,
  };
};

const getPlantAnalytics = async () => {
  const totalPlants = await Plant.countDocuments({});
  const totalPlantsAddedInLast30Days = await Plant.countDocuments({});
  const totalPlantsInWishlist = await Wishlist.countDocuments({});
  const totalPlantsInCart = await Cart.countDocuments({});
  return {
    totalPlants,
    totalPlantsAddedInLast30Days,
    totalPlantsInWishlist,
    totalPlantsInCart,
  };
};

export const AnalyticsServices = {
  getUserAnalytics,
  getPlantAnalytics,
};

import { IPlant } from "./plant.interface";
import { Plant } from "./plant.model";
import { plantSearchableFields } from "./plant.constants";
import { QueryBuilder } from "../../utils/queryBuilder";

const createPlant = async (plant: IPlant) => {
  console.log(plant);
  const createdPlant = await Plant.create(plant);
  return createdPlant;
};
const getAllPlants = async (query: Record<string, string>) => {
  const queryBuilder = new QueryBuilder(Plant.find(), query);
  console.log(query);
  const tours = await queryBuilder
    .search(plantSearchableFields)
    .filter()
    .sort()
    .fields()
    .paginate();

  const [data, meta] = await Promise.all([
    tours.build(),
    queryBuilder.getMeta(),
  ]);
  return {
    data,
    meta,
  };
};
const getSinglePlant = async (id: string) => {
  const data = await Plant.findById(id);
  return data;
};

export const PlantService = {
  createPlant,
  getAllPlants,
  getSinglePlant,
};

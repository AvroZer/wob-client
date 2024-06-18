import { instance } from "../../../api/axios.api";
import { ICategory } from "../../../types/types";

export const categoriesLoader = async () => {
    const { data } = await instance.get<ICategory[]>("/categories");
    return data;
};
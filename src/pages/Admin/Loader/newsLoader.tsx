import { instance } from "../../../api/axios.api";
import { INews } from "../../../types/types";

export const newsLoader = async () => {
    const { data } = await instance.get<INews[]>("/news");
    return data;
};

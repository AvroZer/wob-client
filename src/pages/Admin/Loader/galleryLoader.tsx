import { instance } from "../../../api/axios.api";
import { IGallery } from "../../../types/types";

export const galleryLoader = async () => {
    const { data } = await instance.get<IGallery[]>("/gallery");
    return data;
};

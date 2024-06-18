import { useAppSelector } from "../store/hooks";

export const useAdmin = (): boolean => {
    const isAdmin = useAppSelector((state) => state.user.isAdmin);

    return isAdmin;
};

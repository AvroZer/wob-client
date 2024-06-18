import { useAppSelector } from "../store/hooks";

export const useLogin = (): string | undefined => {
    const login = useAppSelector((state) => state.user.user?.login);

    return login
};

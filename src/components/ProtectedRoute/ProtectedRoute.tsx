import { FC } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useAdmin } from "../../hooks/useAdmin";
import { redirect } from "react-router-dom";

interface Props {
    children: JSX.Element;
}

export const ProtectedRoute: FC<Props> = ({ children }) => {
    const isAuth = useAuth();
    const isAdmin = useAdmin();

    return <>{isAuth && isAdmin === true ? children : redirect("")}</>;
};

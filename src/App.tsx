import { RouterProvider } from "react-router-dom";
import "./index.css";
import { router } from "./routes/routes";
import { useAppDispatch } from "./store/hooks";
import { getTokenFromLocalStorage } from "./helpers/localStorage.helper";
import { AuthService } from "./services/auth.service";
import { login, logout } from "./store/user/userSlice";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { getIsAdminFromLocalStorage } from "./helpers/localStorageIsAdmin.helper";

function App() {
    const dispatch = useAppDispatch();
    useEffect(() => {
        const toastMessage = localStorage.getItem("toastMessage");
        if (toastMessage) {
            toast.success(toastMessage);
            localStorage.removeItem("toastMessage");
        }
    }, []);
    const checkAuth = async () => {
        const token = getTokenFromLocalStorage();
        try {
            if (token) {
                const data = await AuthService.getProfile();
                if (data) {
                    dispatch(login(data));
                } else {
                    dispatch(logout());
                }
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            const error = err.response?.data.message;
            toast.error(error.toString());
        }
    };

    const checkIsAdmin = async () => {
        const isAdmin = getIsAdminFromLocalStorage();
        try {
            if (isAdmin) {
                const data = await AuthService.getProfile();
                if (data) {
                    dispatch(login(data));
                } else {
                    dispatch(logout());
                }
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            const error = err.response?.data.message;
            toast.error(error.toString());
        }
    };

    useEffect(() => {
        checkAuth();
        checkIsAdmin();
    });

    return <RouterProvider router={router} />;
}

export default App;

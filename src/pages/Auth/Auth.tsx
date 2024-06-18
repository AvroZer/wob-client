import { FC, FormEvent, useEffect, useState } from "react";

import style from "./Auth.module.scss";
import { AuthService } from "../../services/auth.service";
import { toast } from "react-toastify";
import { setTokenToLocalStorage } from "../../helpers/localStorage.helper";
import { useAppDispatch } from "../../store/hooks";
import { login } from "../../store/user/userSlice";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Auth: FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loginValue, setLoginValue] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [isLogin, setIsLogin] = useState<boolean>(true);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isAuth = useAuth();
    useEffect(() => {
        const toastMessage = localStorage.getItem("toastMessage");
        if (toastMessage) {
            toast.success(toastMessage);
            localStorage.removeItem("toastMessage");
        }
    }, []);

    const registrationHandler = async (e: FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            const data = await AuthService.registration({
                email,
                login: loginValue,
                password,
                confirmPassword,
            });
            if (data) {
                localStorage.setItem("toastMessage", "Аккаунт успешно создан");
                window.location.reload();
                setIsLogin(!isLogin);
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            const error = err.response?.data.message;
            toast.error(error.toString());
        }
    };

    const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            const data = await AuthService.login({ email, password });

            if (data) {
                setTokenToLocalStorage("token", data.token);
                dispatch(login(data));
                localStorage.setItem("toastMessage", "Вход успешно выполнен");
                navigate("/");
                window.location.reload();
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            const error = err.response?.data.message;
            toast.error(error.toString());
        }
    };

    return (
        <div className={style.auth__wrapper}>
            {!isAuth ? (
                <div className={style.auth}>
                    <Link className={style.back} to="/">Назад</Link>
                    <div className="container">
                        <div className={style.auth__inner}>
                            <form
                                onSubmit={
                                    isLogin ? loginHandler : registrationHandler
                                }
                                className={style.auth__form}
                            >
                                {isLogin ? (
                                    <>
                                        <h1 className={style.auth__title}>
                                            Вход
                                        </h1>
                                        <label
                                            className={style.auth__label}
                                            htmlFor="email"
                                        >
                                            Введите эл. почту
                                            <input
                                                type="email"
                                                id="email"
                                                placeholder="example@email.com"
                                                className={style.auth__input}
                                                onChange={(e) =>
                                                    setEmail(e.target.value)
                                                }
                                            />
                                        </label>
                                        <label
                                            className={style.auth__label}
                                            htmlFor="password"
                                        >
                                            Введите пароль
                                            <input
                                                type="password"
                                                id="password"
                                                placeholder="Пароль"
                                                className={style.auth__input}
                                                onChange={(e) =>
                                                    setPassword(e.target.value)
                                                }
                                            />
                                        </label>
                                    </>
                                ) : (
                                    <>
                                        <h1 className={style.auth__title}>
                                            Регистрация
                                        </h1>
                                        <input
                                            type="email"
                                            placeholder="Введите эл. почту"
                                            className={style.auth__input}
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                        />

                                        <input
                                            type="text"
                                            placeholder="Введите логин"
                                            className={style.auth__input}
                                            onChange={(e) =>
                                                setLoginValue(e.target.value)
                                            }
                                        />

                                        <input
                                            type="password"
                                            placeholder="Введите пароль"
                                            className={style.auth__input}
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                        />

                                        <input
                                            type="password"
                                            placeholder="Повторите пароль"
                                            className={style.auth__input}
                                            onChange={(e) =>
                                                setConfirmPassword(
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </>
                                )}

                                <button className={style.auth__btn}>
                                    {isLogin ? "Войти" : "Зарегистрироваться"}
                                </button>

                                <div className={style.auth__content}>
                                    {isLogin ? (
                                        <div className={style.auth__text}>
                                            <p>Нет аккаунта?</p>
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setIsLogin(!isLogin);
                                                }}
                                            >
                                                Зарегистрироваться
                                            </button>
                                        </div>
                                    ) : (
                                        <div className={style.auth__text}>
                                            <p>Уже есть аккаунт?</p>
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setIsLogin(!isLogin);
                                                }}
                                            >
                                                Войти
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            ) : (
                <Navigate to={"/"} />
            )}
        </div>
    );
};

export default Auth;

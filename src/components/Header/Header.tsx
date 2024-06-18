import { Link, NavLink, useLocation } from "react-router-dom";

import ageLimit from "../../assets/age-16.svg";
import vk from "../../assets/vk.svg";
import telegram from "../../assets/telegram.svg";
import profile from "../../assets/profile.svg";
import logoutImg from "../../assets/logout.svg";
import admin from "../../assets/admin.svg";
import logo from "../../assets/footerlogo.png";

import style from "./Header.module.scss";
import { useAuth } from "../../hooks/useAuth";
import { useAppDispatch } from "../../store/hooks";
import { logout } from "../../store/user/userSlice";
import { removeTokenFromLocalStorage } from "../../helpers/localStorage.helper";
import { toast } from "react-toastify";
import { useAdmin } from "../../hooks/useAdmin";
import Time from "../Time/Time";

const Header = () => {
    const isAuth = useAuth();
    const isAdmin = useAdmin();
    const dispatch = useAppDispatch();
    const logoutHandler = () => {
        dispatch(logout());
        removeTokenFromLocalStorage("token");
        toast.success("Выход успешно выполнен");
        window.location.reload();
    };

    const navigation = [
        { title: "Главная", path: "/" },
        { title: "Новости", path: "/news" },
        { title: "Мир Байкала", path: "/journal-wob" },
        { title: "Многоликая Бурятия", path: "/mnogolikaya-buryatia" },
        { title: "Пилюля", path: "/pilyulya" },
        { title: "Ушкан", path: "/ushkan" },
        { title: "Галерея", path: "/gallery" },
        { title: "Архив", path: "/archive" },
        { title: "Книги", path: "/books" },
        { title: "О нас", path: "/about-us" },
        { title: "Прайс-лист", path: "/price-list" },
    ];

    const location = useLocation();
    if (location.pathname === "/auth") {
        return null;
    }

    return (
        <header className={style.header}>
            <div className={style.header__upper}>
                <div className={style.header__wrapper}>
                    <Time />
                    <Link to={'/'}>
                        <img src={logo} alt="" />
                    </Link>
                    <div className={style.age__limit}>
                        {isAdmin ? (
                            <Link to={"/admin-panel"}>
                                <img src={admin} alt="" />
                            </Link>
                        ) : null}
                        <Link to="https://vk.com/mirbaikal" target="_blank">
                            <img src={vk} alt="Группа вк" />
                        </Link>
                        <Link
                            to="https://t.me/+pq-9OKSoZZUxNWYy"
                            target="_blank"
                        >
                            <img src={telegram} alt="Телеграм канал" />
                        </Link>
                        <img src={ageLimit} alt="" />
                        {isAuth ? (
                            <button title="Выйти" onClick={logoutHandler}>
                                <img
                                    title="Выйти"
                                    src={logoutImg}
                                    alt="Выйти"
                                />
                            </button>
                        ) : (
                            <Link title="Войти" to={"auth"}>
                                <img title="Войти" src={profile} alt="Войти" />
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            <div className={style.header__lower}>
                <div className="container">
                    <div className={style.header__inner}>
                        <nav className={style.menu}>
                            <ul className={style.menu__list}>
                                {navigation.map((link, index) => (
                                    <li
                                        className={style.menu__item}
                                        key={index}
                                    >
                                        <NavLink
                                            className={({ isActive }) =>
                                                isActive
                                                    ? style.active
                                                    : style.menu__link
                                            }
                                            to={link.path}
                                        >
                                            {link.title}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;

import { FC } from "react";

import style from "./Error.module.scss";

import error404 from "../../assets/error.svg";
import { Link } from "react-router-dom";

const Error: FC = () => {
    return (
        <div className={style.error}>
            <h1 className={style.error__title}>
                Ошибка <br /> 404
            </h1>
            <p className={style.error__text}>Страница не найдена</p>
            <img src={error404} alt="" />
            <Link className={style.error__link} to={"/"}>Вернуться на главную страницу</Link>
        </div>
    );
};

export default Error;

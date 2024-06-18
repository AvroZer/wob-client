import { FC } from "react";

import style from "./Admin.module.scss";

import news from "../../assets/news.svg";
import photo from "../../assets/photo.svg";
import books from "../../assets/books.svg";
import { Link, Outlet, useLocation } from "react-router-dom";

const Admin: FC = () => {
    const location = useLocation();

    const isNews = location.pathname.includes("/admin-panel/add-news");
    const isGallery = location.pathname.includes("/admin-panel/add-gallery");
    // const isBook = location.pathname.includes("/admin-panel/add-book");

    if (isNews || isGallery) {
        return <Outlet />;
    }
    return (
        <div className={style.admin}>
            <div className="container">
                <div className={style.admin__inner}>
                    <Link to={"add-news"}>
                        <div className={style.card}>
                            <p className={style.card__title}>
                                Добавить новость
                            </p>
                            <div className={style.card__img}>
                                <img src={news} />
                            </div>
                        </div>
                    </Link>
                    <Link to={"add-gallery"}>
                        <div className={style.card}>
                            <p className={style.card__title}>
                                Добавить фотографию
                            </p>
                            <div className={style.card__img}>
                                <img src={photo} />
                            </div>
                        </div>
                    </Link>
                    <div className={style.card}>
                        <p className={style.card__title}>Добавить книгу</p>
                        <div className={style.card__img}>
                            <img src={books} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;

import { FC, useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { INews } from "../../../types/types";

import style from "./News.module.scss";
import { NEWS_URL } from "../../../routes/routes";
import Search from "../../../components/Search/Search";

const News: FC = () => {
    const news = useLoaderData() as INews[];
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredNews, setFilteredNews] = useState(news);

    useEffect(() => {
        const lowerCaseQuery = searchQuery.toLowerCase();
        const filtered = news.filter(
            (newsItem) =>
                newsItem.title.toLowerCase().includes(lowerCaseQuery) ||
                newsItem.annotation.toLowerCase().includes(lowerCaseQuery)
        );
        setFilteredNews(filtered);
    }, [searchQuery, news]);

    return (
        <section className={style.news}>
            <div className="container">
                <Search onSearch={setSearchQuery} />
                {filteredNews.length > 0 ? (
                    <ul className={style.news__list}>
                        {filteredNews.map((singleNews, index) => (
                            <li className={style.news__item} key={index}>
                                <article className={style.news__card}>
                                    <div className={style.news__img}>
                                        <Link to={`/news/${singleNews.id}`}>
                                            <img
                                                src={`${NEWS_URL}/${singleNews.filename}`}
                                                alt="тут должно быть изображение"
                                            />
                                        </Link>
                                    </div>
                                    <div className={style.news__content}>
                                        <h4 className={style.news__title}>
                                            {singleNews.title}
                                        </h4>
                                        <p className={style.news__desc}>
                                            {singleNews.annotation}
                                        </p>
                                        <div className={style.card__bottom}>
                                            <button className={style.news__btn}>
                                                <Link
                                                    to={`/news/${singleNews.id}`}
                                                >
                                                    Подробнее →
                                                </Link>
                                            </button>
                                            <p className={style.news__date}>
                                                {new Date(
                                                    singleNews.createdAt
                                                ).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                </article>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className={style.news__notfound}>Ничего не найдено</p>
                )}
            </div>
        </section>
    );
};

export default News;

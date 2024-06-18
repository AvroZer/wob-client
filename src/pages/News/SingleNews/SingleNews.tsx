import { FC, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { instance } from "../../../api/axios.api";
import { NEWS_URL } from "../../../routes/routes";
import { INews } from "../../../types/types";
import Markdown from "react-markdown";
import Modal from "react-modal";

import style from "./SingleNews.module.scss";

import edit from "../../../assets/edit.svg";
import trash from "../../../assets/trash.svg";
import Comment from "../Comment/Comment";
import { useAdmin } from "../../../hooks/useAdmin";

const SingleNews: FC = () => {
    const { id } = useParams<{ id: string | undefined }>();
    const [news, setNews] = useState<INews | null>(null);
    const navigate = useNavigate();
    const [allNews, setAllNews] = useState<INews[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const isAdmin = useAdmin();

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await instance.get(`/news/${id}`);
                setNews(response.data);
            } catch (err) {
                toast.error("Не удалось открыть новость");
            }
        };
        if (id) {
            fetchNews();
        }
        return () => {};
    }, [id]);

    useEffect(() => {
        const fetchAllNews = async () => {
            try {
                const response = await instance.get(`/news`);
                setAllNews(response.data);
            } catch (err) {
                toast.error("Не удалось загрузить список новостей");
            }
        };
        fetchAllNews();
    }, []);

    const findIndexById = (newsId: string) => {
        return allNews.findIndex((news) => news.id.toString() === newsId);
    };

    const goToPrevious = () => {
        if (id && allNews.length > 0) {
            const currentIndex = findIndexById(id);
            if (currentIndex > 0) {
                const prevId = allNews[currentIndex - 1].id;
                navigate(`/news/${prevId}`);
                window.scrollTo(0, 0);
            }
        }
    };

    const goToNext = () => {
        if (id && allNews.length > 0) {
            const currentIndex = findIndexById(id);
            if (currentIndex !== -1 && currentIndex < allNews.length - 1) {
                const nextId = allNews[currentIndex + 1].id;
                navigate(`/news/${nextId}`);
                window.scrollTo(0, 0);
            }
        }
    };

    if (!news) {
        return <div>Загрузка...</div>;
    }
    const currentIndex = findIndexById(id || "");

    const handleDelete = async () => {
        if (!id) return;
        try {
            await instance.delete(`/news/${id}`);
            toast.success("Новость успешно удалена");
            navigate(`/news`);
        } catch (error) {
            toast.error("Не удалось удалить новость");
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className={style.news}>
            <div className="container">
                <div className={style.news__inner}>
                    {isAdmin ? (
                        <div className={style.news__actions}>
                            <Link
                                to={`/news/edit/${id}`}
                                className={style.news__edit}
                            >
                                Редактировать <img src={edit} alt="" />
                            </Link>
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className={style.news__delete}
                            >
                                Удалить <img src={trash} alt="" />
                            </button>
                        </div>
                    ) : null}
                    <div className={style.news__title}>
                        <h2>{news.title}</h2>
                        <p className={style.news__create}>
                            Дата публикации:{" "}
                            {new Date(news.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                    <div className={style.news__img}>
                        <img
                            src={`${NEWS_URL}/${news.filename}`}
                            alt="тут должно быть изображение"
                        />
                    </div>
                    <p className={style.news__annotation}>{news.annotation}</p>
                    <div className={style.news__description}>
                        <Markdown>{news.description}</Markdown>
                    </div>
                    <div className={style.news__navigation}>
                        {currentIndex > 0 && (
                            <button
                                className={style.previous}
                                onClick={goToPrevious}
                            >
                                Назад
                            </button>
                        )}
                        {currentIndex < allNews.length - 1 && (
                            <button className={style.next} onClick={goToNext}>
                                Вперёд
                            </button>
                        )}
                    </div>
                </div>
                <Comment />
            </div>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                className={style.modal}
                preventScroll={true}
                style={{
                    overlay: {
                        backgroundColor: "rgba(76, 76, 76, 0.7)",
                    },
                }}
            >
                <h2>Вы уверены, что хотите удалить эту новость?</h2>
                <div className={style.modal__buttons}>
                    <button onClick={handleDelete} className={style.delete}>
                        Удалить
                    </button>
                    <button onClick={closeModal} className={style.cancel}>
                        Отмена
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default SingleNews;

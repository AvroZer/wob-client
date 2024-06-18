import { FC, FormEvent, useEffect, useState } from "react";
import { instance } from "../../../api/axios.api";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { INews } from "../../../types/types";

import style from "./Comment.module.scss";
import profile from "../../../assets/profile.svg";
import { useDispatch } from "react-redux";
import { addComment } from "../../../store/comment/commentSlice";
import { useAuth } from "../../../hooks/useAuth";
import { useLogin } from "../../../hooks/useLogin";
import { useAdmin } from "../../../hooks/useAdmin";
import Modal from "react-modal";

const Comment: FC = () => {
    const [text, setText] = useState<string>("");
    const [news, setNews] = useState<INews | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [commentId, setCommentId] = useState(null);
    const dispatch = useDispatch();
    const { id } = useParams();
    const isAuth = useAuth();
    const login = useLogin();
    const isAdmin = useAdmin();

    useEffect(() => {
        const toastMessage = localStorage.getItem("toastMessage");
        if (toastMessage) {
            toast.success(toastMessage);
            localStorage.removeItem("toastMessage");
        }
    }, []);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await instance.get(`/news/${id}`);
                setNews(response.data);
            } catch (error) {
                toast.error("Не загрузить новость");
            }
        };
        if (id) {
            fetchNews();
        }
    }, [id]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!id || !login) return;
        const requestData = {
            text: text,
            login: login,
        };
        try {
            const response = await instance.post(`/comment/${id}`, requestData);
            dispatch(addComment({ ...response.data, login }));
            setText("");
            localStorage.setItem(
                "toastMessage",
                "Комментарий успешно добавлен"
            );
            window.location.reload();
        } catch (error) {
            toast.error("Не удалось добавить комментарий");
        }
    };

    const handleDeleteComment = async (commentId: number) => {
        setCommentId(commentId);
        setIsOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!commentId) return;
        try {
            await instance.delete(`/comment/${commentId}`);
            localStorage.setItem("toastMessage", "Комментарий успешно удалён");
            window.location.reload();
        } catch (error) {
            toast.error("Не удалось удалить новость");
        }
    };

    const handleCancelDelete = () => {
        setIsOpen(false);
    };

    return (
        <div className={style.comment}>
            <h2 className={style.comment__amount}>
                Комментариев ({news?.comment.length || 0})
            </h2>
            {isAuth ? (
                <form className={style.comment__form} onSubmit={handleSubmit}>
                    <textarea
                        value={text}
                        name="text"
                        className={style.comment__input}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Введите ваш комментарий..."
                        required
                    />
                    <div className={style.comment__actions}>
                        <button className={style.comment__button} type="submit">
                            Оставить комментарий
                        </button>
                    </div>
                </form>
            ) : (
                "Чтобы оставить комментарий вы должны войти в аккаунт"
            )}

            <ul className={style.comment__list}>
                {news?.comment
                    .slice()
                    .reverse()
                    .map((comment) => (
                        <li key={comment.id} className={style.comment__item}>
                            <img src={profile} alt="" />
                            <div className={style.comment__content}>
                                <p className={style.comment__date}>
                                    {comment.user.login + " "}
                                    {new Date(
                                        comment.createdAt
                                    ).toLocaleDateString()}{" "}
                                    {new Date(
                                        comment.createdAt
                                    ).toLocaleTimeString()}
                                </p>
                                <p className={style.comment__text}>
                                    {comment.text}
                                </p>
                            </div>
                            {isAdmin && (
                                <button
                                    className={style.comment__delete}
                                    onClick={() =>
                                        handleDeleteComment(comment.id)
                                    }
                                >
                                    Удалить
                                </button>
                            )}
                        </li>
                    ))}
            </ul>
            <Modal
                isOpen={isOpen}
                onRequestClose={handleCancelDelete}
                className={style.modal}
                preventScroll={true}
                style={{
                    overlay: {
                        backgroundColor: "rgba(76, 76, 76, 0.7)",
                    },
                }}
            >
                <h2>Вы уверены, что хотите удалить комментарий?</h2>
                <div className={style.modal__buttons}>
                    <button
                        onClick={handleConfirmDelete}
                        className={style.delete}
                    >
                        Удалить
                    </button>
                    <button
                        onClick={handleCancelDelete}
                        className={style.cancel}
                    >
                        Отмена
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default Comment;

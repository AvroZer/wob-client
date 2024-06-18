import {
    FC,
    FormEvent,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";
import { Link, redirect, useLoaderData, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { instance } from "../../../api/axios.api";
import { ICategory } from "../../../types/types";
import SimpleMDE from "react-simplemde-editor";

import "easymde/dist/easymde.min.css";
import style from "./EditNews.module.scss";
import { useAdmin } from "../../../hooks/useAdmin";

const EditNews: FC = () => {
    const { id } = useParams<{ id: string | undefined }>();
    const categories = useLoaderData() as ICategory[];
    const navigate = useNavigate();

    const [title, setTitle] = useState<string>("");
    const [annotation, setAnnotation] = useState<string>("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState<string>("");
    const isAdmin = useAdmin();

    useEffect(() => {
        if (id) {
            instance.get(`/news/${id}`).then(({ data }) => {
                setTitle(data.title);
                setAnnotation(data.annotation);
                setDescription(data.description);
                setCategory(data.category);
                console.log(data);
            });
        }
    }, [id]);

    const onChange = useCallback((description: string) => {
        setDescription(description);
    }, []);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const options: any = useMemo(
        () => ({
            spellChecker: false,
            autofocus: true,
            placeholder: "Введите текст...",
            status: false,
            autosave: {
                uniqueId: "MyUniqueID",
                enabled: true,
                delay: 1000,
            },
            toolbar: [
                "bold",
                "italic",
                "heading",
                "strikethrough",
                "|",
                "quote",
                "unordered-list",
                "ordered-list",
                "link",
                "|",
                "horizontal-rule",
                "preview",
                "side-by-side",
                "fullscreen",
            ],
        }),
        []
    );

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!title) {
            toast.error("Введите название статьи");
            return;
        }
        if (!annotation) {
            toast.error("Введите краткое описание");
            return;
        }
        if (!description) {
            toast.error("Напишите статью");
            return;
        }
        if (!category) {
            toast.error("Выберите категорию");
            return;
        }

        const requestData = {
            title: title,
            annotation: annotation,
            description: description,
            category: category,
        };
        try {
            await instance.patch(`/news/${id}`, requestData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            toast.success("Новость отредактирована");
            navigate(`/news/${id}`);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            toast.error(
                err.response.data.message ||
                    "Не удалось отредактировать новость"
            );
        }
    };
    return (
        <>
            {isAdmin ? (
                <div className={style.editNews}>
                    <div className="container">
                        <div className={style.editNews__inner}>
                            <div className={style.back__link}>
                                <Link to={".."}>↩ Назад</Link>
                            </div>
                            <form
                                className={style.editNews__form}
                                onSubmit={handleSubmit}
                            >
                                <input
                                    type="text"
                                    className={style.editNews__title}
                                    placeholder="Введите название статьи..."
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                                <div className={style.editNews__choice}>
                                    <select
                                        value={category}
                                        className={style.editNews__categories}
                                        onChange={(e) =>
                                            setCategory(e.target.value)
                                        }
                                    >
                                        <option value={category.id} hidden>
                                            {category.title}
                                        </option>
                                        {categories.map((category, index) => (
                                            <option
                                                key={index}
                                                value={category.id}
                                            >
                                                {category.title}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <input
                                    type="text"
                                    className={style.editNews__annotation}
                                    placeholder="Введите краткое описание..."
                                    value={annotation}
                                    onChange={(e) =>
                                        setAnnotation(e.target.value)
                                    }
                                />
                                <div className={style.editor}>
                                    <SimpleMDE
                                        value={description}
                                        onChange={onChange}
                                        options={options}
                                    />
                                </div>

                                <button
                                    className={style.editNews__btn}
                                    type="submit"
                                >
                                    Сохранить
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            ) : redirect("")}
        </>
    );
};

export default EditNews;

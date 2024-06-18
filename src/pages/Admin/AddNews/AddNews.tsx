import { FC, FormEvent, useCallback, useMemo, useRef, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import { instance } from "../../../api/axios.api";
import SimpleMDE from "react-simplemde-editor";
import { ICategory } from "../../../types/types";

import "easymde/dist/easymde.min.css";
import style from "./AddNews.module.scss";

import Photo from "../../../assets/file-photo.svg";

const AddNews: FC = () => {
    const categories = useLoaderData() as ICategory[];

    const [title, setTitle] = useState<string>("");
    const [annotation, setAnnotation] = useState<string>("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState<string>("");
    const [file, setFile] = useState<File | null>(null);

    const [imageUrl, setImageUrl] = useState<string | undefined>("");

    const inputFileRef = useRef<HTMLInputElement>(null);

    const onClickRemoveImg = () => {
        setFile(null);
        setImageUrl("");
    };

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
        if (!file) {
            toast.error("Выберите фотографию");
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("annotation", annotation);
        formData.append("description", description);
        formData.append("category", category);
        formData.append("file", file);

        try {
            await instance.post("/news", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            toast.success("Новость опубликована");
            setTitle("");
            setAnnotation("");
            setDescription("");
            setCategory("");
            setFile(null);
            setImageUrl("");
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            toast.error(err.response.data.message);
        }
    };

    return (
        <div className={style.addNews}>
            <div className="container">
                <div className={style.addNews__inner}>
                    <div className={style.back__link}>
                        <Link to={".."}>↩ Назад</Link>
                    </div>
                    <form
                        className={style.addNews__form}
                        onSubmit={handleSubmit}
                    >
                        <input
                            type="text"
                            className={style.addNews__title}
                            placeholder="Введите название статьи..."
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <div className={style.addNews__choice}>
                            <select
                                value={category}
                                className={style.addNews__categories}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="" hidden>
                                    Выберите категорию
                                </option>
                                {categories.map((category, index) => (
                                    <option key={index} value={category.id}>
                                        {category.title}
                                    </option>
                                ))}
                            </select>

                            <button
                                onClick={() => inputFileRef.current?.click()}
                                className={style.addNews__btn}
                            >
                                Добавить фотографию
                                <img src={Photo} alt="" />
                            </button>
                            <input
                                type="file"
                                name="file"
                                ref={inputFileRef}
                                onChange={(e) => {
                                    const selectedFile =
                                        e.target.files && e.target.files[0];
                                    if (selectedFile) {
                                        setFile(selectedFile);
                                        setImageUrl(
                                            URL.createObjectURL(selectedFile)
                                        );
                                    }
                                }}
                                hidden
                            />
                            {file && (
                                <>
                                    <button
                                        onClick={onClickRemoveImg}
                                        className={style.addNews__btn}
                                    >
                                        Удалить
                                    </button>
                                    <img src={imageUrl} alt="" />
                                </>
                            )}
                        </div>
                        <input
                            type="text"
                            className={style.addNews__annotation}
                            placeholder="Введите краткое описание..."
                            value={annotation}
                            onChange={(e) => setAnnotation(e.target.value)}
                        />
                        <div className={style.editor}>
                            <SimpleMDE
                                value={description}
                                onChange={onChange}
                                options={options}
                            />
                        </div>

                        <button className={style.addNews__btn} type="submit">
                            Опубликовать
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddNews;

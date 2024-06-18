import { FC, FormEvent, useRef, useState } from "react";

import style from "./AddGallery.module.scss";
import { Link } from "react-router-dom";

import upload from "../../../assets/upload.svg";
import { toast } from "react-toastify";
import { instance } from "../../../api/axios.api";

const AddGallery: FC = () => {
    const [title, setTitle] = useState<string>("");
    const [file, setFile] = useState<File | null>(null);
    const inputFileRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!file) {
            toast.error("Выберите фотографию");
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("file", file);

        try {
            await instance.post("/gallery", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            toast.success("Фотография добавлена в галерею");
            setTitle("");
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            toast.error(
                err.response.data.message || "Не удалось загрузить фотографию"
            );
        }
    };

    return (
        <div className={style.addGallery}>
            <div className="container">
                <div className={style.addGallery__inner}>
                    <div className={style.back__link}>
                        <Link to={".."}>↩ Назад</Link>
                    </div>
                    <form
                        onSubmit={handleSubmit}
                        className={style.addGallery__form}
                    >
                        <input
                            type="text"
                            className={style.addGallery__title}
                            placeholder="Введите название фотографии..."
                            name="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <div
                            className={style.addGallery__upload}
                            onClick={() => inputFileRef.current?.click()}
                        >
                            <img src={upload} alt="" />
                            <p>Загрузите изображение</p>
                        </div>
                        <input
                            name="file"
                            hidden
                            type="file"
                            ref={inputFileRef}
                            onChange={(e) =>
                                setFile(e.target.files?.[0] || null)
                            }
                        />
                        <button className={style.addGallery__btn} type="submit">
                            Загрузить
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddGallery;

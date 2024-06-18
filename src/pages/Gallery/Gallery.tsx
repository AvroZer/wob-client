import { FC, useEffect, useState } from "react";
import Modal from "react-modal";
import { useLoaderData, useNavigate } from "react-router-dom";
import { IGallery } from "../../types/types";
import { instance } from "../../api/axios.api";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { selectCount } from "../../store/user/userSlice";

import style from "./Gallery.module.scss";

import trash from "../../assets/trash.svg";

const Gallery: FC = () => {
    const { isAdmin } = useSelector(selectCount);
    const galleryList = useLoaderData() as IGallery[];
    const navigate = useNavigate();

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (!modalIsOpen) return;
            switch (event.key) {
                case "ArrowLeft":
                    goToPrevious();
                    break;
                case "ArrowRight":
                    goToNext();
                    break;
                case "Escape":
                    closeModal();
                    break;
                default:
                    break;
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [modalIsOpen, selectedIndex]);

    const openModal = (index: number) => {
        setSelectedIndex(index);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsClosing(false);
            setModalIsOpen(false);
        }, 300);
    };

    const goToNext = () => {
        setSelectedIndex((prevIndex) => (prevIndex + 1) % galleryList.length);
    };

    const goToPrevious = () => {
        setSelectedIndex((prevIndex) =>
            prevIndex === 0 ? galleryList.length - 1 : prevIndex - 1
        );
    };

    const deletePhoto = async (id: number) => {
        try {
            await instance.delete(`/gallery/${id}`);
            toast.success("фотография успешно удалена");
            navigate(`/gallery`);
            closeModal();
        } catch (error) {
            toast.error("Не удалось удалить фотографию");
        }
    };

    return (
        <section className={style.gallery}>
            <div className="container">
                <div className={style.gallery__inner}>
                    <ul className={style.gallery__list}>
                        {galleryList.map((photo, index) => (
                            <li
                                className={style.gallery__item}
                                key={index}
                                onClick={() => openModal(index)}
                            >
                                <img
                                    className={style.gallery__img}
                                    src={`http://localhost:3000/world-of-baikal/gallery/${photo.filename}`}
                                    alt={photo.title}
                                />
                                <p className={style.gallery__title}>
                                    {photo.title}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Image Modal"
                className={`${style.modal} ${isClosing ? style.modalHide : ""}`}
                style={{
                    overlay: {
                        backgroundColor: "rgba(32, 32, 32, 0.69)",
                    },
                }}
            >
                {galleryList[selectedIndex] && (
                    <div className={style.box}>
                        <img
                            src={`http://localhost:3000/world-of-baikal/gallery/${galleryList[selectedIndex].filename}`}
                            alt={galleryList[selectedIndex].title}
                        />
                        <p className={style.box__title}>
                            {galleryList[selectedIndex].title}
                        </p>

                        {isAdmin && (
                            <button
                                onClick={() => deletePhoto(galleryList[selectedIndex].id)}
                                className={style.deleteButton}
                            >
                                <img src={trash} alt="" />
                                Удалить
                            </button>
                        )}
                    </div>
                )}
                <div className={style.modal__buttons}>
                    <button onClick={goToPrevious}>&#10094;</button>
                    <button onClick={goToNext}>&#10095;</button>
                </div>
                <button className={style.modal__close} onClick={closeModal}>
                    &#10006;
                </button>
            </Modal>
        </section>
    );
};

export default Gallery;

import style from "./Footer.module.scss";

import bottomLogo from "../../assets/footerlogo.png";
import { useLocation } from "react-router-dom";

const Footer = () => {
    const formatter = new Intl.DateTimeFormat("ru-RU", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
    const date = new Date();
    const formattedDate = formatter.format(date);
    const formattedTime = formattedDate.replace(" г.", "");

    const year = new Intl.DateTimeFormat("ru-RU", {
        year: "numeric",
    });
    const formattedDateYear = year.format(date);
    const formattedYear = formattedDateYear.replace(" г.", "");

    const location = useLocation();
    const isAdminPanel = location.pathname.includes("admin-panel");
    if(isAdminPanel) return null;
    
    if (location.pathname === "/auth") {
        return null;
    }
    return (
        <footer className={style.footer}>
            <div className="container">
                <div className={style.footer__inner}>
                    <div className={style.footer__upper}>
                        <div className={style.footer__logo}>
                            <img
                                className={style.logo}
                                src={bottomLogo}
                                alt=""
                            />
                        </div>
                        <p className={style.footer__copyright}>
                            © 2003 - {formattedYear} Издательский дом «Экос»
                        </p>
                        <p className={style.footer__date}>{formattedTime}</p>
                        <div className={style.text}>
                            <p>
                                Адрес редакции: 670000, Республика Бурятия, г.
                                Улан-Удэ, ул. Каландаришвили, д. 23, оф. 24, 25.
                            </p>
                            <p>
                                Телефон редакции: (3012) 21-48-89, факс (3012)
                                21-85-65.
                            </p>
                            <p>
                                Электронная почта редакции: ludvikom@yandex.ru
                            </p>
                        </div>
                    </div>
                    <div className={style.footer__lower}>
                        <p className={style.upper__text}>
                            Сетевое издание World of Baikal* зарегистрировано
                            Федеральной службой по надзору в сфере связи,
                            информационных технологий и массовых коммуникаций,
                            регистрационный номер Эл № ФС77-80878 от 23.04.2021
                            г.
                        </p>
                        <p className={style.upper__text}>
                            Учредитель: ООО «Издательский Дом «ЭКОС». Главный
                            редактор: Шишмарева Людмила Павловна *World of
                            Baikal – Мир Байкала
                        </p>
                        <div className={style.middle__text}>
                            <p>
                                Журнал «Мир Байкала» зарегистрирован Федеральной
                                службой по надзору в сфере связи, информационных
                                технологий и массовых коммуникаций -
                                регистрационный номер ПИ №ФС77-78601 от 20 июля
                                2020 г.
                            </p>
                            <p>
                                Журнал «Пилюля».Свидетельство о регистрации ПИ №
                                ТУ03-00330 от 28.02.2014 г., выдано Управлением
                                Федеральной службы по надзору в сфере связи,
                                информационных технологий и массовых
                                коммуникаций по Республике Бурятия.
                            </p>
                            <p>
                                Журнал «Ушкан».Свидетельство о регистрации ПИ
                                №ФС77-35421 от 20.02.2009 г., выдано Управлением
                                Федеральной службы по надзору в сфере связи,
                                информационных технологий и массовых
                                коммуникаций по Республике Бурятия.
                            </p>
                        </div>
                        <p className={style.bottom__text}>
                            Любое использование либо копирование материалов или
                            подборки материалов сайта, элементовдизайна и
                            оформления может осуществляться лишь с разрешения
                            автора (правообладателя) и только при наличии ссылки
                            на www.world-of-baikal.ru.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

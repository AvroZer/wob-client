import { FC, useEffect, useState } from "react";

import style from "./Time.module.scss";

const Time: FC = () => {
    function useDateTime() {
        const [currentTime, setCurrentTime] = useState<string>("");
        const [currentDate, setCurrentDate] = useState<string>("");

        useEffect(() => {
            const intervalId = setInterval(() => {
                const now = new Date();
                const hours = addLeadingZero(now.getHours());
                const minutes = addLeadingZero(now.getMinutes());
                const seconds = addLeadingZero(now.getSeconds());
                const timeString = `${hours}:${minutes}:${seconds}`;
                setCurrentTime(timeString);
            }, 1000);

            return () => clearInterval(intervalId);
        }, []);

        useEffect(() => {
            const intervalId = setInterval(() => {
                const now = new Date();
                const options: Intl.DateTimeFormatOptions = {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                };
                const dateString = capitalizeFirstLetter(
                    now.toLocaleDateString("ru-RU", options).replace("г.", "")
                );
                setCurrentDate(dateString);
            }, 1000);

            return () => clearInterval(intervalId);
        }, []);

        const addLeadingZero = (value: number): string => {
            return value < 10 ? `0${value}` : `${value}`;
        };

        const capitalizeFirstLetter = (weekday: string): string => {
            return weekday.charAt(0).toUpperCase() + weekday.slice(1);
        };

        return { currentTime, currentDate };
    }
    const { currentTime, currentDate } = useDateTime();
    return (
        <div className={style.header__dates}>
            <div className={style.header__date}>{currentDate}</div>
            <span className={style.header__time}>{currentTime}</span>
        </div>
    );
};

export default Time;

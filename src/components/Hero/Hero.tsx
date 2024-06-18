import style from "./Hero.module.scss";

import leftLogo from "../../assets/leftlogo.svg";
import logo from "../../assets/logo.svg";
import pilyulya from "../../assets/pilula.png";
import ushkan from "../../assets/ushkan.png";
import { useLocation } from "react-router-dom";

const Hero = () => {
    const location = useLocation();

    const isNewsPage =
        location.pathname === "/" ||
        location.pathname === "/mnogolikaya-buryatia" ||
        location.pathname === "/news" ||
        location.pathname === "/journal-wob";
    const isPilyulyaPage = location.pathname === "/pilyulya";
    const isUshkanPage = location.pathname === "/ushkan";

    if (isNewsPage) {
        return (
            <section className={style.hero}>
                <div className="container">
                    <div className={style.hero__images}>
                        <img className={style.left} src={leftLogo} alt="" />
                        <img className={style.right} src={logo} alt="" />
                    </div>
                </div>
            </section>
        );
    }

    if (isPilyulyaPage) {
        return (
            <section className={style.hero}>
                <div className="container">
                    <div className={style.hero__inner}>
                        <div className={style.hero__img}>
                            <img className={style.left} src={pilyulya} alt="" />
                        </div>
                    </div>
                </div>
            </section>
        );
    }
    if (isUshkanPage) {
        return (
            <section className={style.hero}>
                <div className="container">
                    <div className={style.hero__inner}>
                        <div className={style.hero__img}>
                            <img
                                className={style.left}
                                src={ushkan}
                                alt=""
                                style={{ height: "170px" }}
                            />
                        </div>
                    </div>
                </div>
            </section>
        );
    }
};

export default Hero;

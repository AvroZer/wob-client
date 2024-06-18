import { FC } from "react";
import Header from "../../components/Header/Header";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Hero from "../../components/Hero/Hero";
import Auth from "../Auth/Auth";
import style from './Layout.module.scss';

const Layout: FC = () => {
    const location = useLocation();
    const isAuthPage = location.pathname === "/auth";

    return (
        <>
            {isAuthPage ? (
                <div className={style.wrapper}>
                    <Auth />
                </div>
            ) : (
                <div className="wrapper">
                    <Header />
                    <div>
                        <Hero />
                        <Outlet />
                    </div>
                    <Footer />
                </div>
            )}
        </>
    );
};

export default Layout;

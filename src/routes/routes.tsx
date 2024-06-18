import { Outlet, createBrowserRouter } from "react-router-dom";
import Layout from "../pages/Layout/Layout";
import Error from "../pages/Error/Error";
import Home from "../pages/Home/Home";
import News from "../pages/News/NewsList/News";
import Categories from "../pages/Categories/Categories";
import Auth from "../pages/Auth/Auth";
import About from "../pages/About/About";
import WorldOfBaikal from "../pages/WorldOfBaikal/WorldOfBaikal";
import MnogolikayaBuryatia from "../pages/MnogolikayaBuryatia/MnogolikayaBuryatia";
import Pilyulya from "../pages/Pilyulya/Pilyulya";
import Ushkan from "../pages/Ushkan/Ushkan";
import Gallery from "../pages/Gallery/Gallery";
import Archive from "../pages/Archive/Archive";
import Books from "../pages/Books/Books";
import PriceList from "../pages/PriceList/PriceList";
import Admin from "../pages/Admin/Admin";
import AddNews from "../pages/Admin/AddNews/AddNews";

import { ProtectedRoute } from "../components/ProtectedRoute/ProtectedRoute";
import { newsLoader } from "../pages/Admin/Loader/newsLoader";
import { categoriesLoader } from "../pages/Admin/Loader/categoriesLoader";
import AddGallery from "../pages/Admin/AddGallery/AddGallery";
import { galleryLoader } from "../pages/Admin/Loader/galleryLoader";
import SingleNews from "../pages/News/SingleNews/SingleNews";
import EditNews from "../pages/News/EditNews/EditNews";

export const NEWS_URL = "http://localhost:3000/world-of-baikal/news";
export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <Error />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "news",
                element: <Outlet />,
                children: [
                    {
                        path: "",
                        loader: newsLoader,
                        element: <News />,
                    },
                    {
                        path: ":id",
                        element: <SingleNews />,
                    },
                ],
            },
            {
                path: "news/edit/:id",
                loader: categoriesLoader,
                element: <EditNews />,
            },
            {
                path: "journal-wob",
                element: <WorldOfBaikal />,
            },
            {
                path: "mnogolikaya-buryatia",
                element: <MnogolikayaBuryatia />,
            },
            {
                path: "pilyulya",
                element: <Pilyulya />,
            },
            {
                path: "ushkan",
                element: <Ushkan />,
            },
            {
                path: "gallery",
                loader: galleryLoader,
                element: <Gallery />,
            },
            {
                path: "archive",
                element: <Archive />,
            },
            {
                path: "books",
                element: <Books />,
            },
            {
                path: "about-us",
                element: <About />,
            },
            {
                path: "price-list",
                element: <PriceList />,
            },

            //что-то другое
            {
                path: "categories",
                element: <Categories />,
            },
            {
                path: "auth",
                element: <Auth />,
            },
            {
                path: "admin-panel",
                element: (
                    <ProtectedRoute>
                        <Admin />
                    </ProtectedRoute>
                ),
                children: [
                    {
                        path: "add-news",
                        loader: categoriesLoader,
                        element: <AddNews />,
                    },
                    {
                        path: "add-gallery",
                        element: <AddGallery />,
                    },
                ],
            },
        ],
    },
]);

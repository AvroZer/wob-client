import { FC } from "react";

import style from "./Search.module.scss";

interface SearchProps {
    onSearch: (query: string) => void;
}

const Search: FC<SearchProps> = ({ onSearch }) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onSearch(e.target.value);
    };

    return (
        <search className={style.header__search}>
            <form autoComplete="off" onSubmit={(e) => e.preventDefault()}>
                <input
                    type="search"
                    placeholder="Введите название новости..."
                    onChange={handleInputChange}
                />
            </form>
        </search>
    );
};

export default Search;

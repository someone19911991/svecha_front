import React, {FC} from 'react';
import {ICategory} from "../../interfaces";
import {NavLink} from "react-router-dom";
import {backURL} from "../../consts";
import {useTranslation} from "react-i18next";

interface ICategoryProps {
    category: ICategory
}

const Category: FC<ICategoryProps> = ({category}) => {
    const {t} = useTranslation()

    return (
        <div className="category">
            <div className="category_img">
                <NavLink title={t(`categories.${category.name_}`) || ''} to={`products/${category.name_}`}>
                    <img src={`${backURL}/${category.img}`}/>
                    <p className="category_name">{t(`categories.${category.name_}`)}</p>
                </NavLink>
            </div>
        </div>
    );
};

export default Category;
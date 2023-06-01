import React, {FC} from 'react';
import {ICategory} from "../../interfaces";
import {NavLink} from "react-router-dom";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {backURL} from "../../consts";

interface ICategoryProps {
    category: ICategory
}

const Category: FC<ICategoryProps> = ({category}) => {
    return (
        <div className="category">
            <div className="category_img">
                <NavLink title={category.name} to={`products/${category.name_}`}>
                    <LazyLoadImage
                        alt="Category name"
                        effect="blur"
                        src={
                            category.img.startsWith('http')
                                ? category.img
                                : `${backURL}/${category.img}`
                        }
                    />
                    <p className="category_name">{category.name}</p>
                </NavLink>
            </div>
        </div>
    );
};

export default Category;
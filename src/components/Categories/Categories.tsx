import React, {useRef} from 'react'
import { useGetCategoriesQuery } from '../../features/categories/categoriesApiSlice'
import Category from "./Category";

const Categories = () => {
    const categoriesRef = useRef<HTMLDivElement | null>(null)
    const { data: categories } = useGetCategoriesQuery()

    return (
        <>
            {!!categories?.length ? (
                <div className="white">
                    <div ref={categoriesRef} id="categories" className="categories app_container">
                        {categories.map((category) => {
                            return <Category key={category.category_id} category={category}/>
                        })}
                    </div>
                </div>
            ) : (
                <div>No Categories found</div>
            )}
        </>
    )
}

export default Categories

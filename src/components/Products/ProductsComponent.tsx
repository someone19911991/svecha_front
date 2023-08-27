import React, {FC, useEffect, useState} from 'react'
import Card from '../Card/Card'
import './products.css'
import { useAppDispatch, useAppSelector} from '../../hooks/redux'
import Modal from '../Modal/Modal'
import CompareProduct from '../CompareProduct/CompareProduct'
import {useParams} from "react-router-dom";
import Compare from "../Compare/Compare";
import Pagination from "../Pagination/Pagination";
import {IProduct} from "../../interfaces";
import no_product from "../../imgs/no_product.png"
import {useLocation} from "react-router-dom";
import {categoryNames} from "../../consts";

const ProductsComponent: FC<{in_category?: boolean, isSuccess?: boolean}> = ({in_category= false, isSuccess}) => {
    const location = useLocation()
    const pName = location.pathname.split('/')
    const pageName = pName[pName.length - 1]
    const pageItemsCount = 6
    const params = useParams()
    const compareActive = Boolean(params.category && !params.product_id)
    const { filteredProducts } = useAppSelector((state) => state.products)
    const [open, setOpen] = useState(false)
    const { products: compareProducts } = useAppSelector(
        (state) => state.compare
    )

    const [activePage, setActivePage] = useState(1)
    const [filterActiveProducts, setFilterActiveProducts] = useState<Array<IProduct>>([])
    const {paginationActivePage} = useAppSelector(state => state.products)

    useEffect(() => {
        if(filteredProducts.length){
            let start = (paginationActivePage[pageName] ? (paginationActivePage[pageName] - 1) : (activePage - 1)) * pageItemsCount
            const end = start + pageItemsCount
            const productsToSet = filteredProducts.slice(start, end)
            setFilterActiveProducts(productsToSet)
        }

    }, [activePage, filteredProducts, paginationActivePage])

    return (
        <div className="products_wrapper app_container">
            {!!compareProducts.length && (
                <Modal open={open} onClose={() => setOpen(false)}>
                    <div className="compare-products">
                        {compareProducts.map((compareProduct) => (
                            <CompareProduct
                                key={compareProduct.product_id}
                                product={compareProduct}
                            />
                        ))}
                    </div>
                </Modal>
            )}
            {!!filteredProducts.length && isSuccess ? (
                <>
                    <div className={`products ${in_category ? 'in_category' : ''}`}>
                        {filterActiveProducts.map((product: any) => (
                            <Card
                                key={product.product_id}
                                product={product}
                                compareActive={compareActive}
                            />
                        ))}
                    </div>
                    {(filteredProducts.length > pageItemsCount) && <Pagination pageItemsCount={pageItemsCount} productsCount={filteredProducts.length}
                                 activePage={activePage} setActivePage={setActivePage}/>}
                </>

            ) : (
                <div className="no_product"><img src={no_product} /></div>
            )}
            {!!(compareActive && compareProducts.length) && <Compare/>}
        </div>
    )
}

export default ProductsComponent

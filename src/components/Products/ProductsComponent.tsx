import React, {FC, useState} from 'react'
import Card from '../Card/Card'
import './products.css'
import { useAppSelector} from '../../hooks/redux'
import Modal from '../Modal/Modal'
import CompareProduct from '../CompareProduct/CompareProduct'
import {useParams} from "react-router-dom";
import Compare from "../Compare/Compare";

const ProductsComponent: FC = () => {
    const params = useParams()
    const compareActive = Boolean(params.category && !params.product_id)
    const { filteredProducts } = useAppSelector((state) => state.products)
    const [open, setOpen] = useState(false)
    const { products: compareProducts } = useAppSelector(
        (state) => state.compare
    )

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
            {!!filteredProducts.length ? (
                <div className="products">
                    {filteredProducts.map((product: any) => (
                        <Card
                            key={product.product_id}
                            product={product}
                            compareActive={compareActive}
                        />
                    ))}
                </div>
            ) : (
                <div>No Products available</div>
            )}
            {!!(compareActive && compareProducts.length) && <Compare/>}
        </div>
    )
}

export default ProductsComponent

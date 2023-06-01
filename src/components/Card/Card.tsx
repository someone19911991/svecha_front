import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import { IProduct } from '../../interfaces'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { backURL } from '../../consts'
import './card.css'
import { addToCart } from '../../features/cart/cartSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { NavLink } from 'react-router-dom'
import { addRemoveCompareProduct } from '../../features/compare/compareSlice'
import useCartProductsCount from '../../hooks/useCartProductsCount'
import {TbCurrencyDram} from "react-icons/tb"

interface ICardProps {
    product: IProduct
    compareActive: boolean
}

const Card: FC<ICardProps> = ({ product, compareActive }) => {
    const { cart } = useAppSelector((state) => state)
    const [productType, setProductType] = useState('original')
    const { products: compareProducts } = useAppSelector(
        (state) => state.compare
    )
    const checked = !!compareProducts.find(
        (productItem) => productItem.product_id === product.product_id
    )
    const [productCount_, setProductCount] = useState<{
        original: number
        copy: number
    }>({ original: 0, copy: 0 })
    const {
        productCount,
        btnDisabled,
        countBtnDisabled,
        inputDisabled,
        count,
    } = useCartProductsCount({
        cart,
        productType,
        product,
        productCount_,
        product_id: product.product_id,
    })

    const dispatch = useAppDispatch()

    const { brand, model, detail_number, img, price_original, price_copy } = product

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const inputNumber = +e.target.value
        if (productType === 'original') {
            setProductCount({ ...productCount, original: inputNumber })
        } else {
            setProductCount({ ...productCount, copy: inputNumber })
        }
    }

    const handleCompareChange = () => {
        dispatch(addRemoveCompareProduct({ product }))
    }

    const handleAddProduct = () => {
        if (
            (productType === 'original' && productCount.original === 0) ||
            (productType === 'copy' && productCount.copy === 0)
        ) {
            return
        }
        dispatch(
            addToCart({
                count_original:
                    productType === 'original' ? productCount.original : 0,
                count_copy: productType === 'copy' ? productCount.copy : 0,
                product,
                product_id: product.product_id,
            })
        )
    }

    useEffect(() => {
        if (product) {
            const cartProduct = cart.products.find(
                (pr) => pr.product_id === product.product_id
            )
            if (cartProduct) {
                setProductCount({
                    original: cartProduct?.count_original || 0,
                    copy: cartProduct?.count_copy || 0,
                })
            } else {
                if (productType === 'original') {
                    setProductCount({ ...productCount_, copy: 0 })
                } else if (productType === 'copy') {
                    setProductCount({ ...productCount_, original: 0 })
                }
            }
        }
    }, [productType, product])

    return (
        <div className="card">
            <p className="product_brand">
                <span>Brand</span>: {brand}
            </p>
            <p className="product_model">
                <span>Model</span>: {model}
            </p>
            <p className="product_detail_number">
                <span>Detail Number</span>: {detail_number}
            </p>
            <div className="product_img">
                <NavLink
                    key={product.product_id}
                    to={`/products/${product.category_name}/${product.product_id}`}
                >
                    {/*<LazyLoadImage*/}
                    {/*    alt="ProductComponent image"*/}
                    {/*    effect="blur"*/}
                    {/*    src={`${*/}
                    {/*        img && img.startsWith('http') ? '' : backURL + '/'*/}
                    {/*    }${img}`}*/}
                    {/*/>*/}
                    <img src={`${backURL}/${img}`}/>
                    {!!product.discount && <span className="product_discount">-{product.discount}%</span>}
                </NavLink>
            </div>
            {!!product.count_copy && (
                <div className="product_price">
                    <p className="product_price_text">
                        <span>Price</span>: <span className="product_price_marked">{productType === 'original' ? price_original : price_copy}</span><TbCurrencyDram className="product_price_dram"/>
                    </p>
                    <div className="price_types_container">
                        <div className="price_type">
                            <label htmlFor="original_product">Original</label>
                            <input
                                id="original_product"
                                type="radio"
                                checked={productType === 'original'}
                                value={'original'}
                                onChange={() => {
                                    setProductType('original')
                                }}
                            />
                        </div>
                        <div className="price_type">
                            <label htmlFor="copy_product">Copy</label>
                            <input
                                id="copy_product"
                                type="radio"
                                checked={productType === 'copy'}
                                value={'copy'}
                                onChange={() => {
                                    setProductType('copy')
                                }}
                            />
                        </div>
                    </div>
                </div>
            //     <div className="price_types_container">
            //     <div className="price_type">
            //     <label htmlFor="original_product">Original</label>
            //     <input
            //     id="original_product"
            //     type="radio"
            //     checked={productType === 'original'}
            //     value={'original'}
            //     onChange={() => {
            //     setProductType('original')
            // }}
            //     />
            //     </div>
            //     <div className="price_type">
            //     <label htmlFor="copy_product">Copy</label>
            //     <input
            //     id="copy_product"
            //     type="radio"
            //     checked={productType === 'copy'}
            //     value={'copy'}
            //     onChange={() => {
            //     setProductType('copy')
            // }}
            //     />
            //     </div>
            //     </div>
            )}
            <div className="card_actions">
                {/*<button className={`add_to_cart ${!leftProductsCount ? 'disabled' : ''}`} onClick={handleAddProduct}>*/}
                <button
                    disabled={btnDisabled}
                    className={`add_to_cart ${btnDisabled ? 'disabled' : ''}`}
                    onClick={handleAddProduct}
                >
                    ADD TO CART
                </button>
                <input
                    className="product_number_input"
                    type="number"
                    disabled={inputDisabled}
                    value={
                        productType === 'original'
                            ? productCount.original
                            : productCount.copy
                    }
                    onChange={(e) => {
                        if(!inputDisabled){
                            handleChange(e)
                        }
                    }}
                />
            </div>
            {compareActive && (
                <div className="compare_box">
                    <input
                        type="checkbox"
                        checked={checked}
                        onChange={handleCompareChange}
                    />
                    <span>Compare</span>
                </div>
            )}
        </div>
    )
}

export default Card

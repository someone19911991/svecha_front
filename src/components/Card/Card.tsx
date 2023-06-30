import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import { IProduct } from '../../interfaces'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { backURL } from '../../consts'
import './card.css'
import { addToCart } from '../../features/cart/cartSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import {Link} from 'react-router-dom'
import { addRemoveCompareProduct } from '../../features/compare/compareSlice'
import useCartProductsCount from '../../hooks/useCartProductsCount'
import { TbCurrencyDram } from 'react-icons/tb'
import { useTranslation } from 'react-i18next'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import sold_out from "../../imgs/sold_out.png"

interface ICardProps {
    product: IProduct
    compareActive: boolean
    inTopSelling?: boolean
}

const Card: FC<ICardProps> = ({ product, compareActive, inTopSelling }) => {
    const { t } = useTranslation()
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

    const { brand, model, detail_number, img, price_original, price_copy } =
        product

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

    const changeProductCount = (action: string) => {
        if (productType === 'original') {
            if (action === 'increase') {
                setProductCount({
                    ...productCount,
                    original: productCount.original + 1,
                })
            } else {
                setProductCount({
                    ...productCount,
                    original: productCount.original - 1,
                })
            }
        } else {
            if (action === 'increase') {
                setProductCount({
                    ...productCount,
                    copy: productCount.copy + 1,
                })
            } else {
                setProductCount({
                    ...productCount,
                    copy: productCount.copy - 1,
                })
            }
        }
    }

    useEffect(() => {
        if (product) {
            const cartProduct = cart.products.find(
                (pr) => pr.product_id === product.product_id
            )
            if (!product?.count_original) {
                setProductType('copy')
            }
            if (cartProduct) {
                let countOriginal = 0
                let countCopy = 0
                if (cartProduct?.count_original && product.count_original) {
                    if (product.count_original >= cartProduct?.count_original) {
                        countOriginal = cartProduct?.count_original
                    } else {
                        countOriginal = product?.count_original
                    }
                }
                if (cartProduct?.count_copy && product.count_copy) {
                    if (product.count_copy >= cartProduct?.count_copy) {
                        countCopy = cartProduct?.count_copy
                    } else {
                        countCopy = product?.count_original
                    }
                }
                setProductCount({
                    original: countOriginal,
                    copy: countCopy,
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
        <div className={`card ${inTopSelling ? 'inTopSelling' : ''}`}>
            <p className="product_brand">
                <span>{t('product.brand')}</span>: {brand}
            </p>
            <p className="product_model">
                <span>{t('product.model')}</span>: {model}
            </p>
            <p className="product_detail_number">
                <span>{t('general.detail_num')}</span>: {detail_number}
            </p>
            <div className="product_img">
                <Link
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
                    <img src={`${backURL}/${img}`} />
                    {!!product.discount && (
                        <span className="product_discount">
                            -{product.discount}%
                        </span>
                    )}
                </Link>
            </div>
            {(!!product.count_original || !!product.count_copy) && (
                <div className="product_price">
                    <p className="product_price_text">
                        <span>{t('product.price')}</span>:{' '}
                        <span className="product_price_marked">
                            {productType === 'original'
                                ? price_original
                                : price_copy}
                        </span>
                        <TbCurrencyDram className="product_price_dram" />
                    </p>
                    <div className="price_types_container">
                        {!!product.count_original && (
                            <div className="price_type">
                                <label htmlFor="original_product">
                                    {t('product.original')}
                                </label>
                                {!!product.count_copy && (
                                    <input
                                        id="original_product"
                                        type="radio"
                                        checked={productType === 'original'}
                                        value={'original'}
                                        onChange={() => {
                                            setProductType('original')
                                        }}
                                    />
                                )}
                            </div>
                        )}
                        {!!product.count_copy && (
                            <div className="price_type">
                                <label htmlFor="copy_product">
                                    {t('product.copy')}
                                </label>
                                {!!product.count_original && (
                                    <input
                                        id="copy_product"
                                        type="radio"
                                        checked={productType === 'copy'}
                                        value={'copy'}
                                        onChange={() => {
                                            setProductType('copy')
                                        }}
                                    />
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}
            {(!!product.count_original || !!product.count_copy) && (
                <div className="card_actions">
                    <button
                        disabled={btnDisabled}
                        className={`add_to_cart ${
                            btnDisabled ? 'disabled' : ''
                        }`}
                        onClick={handleAddProduct}
                    >
                        {t('general.add_to_cart')}
                    </button>
                    <div className="product_count_container">
                        <button
                            className={
                                countBtnDisabled ? 'card_disabled_item' : ''
                            }
                            disabled={countBtnDisabled}
                            onClick={() => changeProductCount('decrease')}
                        >
                            <AiOutlineMinus />
                        </button>
                        <input
                            className={
                                countBtnDisabled ? 'card_disabled_item' : ''
                            }
                            type="number"
                            disabled={inputDisabled}
                            value={
                                productType === 'original'
                                    ? productCount.original
                                    : productCount.copy
                            }
                            onChange={handleChange}
                        />
                        <button
                            className={
                                countBtnDisabled ? 'card_disabled_item' : ''
                            }
                            disabled={countBtnDisabled}
                            onClick={() => changeProductCount('increase')}
                        >
                            <AiOutlinePlus />
                        </button>
                    </div>
                </div>
            )}
            {(!product.count_original && !product.count_copy) && (
                <Link
                    key={product.product_id}
                    to={`/products/${product.category_name}/${product.product_id}`}
                >
                    <div className="sold_out">
                        <img src={sold_out} alt="" />
                    </div>
                </Link>
            )}
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

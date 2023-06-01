import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import styles from "../../pages/Products/products.module.css";
import {AiOutlineMinus, AiOutlinePlus} from "react-icons/ai";
import {addToCart} from "../../features/cart/cartSlice";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {IProduct} from "../../interfaces";
import useCartProductsCount from "../../hooks/useCartProductsCount";

interface ICartActionsProps{
    product: IProduct
    productType: string
    inCart?: boolean
    // productCount: {original: number, copy: number}
}

const CartActions: FC<ICartActionsProps> = ({product, productType, inCart= false}) => {
    const dispatch = useAppDispatch()
    const [productCount_, setProductCount] = useState<{
        original: number
        copy: number
    }>({ original: 0, copy: 0 })
    const { cart } = useAppSelector((state) => state)
    const { productCount, disabled, btnDisabled } = useCartProductsCount({
        cart,
        productType,
        product,
        productCount_,
        product_id: product.product_id,
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement> | string) => {
        let inputNumber = 0
        let original = 0
        let copy = 0
        if (typeof e === 'string') {
            if (e === 'increase') {
                if (productType === 'original') {
                    original = productCount.original + 1
                } else if (productType === 'copy') {
                    copy = productCount.copy + 1
                }
            } else if (e === 'decrease') {
                if (productType === 'original') {
                    original = productCount.original - 1
                    if(inCart && original < 1) return
                } else if (productType === 'copy') {
                    copy = productCount.copy - 1
                    if(inCart && copy < 1) return
                }
            }

            if(inCart){
                dispatch(
                    addToCart({
                        count_original: original,
                        count_copy: copy,
                        product,
                        product_id: product.product_id,
                    })
                )
            }
        } else {
            inputNumber = +e.target.value

            if (productType === 'original') {
                original = inputNumber
            } else {
                copy = inputNumber
            }
            if(inCart){
                dispatch(
                    addToCart({
                        count_original: original,
                        count_copy: copy,
                        product,
                        product_id: product.product_id,
                    })
                )
            }
        }

        setProductCount({ original, copy })
    }

    const handleAddProduct = () => {
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
        if(product){
            const cartProduct = cart.products.find(pr => pr.product_id === product.product_id)
            if(productType === 'original' && cartProduct?.count_original){
                setProductCount({...productCount_, original: cartProduct?.count_original})
            }else if(productType === 'copy' && cartProduct?.count_copy) {
                setProductCount({...productCount_, copy: cartProduct?.count_copy})
            }
        }
    }, [product, productType])

    return (
        <div className={styles.cart_btn_container}>
            <div className={styles.product_count}>
                <button disabled={btnDisabled} className={`${btnDisabled ? 'disabled' : ''}`}>
                    <AiOutlineMinus
                        onClick={() => handleChange('decrease')}
                    />
                </button>
                <input
                    type="number"
                    className={disabled ? 'disabled' : ''}
                    disabled={disabled}
                    value={
                        productType === 'original'
                            ? productCount.original
                            : productCount.copy
                    }
                    onChange={(e) => handleChange(e)}
                />
                <button disabled={btnDisabled} className={`${btnDisabled ? 'disabled' : ''}`} onClick={() => handleChange('increase')}>
                    <AiOutlinePlus />
                </button>
            </div>
            {!inCart && <button
                disabled={btnDisabled}
                className={`${styles.cart_btn} ${
                    btnDisabled ? 'disabled' : ''
                }`}
                onClick={handleAddProduct}
            >
                ADD TO CART
            </button>}
        </div>
    );
};

export default CartActions;
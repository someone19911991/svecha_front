import React, {FC, useState} from 'react'
import { backURL } from '../../consts'
import styles from './cart.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRemove } from '@fortawesome/free-solid-svg-icons'
import { useAppDispatch } from '../../hooks/redux'
import { removeProductFromCart } from '../../features/cart/cartSlice'
import { ICartItem } from '../../features/cart/cartSlice'
import CartActions from "../CartActions/CartActions";

const CartItem: FC<{
    cartProduct: { cartItem: ICartItem; product_type: string }
}> = ({ cartProduct }) => {
    const { cartItem, product_type } = cartProduct
    const dispatch = useAppDispatch()
    const handleRemoveProduct = (product_id: number) => {
        dispatch(removeProductFromCart({ product_id, product_type }))
    }
    const [mainImg, setMainImg] = useState('')
    const { img, detail_number, model } = cartItem.product
    let imgToSet = ''
    if(!mainImg){
        if(!img){
            const masterImg = cartItem.product?.imgs?.find(imgItem => imgItem.master)?.img
            if(masterImg){
                imgToSet = masterImg
            }
        }else{
            imgToSet = img
        }
        setMainImg(imgToSet)
    }


    let discountedPrice =
        product_type === 'original'
            ? cartItem.product.price_original * cartItem.count_original
            : cartItem.product.price_copy * cartItem.count_copy
    if(cartItem.product.discount){
        discountedPrice = discountedPrice - parseInt(`${cartItem.product.discount / 100 * discountedPrice}`)
    }


    return (
        <>
            <tr className={styles.cart_item_tr_small}>
                <table className={styles.cart_item_table}>
                    <tbody>
                    <tr>
                        <th>Part Number</th>
                        <td>{detail_number}</td>
                    </tr>
                    <tr>
                        <th>Product</th>
                        <td className={styles.cart_item_img}>
                            <img src={`${backURL}/${mainImg}`} alt="" />
                            <p className={styles.cart_item_model}>{model}</p>
                        </td>
                    </tr>
                    <tr>
                        <th>Item Price</th>
                        <td>
                            {product_type === 'original'
                                ? cartItem.product.price_original
                                : cartItem.product.price_copy}
                        </td>
                    </tr>
                    <tr>
                        <th>Discount</th>
                        <td>{cartItem.product.discount ? `${cartItem.product.discount} %` : 0}</td>
                    </tr>
                    <tr>
                        <th>Quantity</th>
                        <td>
                            {product_type === 'original'
                                ? cartItem.count_original
                                : cartItem.count_copy}
                        </td>
                    </tr>
                    <tr>
                        <th>Price</th>
                        <td>{discountedPrice}</td>
                    </tr>
                    <tr>
                        <th>Actions</th>
                        <td className={styles.product_actions}>
                            <CartActions product={cartProduct.cartItem.product} productType={product_type} inCart={true}/>
                        </td>
                    </tr>
                    <tr>
                        <th>Remove</th>
                        <td className={styles.remove_product}>
                            <FontAwesomeIcon
                                onClick={() =>
                                    handleRemoveProduct(cartItem.product.product_id)
                                }
                                icon={faRemove}
                            ></FontAwesomeIcon>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </tr>

            <tr className={styles.cart_item_tr}>
                <th>{detail_number}</th>
                <td className={styles.cart_item_img}>
                    <img src={`${backURL}/${mainImg}`} alt="" />
                    <p className={styles.cart_item_model}>{model}</p>
                </td>
                <td>
                    {product_type === 'original'
                        ? cartItem.product.price_original
                        : cartItem.product.price_copy}
                </td>
                <td>{cartItem.product.discount ? `${cartItem.product.discount} %` : 0}</td>
                <td>
                    {product_type === 'original'
                        ? cartItem.count_original
                        : cartItem.count_copy}
                </td>
                <td>
                    {discountedPrice}
                </td>
                <td className={styles.product_actions}>
                    <CartActions product={cartProduct.cartItem.product} productType={product_type} inCart={true}/>
                </td>
                <td className={styles.remove_product}>
                    <FontAwesomeIcon
                        onClick={() =>
                            handleRemoveProduct(cartItem.product.product_id)
                        }
                        icon={faRemove}
                    ></FontAwesomeIcon>
                </td>
            </tr>
        </>
    )
}

export default CartItem

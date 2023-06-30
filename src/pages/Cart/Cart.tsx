import React, { Fragment, useEffect, useState } from 'react'
import { useAppSelector } from '../../hooks/redux'
import CartItem from '../../components/Cart/CartItem'
import styles from './cart.module.css'
import { TbCurrencyDram } from 'react-icons/tb'
import { useAppDispatch } from '../../hooks/redux'
import { useCreateOrderMutation } from '../../features/order/orderApiSlice'
import { IProductOrderItem } from '../../interfaces'
import Notification from '../../components/Notification/Notification'
import { clearCart } from '../../features/cart/cartSlice'
import empty_cart from "../../imgs/empty_cart.png"
import {useTranslation} from "react-i18next";
import useScrollTop from "../../hooks/useScrollTop";

const Cart = () => {
    const {t, i18n} = useTranslation()
    const dispatch = useAppDispatch()
    const [phoneError, setPhoneError] = useState('')
    const [notification, setNotification] = useState({
        open: false,
        message: '',
        type: '',
    })
    const [createOrder, { isLoading }] = useCreateOrderMutation()
    const { products, totalProductsCount } = useAppSelector(
        (state) => {
            return state.cart
        }
    )

    const [phone, setPhone] = useState('')
    let subTotal = 0
    products.forEach((cartProduct) => {
        let productSubTotal = 0
        const priceOriginal =
            cartProduct.count_original * cartProduct.product.price_original
        const priceCopy =
            cartProduct.count_copy * cartProduct.product.price_copy
        productSubTotal = priceOriginal + priceCopy
        if (cartProduct.product.discount) {
            const priceToSubtract = parseInt(
                `${(cartProduct.product.discount / 100) * productSubTotal}`
            )
            productSubTotal -= priceToSubtract
        }
        subTotal += productSubTotal
    })



    const handleNotificationClose = () => {
        setNotification({
            type: '',
            message: '',
            open: false,
        })
    }

    const showNotification = ({
        type,
        message,
    }: {
        type: string
        message: string
    }) => {
        setNotification({
            type,
            message,
            open: true,
        })
        setTimeout(() => {
            setNotification({
                type: '',
                message: '',
                open: false,
            })
        }, 5000)
    }

    const makeOrder = async () => {
        const orderToPlace: Array<IProductOrderItem> = []
        products.forEach((cartProduct) => {
            const { product_id, count_copy, count_original } = cartProduct
            if (count_original) {
                const order = {
                    product_id,
                    count: count_original,
                    product_type: 'original',
                }
                orderToPlace.push(order)
            }
            if (count_copy) {
                const order = {
                    product_id,
                    count: count_copy,
                    product_type: 'copy',
                }
                orderToPlace.push(order)
            }
        })

        try {
            await createOrder({ order: orderToPlace, phone }).unwrap()
            dispatch(clearCart())
            showNotification({
                type: 'success',
                message: t("cart.order_success"),
            })
        } catch (err) {
            showNotification({
                type: 'error',
                message: JSON.stringify(err),
            })
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        let pattern = /^0[0-9]{2}-[0-9]{2}-[0-9]{2}-[0-9]{2}$/
        let result = pattern.test(phone)
        if (result) {
            setPhone('')
            makeOrder()
        } else {
            const errorMessage = t("cart.valid_phone_number")
            setPhoneError(errorMessage)
        }
    }

    i18n.on('languageChanged', function(lng) {
        if(phoneError){
            const errMessage = t("cart.valid_phone_number")
            setPhoneError(errMessage)
        }
    })

    useScrollTop()

    if (!products.length) {
        return (
            <div className={styles.empty_cart_container}>
                {notification.open && (
                    <Notification
                        type={notification.type}
                        message={notification.message}
                        onClose={handleNotificationClose}
                    />
                )}
                <div className={styles.empty_cart_img}>
                    <img src={empty_cart} alt=""/>
                </div>
            </div>
        )
    }

    return (
        <div className={styles.cart_table_container}>
            {notification.open && (
                <Notification
                    type={notification.type}
                    message={notification.message}
                    onClose={handleNotificationClose}
                />
            )}
            <div className={`app_container ${styles.cart}`}>
                <table className={styles.cart_table}>
                    <thead className={styles.cart_table_head}>
                        <tr>
                            <th>{t("cart.part_number")}</th>
                            <th>{t("cart.products")}</th>
                            <th>{t("cart.item_price")}</th>
                            <th>{t("cart.discount")}</th>
                            <th>{t("cart.quantity")}</th>
                            <th>{t("cart.price")}</th>
                            <th>{t("cart.actions")}</th>
                            <th>{t("cart.remove")}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => {
                            if (product.count_original && product.count_copy) {
                                return (
                                    <Fragment
                                        key={
                                            product.product_id +
                                            product.product.price_original
                                        }
                                    >
                                        <CartItem
                                            cartProduct={{
                                                cartItem: product,
                                                product_type: 'original',
                                            }}
                                        />
                                        <CartItem
                                            key={
                                                product.product_id +
                                                product.product.price_copy
                                            }
                                            cartProduct={{
                                                cartItem: product,
                                                product_type: 'copy',
                                            }}
                                        />
                                    </Fragment>
                                )
                            } else if (
                                product.count_original &&
                                !product.count_copy
                            ) {
                                return (
                                    <Fragment
                                        key={
                                            product.product_id +
                                            product.product.price_original
                                        }
                                    >
                                        <CartItem
                                            key={
                                                product.product_id +
                                                product.product.price_original
                                            }
                                            cartProduct={{
                                                cartItem: product,
                                                product_type: 'original',
                                            }}
                                        />
                                    </Fragment>
                                )
                            } else if (
                                product.count_copy &&
                                !product.count_original
                            ) {
                                return (
                                    <Fragment
                                        key={
                                            product.product_id +
                                            product.product.price_original
                                        }
                                    >
                                        <CartItem
                                            key={
                                                product.product_id +
                                                product.product.price_copy
                                            }
                                            cartProduct={{
                                                cartItem: product,
                                                product_type: 'copy',
                                            }}
                                        />
                                    </Fragment>
                                )
                            }
                        })}
                    </tbody>
                </table>
                <div className={styles.sub_total_container}>
                    <div className={styles.price_container}>
                        <span className={styles.sub_total_title}>
                            Subtotal:
                        </span>
                        <p>
                            <span>{subTotal}</span>
                            <span className={styles.amd}>
                                <TbCurrencyDram />
                            </span>
                        </p>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <p className={styles.phone_num}>Your phone number </p>
                        <div className={styles.phone}>
                            <input
                                type="tel"
                                name="Phone"
                                placeholder="077-56-56-56"
                                pattern="0[0-9]{2}-[0-9]{2}-[0-9]{2}-[0-9]{2}"
                                required
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                            <p className={styles.field_error}>{phoneError}</p>
                        </div>
                        <button
                            className={`${styles.order_btn} ${isLoading ? styles.disabled : ''}`}
                            disabled={isLoading}
                        >
                            Order
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Cart

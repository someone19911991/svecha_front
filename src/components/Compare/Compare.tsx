import React from 'react'
import styles from './compare.module.css'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { backURL } from '../../consts'
import { IoIosClose } from 'react-icons/io'
import { removeCompareProduct, removeAllProducts } from '../../features/compare/compareSlice'
import {Link} from "react-router-dom";

const Compare = () => {
    const dispatch = useAppDispatch()
    const { products } = useAppSelector((state) => state.compare)

    return (
        <div className={styles.compare_container}>
            <div className={styles.reserve_item}></div>
            <div className={styles.compare_item}>
                {products?.[0] && (
                    <>
                        <img
                            src={
                                products?.[0]?.img?.startsWith('http')
                                    ? products?.[0]?.img
                                    : `${backURL}/${products?.[0]?.img}`
                            }
                            alt=""
                        />
                        <IoIosClose
                            onClick={() =>
                                dispatch(
                                    removeCompareProduct({
                                        product_id: products?.[0]?.product_id,
                                    })
                                )
                            }
                            className={styles.close_compare}
                        />
                    </>
                )}
            </div>
            <div className={styles.compare_item}>
                {products?.[1] && (
                    <>
                        <img
                            src={
                                products?.[1]?.img?.startsWith('http')
                                    ? products?.[1]?.img
                                    : `${backURL}/${products?.[1]?.img}`
                            }
                            alt=""
                        />
                        <IoIosClose
                            onClick={() =>
                                dispatch(
                                    removeCompareProduct({
                                        product_id: products?.[1]?.product_id,
                                    })
                                )
                            }
                            className={styles.close_compare}
                        />
                    </>
                )}
            </div>
            <div className={styles.compare_item}>
                {products?.[2] && (
                    <>
                        <img
                            src={
                                products?.[2]?.img?.startsWith('http')
                                    ? products?.[2]?.img
                                    : `${backURL}/${products?.[2]?.img}`
                            }
                            alt=""
                        />
                        <IoIosClose
                            onClick={() =>
                                dispatch(
                                    removeCompareProduct({
                                        product_id: products?.[2]?.product_id,
                                    })
                                )
                            }
                            className={styles.close_compare}
                        />
                    </>
                )}
            </div>
            <div className={styles.compare_item}>
                {products?.[3] && (
                    <>
                        <img
                            src={
                                products?.[3]?.img?.startsWith('http')
                                    ? products?.[3]?.img
                                    : `${backURL}/${products?.[3]?.img}`
                            }
                            alt=""
                        />
                        <IoIosClose
                            onClick={() =>
                                dispatch(
                                    removeCompareProduct({
                                        product_id: products?.[3]?.product_id,
                                    })
                                )
                            }
                            className={styles.close_compare}
                        />
                    </>
                )}
            </div>
            <div className={styles.compare_actions}>
                <button className={styles.clear_btn} onClick={() => dispatch(removeAllProducts())}>Clear all</button>
                <p>Compare up to 4 products</p>
                <Link to={'/products/compare'} className={styles.compare_btn}>Compare</Link>
            </div>
        </div>
    )
}

export default Compare

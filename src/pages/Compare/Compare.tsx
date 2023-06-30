import React from 'react'
import styles from './compare.module.css'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { backURL } from '../../consts'
import { removeCompareProduct } from '../../features/compare/compareSlice'
import { IoIosClose } from 'react-icons/io'
import { TbCurrencyDram } from 'react-icons/tb'
import useScrollTop from "../../hooks/useScrollTop";

const Compare = () => {
    const dispatch = useAppDispatch()
    const { products: compareProducts, compareCategory } = useAppSelector(
        (state) => state.compare
    )

    useScrollTop()

    return (
        <div>
            <div className={`${styles.compare_container} app_container`}>
                {compareProducts.map((productItem, index) => (
                    <div
                        key={productItem.product_id}
                        className={styles.compare_item}
                    >
                        <p className={styles.compare_item_title}>
                            {productItem.model}
                        </p>
                        <img
                            src={
                                productItem?.img?.startsWith('http')
                                    ? productItem.img
                                    : `${backURL}/${productItem?.img}`
                            }
                            alt=""
                        />
                        <IoIosClose
                            onClick={() =>
                                dispatch(
                                    removeCompareProduct({
                                        product_id: productItem.product_id,
                                    })
                                )
                            }
                            className={styles.remove_compare}
                        />

                        <div
                            key={`${productItem.product_id}_${productItem.category_name}`}

                        >
                            <p>
                                <strong>Brand:</strong> {productItem.brand}
                            </p>
                            <p>
                                <strong>Detail Number:</strong>{' '}
                                {productItem.detail_number}
                            </p>
                            <p>
                                <strong>Original Price:</strong>{' '}
                                {productItem.price_original} <TbCurrencyDram />
                            </p>
                            <p>
                                <strong>Copy Price:</strong>{' '}
                                {productItem.price_copy} <TbCurrencyDram />
                            </p>
                            {compareCategory === 'ignition_coils' && (
                                <>
                                    <p>
                                        <strong>Plugs Number:</strong>{' '}
                                        {productItem?.plugs_number}
                                    </p>
                                    <p>
                                        <strong>Contacts Number:</strong>{' '}
                                        {productItem.contacts_number}
                                    </p>
                                </>
                            )}
                            {compareCategory === 'spark_plugs' && (
                                <>
                                    <p>
                                        {index === 0 && <strong>Key Type:</strong>}{' '}
                                        {productItem?.key_type}
                                    </p>
                                    <p>
                                        {index === 0 && <strong>Key Size:</strong>}{' '}
                                        {productItem?.key_size}
                                    </p>
                                    <p>
                                        {index === 0 && <strong>Seat Type:</strong>}{' '}
                                        {productItem?.seat_type}
                                    </p>
                                    <p>
                                        {index === 0 && (
                                            <strong>Thread Size:</strong>
                                        )}{' '}
                                        {productItem?.thread_size}
                                    </p>
                                    <p>
                                        {index === 0 && (
                                            <strong>Thread Length:</strong>
                                        )}{' '}
                                        {productItem?.thread_length}
                                    </p>
                                    <p>
                                        {index === 0 && <strong>GAP:</strong>}{' '}
                                        {productItem?.gap}
                                    </p>
                                    <p>
                                        {index === 0 && (
                                            <strong>Electrodes Number:</strong>
                                        )}{' '}
                                        {productItem?.electrodes_number}
                                    </p>
                                    <p>
                                        {index === 0 && (
                                            <strong>Electrode Type:</strong>
                                        )}{' '}
                                        {productItem?.electrode_type}
                                    </p>
                                </>
                            )}
                            {compareCategory === 'ignition_coil_mouthpieces' && (
                                <>
                                    <p>
                                        {index === 0 && <strong>Wired:</strong>}{' '}
                                        {productItem?.wired}
                                    </p>
                                    <p>
                                        {index === 0 && <strong>Type:</strong>}{' '}
                                        {productItem?.type_}
                                    </p>
                                    <p>
                                        {index === 0 && (
                                            <strong>Contact Type:</strong>
                                        )}{' '}
                                        {productItem?.contact_type}
                                    </p>
                                </>
                            )}
                            {compareCategory === 'airbag_cables' && (
                                <>
                                    <p>
                                        {index === 0 && (
                                            <strong>
                                                Steering Axle Bore Diameter:
                                            </strong>
                                        )}{' '}
                                        {productItem?.steering_axle_bore_diameter}
                                    </p>
                                    <p>
                                        {index === 0 && (
                                            <strong>Airbag Plugs Number:</strong>
                                        )}{' '}
                                        {productItem?.airbag_plugs_number}
                                    </p>
                                </>
                            )}
                            {(compareCategory === 'camshaft_sensors' ||
                                compareCategory === 'crankshaft_sensors') && (
                                <>
                                    <p>
                                        {index === 0 && <strong>Wired:</strong>}{' '}
                                        {productItem?.wired}
                                    </p>
                                    <p>
                                        {index === 0 && (
                                            <strong>Contact Number:</strong>
                                        )}{' '}
                                        {productItem?.contact_number}
                                    </p>
                                    <p>
                                        {index === 0 && (
                                            <strong>Connection Type:</strong>
                                        )}{' '}
                                        {productItem?.connection_type}
                                    </p>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Compare

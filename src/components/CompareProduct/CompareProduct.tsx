import React, { FC } from 'react'
import { IProduct } from '../../interfaces'
import { backURL } from '../../consts'
import './compareProduct.css'

interface ICompareProductProps {
    product: IProduct
}
const CompareProduct: FC<ICompareProductProps> = ({ product }) => {
    const {
        brand,
        model,
        detail_number,
        product_id,
        category_name,
        imgs,
        count_original,
        count_copy,
        price,
        ...rest
    } = product

    return (
        <div className="compare_product">
            <div className="compare_product_img">
                <img
                    // src={img.startsWith('http') ? img : `${backURL}/${img}`}
                    alt="Product img"
                />
            </div>
            <p>
                <b>Brand</b>: {brand}
            </p>
            <p>
                <b>Model</b>: {model}
            </p>
            {category_name === 'ignition_coils' && (
                <div>
                    <p>
                        <b>Plugs Number</b>:{' '}
                        {rest?.plugs_number && rest?.plugs_number}
                    </p>
                    <p>
                        <b>Contacts Number</b>: {rest.contacts_number}
                    </p>
                </div>
            )}
            {category_name === 'spark_plugs' && (
                <div>
                    <p>
                        <b>Key Type</b>: {rest?.key_type}
                    </p>
                    <p>
                        <b>Key Size</b>: {rest.key_size}
                    </p>
                    <p>
                        <b>Thread Size</b>: {rest.thread_size}
                    </p>
                    <p>
                        <b>Thread Length</b>: {rest.thread_length}
                    </p>
                    <p>
                        <b>Gap</b>: {rest.gap}
                    </p>
                    <p>
                        <b>Electrodes Number</b>: {rest.electrodes_number}
                    </p>
                    <p>
                        <b>Electrodes Type</b>: {rest.electrode_type}
                    </p>
                </div>
            )}
            {category_name === 'airbag_cables' && (
                <div>
                    <p>
                        <b>Steering Axle Bore Diameter</b>:{' '}
                        {rest.steering_axle_bore_diameter}
                    </p>
                    <p>
                        <b>Airbag Plugs Number</b>: {rest.airbag_plugs_number}
                    </p>
                </div>
            )}
        </div>
    )
}

export default CompareProduct

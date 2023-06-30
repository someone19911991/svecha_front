import React, { FC, useEffect, useState } from 'react'
import { useLazyGetProductQuery } from '../../features/products/productsApiSlice'
import { useParams } from 'react-router-dom'
import { IProduct, ObjectOfArrays } from '../../interfaces'
import { backURL } from '../../consts'
import styles from './products.module.css'
import { TbCurrencyDram } from 'react-icons/tb'
import { useAppSelector } from '../../hooks/redux'
import CartActions from '../../components/CartActions/CartActions'
import { useTranslation } from 'react-i18next'
import i18next from "i18next";
import useLangChange, {IPropsToTranslate} from "../../hooks/useLangChange";

const Product: FC = () => {
    const { t } = useTranslation()
    const [lng, setLng] = useState('')
    const [product, setProduct] = useState<IProduct>({} as IProduct)
    const { cart } = useAppSelector((state) => state)
    const params = useParams()
    const { category: category_name } = params
    const [productCount_, setProductCount] = useState<{
        original: number
        copy: number
    }>({ original: 0, copy: 0 })
    const [productType, setProductType] = useState('original')
    const [focusedImg, setFocusedImg] = useState<null | number>(null)
    const [mainImgIndex, setMainImgIndex] = useState<null | number>(null)
    const [getProduct, { isLoading, isSuccess }] = useLazyGetProductQuery()
    const { category, product_id } = useParams()
    const [img, setImg] = useState('')
    const [refs, setRefs] = useState<ObjectOfArrays>({})
    const [oems, setOems] = useState<ObjectOfArrays>({})
    const discountedOriginalPrice =
        product.discount !== 0
            ? product.price_original -
              (product.price_original * product.discount) / 100
            : product.price_original
    const discountedCopyPrice =
        product.discount !== 0
            ? product.price_copy - (product.price_copy * product.discount) / 100
            : product.price_copy

    const handleMainImgClick = (imgIndex: number) => {
        setFocusedImg(imgIndex)
        setMainImgIndex(imgIndex)
    }

    i18next.on('languageChanged', (lng) => {
        setLng(lng)
    })

    const translatedProps: IPropsToTranslate = useLangChange(product, lng)

    useEffect(() => {
        getProduct(`/${category}/${product_id}`)
            .unwrap()
            .then((res) => {
                setProduct(res)
                const productRefs: { [key: string]: Array<string> } = {}
                const productOems: { [key: string]: Array<string> } = {}
                res.refs.forEach((refItem) => {
                    if (productRefs[refItem.brand]) {
                        productRefs[refItem.brand].push(refItem.ref_num)
                    } else {
                        productRefs[refItem.brand] = [refItem.ref_num]
                    }
                })
                setRefs(productRefs)
                res.oems.forEach((oemItem) => {
                    if (productOems[oemItem.model]) {
                        productOems[oemItem.model].push(oemItem.oem)
                    } else {
                        productOems[oemItem.model] = [oemItem.oem]
                    }
                })
                setOems(productOems)
            })
    }, [category, product_id])

    useEffect(() => {
        let imgToSet = product?.imgs?.find((imgItem) => imgItem.master)?.img
        if (imgToSet) {
            setImg(imgToSet)
        }
    }, [product])

    useEffect(() => {
        if (product) {
            const cartProduct = cart.products.find(
                (pr) => pr.product_id === product.product_id
            )
            if (productType === 'original') {
                setProductCount({
                    ...productCount_,
                    copy: cartProduct?.count_copy || 0,
                })
            } else if (productType === 'copy') {
                setProductCount({
                    ...productCount_,
                    original: cartProduct?.count_original || 0,
                })
            }
        }
    }, [productType, product])

    if (isLoading) {
        return <h3>Loading...</h3>
    }

    return isSuccess && product?.product_id ? (
        <div
            className={styles.product_wrapper}
            style={{ marginLeft: 'auto', marginRight: 'auto' }}
        >
            <div className={styles.product_container}>
                <div className={styles.imgs}>
                    <div className={styles.side_imgs}>
                        {product.imgs.map((imgItem, index) => (
                            <img
                                key={imgItem.img}
                                className={
                                    focusedImg !== null && focusedImg === index
                                        ? styles.focused
                                        : ''
                                }
                                onClick={() => handleMainImgClick(index)}
                                src={`${backURL}/${imgItem.img}`}
                                alt=""
                            />
                        ))}
                    </div>
                    <div className={styles.main_img_container}>
                        <img
                            src={
                                mainImgIndex === null
                                    ? `${backURL}/${img}`
                                    : `${backURL}/${product.imgs[mainImgIndex].img}`
                            }
                            alt=""
                        />
                    </div>
                </div>
                <div className={styles.about_container}>
                    <p className={styles.about}>
                        {t('product_features.about_product')}
                    </p>
                    <p className={styles.product_feature}>
                        <span className={styles.feature_title}>
                            {t('product_features.brand')}
                        </span>
                        <span className={styles.feature_dots}></span>
                        <span className={`${styles.feature_value} ${styles.uc}`}>
                            {product.brand}
                        </span>
                    </p>
                    <p className={styles.product_feature}>
                        <span className={`${styles.feature_title}`}>
                            {t('product_features.model')}
                        </span>
                        <span className={styles.feature_dots}></span>
                        <span className={`${styles.feature_value} ${styles.uc}`}>
                            {product.model}
                        </span>
                    </p>
                    <p className={styles.product_feature}>
                        <span className={styles.feature_title}>
                            {t('product_features.detail_number')}
                        </span>
                        <span className={styles.feature_dots}></span>
                        <span className={`${styles.feature_value} ${styles.uc}`}>
                            {product.detail_number}
                        </span>
                    </p>
                    {category_name === 'ignition_coils' && (
                        <>
                            <p className={styles.product_feature}>
                                <span className={styles.feature_title}>
                                    {t('product_features.plugs_number')}
                                </span>
                                <span className={styles.feature_dots}></span>
                                <span className={styles.feature_value}>
                                    {product.plugs_number}
                                </span>
                            </p>
                            <p className={styles.product_feature}>
                                <span className={styles.feature_title}>
                                    {t('product_features.contacts_number')}
                                </span>
                                <span className={styles.feature_dots}></span>
                                <span className={styles.feature_value}>
                                    {product.contacts_number}
                                </span>
                            </p>
                        </>
                    )}
                    {category_name === 'ignition_coil_mouthpieces' && (
                        <>
                            <p className={styles.product_feature}>
                                <span className={styles.feature_title}>
                                    {t('product_features.wired')}
                                </span>
                                <span className={styles.feature_dots}></span>
                                <span className={styles.feature_value}>
                                    {product.wired == 0
                                        ? t('product_features.wireless')
                                        : product.wired}
                                </span>
                            </p>
                            <p className={styles.product_feature}>
                                <span className={styles.feature_title}>
                                    {t('product_features.contact_type')}
                                </span>
                                <span className={styles.feature_dots}></span>
                                <span className={styles.feature_value}>
                                    {translatedProps.contact_type}
                                </span>
                            </p>
                            <p className={styles.product_feature}>
                                <span className={styles.feature_title}>
                                    {t('product_features.type')}
                                </span>
                                <span className={styles.feature_dots}></span>
                                <span className={styles.feature_value}>
                                    {/*{product.contact_type}*/}
                                    {translatedProps.type_}
                                </span>
                            </p>
                        </>
                    )}
                    {category_name === 'airbag_cables' && (
                        <>
                            <p className={styles.product_feature}>
                                <span className={styles.feature_title}>
                                    {t(
                                        'product_features.steering_axle_bore_diameter'
                                    )}
                                </span>
                                <span className={styles.feature_dots}></span>
                                <span className={styles.feature_value}>
                                    {product.steering_axle_bore_diameter}
                                </span>
                            </p>
                            <p className={styles.product_feature}>
                                <span className={styles.feature_title}>
                                    {t(
                                        'product_features.airbag_cable_plugs_number'
                                    )}
                                </span>
                                <span className={styles.feature_dots}></span>
                                <span className={styles.feature_value}>
                                    {product.airbag_plugs_number}
                                </span>
                            </p>
                        </>
                    )}
                    {(category_name === 'camshaft_sensors' ||
                        category_name === 'crankshaft_sensors') && (
                        <>
                            <p className={styles.product_feature}>
                                <span className={styles.feature_title}>
                                    {t('product_features.wired')}
                                </span>
                                <span className={styles.feature_dots}></span>
                                <span className={styles.feature_value}>
                                    {product.wired === 0
                                        ? t('product_features.wireless')
                                        : product.wired}
                                </span>
                            </p>
                            <p className={styles.product_feature}>
                                <span className={styles.feature_title}>
                                    {t('product_features.contacts_number')}
                                </span>
                                <span className={styles.feature_dots}></span>
                                <span className={styles.feature_value}>
                                    {product.contact_number}
                                </span>
                            </p>
                            <p className={styles.product_feature}>
                                <span className={styles.feature_title}>
                                    {t('product_features.connection_type')}
                                </span>
                                <span className={styles.feature_dots}></span>
                                <span className={styles.feature_value}>
                                    {/*{product.connection_type}*/}
                                    {translatedProps.connection_type}
                                </span>
                            </p>
                        </>
                    )}
                    {category_name === 'spark_plugs' && (
                        <>
                            <p className={styles.product_feature}>
                                <span className={styles.feature_title}>
                                    {t('product_features.key_type')}
                                </span>
                                <span className={styles.feature_dots}></span>
                                <span className={styles.feature_value}>
                                    {/*{product.key_type}*/}
                                    {translatedProps.key_type}
                                </span>
                            </p>
                            <p className={styles.product_feature}>
                                <span className={styles.feature_title}>
                                    {t('product_features.key_size')}
                                </span>
                                <span className={styles.feature_dots}></span>
                                <span className={styles.feature_value}>
                                    {product.key_size}
                                </span>
                            </p>
                            <p className={styles.product_feature}>
                                <span className={styles.feature_title}>
                                    {t('product_features.seat_type')}
                                </span>
                                <span className={styles.feature_dots}></span>
                                <span className={styles.feature_value}>
                                    {/*{product.seat_type}*/}
                                    {translatedProps.seat_type}
                                </span>
                            </p>
                            <p className={styles.product_feature}>
                                <span className={styles.feature_title}>
                                    {t('product_features.thread_size')}
                                </span>
                                <span className={styles.feature_dots}></span>
                                <span className={styles.feature_value}>
                                    {product.thread_size}
                                </span>
                            </p>
                            <p className={styles.product_feature}>
                                <span className={styles.feature_title}>
                                    {t('product_features.thread_length')}
                                </span>
                                <span className={styles.feature_dots}></span>
                                <span className={styles.feature_value}>
                                    {product.thread_length}
                                </span>
                            </p>
                            <p className={styles.product_feature}>
                                <span className={styles.feature_title}>
                                    {t('product_features.gap')}
                                </span>
                                <span className={styles.feature_dots}></span>
                                <span className={styles.feature_value}>
                                    {product.gap}
                                </span>
                            </p>
                            <p className={styles.product_feature}>
                                <span className={styles.feature_title}>
                                    {t('product_features.electrodes_number')}
                                </span>
                                <span className={styles.feature_dots}></span>
                                <span className={styles.feature_value}>
                                    {product.electrodes_number}
                                </span>
                            </p>
                            <p className={styles.product_feature}>
                                <span className={styles.feature_title}>
                                    {t('product_features.electrode_type')}
                                </span>
                                <span className={styles.feature_dots}></span>
                                <span className={styles.feature_value}>
                                    {translatedProps.electrode_type}
                                </span>
                            </p>
                        </>
                    )}
                </div>
                {(!!product.count_original || !!product.count_copy) && <div className={styles.cart_container}>
                    <div className={styles.price_original_container}>
                        <div className={styles.price}>
                            <span className={styles.price_original}>
                                {discountedOriginalPrice}
                                <TbCurrencyDram/>
                            </span>
                            <div className={styles.price_name}>
                                <span>{t('product.original')}</span>
                                {!!product.count_copy && <input
                                    type="radio"
                                    checked={productType === 'original'}
                                    name="price_type"
                                    value="copy"
                                    onChange={() => setProductType('original')}
                                />}
                            </div>
                        </div>
                        {discountedOriginalPrice !== product.price_original && (
                            <>
                                <span className={styles.discount}>
                                    -{product.discount}%
                                </span>
                                <span className={styles.discounted_price}>
                                    {product.price_original}
                                    <TbCurrencyDram/>
                                </span>
                            </>
                        )}
                    </div>
                    {!!product.count_copy && <div className={styles.price_copy_container}>
                        <div className={styles.price}>
                            <span className={styles.price_copy}>
                                {discountedCopyPrice}
                                <TbCurrencyDram/>
                            </span>
                            <div className={styles.price_name}>
                                <span>{t('product.copy')}</span>
                                {<input
                                    type="radio"
                                    checked={productType === 'copy'}
                                    value="copy"
                                    onChange={() => setProductType('copy')}
                                    name="price_type"
                                />}
                            </div>
                        </div>
                        {discountedCopyPrice !== product.price_copy && (
                            <>
                                <span className={styles.discount}>
                                    -{product.discount}%
                                </span>
                                <span className={styles.discounted_price}>
                                    {product.price_copy}
                                    <TbCurrencyDram/>
                                </span>
                            </>
                        )}
                    </div>}
                    <CartActions product={product} productType={productType}/>
                </div>}
            </div>
            <div className={styles.ref_container}>
                <p className={styles.ref_num}>REFERENCE NUMBER</p>
                {!!Object.keys(refs).length && (
                    <div className={styles.refs}>
                        {Object.keys(refs).map((refKey) => {
                            const refValues = refs[refKey]
                            return (
                                <div className={styles.ref_item} key={refKey}>
                                    <p className={styles.ref_key}>{refKey}</p>
                                    <div>
                                        {refValues.map((refValue, index) => (
                                            <span
                                                className={styles.ref_value}
                                                key={refValue}
                                            >
                                                {refValue}{' '}
                                                {index !==
                                                    refValues.length - 1 && ','}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
            <div className={styles.ref_container}>
                <p className={styles.ref_num}>OEM</p>
                {Object.keys(oems).length && (
                    <div className={styles.refs}>
                        {Object.keys(oems).map((oemKey) => {
                            const oemValues = oems[oemKey]
                            return (
                                <div className={styles.ref_item} key={oemKey}>
                                    <p className={styles.ref_key}>{oemKey}</p>
                                    <div>
                                        {oemValues.map((oemValue, index) => (
                                            <span
                                                className={styles.ref_value}
                                                key={oemValue}
                                            >
                                                {oemValue}{' '}
                                                {index !==
                                                    oemValues.length - 1 && ','}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    ) : (
        <h3>{t('product_features.no_product')}</h3>
    )
}

export default Product

import React, { useEffect, useRef, useState} from 'react'
import Notification from '../Notification/Notification'
import './search.css'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useCreateOnOrderMutation } from '../../features/order/orderApiSlice'
import { FaSearch } from 'react-icons/fa'
import {AiOutlineFieldNumber} from "react-icons/ai"
import {GrPowerReset} from "react-icons/gr"

import {
    useLazySearchProductQuery,
    useLazyGetProductsQuery,
} from '../../features/products/productsApiSlice'
import { setProductsAction } from '../../features/products/productsSlice'
import { useAppDispatch } from '../../hooks/redux'
import {useLocation} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {frontURL} from "../../consts";
import {useTranslation} from "react-i18next";
import {setSearchResultsAction} from "../../features/products/productsSlice";

type FormValues = {
    name: string
    phone: string
    message: string
}

const phoneRegExp = /^0[0-9]{2}-[0-9]{2}-[0-9]{2}-[0-9]{2}$/

const schema = yup.object({
    name: yup.string().trim().required('Name is required'),
    phone: yup
        .string()
        .required('Phone number is required')
        .matches(phoneRegExp, 'Phone number is not valid'),
    message: yup.string().trim().required('Message is required'),
})

const Search = () => {
    const {t} = useTranslation()
    const formRef = useRef<HTMLFormElement>(null)
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [createOnOrder, { isLoading }] = useCreateOnOrderMutation()
    const form = useForm<FormValues>({
        defaultValues: { name: '', message: '', phone: '' },
        resolver: yupResolver(schema),
    })
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = form
    const [option, setOption] = useState('search_ref_detail')
    const [notification, setNotification] = useState({
        open: false,
        message: '',
        type: '',
    })
    const detailRef = useRef<HTMLInputElement>(null)
    const [searchProduct, { isLoading: searchProductLoading }] =
        useLazySearchProductQuery()
    const [getProducts, { isLoading: getProductsLoading }] =
        useLazyGetProductsQuery()

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        let element = e.target as HTMLDivElement
        if ([...element.classList].includes('search_ref_detail')) {
            setOption('search_ref_detail')
        } else if ([...element.classList].includes('on_order')) {
            setOption('on_order')
        }
    }

    const handleNotificationClose = () => {
        setNotification({ type: '', message: '', open: false })
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
        }, 3000)
    }

    const handleSearch = async () => {
        if(searchProductLoading){
            return
        }
        if (detailRef.current && detailRef.current.value.trim()) {
            let searchParam = detailRef.current.value.trim()
            try {
                const startsWith = searchParam.startsWith('#')
                if(startsWith) {
                    searchParam = searchParam.replaceAll('#', '%23')
                }
                const result = await searchProduct(searchParam).unwrap()
                if(result.length){
                    dispatch(setSearchResultsAction({searchResult: result}))
                    if(location.pathname !== 'search-results'){
                        navigate('/search-results')
                    }

                }
            } catch (err) {
                showNotification({
                    type: 'error',
                    message: t("errors.unknown_data"),
                })
            }
        }
    }

    const handleReset = async () => {
        try {
            const result = await getProducts().unwrap()
            dispatch(setProductsAction({ products: result }))
            detailRef.current && (detailRef.current.value = '')
            if(location.pathname !== frontURL){
                navigate(frontURL)
            }
        } catch (err) {
            showNotification({ type: 'error', message: JSON.stringify(err) })
        }
    }

    const onSubmit = async (data: FormValues) => {
        try {
            await createOnOrder(data).unwrap()
            showNotification({ type: 'success', message: t("cart.message_sent") })
            reset()
        } catch (err) {
            showNotification({ type: 'error', message: JSON.stringify(err) })
        }
    }

    useEffect(() => {
        function handleClickOutside(event: any) {
            if (formRef.current && !formRef.current.contains(event.target)) {
                setOption('search_ref_detail')
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [formRef]);

    return (
        <div className="search">
            {notification.open && (
                <Notification
                    type={notification.type}
                    message={notification.message}
                    onClose={handleNotificationClose}
                />
            )}
            <div className="options">
                <div
                    className={`search_ref_detail ${
                        option === 'search_ref_detail' && 'active-option'
                    }`}
                    onClick={handleClick}
                >
                    {t("general.search_btn")}
                    <AiOutlineFieldNumber className="num_font_size" />
                </div>
                <div
                    className={`on_order ${
                        option === 'on_order' && 'active-option'
                    }`}
                    onClick={handleClick}
                >
                    {t("general.order")}
                </div>
                <div className="vin" title={'Currently Unavailable'}>
                    VIN
                </div>
            </div>
            {option === 'search_ref_detail' && (
                <div className="search_input_container">
                    <input
                        ref={detailRef}
                        type="text"
                        placeholder={t("general.search_placeholder") || ''}
                        onKeyUp={e => {e.key === 'Enter' && handleSearch()}}
                    />
                    <button className="search_btn" onClick={handleSearch}>
                        {searchProductLoading ? <div className="loading_btn"></div> : <FaSearch/>}
                    </button>
                    <button className="search_btn" onClick={handleReset}>
                        <GrPowerReset />
                        {/*<FaArrowAltCircleLeft />*/}
                    </button>
                </div>
            )}
            {option === 'vin' && (
                <div className="search_input_container vin">
                    <input
                        type="text"
                        disabled
                        placeholder="Enter the vin: 4Y1-SL658-4-8-Z-41-1439"
                    />
                </div>
            )}
            {option === 'on_order' && (
                <form
                    ref={formRef}
                    className="on_order_form"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div>
                        <input
                            type="text"
                            {...register('name')}
                            placeholder={t("inputs.your_name") || ''}
                        />
                        <p className="validation_error">
                            {errors.name?.message && t("errors.name_required")}
                        </p>
                    </div>
                    <div>
                        <p><label htmlFor="phone_num">{t("inputs.your_phone_num") || ''}</label></p>
                        <input
                            id="phone_num"
                            type="text"
                            placeholder="077-78-78-78"
                            {...register('phone')}
                        />
                        <p className="validation_error">
                            {errors.phone?.message && t("errors.invalid_phone_number")}
                        </p>
                    </div>
                    <div>
                        <textarea
                            {...register('message')}
                            placeholder={t("inputs.message_text") || ''}
                            cols={30}
                            rows={10}
                        ></textarea>
                        <p className="validation_error">
                            {errors.phone?.message && t("errors.message_required")}
                        </p>
                    </div>
                    <div>
                        <button disabled={isLoading} className="submit_btn">
                            {t('general.submit')}
                        </button>
                    </div>
                </form>
            )}
        </div>
    )
}

export default Search

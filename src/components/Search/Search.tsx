import React, {MouseEvent, useEffect, useRef, useState} from 'react'
import Notification from '../Notification/Notification'
import './search.css'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useCreateOnOrderMutation } from '../../features/order/orderApiSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FaSearch, FaArrowAltCircleLeft } from 'react-icons/fa'
import {GrPowerReset} from "react-icons/gr"
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import {
    useLazySearchProductQuery,
    useLazyGetProductsQuery,
} from '../../features/products/productsApiSlice'
import { setProductsAction } from '../../features/products/productsSlice'
import { useAppDispatch } from '../../hooks/redux'
import {useLocation} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {frontURL} from "../../consts";

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
        .required('Phone is required')
        .matches(phoneRegExp, 'Phone number is not valid'),
    message: yup.string().trim().required('Message is required'),
})

const Search = () => {
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
        if (detailRef.current && detailRef.current.value.trim()) {
            const searchParam = detailRef.current.value.trim()
            try {
                const result = await searchProduct(searchParam).unwrap()
                if(result.length){
                    detailRef.current.value = ''
                    navigate(`/products/${result[0].category_name}/${result[0].product_id}`)
                }else{
                    navigate('/unknown')
                }
                // dispatch(setProductsAction({ products: result }))
            } catch (err) {
                showNotification({
                    type: 'error',
                    message: 'Unknown data',
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
            const result = await createOnOrder(data).unwrap()
            showNotification({ type: 'success', message: result.message })
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
                    Ref/Detail number
                </div>
                <div
                    className={`on_order ${
                        option === 'on_order' && 'active-option'
                    }`}
                    onClick={handleClick}
                >
                    On order
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
                        placeholder="Enter the detail number: 9091901164, or reference number: some_ref_num"
                        onKeyUp={e => {e.key === 'Enter' && handleSearch()}}
                    />
                    <button className="search_btn" onClick={handleSearch}>
                        <FaSearch />
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
                        placeholder="Enter the vin: 8988ihiodr490"
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
                            placeholder="Your name"
                        />
                        <p className="validation_error">
                            {errors.name?.message}
                        </p>
                    </div>
                    <div>
                        <input
                            type="text"
                            {...register('phone')}
                            placeholder="Your phone"
                        />
                        <p className="validation_error">
                            {errors.phone?.message}
                        </p>
                    </div>
                    <div>
                        <textarea
                            {...register('message')}
                            placeholder="Type your message"
                            cols={30}
                            rows={10}
                        ></textarea>
                        <p className="validation_error">
                            {errors.message?.message}
                        </p>
                    </div>
                    <div>
                        <button disabled={isLoading} className="submit_btn">
                            {isLoading ? (
                                <FontAwesomeIcon icon={faSpinner} />
                            ) : (
                                'Submit'
                            )}
                        </button>
                    </div>
                </form>
            )}
        </div>
    )
}

export default Search

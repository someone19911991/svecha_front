import React, {useEffect, useState} from 'react'
import { filteredProducts } from '../features/products/productsSlice'
import { useAppDispatch } from './redux'
import {useParams} from "react-router-dom";

const useFilter = () => {
    const {category} = useParams()
    const dispatch = useAppDispatch()
    const [brands_, setBrands] = useState<Array<string>>([])
    const [electrodeType, setElectrodeType] = useState<Array<string>>([])
    const [electrodeNumber, setElectrodeNumber] = useState<Array<string>>([])
    const [seatType_, setSeatType] = useState<Array<string>>([])
    const [keyType_, setKeyType] = useState<Array<string>>([])
    const [keySize_, setKeySize] = useState<Array<string>>([])
    const [threadSize_, setThreadSize] = useState<Array<string>>([])
    const [plugsNumber_, setPlugsNumber] = useState<Array<string>>([])
    const [contactsNumber_, setContactsNumber] = useState<Array<string>>([])
    const [contactNumber_, setContactNumber] = useState<Array<string>>([])
    const [wired_, setWired] = useState<Array<string>>([])
    const [contactType_, setContactType] = useState<Array<string>>([])
    const [connectionType_, setConnectionType] = useState<Array<string>>([])


    const handleOptionChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        feature: string
    ) => {
        const option = e.target.value.toLowerCase()
        if(category === 'spark_plugs'){
            if (feature === 'brand') {
                let newBrands = []
                if (brands_.includes(option)) {
                    newBrands = brands_.filter((brandItem) => brandItem !== option)
                } else {
                    newBrands = [...brands_, option]
                }
                setBrands(newBrands)
                dispatch(
                    filteredProducts({
                        brands: newBrands,
                        electrodes_type: electrodeType,
                        electrodes_number: electrodeNumber,
                        seat_type: seatType_,
                        key_type: keyType_,
                        key_size: keySize_,
                        thread_size: threadSize_,
                    })
                )
            } else if (feature === 'electrode_type') {
                let newElectrodeType = []
                if (electrodeType.includes(option)) {
                    newElectrodeType = electrodeType.filter(
                        (item) => item !== option
                    )
                } else {
                    newElectrodeType = [...electrodeType, option]
                }
                setElectrodeType(newElectrodeType)
                dispatch(
                    filteredProducts({
                        electrodes_type: newElectrodeType,
                        electrodes_number: electrodeNumber,
                        brands: brands_,
                        seat_type: seatType_,
                        key_type: keyType_,
                        key_size: keySize_,
                        thread_size: threadSize_,
                    })
                )
            } else if (feature === 'electrode_number') {
                let newElectrodeNumber = []
                if (electrodeNumber.includes(option)) {
                    newElectrodeNumber = electrodeNumber.filter(
                        (item) => item !== option
                    )
                } else {
                    newElectrodeNumber = [...electrodeNumber, option]
                }
                setElectrodeNumber(newElectrodeNumber)
                dispatch(
                    filteredProducts({
                        electrodes_number: newElectrodeNumber,
                        brands: brands_,
                        electrodes_type: electrodeType,
                        seat_type: seatType_,
                        key_type: keyType_,
                        key_size: keySize_,
                        thread_size: threadSize_,
                    })
                )
            } else if (feature === 'seat_type') {
                let newSeatType = []
                if (seatType_.includes(option)) {
                    newSeatType = seatType_.filter((item) => item !== option)
                } else {
                    newSeatType = [...seatType_, option]
                }
                setSeatType(newSeatType)
                dispatch(
                    filteredProducts({
                        seat_type: newSeatType,
                        brands: brands_,
                        electrodes_type: electrodeType,
                        electrodes_number: electrodeNumber,
                        key_type: keyType_,
                        key_size: keySize_,
                        thread_size: threadSize_,
                    })
                )
            } else if (feature === 'key_type') {
                let newKeyType = []
                if (keyType_.includes(option)) {
                    newKeyType = keyType_.filter((item) => item !== option)
                } else {
                    newKeyType = [...keyType_, option]
                }
                setKeyType(newKeyType)
                dispatch(
                    filteredProducts({
                        key_type: newKeyType,
                        seat_type: seatType_,
                        brands: brands_,
                        electrodes_type: electrodeType,
                        electrodes_number: electrodeNumber,
                        key_size: keySize_,
                        thread_size: threadSize_,
                    })
                )
            } else if (feature === 'key_size') {
                let newKeySize = []
                if (keySize_.includes(option)) {
                    newKeySize = keySize_.filter((item) => item !== option)
                } else {
                    newKeySize = [...keySize_, option]
                }
                setKeySize(newKeySize)
                dispatch(
                    filteredProducts({
                        key_size: newKeySize,
                        key_type: keyType_,
                        seat_type: seatType_,
                        brands: brands_,
                        electrodes_type: electrodeType,
                        electrodes_number: electrodeNumber,
                        thread_size: threadSize_,
                    })
                )
            } else if (feature === 'thread_size') {
                let newThreadSize = []
                if (threadSize_.includes(option)) {
                    newThreadSize = threadSize_.filter((item) => item !== option)
                } else {
                    newThreadSize = [...threadSize_, option]
                }
                setThreadSize(newThreadSize)
                dispatch(
                    filteredProducts({
                        thread_size: newThreadSize,
                        key_size: keySize_,
                        key_type: keyType_,
                        seat_type: seatType_,
                        brands: brands_,
                        electrodes_type: electrodeType,
                        electrodes_number: electrodeNumber,
                    })
                )
            }
        }

        if(category === 'ignition_coils'){
            if (feature === 'brand') {
                let newBrands = []
                if (brands_.includes(option)) {
                    newBrands = brands_.filter((brandItem) => brandItem !== option)
                } else {
                    newBrands = [...brands_, option]
                }
                setBrands(newBrands)
                dispatch(
                    filteredProducts({
                        brands: newBrands,
                        plugs_number: plugsNumber_,
                        contacts_number: contactsNumber_
                    })
                )
            }else if (feature === 'plugs_number') {
                let newPlugsNumber = []
                if (plugsNumber_.includes(option)) {
                    newPlugsNumber = plugsNumber_.filter((item) => item !== option)
                } else {
                    newPlugsNumber = [...plugsNumber_, option]
                }
                setPlugsNumber(newPlugsNumber)
                dispatch(
                    filteredProducts({
                        plugs_number: newPlugsNumber,
                        contacts_number: contactsNumber_,
                        brands: brands_
                    })
                )
            } else if (feature === 'contacts_number') {
                let newContactsNumber = []
                if (contactsNumber_.includes(option)) {
                    newContactsNumber = contactsNumber_.filter((item) => item !== option)
                } else {
                    newContactsNumber = [...contactsNumber_, option]
                }
                setContactsNumber(newContactsNumber)
                dispatch(
                    filteredProducts({
                        contacts_number: newContactsNumber,
                        plugs_number: plugsNumber_,
                        brands: brands_
                    })
                )
            }
        }


        if(category === 'ignition_coil_mouthpieces'){
            if (feature === 'brand') {
                let newBrands = []
                if (brands_.includes(option)) {
                    newBrands = brands_.filter((brandItem) => brandItem !== option)
                } else {
                    newBrands = [...brands_, option]
                }
                setBrands(newBrands)
                dispatch(
                    filteredProducts({
                        brands: newBrands,
                        contact_type: contactType_,
                        wired: wired_
                    })
                )
            }else if (feature === 'contact_type') {
                let newContactType = []
                if (contactType_.includes(option)) {
                    newContactType = contactType_.filter((item) => item !== option)
                } else {
                    newContactType = [...contactType_, option]
                }
                setContactType(newContactType)
                dispatch(
                    filteredProducts({
                        contact_type: newContactType,
                        wired: wired_,
                        brands: brands_
                    })
                )
            } else if (feature === 'wired') {
                let newWired = []
                if (wired_.includes(option)) {
                    newWired = wired_.filter((item) => option !== item)
                } else {
                    newWired = [...wired_, option]
                }
                setWired(newWired)
                dispatch(
                    filteredProducts({
                        wired: newWired,
                        contact_type: contactType_,
                        brands: brands_
                    })
                )
            }
        }

        if(category === 'airbag_cables') {
            if (feature === 'brand') {
                let newBrands = []
                if (brands_.includes(option)) {
                    newBrands = brands_.filter((brandItem) => brandItem !== option)
                } else {
                    newBrands = [...brands_, option]
                }
                setBrands(newBrands)
                dispatch(
                    filteredProducts({
                        brands: newBrands
                    })
                )
            }
        }

        if(category === 'camshaft_sensors' || category === 'crankshaft_sensors') {
            if (feature === 'brand') {
                let newBrands = []
                if (brands_.includes(option)) {
                    newBrands = brands_.filter((brandItem) => brandItem !== option)
                } else {
                    newBrands = [...brands_, option]
                }
                setBrands(newBrands)
                dispatch(
                    filteredProducts({
                        brands: newBrands,
                        connection_types: connectionType_,
                        contact_number: contactNumber_,
                        wired: wired_
                    })
                )
            }else if (feature === 'connection_types') {
                let newConnectionTypes = []
                if (brands_.includes(option)) {
                    newConnectionTypes = connectionType_.filter((item) => item !== option)
                } else {
                    newConnectionTypes = [...connectionType_, option]
                }
                setConnectionType(newConnectionTypes)
                dispatch(
                    filteredProducts({
                        brands: brands_,
                        connection_types: newConnectionTypes,
                        contact_number: contactNumber_,
                        wired: wired_
                    })
                )
            }else if (feature === 'contacts_number') {
                let newContactNumber = []
                if (contactNumber_.includes(option)) {
                    newContactNumber = contactNumber_.filter((item) => item !== option)
                } else {
                    newContactNumber = [...contactNumber_, option]
                }
                setContactNumber(newContactNumber)
                dispatch(
                    filteredProducts({
                        brands: brands_,
                        connection_types: connectionType_,
                        contact_number: newContactNumber,
                        wired: wired_
                    })
                )
            }else if (feature === 'wired') {
                let newWired = []
                if (wired_.includes(option)) {
                    newWired = wired_.filter((item) => option !== item)
                } else {
                    newWired = [...wired_, option]
                }
                setWired(newWired)
                dispatch(
                    filteredProducts({
                        wired: newWired,
                        brands: brands_,
                        connection_types: connectionType_,
                        contact_number: contactNumber_
                    })
                )
            }
        }
    }

    return {handleOptionChange}
}

export default useFilter
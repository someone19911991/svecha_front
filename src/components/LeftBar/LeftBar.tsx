import React, {useEffect, useState, useRef} from 'react'
import styles from './leftbar.module.css'
import {
    brands,
    electrodesType,
    electrodesNumber,
    seatType,
    keyType,
    keySize,
    threadSize,
    plugsNumber,
    contactsNumber,
    contactNumber,
    contactType,
    connectionType
} from '../../consts'
import FilterItem from '../Filter/FilterItem'
import { useParams } from 'react-router-dom'
import useFilter from "../../hooks/useFilter";
import {AiFillFilter, AiFillCloseCircle, AiOutlineCloseCircle} from "react-icons/ai"
import {MdFilterListOff} from "react-icons/md"

const LeftBar = () => {
    const { category } = useParams()
    const { handleOptionChange, clearFilters } = useFilter()
    const [componentHeight, setComponentHeight] = useState(0)
    const buttonRef = useRef<HTMLButtonElement | null>(null)
    const leftBarRef = useRef<HTMLDivElement | null>(null)
    const [clearFilter, setClearFilter] = useState(false)

    const handleFilterClick = () => {
        if(leftBarRef?.current){
            leftBarRef.current?.classList?.add('left_bar_show')
        }
        if(buttonRef?.current){
            buttonRef.current?.classList?.add('filter_btn_hide')
        }
    }

    const handleCloseBtnClick = () => {
        if(leftBarRef?.current){
            leftBarRef.current?.classList?.remove('left_bar_show')
        }
        if(buttonRef?.current){
            buttonRef.current?.classList?.remove('filter_btn_hide')
        }
    }

    const handleClearFilters = () => {
        setClearFilter(true)
        setTimeout(() =>         setClearFilter(false), 1000)
        clearFilters()
    }

    useEffect(() => {
        const headerContent = document.querySelector<HTMLDivElement>('.header_content')
            if(headerContent){
                const {bottom} = headerContent.getBoundingClientRect();
                if(buttonRef.current){
                    buttonRef.current.style.top = `${bottom + 10}px`
                }
            }
    }, [])

    return (
        <>
            <button ref={buttonRef} onClick={handleFilterClick} className={styles.filter_btn}><AiFillFilter className={styles.filter_icon} /></button>
            <div ref={leftBarRef} className={styles.left_bar}>
                <div className={styles.left_bar_close_btn_container}>
                    <button onClick={handleClearFilters} title="Clear Filters"><MdFilterListOff className={styles.left_bar_close_btn} /></button>
                    <button title="Close"><AiOutlineCloseCircle onClick={handleCloseBtnClick} className={styles.left_bar_close_btn} /></button>
                </div>
                <FilterItem
                    clearFilter={clearFilter}
                    items={brands}
                    filterName={'Brand'}
                    option_name={'brand'}
                    handleOptionChange={handleOptionChange}
                />
                {category === 'spark_plugs' && (
                    <>
                        <FilterItem
                            clearFilter={clearFilter}
                            items={electrodesType}
                            filterName={'Electrode Type'}
                            option_name={'electrode_type'}
                            handleOptionChange={handleOptionChange}
                        />
                        <FilterItem
                            clearFilter={clearFilter}
                            items={electrodesNumber}
                            filterName={'Electrodes Number'}
                            option_name={'electrode_number'}
                            handleOptionChange={handleOptionChange}
                        />
                        <FilterItem
                            clearFilter={clearFilter}
                            items={seatType}
                            filterName={'Seat Type'}
                            option_name={'seat_type'}
                            handleOptionChange={handleOptionChange}
                        />
                        <FilterItem
                            clearFilter={clearFilter}
                            items={keyType}
                            filterName={'Key Type'}
                            option_name={'key_type'}
                            handleOptionChange={handleOptionChange}
                        />
                        <FilterItem
                            clearFilter={clearFilter}
                            items={keySize}
                            filterName={'Key Size'}
                            option_name={'key_size'}
                            handleOptionChange={handleOptionChange}
                        />
                        <FilterItem
                            clearFilter={clearFilter}
                            items={threadSize}
                            filterName={'Thread Size'}
                            option_name={'thread_size'}
                            handleOptionChange={handleOptionChange}
                        />
                    </>
                )}
                {
                    category === 'ignition_coils' && <>
                        <FilterItem
                            clearFilter={clearFilter}
                            items={plugsNumber}
                            filterName={'Plugs Number'}
                            option_name={'plugs_number'}
                            handleOptionChange={handleOptionChange}
                        />
                        <FilterItem
                            clearFilter={clearFilter}
                            items={contactsNumber}
                            filterName={'Contacts Number'}
                            option_name={'contacts_number'}
                            handleOptionChange={handleOptionChange}
                        />
                    </>
                }
                {
                    category === 'ignition_coil_mouthpieces' && <>
                        <FilterItem
                            clearFilter={clearFilter}
                            items={contactType}
                            filterName={'Contact Type'}
                            option_name={'contact_type'}
                            handleOptionChange={handleOptionChange}
                        />
                        <FilterItem
                            clearFilter={clearFilter}
                            items={['Wired', 'Not Wired']}
                            filterName={'Wired'}
                            option_name={'wired'}
                            handleOptionChange={handleOptionChange}
                        />
                    </>
                }
                {
                    (category === 'camshaft_sensors' || category === 'crankshaft_sensors') && <>
                        <FilterItem
                            clearFilter={clearFilter}
                            items={contactNumber}
                            filterName={'Contacts Number'}
                            option_name={'contacts_number'}
                            handleOptionChange={handleOptionChange}
                        />
                        <FilterItem
                            clearFilter={clearFilter}
                            items={connectionType}
                            filterName={'Connection Type'}
                            option_name={'connection_types'}
                            handleOptionChange={handleOptionChange}
                        />
                        <FilterItem
                            clearFilter={clearFilter}
                            items={['Wired', 'Not Wired']}
                            filterName={'Wired'}
                            option_name={'wired'}
                            handleOptionChange={handleOptionChange}
                        />
                    </>
                }
            </div>
        </>
    )
}

export default LeftBar

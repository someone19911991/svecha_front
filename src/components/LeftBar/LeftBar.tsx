import React from 'react'
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

const LeftBar = () => {
    const { category } = useParams()
    const { handleOptionChange } = useFilter()

    return (
        // <div className={styles.left_bar_container}>
        <div className={styles.left_bar}>
            <FilterItem
                items={brands}
                filterName={'Brand'}
                option_name={'brand'}
                handleOptionChange={handleOptionChange}
            />
            {category === 'spark_plugs' && (
                <>
                    <FilterItem
                        items={electrodesType}
                        filterName={'Electrode Type'}
                        option_name={'electrode_type'}
                        handleOptionChange={handleOptionChange}
                    />
                    <FilterItem
                        items={electrodesNumber}
                        filterName={'Electrodes Number'}
                        option_name={'electrode_number'}
                        handleOptionChange={handleOptionChange}
                    />
                    <FilterItem
                        items={seatType}
                        filterName={'Seat Type'}
                        option_name={'seat_type'}
                        handleOptionChange={handleOptionChange}
                    />
                    <FilterItem
                        items={keyType}
                        filterName={'Key Type'}
                        option_name={'key_type'}
                        handleOptionChange={handleOptionChange}
                    />
                    <FilterItem
                        items={keySize}
                        filterName={'Key Size'}
                        option_name={'key_size'}
                        handleOptionChange={handleOptionChange}
                    />
                    <FilterItem
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
                        items={plugsNumber}
                        filterName={'Plugs Number'}
                        option_name={'plugs_number'}
                        handleOptionChange={handleOptionChange}
                    />
                    <FilterItem
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
                        items={contactType}
                        filterName={'Contact Type'}
                        option_name={'contact_type'}
                        handleOptionChange={handleOptionChange}
                    />
                    <FilterItem
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
                        items={contactNumber}
                        filterName={'Contacts Number'}
                        option_name={'contacts_number'}
                        handleOptionChange={handleOptionChange}
                    />
                    <FilterItem
                        items={connectionType}
                        filterName={'Connection Type'}
                        option_name={'connection_types'}
                        handleOptionChange={handleOptionChange}
                    />
                    <FilterItem
                        items={['Wired', 'Not Wired']}
                        filterName={'Wired'}
                        option_name={'wired'}
                        handleOptionChange={handleOptionChange}
                    />
                </>
            }
        </div>
        // </div>
    )
}

export default LeftBar

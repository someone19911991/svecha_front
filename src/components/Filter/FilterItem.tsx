import React, {FC, useEffect, useRef, useState} from 'react'
import styles from './filter.module.css'

interface IFilterItem {
    items: Array<string>
    filterName: string
    option_name: string
    clearFilter: boolean,
    handleOptionChange: (
        e: React.ChangeEvent<HTMLInputElement>,
        feature: string
    ) => void,
}

const FilterItem: FC<IFilterItem> = ({items, filterName, option_name, handleOptionChange, clearFilter}) => {
    const inputRef = useRef<HTMLInputElement | null>(null)
    const inputLabelRef = useRef<HTMLLabelElement | null>(null)
    const [inputChecked, setInputChecked] = useState(false)

    useEffect(() => {
        if(clearFilter){
            let allInputs = document.querySelectorAll<HTMLInputElement>('input[type=checkbox]')
            for(let inp of allInputs){
                if(inp.checked){
                    inp.checked = false
                }
            }
        }
    }, [clearFilter])

    return (
        <div className={styles.filter_part}>
            <p className={styles.left_bar_title}>{filterName}</p>
            <ul className={styles.list}>
                {items.map((item) => (
                    <li key={item} className={styles.brand}>
                        <input
                            ref={inputRef}
                            id={item}
                            onChange={(e) => {
                                    handleOptionChange(e, option_name)
                                }
                            }
                            type="checkbox"
                            value={item}
                        />
                        <label ref={inputLabelRef} htmlFor={item}>{item}</label>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default FilterItem

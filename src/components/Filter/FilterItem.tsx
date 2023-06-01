import React, {FC} from 'react'
import styles from './filter.module.css'
import useFilter from '../../hooks/useFilter'

interface IFilterItem {
    items: Array<string>
    filterName: string
    option_name: string
    handleOptionChange: (
        e: React.ChangeEvent<HTMLInputElement>,
        feature: string
    ) => void
}

const FilterItem: FC<IFilterItem> = ({items, filterName, option_name, handleOptionChange}) => {

    return (
        <div className={styles.filter_part}>
            <p className={styles.left_bar_title}>{filterName}</p>
            <ul className={styles.list}>
                {items.map((item) => (
                    <li key={item} className={styles.brand}>
                        <input
                            id={item}
                            onChange={(e) =>
                                handleOptionChange(e, option_name)
                            }
                            type="checkbox"
                            value={item}
                        />
                        <label htmlFor={item}>{item}</label>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default FilterItem

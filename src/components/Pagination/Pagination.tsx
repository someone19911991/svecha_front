import React, {FC, useEffect, useState} from 'react';
import styles from "./pagination.module.css"
import {ImArrowLeft} from "react-icons/im"
import {ImArrowRight} from "react-icons/im"
import {useAppDispatch} from "../../hooks/redux";
import {setPagination} from "../../features/products/productsSlice";
import {useAppSelector} from "../../hooks/redux";
import {useLocation} from "react-router-dom";

interface IPaginationProps{productsCount: number, pageItemsCount: number, activePage: number, setActivePage: (activePage: number) => void}

const Pagination: FC<IPaginationProps> = ({productsCount, pageItemsCount, activePage, setActivePage}) => {
    const [pagesArr, setPagesArr] = useState<Array<string>>([])
    const location = useLocation()
    const dispatch = useAppDispatch()
    const {paginationActivePage} = useAppSelector(state => state.products)
    activePage = paginationActivePage[location.pathname] || activePage
    const pagesCount = Math.ceil(productsCount / pageItemsCount)
    const maxFollowingNumbers = 3

    useEffect(() => {
        if(!pagesArr.includes(`${activePage}`)){
            if(activePage - maxFollowingNumbers <= 1){
                setPagesArr(['1', '2', '3', '4', '...', `${pagesCount}`])
            }else if(activePage - maxFollowingNumbers > 1 && activePage + maxFollowingNumbers < pagesCount){
                setPagesArr(['1', '....', `${activePage - 1}`, `${activePage}`,  '...', `${pagesCount}`])
            }else{
                setPagesArr(['1', '...', `${pagesCount - 3}`, `${pagesCount - 2}`, `${pagesCount - 1}`, `${pagesCount}`])
            }
        }
    }, [activePage, pagesCount, maxFollowingNumbers])


    const handleActiveChange = (nextActivePage: string) => {
        if(nextActivePage === 'prev'){
            setActivePage(activePage - 1)
            dispatch(setPagination({paginationActivePage: {[location.pathname]: activePage - 1}}))
        }else if(nextActivePage === 'next'){
            setActivePage(activePage + 1)
            dispatch(setPagination({paginationActivePage: {[location.pathname]: activePage + 1}}))
        }else{
            setActivePage(parseInt(nextActivePage))
            dispatch(setPagination({paginationActivePage: {[location.pathname]: parseInt(nextActivePage)}}))
        }
    }

    return (
        <ul className={styles.pagination}>
            <li className={activePage === 1 ? styles.inactive : ''} onClick={() => handleActiveChange('prev')}><ImArrowLeft /></li>
            {pagesArr.map(page => <li className={page === `${activePage}` ? styles.active_page : ''} key={page} onClick={() => handleActiveChange(page)}>{page}</li>)}
            <li className={activePage === pagesCount ? styles.inactive : ''} onClick={() => handleActiveChange('next')}><ImArrowRight /></li>
        </ul>
    )
}

export default Pagination;
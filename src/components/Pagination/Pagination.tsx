import React, {FC, useEffect, useState} from 'react';
import styles from "./pagination.module.css"
import {ImArrowLeft} from "react-icons/im"
import {ImArrowRight} from "react-icons/im"
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {setPagination} from "../../features/products/productsSlice";
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
    const maxPaginationItemsCount = 6

    useEffect(() => {
        if(!pagesCount) return

        if(pagesCount <= 5){
            const pages = Array(pagesCount).fill(null).map((item, index) => `${index + 1}`)
            setPagesArr(pages)
        }else{
            const firstPages = ['1', '2', '3', '4', `${pagesCount}`]
            const lastPages = ['1', `${pagesCount - 3}`, `${pagesCount - 2}`, `${pagesCount - 1}`, `${pagesCount}`]
            let pagesArray: string[] = []
            if(firstPages.includes(`${activePage + 1}`)){
                setPagesArr(firstPages)
            }else if(lastPages.includes(`${activePage - 1}`)){
                setPagesArr(lastPages)
            }else{
                pagesArray = ['1', `${activePage - 1}`, `${activePage}`, `${activePage + 1}`, `${pagesCount}`]
                setPagesArr(pagesArray)
            }
        }
        setActivePage(activePage)

    }, [activePage, pagesCount, maxFollowingNumbers])


    const handleActiveChange = (nextActivePage: string) => {
        if(nextActivePage === 'prev'){
            if(activePage > 1){
                setActivePage(activePage - 1)
                dispatch(setPagination({paginationActivePage: {[location.pathname]: activePage - 1}}))
            }
        }else if(nextActivePage === 'next'){
            if(activePage < pagesCount){
                setActivePage(activePage + 1)
                dispatch(setPagination({paginationActivePage: {[location.pathname]: activePage + 1}}))
            }
        }else{
            setActivePage(parseInt(nextActivePage))
            dispatch(setPagination({paginationActivePage: {[location.pathname]: parseInt(nextActivePage)}}))
        }
    }

    return (
        <ul className={styles.pagination}>
            {/*<li className={activePage === 1 ? styles.inactive : ''} onClick={() => handleActiveChange('prev')}><ImArrowLeft /></li>*/}
            {pagesArr.map(page => <li className={page === `${activePage}` ? styles.active_page : ''} key={Math.random()} onClick={() => handleActiveChange(page)}>{page}</li>)}
            {/*<li className={activePage === pagesCount ? styles.inactive : ''} onClick={() => handleActiveChange('next')}><ImArrowRight /></li>*/}
        </ul>
    )
}

export default Pagination;
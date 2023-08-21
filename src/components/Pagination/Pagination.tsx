import React, {FC, useEffect, useState} from 'react';
import styles from "./pagination.module.css"
import {ImArrowLeft} from "react-icons/im"
import {ImArrowRight} from "react-icons/im"

import {useAppDispatch} from "../../hooks/redux";

interface IPaginationProps{productsCount: number, pageItemsCount: number, activePage: number, setActivePage: (activePage: number) => void}

const Pagination: FC<IPaginationProps> = ({productsCount, pageItemsCount, activePage, setActivePage}) => {
    const dispatch = useAppDispatch()
    const pagesCount = Math.ceil(productsCount / pageItemsCount)
    const followingPages = 5
    const [followingPagesArr, setFollowingPagesArr] = useState<Array<string>>([])
    const [allPages, setAllPages] = useState<Array<string>>([])

    const generateFollowingPages = (start: number, end: number) => {
        const arrToOutput = []
        for(let i = start; i <= end; i++){
            arrToOutput.push(`${i}`)
        }
        return arrToOutput
    }

    const changeActiveShort = (nextActive: string) => {
        let nextActiveNum: number;
        if(nextActive === 'next'){
            nextActiveNum = activePage + 1
        }else if(nextActive === 'prev'){
            nextActiveNum = activePage - 1
        }else{
            nextActiveNum = parseInt(nextActive)
        }
        setActivePage(nextActiveNum)
    }

    const changeActive = (nextActive: string) => {
        let nextActiveNum: number;
        if(nextActive === 'next'){
            nextActiveNum = activePage + 1
        }else if(nextActive === 'prev'){
            nextActiveNum = activePage - 1
        }else{
            nextActiveNum = parseInt(nextActive)
        }

        let finalArr: Array<string> = []
        let fPages: Array<string> = []
        if(nextActiveNum <= followingPages){
            fPages = [...Array(followingPages).keys()].map(x => `${++x}`)
            finalArr = [...fPages, '...', `${pagesCount}`]
        }else if(nextActiveNum > followingPages && nextActiveNum >= (pagesCount - (followingPages - 1))){
            fPages = [...Array(5).keys()].map((x, index) => `${pagesCount - (followingPages - 1) + index}`)
            finalArr = ['1', '...', ...fPages]
        }else if(nextActiveNum > followingPages && nextActiveNum < (pagesCount - (followingPages - 1))){
            if(!followingPagesArr.includes(`${nextActiveNum}`)){
                if(parseInt(followingPagesArr[0]) > nextActiveNum){
                    for(let i = nextActiveNum; i <= nextActiveNum + followingPages - 1; i++){
                        fPages.push(`${i}`)
                    }
                    finalArr = ['1', '...', ...fPages, '....', `${pagesCount}`]
                }else if(parseInt(followingPagesArr[followingPages - 1]) < nextActiveNum){
                    let i = nextActiveNum - followingPages + 1
                    fPages = generateFollowingPages(i, nextActiveNum)
                    finalArr = ['1', '...', ...fPages, '....', `${pagesCount}`]
                }
            }else{
                finalArr = allPages
                fPages = followingPagesArr
            }
        }

        setFollowingPagesArr(fPages)
        setActivePage(nextActiveNum)
        setAllPages(finalArr)
    }

    const handlePrevChange = () => {
        if(activePage === 1){
            return
        }
        pagesCount <= followingPages ? changeActiveShort('prev') : changeActive('prev')
    }

    const handleNextChange = () => {
        if(activePage === pagesCount){
            return
        }
        pagesCount <= followingPages ? changeActiveShort('next') : changeActive('next')
    }

    const handleActiveChange = (arg: string) => {
        if(arg === '...' || arg === '....'){
            return
        }
        if(arg === 'prev'){
            if(activePage === 1){
                return
            }else{
                pagesCount <= followingPages ? changeActiveShort('prev') : changeActive('prev')
            }
        }else if(arg === 'next'){
            if(activePage === pagesCount){
                return
            }else{
                pagesCount <= followingPages ? changeActiveShort('next') : changeActive('next')
            }
        }else{
            pagesCount <= followingPages ? changeActiveShort(arg) : changeActive(arg)
        }
    }

    useEffect(() => {
        if(pagesCount){
            if(pagesCount <= followingPages){
                const pagesToSet = generateFollowingPages(1, pagesCount)
                setAllPages(pagesToSet)
                setFollowingPagesArr(pagesToSet)
            }else{
                changeActive('1')
            }
        }
    }, [pagesCount])

    return (
        <ul className={styles.pagination}>
            <li className={activePage === 1 ? styles.inactive : ''} onClick={() => handleActiveChange('prev')}><ImArrowLeft /></li>
            {allPages.map(page => <li className={page === `${activePage}` ? styles.active_page : ''} key={page} onClick={() => handleActiveChange(page)}>{page}</li>)}
            <li className={activePage === pagesCount ? styles.inactive : ''} onClick={() => handleActiveChange('next')}><ImArrowRight /></li>
        </ul>
    )
};

export default Pagination;
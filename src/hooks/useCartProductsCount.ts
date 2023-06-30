import { ICartState } from '../features/cart/cartSlice'
import { useEffect, useRef } from 'react'
import { IProduct } from '../interfaces'

const useCartProductsCount = ({
    cart,
    productType,
    product_id,
    product,
    productCount_,
}: {
    cart: ICartState
    productType: string
    product_id: number
    productCount_: { original: number; copy: number }
    product: IProduct
}) => {
    const productCount = useRef<{ original: number; copy: number }>({
        original: 0,
        copy: 0,
    })
    const inputDisabled = useRef(false)
    const btnDisabled = useRef(false)
    const countBtnDisabled = useRef(false)
    const prCount = { ...productCount_ } as { [key: string]: number }
    const count = prCount[productType]
    const cartProduct = cart.products.find(
        (productItem) => productItem.product_id === product_id
    )

    if (!product) {
        return {
            productCount: { original: 0, copy: 0 },
            disabled: false,
            btnDisabled: false,
        }
    }

    if (product) {
        if(prCount[productType] <= 0){
            btnDisabled.current = true
            if((productType === 'original' && product.count_original <= 0) || (productType === 'copy' && product.count_copy <= 0)){
                inputDisabled.current = true
                countBtnDisabled.current = true
            }else{
                inputDisabled.current = false
                countBtnDisabled.current = false
            }
        }else if ((productType === 'original' && product.count_original <= 0) || (productType === 'copy' && product.count_copy <= 0)) {
            countBtnDisabled.current = true
            btnDisabled.current = true
            inputDisabled.current = true
        }else if((productCount_.copy === 0 && productType === 'copy') || (productCount_.original === 0 && productType === 'original')){
            btnDisabled.current = true
            countBtnDisabled.current = false
            inputDisabled.current = false
        }else{
            countBtnDisabled.current = false
            btnDisabled.current = false
            inputDisabled.current = false
        }
    }

    if (cartProduct) {
        if (productType === 'original') {
            const copy = cartProduct.count_copy || 0
            if (count > product.count_original) {
                productCount.current = {
                    copy,
                    original: product.count_original,
                }
            } else if (count < 0) {
                productCount.current = { copy, original: 0 }
            } else {
                productCount.current = { copy, original: count }
            }
        } else if (productType === 'copy') {
            const original = cartProduct.count_original || 0
            if (count > product.count_copy) {
                productCount.current = { original, copy: product.count_copy }
            } else if (count < 0) {
                productCount.current = { original, copy: 0 }
            } else {
                productCount.current = { original, copy: count }
            }
        }
    } else {
        if (productType === 'original') {
            const copy = 0
            if (count > product.count_original) {
                productCount.current = {
                    copy,
                    original: product.count_original,
                }
            } else if (count < 0) {
                productCount.current = { copy, original: 0 }
            } else {
                productCount.current = { copy, original: count }
            }
        } else if (productType === 'copy') {
            let original = 0
            if (count > product.count_copy) {
                productCount.current = { original, copy: product.count_copy }
            } else if (count < 0) {
                productCount.current = { original, copy: 0 }
            } else {
                productCount.current = { original, copy: count }
            }
        }
    }

    return {
        productCount: productCount.current,
        btnDisabled: btnDisabled.current,
        countBtnDisabled: countBtnDisabled.current,
        inputDisabled: inputDisabled.current,
        count: btnDisabled.current,
    }
}

export default useCartProductsCount

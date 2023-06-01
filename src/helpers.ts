import { IErrorResponse, IProduct } from './interfaces'
import { ICartState } from './features/cart/cartSlice'

export const transformErrorResponseHandler = (
    errorResponse: IErrorResponse
) => {
    return errorResponse.data.message
}

export const categoriesArray = [
    'spark_plugs',
    'ignition_coils',
    'airbag_cables',
    'ignition_coil_mouthpieces',
    'crankshaft_sensors',
    'camshaft_sensors',
]

export const addCartToLS = (cart: ICartState) => {
    const stringifiedCart = JSON.stringify(cart)
    localStorage.setItem('svecha_cart', stringifiedCart)
}

export const getCartFromLS = (): ICartState | undefined => {
    const stringifiedCart = localStorage.getItem('svecha_cart')
    if(stringifiedCart){
        const cart: ICartState = JSON.parse(stringifiedCart)
        return cart
    }
}

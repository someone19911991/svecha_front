export interface IUser {
    id: number
    email: string
    username: string
}

export interface IAuth {
    user: IUser
    accessToken: string
}

export type IBasicProduct = {
    product_id: number
    brand: string
    model: string
    detail_number: number
    refs: Array<{ref_num: string, brand: string}>
    eoms: Array<{oem: string, model: string}>
    img: string
    count: number
    price_original: number
    price_copy: number
    category_name: string
    key_type?: 'конический' | 'шайбовый'
    key_size?: '12' | '16' | '21'
    thread_size?: number
    thread_length?: number
    gap?: number
    electrodes_number?: '1' | '2' | '3' | '4'
    electrode_type?: 'медь' | 'платина' | 'иридий'
    plugs_number?: '1' | '2'
    contacts_number?: '1' | '2' | '3' | '4'
    steering_axle_bore_diameter?: number
    airbag_plugs_number?: number
}

export interface ISparkPlug extends IBasicProduct {
    id: number
    key_type: 'конический' | 'шайбовый'
    key_size: '12' | '16' | '21'
    thread_size: number
    thread_length: number
    gap: number
    electrodes_number: '1' | '2' | '3' | '4'
    electrode_type: 'медь' | 'платина' | 'иридий'
}

export interface IIgnitionCoil extends IBasicProduct {
    id: number
    plugs_number: '1' | '2'
    contacts_number: '1' | '2' | '3' | '4'
    product_id: number
}

export interface IAirbagCable extends IBasicProduct {
    id: number
    steering_axle_bore_diameter: number
    airbag_plugs_number: number
    product_id: number
}

export interface IProduct{
    product_id: number
    brand: string
    model: string
    detail_number: number
    refs: Array<{ref_num: string, brand: string}>
    oems: Array<{oem: string, model: string}>
    discount: number
    img?: string
    imgs: [{img: string, master: number }]
    count_original: number
    count_copy: number
    price: number
    category_name: string
    price_original: number
    price_copy: number
    top_selling: number
    key_type?: 'многогранник' | 'шестигранник'
    key_size?: '12' | '16' | '21'
    thread_size?: number
    thread_length?: number
    seat_type?: string
    contact_type?: string
    contact_number?: string
    connection_type?: string
    gap?: number
    wired?: number
    type_?: string
    electrodes_number?: '1' | '2' | '3' | '4'
    electrode_type?: 'медь' | 'платина' | 'иридий'
    plugs_number?: '1' | '2'
    contacts_number?: '1' | '2' | '3' | '4'
    steering_axle_bore_diameter?: number
    airbag_plugs_number?: number
}

export interface ISignIn {
    email: string
    password: string
}

export interface ICategory {
    category_id: number
    name: string
    name_: string
    img: string
}

export interface IBrand {
    id: number
    name: string
    img: string
}

export interface ICategoryBrand{
    id?: number
    category_id?: number
    name_?: string
    name: string
    img: string
}

export interface IErrorResponse {
    status: number
    data: { message: string }
}

export interface IOrder{
    name: string
    phone: string
    message: string
}

export interface IProductOrderItem{
    product_id: number
    product_type: string
    count: number
}

export interface IProductOrder{
    order: Array<IProductOrderItem>
    phone: string
}

export interface IMessage{
    name: string,
    phone: string,
    message: string
}

export type RefType = Array<{ref_num: string, brand: string}>
export type OemType = Array<{oem: string, model: string}>
export type ObjectOfArrays = {[key: string]: Array<string>}
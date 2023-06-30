import i18next from 'i18next'
import { useEffect, useState } from 'react'
import { IProduct } from '../interfaces'
import { useTranslation } from 'react-i18next'

export interface IPropsToTranslate {
    key_type?: string
    contact_type?: string
    type_?: string
    connection_type?: string
    electrode_type?: string
    seat_type?: string
}

const useLangChange = (product: IProduct, lng: string) => {
    const { t } = useTranslation()
    const [translatedProps, setTranslatedProps] = useState<IPropsToTranslate>({} as IPropsToTranslate)

    useEffect(() => {
        const propsToTranslate = {
            key_type: '',
            contact_type: '',
            type_: '',
            connection_type: '',
            electrode_type: '',
            seat_type: '',
        }
        if (product?.key_type) {
            switch (product.key_type) {
                case 'шестигранник':
                    propsToTranslate.key_type = t('product_features.hexagon')
                    break
                case 'многогранник':
                    propsToTranslate.key_type = t('product_features.polyhedron')
                    break
            }
        }

        if (product?.contact_type) {
            switch (product.contact_type) {
                case 'пружина':
                    propsToTranslate.contact_type = t('product_features.spring')
                    break
                case 'пружина + резистор':
                    propsToTranslate.contact_type = t(
                        'product_features.spring_resistor'
                    )
                    break
            }
        }
        if (product?.type_) {
            switch (product.type_) {
                case 'резиновый':
                    propsToTranslate.type_ = t('product_features.rubber')
                    break
                case 'фибр':
                    propsToTranslate.type_ = t('product_features.fiber')
                    break
            }
        }
        if (product?.connection_type) {
            switch (product.connection_type) {
                case 'кругло-квалратный':
                    propsToTranslate.connection_type = t(
                        'product_features.round_square'
                    )
                    break
                case 'круглый':
                    propsToTranslate.connection_type = t(
                        'product_features.round'
                    )
                    break
                case 'квадратный':
                    propsToTranslate.connection_type = t(
                        'product_features.square'
                    )
                    break
            }
        }
        if (product?.electrode_type) {
            switch (product.electrode_type) {
                case 'медь':
                    propsToTranslate.electrode_type = t(
                        'product_features.copper'
                    )
                    break
                case 'платина':
                    propsToTranslate.electrode_type = t(
                        'product_features.platinum'
                    )
                    break
                case 'иридий':
                    propsToTranslate.electrode_type = t(
                        'product_features.iridium'
                    )
                    break
            }
        }
        if (product?.seat_type) {
            switch (product.seat_type) {
                case 'конический':
                    propsToTranslate.seat_type = t('product_features.conical')
                    break
                case 'шайбовый':
                    propsToTranslate.seat_type = t('product_features.puck')
                    break
            }
        }

        setTranslatedProps({...translatedProps, ...propsToTranslate})
    }, [lng, product])

    return translatedProps
}

export default useLangChange

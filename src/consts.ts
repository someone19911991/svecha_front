import spark_plugs from './imgs/spark_plugs.jpg'
import airbag_cables from './imgs/airbag_cables.jpeg'
import crankshaft_sensors from './imgs/crankshaft_sensors.jpeg'
import camshaft_sensors from './imgs/camshaft_sensors.jpeg'
import ignition_coils from './imgs/ignition_coils.jpg'
import ignition_coil_mouthpieces from './imgs/ignition_coil_mouthpieces.jpeg'
import clients from "./imgs/clients.jpg"
import car4 from "./imgs/car4.jpg"
import car5 from "./imgs/car5.jpg"
import car6 from "./imgs/car6.jpg"

// export const backURL = 'https://back.svecha.am'
export const backURL = 'http://localhost:5000'
export const frontURL = 'https://svecha.am'
// export const frontURL = 'http://localhost:3000'

export const categoryImages = [
    {img: spark_plugs, url: '/products/spark_plugs'},
    {img: airbag_cables, url: '/products/airbag_cables'},
    {img: crankshaft_sensors, url: '/products/crankshaft_sensors'},
    {img: camshaft_sensors, url: '/products/camshaft_sensors'},
    {img: ignition_coils, url: '/products/ignition_coils'},
    {img: ignition_coil_mouthpieces, url: '/products/ignition_coil_mouthpieces'},
]

export const categoryNames = ['spark_plugs', 'airbag_cables', 'crankshaft_sensors', 'camshaft_sensors', 'ignition_coils', 'ignition_coil_mouthpieces']

export const brands = [
    'Bosch',
    'Champion',
    'Denso',
    'ACDelco',
    'Motorcraft',
    'NGK'
]
export const electrodesType = ['медь', 'платина', 'иридий']
export const electrodesNumber = ['1', '2', '3', '4']
export const seatType = ['конический', 'шайбовый']
export const keyType = ['шестигранник', 'многогранник']
export const keySize = ['12', '16', '21']
export const threadSize = ['10', '12', '14']
export const plugsNumber = ['1', '2']
export const contactsNumber = ['1', '2', '3', '4']
export const contactNumber = ['1', '2', '3']
export const contactType = ['пружина', 'пружина + резистор']
export const connectionType = [
    'кругло-квалратный',
    'круглый',
    'квадратный',
]
import {$authHost, $host} from "./index";

export const createOrder = async (order) => {
    const {data} = await $authHost.post('api/order', order)
    return data
}

export const updateOrder = async (id, order) => {
    const {data} = await $authHost.put(`api/order/${id}`, order)
    return data
}

export const updateOrderStatus = async (id, order) => {
    const {data} = await $authHost.put(`api/order/${id}/status`, order)
    return data
}

export const deleteOrder= async (id) => {
    const {data} = await $authHost.delete(`api/order/${id}`)
    return data
}

export const fetchOrders = async () => {
    const {data} = await $host.get('api/order')
    return data
}

export const fetchActiveOrders = async () => {
    const {data} = await $authHost.get('api/order/active')
    return data
}

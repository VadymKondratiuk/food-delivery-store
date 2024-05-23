import {$authHost, $host} from "./index";

export const createBasketItem = async (basket_item) => {
    const {data} = await $authHost.post('api/basket', basket_item)
    return data
}
               
export const deleteBasketItem = async (id) => {
    const {data} = await $authHost.delete(`api/basket/${id}`)
    return data
}

export const deleteBasketItemForUser = async (userId) => {
    const {data} = await $authHost.delete(`api/basket/user/${userId}`)
    return data
}


export const fetchBasketItemForUser = async (userId) => {
    const {data} = await $host.get(`api/basket/${userId}`)
    return data
}

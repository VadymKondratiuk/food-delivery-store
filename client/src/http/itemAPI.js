import {$authHost, $host} from "./index";

export const createItem = async (item) => {
    const {data} = await $authHost.post('api/item', item)
    return data
}

export const updateItem = async (id, item) => {
    const {data} = await $authHost.put(`api/item/${id}`, item)
    return data
}

export const deleteItem = async (id) => {
    const {data} = await $authHost.delete(`api/item/${id}`)
    return data
}

export const fetchItems = async (typeId, page, limit= 5) => {
    const {data} = await $host.get('api/item', {params: {
            typeId, page, limit
        }})
    return data
}

export const fetchOneItem = async (id) => {
    const {data} = await $host.get('api/item/' + id)
    return data
}
import { makeAutoObservable } from 'mobx'

export default class ItemStore {
    constructor() {
        this._types = []
        this._items = []
        this._basket = []
        this._basket_items = []
        this._orders = []
        this._selectedType = {}
        this._selectedItem = {}
        this._page = 1
        this._totalCount = 0
        this._limit = 3

        makeAutoObservable(this)
    }

    setTypes(types) {
        this._types = types
    }

    setItems(items) {
        this._items = items
    }

    setBasket(basket) {
        this._basket = basket
    }
    
    setOrders(orders) {
        this._orders = orders
    }

    setBasketItems(basket_items) {
        this._basket_items = basket_items
    }

    setSelectedType(selectedType) {
        this._selectedType = selectedType
    }

    setSelectedItem(selectedItem) {
        this._selectedItem = selectedItem
    }

    setPage(page) {
        this._page = page
    }

    setTotalCount(totalCount) {
        this._totalCount = totalCount
    }

    setLimit(limit) {
        this._limit = limit
    }

    get types(){
        return this._types
    }

    get items() {
        return this._items
    }

    get basket() {
        return this._basket
    }

    get orders() {
        return this._orders
    }

    get basket_items() {
        return this._basket_items
    }

    get selectedType() {
        return this._selectedType
    }

    get selectedItem() {
        return this._selectedItem
    }

    get page() {
        return this._page
    }

    get totalCount() {
        return this._totalCount
    }

    get limit() {
        return this._limit
    }
}

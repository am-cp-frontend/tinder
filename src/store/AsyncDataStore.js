import {observable} from 'mobx'

export default class AsyncDataStore {
    @observable loaded
    @observable data

    constructor(defaults) {
        this.defaults = defaults
        this.reset()
    }

    load(data) {
        this.data = data 
        this.loaded = true
    }

    reset() {
        this.loaded = false
        this.data = this.defaults
    }
}
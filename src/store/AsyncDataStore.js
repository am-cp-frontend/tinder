import {observable} from 'mobx'

export default class AsyncDataStore {
    @observable loading
    @observable data

    constructor() {
        this.reset()
    }

    load(data) {
       this.loading = false
       this.data = data  
    }

    reset() {
        this.loading = true
        this.data = {}
    }
}
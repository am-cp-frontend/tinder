import React from 'react'

import {observable} from 'mobx'

import AsyncDataStore from './AsyncDataStore'

class MainStore {
    @observable user = {
        auth: false,
        type: 'student'
    }
    @observable selectedFields = []
    constructor() {
        this.route = new AsyncDataStore()

        this.mount = {}
    }
}

const store = new MainStore()

export default store
import React from 'react'

import {observable} from 'mobx'
import {RouterStore} from 'mobx-router'

import AsyncDataStore from './AsyncDataStore'

class MainStore {
    @observable user = undefined
    @observable selectedFields = []
    constructor() {
        this.router = new RouterStore()
        this.route = new AsyncDataStore()

        this.mount = {}
    }
}

const store = new MainStore()

export default store
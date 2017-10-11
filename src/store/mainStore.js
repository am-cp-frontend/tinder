import React from 'react'

import {observable} from 'mobx'

const defaultUserType = 'student'

class MainStore {
    @observable user = {
        auth: false,
        type: defaultUserType,
        token: '',
        id: '',
        destination: ''
    }
    @observable notifications = []
    @observable mounted = {}
    constructor() {
        this.nextMountId = 0
    }

    resetUser() {
        this.user.auth = false,
        this.user.id = '',
        this.user.type= defaultUserType
    }

    mount(subStore) {
        this.nextMountId++
        this.mounted[this.nextMountId] = subStore
        return this.nextMountId
    }

    unmount(id) {
        delete this.mounted[id]
    }
}

const store = new MainStore()

export default store
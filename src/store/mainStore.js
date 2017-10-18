import React from 'react'

import {observable} from 'mobx'

const notificationTimeout = 10 * 1000 //1000 is 1 sec
const defaultUserType = 'student'

let notificationId = 0

class MainStore {
    @observable user = {
        auth: false,
        type: defaultUserType,
        id: '',
        destination: '',
        reset: function() {
            console.log('reset', this, this.auth)
            this.auth = false,
            this.id = '',
            this.type= defaultUserType

            return this.auth
        }
    }
    @observable notifications = []
    @observable mounted = {}
    constructor() {
        this.nextMountId = 0
        this.notifications.add = item => {
            item._id = notificationId++
            this.notifications.push(item)

            setTimeout(() => {
                for(let i = 0; i< this.notifications.length; i++) {
                    if(this.notifications[i]._id === item._id) {
                        this.notifications.splice(i, 1)
                        break
                    }
                }
                
            }, notificationTimeout)
        }
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
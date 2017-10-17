import React from 'react'
import { Redirect } from 'react-mobx-router'
import { inject } from 'mobx-react'

import getAuth from '@utility/getAuth'

const errorToRus = {
    'Error: Link not found': 'Ссылка для входа устарела, запросите новую'
}

const AuthRoute = inject('store')(props => {
    const authResult = getAuth(props.store)
    const user = props.store.user

    if(authResult.ok) {
        user.auth = true
        user.type = authResult.data.type
        user.id = authResult.data.id
        return <Redirect to='/mentor-edit/' />
    } else {
        user.reset()
        props.store.notifications.push({
            type: 'error',
            message: errorToRus[authResult.data] || 'Ошибка входа'
        })
    }

    return <Redirect to='/login/' />
})

export default AuthRoute
import React from 'react'
import { Redirect } from 'react-mobx-router'
import { inject } from 'mobx-react'

import getAuth from '@utility/getAuth'

const errorToRus = error => {
    if(error === 'Error: Link not found')
        return 'Ссылка для входа устарела, запросите новую'
    
    if(error === undefined) 
        return 'Нужно войти по ссылке, которую вам отправили на email'

    console.error(error)
    return 'Неизвестная ошибка входа, попробуйте еще раз'
}

const AuthRoute = inject('store')(props => {
    const authResult = getAuth()
    const user = props.store.user

    if(authResult.ok) {
        user.auth = true
        user.type = authResult.data.type
        user.id = authResult.data.id
        return <Redirect to={user.destination || '/mentor-edit/'} />
    } else {
        user.reset()
        props.store.notifications.add({
            type: 'error',
            message: errorToRus(authResult.data)
        })
    }

    return <Redirect to='/login/' />
})

export default AuthRoute
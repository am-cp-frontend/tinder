import React from 'react'
import { inject, observer } from 'mobx-react'
import { observable, autorun } from 'mobx'

import ViewBox from '@components/_utility/ViewBox~'
import LoginView from '@components/auth/Login~'
import AsyncDataStore from '@store/AsyncDataStore'

import request from '@utility/request'

const handleLogin = (authData, userStore, historyStore) => {
    userStore.auth = true
    userStore.type = authData.type
    userStore.token = authData.token
    userStore.id = authData.id

    if(userStore.destination) {
        historyStore.push(userStore.destination)
        userStore.destination = ''
    } else {
        historyStore.push('/mentor-edit')
    }
}

const emailRegexp = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
const verifyEmail = email => emailRegexp.test(email)

const errorToRus = error => {
    if(error === 'Not found')
        return 'Убедитесь, что вы указали тот же email, что и на сайте СПбГУ'

    console.error(error)
    return 'Неизвестная ошибка входа, попробуйте еще раз'
}

@inject('store')
@observer
class LoginRoute extends React.Component {
    @observable sendState = 'todo'
    componentWillMount() {
        this.email = ''
    }

    sendMagic() {
        if(verifyEmail(this.email)) {
            this.sendState = 'sending'
            const sendStore = new AsyncDataStore({})

            autorun(() => {
                if(sendStore.loaded) {
                    if(sendStore.data.ok) {
                        this.sendState = 'sent'
                    } else {
                        this.sendState = 'todo'
                        sendStore.data.data = sendStore.data.data || {error: 'Неизвестная ошибка'}
                        this.props.store.notifications.add({
                            type: 'error',
                            message: errorToRus(sendStore.data.data.error)
                        })
                    }
                }
            })

            request({
                type: 'POST',
                url: '/auth/sendMagic',
                data: {email: this.email}
            }, sendStore)
        } else {
            this.props.store.notifications.add({
                type: 'warning',
                message: 'Убедитесь, что вы ввели верный email'
            })
        }
    }

    handleEmailChange(e) {
        this.email = e.target.value
    }

    handleEmailSwap() {
        console.log('swap')
        this.email = ''
        this.sendState = 'todo'
    }

    componentWillMount() {        
        document.title = 'Вход'
    }

    render() {
        return (
            <ViewBox center='all'>
                <LoginView handleEmailChange={e => this.handleEmailChange(e)}
                           sendState={this.sendState}
                           onEmailSwap={() => this.handleEmailSwap()}
                           onResend={() => this.sendMagic()}
                           onSubmit={() => this.sendMagic()}
                           email={this.email} />
            </ViewBox>
        )
    }
}

export default LoginRoute
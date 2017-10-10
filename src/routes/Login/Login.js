import React from 'react'
import { inject, observer } from 'mobx-react'
import { observable } from 'mobx'

import ViewBox from '@components/_utility/ViewBox~'
import LoginView from '@components/auth/Login~'



//stabs
import {auth} from '@src/store/fetchStabs.toRemove'

class LoginStore {
    @observable login = ''
}

const handleLogin = (authData, userStore, historyStore) => {
    userStore.auth = true
    userStore.type = authData.type
    userStore.token = authData.token

    if(userStore.destination) {
        historyStore.push(userStore.destination)
        userStore.destination = ''
    } else {
        historyStore.push('/mentor-edit')
    }
}

@inject('store', 'history')
class AuthRoute extends React.Component {
    constructor(props) { 
        super(props)
    }

    handleLoginChange(e) {
        this.store.login = e.target.value
    }

    handlePasswordChange(e) {
        this.store.password = e.target.value
    }

    attemptLogin() {
        auth({
            login: this.store.login,
            password: this.store.password,
        }, data => {
            if(data.error) {
                return mainStore.notifications.push({
                    type: 'error', message: data.message
                })
            } 

            handleLogin(
                data,
                this.props.store.user,
                this.props.history,
            )
        })

        return false
    }

    componentWillMount() {
        
        this.store = new LoginStore()
        
        document.title = 'Вход'
    }

    render() {
        return (
            <ViewBox center='all'>
                <LoginView handleLoginChange={e => this.handleLoginChange(e)}
                           handlePasswordChange={e => this.handlePasswordChange(e)}
                           onSubmit={() => this.attemptLogin()} />
            </ViewBox>
        )
    }
}

export default AuthRoute
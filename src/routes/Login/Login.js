import React from 'react'
import { inject, observer } from 'mobx-react'
import { observable } from 'mobx'

import ViewBox from '@components/_utility/ViewBox~'
import LoginView from '@components/auth/Login~'



//stabs
import {auth} from '@src/store/fetchStabs.toRemove'

class LoginStore {
    @observable login = ''
    @observable password = ''
}

@inject('store')
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
        const mainStore = this.props.store
        console.log('trying to log in w/', this.store)

        auth({
            login: this.store.login,
            password: this.store.password,
        }, data => {
            console.log(data)
            if(data.error) 
                return mainStore.notifications.push({type: 'error', message: data.message})
            
                mainStore.user.auth = true
            mainStore.user.type = data.type
            mainStore.user.token = data.token
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
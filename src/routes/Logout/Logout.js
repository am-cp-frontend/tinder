import React from 'react'
import { inject, observer } from 'mobx-react'
import { untracked, action } from 'mobx'
import { Redirect } from 'react-mobx-router'
import Cookies from 'js-cookie'

import ViewBox from '@components/_utility/ViewBox~'
import Spinner from '@components/_utility/Spinner~'
import AsyncDataStore from '@store/AsyncDataStore'

import request from '@utility/request'

//stabs
import {auth} from '@src/store/fetchStabs.toRemove'

@inject('store')
@observer
class AuthRoute extends React.Component {
    constructor(props) { 
        super(props)
    }

    componentWillMount() {
        document.title = 'Выход'
        this.store = new AsyncDataStore({})
        request('/auth/logout', this.store)
    }

    @action resetUser() {
        console.log(this.props.store.user.reset())
    }

    render() {
        if(this.store.loaded && this.store.data.ok) {
            this.resetUser()
            Cookies.remove('user')
            Cookies.remove('authError')
            return <Redirect to='/find' />
        }

        return (
            <ViewBox center='horizontal'>
                <Spinner />
            </ViewBox>
        )
    }
}

export default AuthRoute
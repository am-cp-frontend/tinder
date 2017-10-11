import React from 'react'
import { inject } from 'mobx-react'
import { Redirect } from 'react-mobx-router'

import ViewBox from '@components/_utility/ViewBox~'
import LoginView from '@components/auth/Login~'



//stabs
import {auth} from '@src/store/fetchStabs.toRemove'

@inject('store')
class AuthRoute extends React.Component {
    constructor(props) { 
        super(props)
    }

    componentWillMount() {
        document.title = 'Выход'
        this.props.store.resetUser()
    }

    render() {
        return <Redirect to='/find' />
    }
}

export default AuthRoute
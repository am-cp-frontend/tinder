import React from 'react'
import { inject, observer } from 'mobx-react'
import { autorun, untracked } from 'mobx'

import ViewBox from '@components/_utility/ViewBox~'
import LoginView from '@components/auth/Login~'



//stabs
import {auth} from '@src/store/fetchStabs.toRemove'

@inject('store') @observer
class AuthRoute extends React.Component {
    constructor(props) { 
        super(props)
    }

    componentWillMount() {
        document.title = 'Вход'
    }

    render() {
        return (
            <ViewBox center='all'>
                <LoginView />
            </ViewBox>
        )
    }
}

export default AuthRoute
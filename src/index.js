import React from 'react'
import { render } from 'react-dom'
import {BrowserRouter} from 'react-mobx-router'
import {Provider} from 'mobx-react'

import '@utility/polyfill'

import Notifications from '@components/_core/Notifications~'
import AppBar from '@components/_core/AppBar~'
import Space from '@components/_core/Space~'

import Routes from '@src/store/routes'
import store from '@src/store/mainStore'

import styles from './index.sass'

//first auth
import getAuth from '@utility/getAuth'
const authResult = getAuth()
if(authResult.ok) {
    store.user.auth = true
    store.user.type = authResult.data.type
    store.user.id = authResult.data.id
} else {
    store.user.reset()
}


const App = () => (
    <BrowserRouter> 
        <Provider store={store}>
            <div className={styles.app}>
                <Notifications />
                <Routes />
                <AppBar />
            </div>
        </Provider>
    </BrowserRouter>
)

render(<App />, document.getElementById('root'))
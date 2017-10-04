import React from 'react'
import { render } from 'react-dom'
import {BrowserRouter} from 'react-mobx-router'
import {Provider} from 'mobx-react'

import AppBar from '@components/_core/AppBar~'
import Space from '@components/_core/Space~'

import Routes from '@src/store/routes'
import store from '@src/store/mainStore'

import styles from './index.sass'

const App = () => (
    <BrowserRouter> 
        <Provider store={store}>
            <div className={styles.app}>
                <Routes />
                <Space vertical='xl' />
                <AppBar />
            </div>
        </Provider>
    </BrowserRouter>
)

render(<App />, document.getElementById('root'))
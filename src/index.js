import React from 'react'
import { render } from 'react-dom'
import {MobxRouter, startRouter} from 'mobx-router'
import {Provider} from 'mobx-react'

import routes from '@src/store/routes'
import store from '@src/store/mainStore'

import styles from './index.sass'


startRouter(routes, store)

const App = () => (
    <Provider store={store}>
        <div className={styles.app}> 
            <div className={styles.viewBox}>
                <MobxRouter/>
            </div>
        </div>
    </Provider>
)

render(<App />, document.getElementById('root'))
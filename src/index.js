import React from 'react'
import { render } from 'react-dom'

import FindMentor from '@routes/FindMentor'

import styles from './index.sass'

const App = () => (
    <div className={styles.app}> 
        <div className={styles.viewBox}>
            <FindMentor /> 
        </div>
    </div>
)

render(<App />, document.getElementById('root'))
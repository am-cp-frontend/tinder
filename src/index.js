import React from 'react'
import { render } from 'react-dom'

import FindMentor from '@routes/FindMentor'

import styles from './index.sass'

const App = () => <div className={styles.app}> <FindMentor /> </div>

render(<App />, document.getElementById('root'))
import React from 'react'
import { render } from 'react-dom'

import FindMentor from '@routes/FindMentor'

import './index.sass'

const App = () => <FindMentor />

render(<App />, document.getElementById('root'))
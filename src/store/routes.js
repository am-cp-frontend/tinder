import React from 'react'

import { Route, Switch } from 'react-mobx-router'

import ErrorPage from '@components/_utility/ErrorPage~'

import FindMentor from '@routes/FindMentor~'
import MentorPage from '@routes/MentorPage~'
import MentorEdit from '@routes/MentorEdit~'

const Routes = props => (
    <Switch>
        <Route exact path='/' component={<FindMentor />} />

        <Route path='/mentor/:id/' component={<MentorPage />} />

        <Route component={<ErrorPage code={404} />} />
    </Switch>
)

export default Routes
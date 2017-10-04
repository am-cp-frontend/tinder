import React from 'react'

import { Route, Switch, Redirect } from 'react-mobx-router'

import ErrorPage from '@components/_utility/ErrorPage~'

import FindMentor from '@routes/FindMentor~'
import MentorPage from '@routes/MentorPage~'
import MentorEdit from '@routes/MentorEdit~'

const Routes = props => (
    <Switch>
        <Route exact path='/find' component={<FindMentor />} />

        <Route exact path='/mentor/:id/' component={<MentorPage />} />

        <Redirect form='/' to='/find' />

        <Route component={<ErrorPage code={404} />} />
    </Switch>
)

export default Routes
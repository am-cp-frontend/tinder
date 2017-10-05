import React from 'react'

import { Route, Switch, Redirect } from 'react-mobx-router'

import ErrorPage from '@components/_utility/ErrorPage~'

import Login from '@routes/Login~'
import FindMentor from '@routes/FindMentor~'
import MentorPage from '@routes/MentorPage~'
import MentorEdit from '@routes/MentorEdit~'

const Routes = props => (
    <Switch>
        <Redirect exact form='/' to='/find/' />
        <Route exact path='/login/' component={<Login />} />
    
        <Route exact path='/find/' component={<FindMentor />} />
        <Route exact path='/mentor/:id/' component={<MentorPage />} />

        <Route exact path='/mentor-edit/' component={<MentorEdit />} />

        <Route component={<ErrorPage code={404} />} />
    </Switch>
)

export default Routes
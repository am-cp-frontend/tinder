import React from 'react'

import { Route } from 'mobx-router'

import FindMentor from '@routes/FindMentor~'
import MentorPage from '@routes/MentorPage~'

const routes = {
    find: new Route({
        path: '/',
        component: <FindMentor />,
    }),
    mentor: new Route({
        path: '/mentor/:id',
        component: <MentorPage />
    })
}

export default routes
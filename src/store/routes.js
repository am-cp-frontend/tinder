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
        component: <MentorPage />,
        onEnter: (route, params, store) => {
            //data fetching
            store.route.load(store.mentors[params.id])
        }
    })
}

export default routes
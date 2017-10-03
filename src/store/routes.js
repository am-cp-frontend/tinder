import React from 'react'

import { Route } from 'mobx-router'
import { autorun } from 'mobx'


import FindMentor from '@routes/FindMentor~'
import MentorPage from '@routes/MentorPage~'

import AsyncDataStore from '@src/store/AsyncDataStore'

//stabs
import {fetchMentors, fetchMentorData} from './fetchStabs.toRemove'

const routes = {
    find: new Route({
        path: '/',
        component: <FindMentor />,
        onEnter: (router, params, store) => {
            store.mount.mentors = new AsyncDataStore([])   
            fetchMentors(mentorsData => 
                store.mount.mentors.load(mentorsData))
            
            document.title = 'Поиск научрука'
        }
    }),
    mentor: new Route({
        path: '/mentor/:id',
        component: <MentorPage />,
        onEnter: (router, params, store) => {
            store.mount.mentor = new AsyncDataStore({
                name: 'Loading...'
            })
            fetchMentorData(mentorData => 
                    store.mount.mentor.load(mentorData))
            
            
            autorun(() => {
                document.title = store.mount.mentor.data.name
            })
        }
    })
}

export default routes
import React from 'react'
import { inject, observer } from 'mobx-react'

import AsyncDataStore from '@src/store/AsyncDataStore'

import ViewBox from '@components/_utility/ViewBox~'
import MentorPageView from '@components/mentor/Page/MentorPage'

//stab
const fetchMentorData = cb => setTimeout(() => cb({
    id: '0',
    name: 'Якушкин Олег Олегович',
    acceptsOwn: 'inField',
    fields: ['Многопроцессорные системы', ' Компьютерное зрение'],
    contacts: ['mrj@email.com','417 каб.'],
    tasks: []
}), 0)

@inject('store') @observer
export default class MentorPage extends React.Component {
    constructor(props) {
        super(props)

        const store = props.store
        super(props)
        store.mount.mentor = new AsyncDataStore({})

        fetchMentorData(mentorData => store.mount.mentor.load(mentorData))
    }
    render() {
        const mentorStore = this.props.store.mount.mentor
        return (
            <ViewBox>
                {mentorStore.loaded ? <MentorPageView {...(mentorStore.data)} /> : 'Loading...' }

            </ViewBox>
        )
    }
}
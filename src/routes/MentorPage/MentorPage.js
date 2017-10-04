import React from 'react'
import { inject, observer } from 'mobx-react'
import { autorun } from 'mobx'

import ViewBox from '@components/_utility/ViewBox~'
import MentorPageView from '@components/mentor/Page/MentorPage'

import AsyncDataStore from '@src/store/AsyncDataStore'

//stabs
import {fetchMentors, fetchMentorData} from '@src/store/fetchStabs.toRemove'

@inject('store') @observer
export default class MentorPage extends React.Component {
    constructor(props) {
        super(props)
        
    }

    componentWillMount() {
        const store = this.props.store
        
        store.mount.mentor = new AsyncDataStore({})

        //shhoudl use id
        fetchMentorData(mentorData => store.mount.mentor.load(mentorData))
        
        
        autorun(() => {
            document.title = store.mount.mentor.data.name || '...'
        })
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
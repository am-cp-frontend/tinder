import React from 'react'
import { inject, observer } from 'mobx-react'
import { autorun } from 'mobx'

import { Redirect } from 'react-mobx-router'

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
        this.store = new AsyncDataStore({})

        this.mountId = store.mount(this.store)

        //shhoudl use id
        fetchMentorData(mentorData => this.store.load(mentorData))
        
        
        autorun(() => {
            document.title = this.store.data.name || '...'
        })
    }

    componentWillUnmount() {
        this.props.store.unmount(this.mountId)
    }

    render() {
        if(this.store.loaded && this.store.data.error) return <Redirect to='/404/' />
        return (
            <ViewBox>
                {this.store.loaded ? <MentorPageView {...(this.store.data)} /> : 'Loading...' }
            </ViewBox>
        )
    }
}
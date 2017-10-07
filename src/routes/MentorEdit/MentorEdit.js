import React from 'react'
import { inject, observer } from 'mobx-react'
import { autorun } from 'mobx'

import { Redirect } from 'react-mobx-router'

import ViewBox from '@components/_utility/ViewBox~'
import Spinner from '@components/_utility/Spinner~'

import MentorEditPage from '@components/mentor/PageEdit/MentorPageEdit'
import AsyncDataStore from '@src/store/AsyncDataStore'

//stabs
import {fetchMentors, fetchMentorData} from '@src/store/fetchStabs.toRemove'

@inject('store', 'history') @observer
export default class MentorEdit extends React.Component {
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
            document.title = 'Ред. ' + this.store.data.name || '...'
        })
    }

    componentWillUnmount() {
        this.props.store.unmount(this.mountId)
    }

    render() {
        console.log('mentorEdit')
        const user = this.props.store.user

        if( ! user.auth || ! user.type === 'mentor') {
            user.destination = this.props.history.location.pathname
            return <Redirect to='/login' />
        }

        if( ! this.store.loaded) {
            return (
                <ViewBox center='horizontal'>
                    <Spinner />  
                </ViewBox>
            )
        }
        
        return (
            <ViewBox center='horizontal'>
                <MentorEditPage  {...(this.store.data)} />  
            </ViewBox>
        )
    }
}
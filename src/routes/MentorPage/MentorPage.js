import React from 'react'
import { inject, observer } from 'mobx-react'
import { autorun } from 'mobx'

import { Redirect } from 'react-mobx-router'

import ViewBox from '@components/_utility/ViewBox~'
import Spinner from '@components/_utility/Spinner~'
import MentorPageView from '@components/mentor/Page/MentorPage'

import AsyncDataStore from '@src/store/AsyncDataStore'

import request from '@utility/request'

@inject('store') @observer
export default class MentorPage extends React.Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        const store = this.props.store
        this.store = new AsyncDataStore({})

        this.mountId = store.mount(this.store)

        request('/data/mentor/' + this.props.id, this.store)
        
        
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
            <ViewBox center='horizontal'>
                {this.store.loaded ? <MentorPageView {...(this.store.data)} /> : <Spinner /> }
            </ViewBox>
        )
    }
}
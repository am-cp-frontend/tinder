import React from 'react'
import { inject, observer } from 'mobx-react'

import ViewBox from '@components/_utility/ViewBox~'
import FindMentorView from '@components/mentor/Find/FindMentor'

import AsyncDataStore from '@src/store/AsyncDataStore'

//stabs
import {fetchMentors, fetchMentorData} from '@src/store/fetchStabs.toRemove'

@inject('store') @observer
class FindMentor extends React.Component {
    constructor(props) { 
        super(props)
    }

    componentWillMount() {
        const store = this.props.store
        
        store.mount.mentors = new AsyncDataStore([])   
        fetchMentors(mentorsData => 
            store.mount.mentors.load(mentorsData))

        document.title = 'Поиск научрука'
    }

    render() {
        const store = this.props.store
        return (
            <ViewBox>
                <FindMentorView mentors={store.mount.mentors.data}
                                selectedFields={store.mount.selectedFields} />
            </ViewBox>
        )
    }
}

export default FindMentor
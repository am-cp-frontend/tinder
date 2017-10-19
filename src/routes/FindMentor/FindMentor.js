import React from 'react'
import { inject, observer } from 'mobx-react'
import { autorun, untracked } from 'mobx'

import ViewBox from '@components/_utility/ViewBox~'
import Spinner from '@components/_utility/Spinner~'
import FindMentorView from '@components/mentor/Find/FindMentor'
import FindMentorStore from './FindMentorStore'

import request from '@utility/request'

@inject('store', 'history') @observer
class FindMentor extends React.Component {
    constructor(props) { 
        super(props)
        this.hasOwnTopicChange = this.hasOwnTopicChange.bind(this)
    }

    hasOwnTopicChange() {
        this.store.hasOwnTopic = !this.store.hasOwnTopic
    }

    componentWillMount() {
        const mainStore = this.props.store
        const history = this.props.history
    
        //state setup
        this.store = new FindMentorStore([])

        this.mountId = mainStore.mount(this.store)

        request('/data/mentors', this.store)
        
        document.title = 'Поиск научрука'
        
        //url -> state
        const queryPairs = decodeURI(history.location.search).slice(1).split('&').map(pair => {
            const splitPair = pair.split('=')
            return {
                key: splitPair[0],
                value: splitPair[1]
            }
        })

        
        queryPairs.forEach(pair => {
            if(pair.key === 'hasOwnTopic') this.store.hasOwnTopic = pair.value === 'true'
            if(pair.key === 'selectedFields') this.store.selectedFields = pair.value.split(',')
        })
        

        //state -> url, autorun returns fucntion that stops it
        this.stopHistoryUpdate = autorun(() => {
            let search = ''
            const query = []

            if(this.store.hasOwnTopic) {
                query.push({
                    key: 'hasOwnTopic',
                    value: 'true'
                })
            }
            if(this.store.selectedFields.length) {
                query.push({
                    key: 'selectedFields',
                    value: this.store.selectedFields.join(',')
                })
            }

            if(query.length) {
                search = query.reduce((old, pair, i) => 
                    old + (i > 0 ? '&' : '') + `${pair.key}=${pair.value}`
                , '?')
            }
            
            untracked(() => {
                if(search !== history.location.search) {
                    history.replace(history.location.pathname + search)
                }
            })
        })
    }

    componentWillUnmount() {
        this.stopHistoryUpdate()
        this.props.store.unmount(this.mountId)
    }

    render() {
        if(this.store.loaded) {
            return (
                <ViewBox center='horizontal'>
                    <FindMentorView mentors={this.store.stortedMentors}
                                    mentorTags={this.store.mentorTags}
                                    hasOwnTopicValue={this.store.hasOwnTopic}
                                    hasOwnTopicChange={this.hasOwnTopicChange}
                                    selectedFields={this.store.selectedFields} />
                </ViewBox>
            )
        } else {
            return (
                <ViewBox center='horizontal'>
                    <Spinner />
                </ViewBox>
            )
        }
    }
}

export default FindMentor
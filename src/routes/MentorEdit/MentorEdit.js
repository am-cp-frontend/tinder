import React from 'react'
import { inject, observer } from 'mobx-react'

import { Redirect } from 'react-mobx-router'

import ViewBox from '@components/_utility/ViewBox~'


@inject('store') @observer
export default class MentorEdit extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        console.log('mentorEdit')
        const user = this.props.store.user

        if( ! user.auth || ! user.type === 'mentor')
            return <Redirect to='/login' />
        
        return (
            <ViewBox center='horizontal'>
                'EDITOR TODO'  
            </ViewBox>
        )
    }
}
import React from 'react'
import { inject, observer } from 'mobx-react'

import ViewBox from '@components/_utility/ViewBox~'
import FindMentorView from '@components/mentor/Find/FindMentor'

@inject('store') @observer
class FindMentor extends React.Component {
    constructor(props) { 
        super(props) 
    }

    render() {
        return <ViewBox> <FindMentorView mentors={this.props.store.mentors} /> </ViewBox>
    }
}

export default FindMentor
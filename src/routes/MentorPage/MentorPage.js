import React from 'react'
import { inject, observer } from 'mobx-react'

import ViewBox from '@components/_utility/ViewBox~'
import MentorPageView from '@components/mentor/Page/MentorPage'

@inject('store') @observer
export default class MentorPage extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return <ViewBox> <MentorPageView {...(this.props.store.route.data)} /> </ViewBox>
    }
}
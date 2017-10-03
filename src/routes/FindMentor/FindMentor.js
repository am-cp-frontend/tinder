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
        const store = this.props.store
        return (
            <ViewBox>
                <FindMentorView mentors={store.mount.mentors.data}
                                selectedFields={store.selectedFields} />
            </ViewBox>
        )
    }
}

export default FindMentor
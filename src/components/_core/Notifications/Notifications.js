import React from 'react'
import { inject, observer } from 'mobx-react'

import Space from '@components/_core/Space~'

import Notification from '@components/_core/Notification~'
import List from '@components/_core/List~'

import styles from './Notifications.sass'

@inject('store') @observer
class Notifications extends React.Component {
    render() {    
        return (
            <div className={styles.host}>
                <List data={this.props.store.notifications} 
                    item={Notification} 
                    divider={<Space top='s' />}
                    getKey={data => data._id} />
            </div>
        )
    }
}

export default Notifications
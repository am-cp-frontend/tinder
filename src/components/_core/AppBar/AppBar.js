import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'

import Card from '@components/_core/Card~'
import Space from '@components/_core/Space~'
import Link from '@components/_core/Link~'
import Button from '@components/_input/Button~'

import styles from './AppBar.sass'

const NavBlock ={
    student: user => (
        <nav  className={styles.nav}>
            <Link to='/find/' type='block'> 
                <Button> Поиск научрука </Button>
            </Link>
    
            <Space left='m' />
    
            <Link to='/login/' type='block'> 
                <Button> Войти как научрук </Button>
            </Link>
        </nav>
    ),
    mentor: user => (
        <nav  className={styles.nav}>
            <Link to='/mentor-edit/' type='block'> 
                <Button> Редактировать данные о себе </Button>
            </Link>
    
            <Space left='m' />
    
            <Link to='/logout/' type='block' highlight={true}> 
                <Button> Выйти </Button>
            </Link>
        </nav>
    ),
} 


@inject('store')
@observer
class AppBar extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const user = this.props.store.user
        
        return (
            <Space horizontal='m' vertical='s' className={styles.appBar}>
                {NavBlock[user.type](user)}
            </Space>
        )
    }
}

export default AppBar
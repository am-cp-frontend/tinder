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
                <Button tabIndex='-1'> Поиск </Button>
            </Link>
    
            <Space left='m' />
    
            <Link to='/mentor-edit/' type='block'> 
                <Button tabIndex='-1'> Я &mdash; научый руководитель </Button>
            </Link>
        </nav>
    ),
    mentor: user => (
        <nav  className={styles.nav}>
            <Link to='/mentor-edit/' type='block'> 
                <Button tabIndex='-1'> Редактировать данные о себе </Button>
            </Link>
    
            <Space left='m' />
    
            <Link to='/logout/' type='block'> 
                <Button tabIndex='-1'> Выйти </Button>
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
        const nav = NavBlock[user.type] || NavBlock['student']

        return (
            <Space horizontal='m' vertical='s' className={styles.appBar}>
                {nav(user)}
            </Space>
        )
    }
}

export default AppBar
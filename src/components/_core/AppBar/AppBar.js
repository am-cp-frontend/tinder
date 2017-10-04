import React from 'react'
import PropTypes from 'prop-types'

import Card from '@components/_core/Card~'
import Space from '@components/_core/Space~'
import Link from '@components/_core/Link~'
import Button from '@components/_input/Button~'

import styles from './AppBar.sass'

const AppBar = props => (
    <Space horizontal='m' vertical='s' className={styles.appBar}>
        <nav  className={styles.nav}>
            <Link to='/' type='block' highlight={true}> 
                <Button> Поиск научрука </Button>
            </Link>
            
            <Space left='m' />
            
            <Link to='/mentor-edit' type='block' highlight={true}> 
                <Button> Я — научный руководитель </Button>
            </Link>
        </nav>
    </Space> 
)

export default AppBar
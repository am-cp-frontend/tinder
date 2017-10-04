import React from 'react'
import { Link } from 'react-mobx-router'
import cls from 'classnames'

import styles from './Link.sass'

const defaultProps = {
    type: 'inline',
    params: {}
}

const AppLink = props => {
    return (
        <Link to          = {props.to} 
              className   = {cls({
                [styles.block]: props.type === 'block'
        })}>
            {props.children}
        </Link>
    )
}

AppLink.defaultProps = defaultProps

export default AppLink
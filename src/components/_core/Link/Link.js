import React from 'react'
import { Link } from 'react-mobx-router'
import cls from 'classnames'

import styles from './Link.sass'

const defaultProps = {
    type: 'inline',
    params: {}
}

const AppLink = props => {
    if(props.to.split('?')[0].indexOf('://') === -1) {
        return (
            <Link to          = {props.to}
                  target      = {props.target}
                  className   = {cls({
                    [styles.block]: props.type === 'block',
                    [props.className]: props.className
            })}>
                {props.children}
            </Link>
        )
    }
    return (
        <a    href        = {props.to}
              target      = {props.target}
              className   = {cls({
                [styles.block]: props.type === 'block',
                [props.className]: props.className
        })}>
            {props.children}
        </a>
    )
}

AppLink.defaultProps = defaultProps

export default AppLink
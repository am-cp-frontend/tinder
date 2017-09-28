import React from 'react'
import PropTypes from 'prop-types'
import cls from 'classnames'

import styles from './Tag.sass'

const propTypes = {
    withDivider: PropTypes.bool,
    transparent: PropTypes.bool
}

const Tag = props => {
    return (
        <div className={cls(
            styles.tag, 
            {[styles.withDivider]: props.withDivider && !props.transparent},
            {[styles.transparent]: props.transparent}
        )}> 
            {props.children}
        </div>
    )
}

export default Tag
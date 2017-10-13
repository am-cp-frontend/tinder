import React from 'react'

import Space from '@components/_core/Space~'
import ActionBox from '@components/_utility/ActionBox~'

import styles from './Notification.sass'

import Icon from '@components/_utility/Icon~'

const glyphs = {
    warning: require('@icons/warning.svg').default,
    error: require('@icons/error.svg').default,
    info: '',
    success: require('@icons/done.svg').default,
}

const Notification = props => {
    const classes = props.className ? styles.host + ' ' + props.className : styles.host

    return (
        <div className={classes}>
            <div> {props.message} </div>
            <Icon glyph={glyphs[props.type] || {}} className={styles.icon} />
        </div>
    )
}

export default Notification
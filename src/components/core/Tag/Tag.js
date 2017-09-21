import React from 'react'
import cls from 'classnames'

import styles from './tag.sass'

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
import React from 'react'
import cls from 'classnames'

import styles from './Button.sass'



const Button = props => {
    const classes = cls(styles.button, {
        [styles.spaceless]: props.spaceless,
        [styles.transparent]: props.transparent,
        [props.className]: props.className
    })

    return (
        <button 
            id={props.id}
            className={classes}
            tabIndex={props.tabIndex}
            onClick={props.onClick}>
            {props.children}
        </button>
    )
}

export default Button
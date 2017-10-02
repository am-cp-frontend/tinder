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
        <button onClick={props.onClick} id={props.id} className={classes}> 
            {props.children}
        </button>
    )
}

export default Button
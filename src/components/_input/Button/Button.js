import React from 'react'
import styles from './Button.sass'

const Button = props => {
    const classes = props.className ? styles.button + ' ' + props.className : styles.button

    return (
        <button {...props} className={classes}> 
            {props.children}
        </button>
    )
}

export default Button
import React from 'react'
import styles from './Card.sass'

const Card = props => {
    const classes = props.className ? styles.card + ' ' + props.className : styles.card

    return (
        <div className={classes}> 
            {props.children}
        </div>
    )
}

export default Card
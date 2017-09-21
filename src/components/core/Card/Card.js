import React from 'react'
import styles from './Card.sass'

const Card = props => {
    let classes = props.className ? ' ' + props.className : '' 
    return (
        <div className={styles.card + classes}> 
            {props.children}
        </div>
    )
}

export default Card
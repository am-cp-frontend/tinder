import React from 'react'

import styles from './Icon.sass'

const Icon = props => {
    const classes = props.className ? styles.host + ' ' + props.className : styles.host 
    return (
        <svg className={classes}>
            <use href={`#${props.glyph.id}`} />
        </svg>
    )
}

export default Icon
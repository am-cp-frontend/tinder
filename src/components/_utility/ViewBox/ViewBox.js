import React from 'react'
import classNames from 'classnames'

import Space from '@components/_core/Space~'
import styles from './ViewBox.sass'


const ViewBox = props => {
    let centerHoriz = false, centerVert = false
    
    if(props.center === 'all') {
        centerHoriz = true
        centerVert  = true
    }

    if(props.center === 'horizontal') centerHoriz = true
    if(props.center === 'vertical') centerVert = true

    
    
    return (
        <div className={classNames(styles.viewBox, {
            [styles.centerHoriz]: centerHoriz,
            [styles.centerVert]: centerVert,
        })}>
            <Space top='m' />
            {props.children}
            <Space bottom='m' />
        </div>
    )
}

export default ViewBox
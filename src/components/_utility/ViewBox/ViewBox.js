import React from 'react'
import classNames from 'classnames'

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
         {props.children} 
        </div>
    )
}

export default ViewBox
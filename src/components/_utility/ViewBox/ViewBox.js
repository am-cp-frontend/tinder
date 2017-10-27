import React from 'react'
import classNames from 'classnames'

import Space from '@components/_core/Space~'
import styles from './ViewBox.sass'


class ViewBox extends React.Component {
    render () {
        const props = this.props
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
            })} ref={el => this.$el = el }>
                <Space top='m' />
                {props.children}
                <Space bottom='m' />
            </div>
        )
    }
} 

export default ViewBox
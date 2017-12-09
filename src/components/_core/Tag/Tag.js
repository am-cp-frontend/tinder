import React from 'react'
import PropTypes from 'prop-types'
import cls from 'classnames'

import ActionBox from '@components/_utility/ActionBox~'
import Space from '@components/_core/Space~'

import styles from './Tag.sass'

const propTypes = {
    withDivider: PropTypes.bool,
    transparent: PropTypes.bool,
    onClick: PropTypes.func
}

const defaultProps = {
    onClick: () => {}
}

const Tag = props => {
    const padding = props.transparent ? {
        vertical: 'xxs',
    } : {
        vertical: 'xxs',
        left: 's'
    }
    

    return (
        <Space className={cls(
            styles.tag, 
            {[styles.withDivider]: props.withDivider && !props.transparent},
            {[styles.transparent]: props.transparent}
        )} {...padding}> 
            <div onClick={props.onClick}> {props.children} </div>
            {props.actions ? (
                <Space left='xxs' right='xs' className={styles.actions}>
                    <ActionBox actions={props.actions} hostData={props.children} />
                </Space>
            ) : <Space right='s' />}
        </Space>
    )
}

export default Tag
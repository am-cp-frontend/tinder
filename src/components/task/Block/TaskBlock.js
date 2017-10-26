import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'

import H from '@components/_core/Header~'
import Link from '@components/_core/Link~'
import List from '@components/_core/List~'
import Button from '@components/_input/Button~'
import Space from '@components/_core/Space~'

import styles from './TaskBlock.sass'

const propTypes = {
    title: PropTypes.string.isRequired,
    skills: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
}

const Attachment = observer(props => (
    <Link type='block' to={props.link} target='_blank' className={styles.attachment}> 
        <Button tabIndex='-1'> {props.title} </Button>
    </Link>
))

const TaskBlock = observer(props => (
    <Space all={props.innerSpace || 'm'}>
        <H level={props.hLevel}> {props.title} </H>
            <Space bottom='xxs' />

            <H level={props.hLevel + 1}> Описание </H>
            <Space bottom='xxs' />
            {
                props.desc.split('\n').map((item, key) => {
                    return <span key={key}> {item} <br/> </span>
                })
            } 
            
            <Space bottom='s' />

            <H level={props.hLevel + 1}> Необходимые навыки </H>
            <Space bottom='xxs' />
            {
                props.skills.split('\n').map((item, key) => {
                    return <span key={key}> {item} <br/> </span>
                })
            } 

        {props.attachments.map(e => null) /* hack to bind attachments */}
        { props.attachments.length ? (
            <Space top='s'>
                <H level={props.hLevel + 1}> Вложения </H>
                <Space bottom='xxs' />
                <List data={props.attachments} 
                        divider={<Space left='s' />}
                        className={styles.attachments}
                        item={Attachment} />
            </Space>
        ) : null }
    </Space>
))

TaskBlock.propTypes = propTypes
TaskBlock.defaultProps = {
    attachments: []
}

export default TaskBlock

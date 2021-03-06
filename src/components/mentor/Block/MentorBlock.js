import React from 'react'
import PropTypes from 'prop-types'
import {observer} from 'mobx-react'
import {observable, action} from 'mobx'

import Card from '@components/_core/Card~'
import List from '@components/_core/List~'
import H from '@components/_core/Header~'
import Space from '@components/_core/Space~'
import TagList from '@components/_core/TagList~'
import Accordion from '@components/_core/Accordion~'
import Link from '@components/_core/Link~'

import TaskBlock from '@components/task/Block/TaskBlock'

import styles from './MentorBlock.sass'

const propTypes = {
    name: PropTypes.string.isRequired,
    contacts: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.string),
        PropTypes.objectOf(PropTypes.string)
    ]).isRequired,
    
    fields: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.string),
        PropTypes.objectOf(PropTypes.string)
    ]).isRequired,
    
    tasks: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.string),
            PropTypes.objectOf(PropTypes.string)
    ]),
    hLevel: PropTypes.number,
    expandAllTasks: PropTypes.bool,
    innerSpace: PropTypes.string
}

const defaultProps = {
    tasks: [],
    expandAllTasks: false,
    hLevel: 4,
    innerSpace: 'm'
}

const TaskDivider = props => <Space horizontal={props.innerSpace}> <hr /> </Space>

const MentorBlock = observer(props => {
    
    const contactsEl = <TagList tags={props.contacts} tagProps={{transparent: true}} />
    const fieldsEl = <TagList tags={props.fields} onTagClick={props.onTagClick} />
    
    const taskEl = task => <TaskBlock {...task} hLevel={props.hLevel + 1} innerSpace={props.innerSpace} />

    return (
        <div id={props._id}>
            <Link to={`/mentor/${props._id}`} type='block'>
                <div className={styles.linkInnerSpace}>
                    <H level={props.hLevel}> {props.name} </H>
                    <Space bottom='s' />

                    {contactsEl}
                    
                    <Space bottom='s' />
                    
                    {fieldsEl}
                </div>
            </Link>
            
            { props.tasks.filter(t => t.title.trim().length || t.desc.trim().length).length ? (
                <Accordion toExpandBtn='Показать предлагаемые темы исследований' 
                           togglePos='after'
                           expanded={props.expandAllTasks}>
                    <TaskDivider innerSpace={props.innerSpace} />
                    <List data={props.tasks.filter(t => t.title.trim().length || t.desc.trim().length)}
                          divider={<TaskDivider innerSpace={props.innerSpace} />}
                          item={taskEl} />
                </Accordion>) : null }
        </div>
    )
})

MentorBlock.propTypes    = propTypes
MentorBlock.defaultProps = defaultProps

export default MentorBlock
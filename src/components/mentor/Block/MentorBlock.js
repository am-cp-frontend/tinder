import React from 'react'
import PropTypes from 'prop-types'
import {observer} from 'mobx-react'
import {observable, action} from 'mobx'

import Card from '@components/_core/Card~'
import H from '@components/_core/Header~'
import Space from '@components/_core/Space~'
import TagList from '@components/_core/TagList~'
import Accordion from '@components/_core/Accordion~'
import Link from '@components/_core/Link~'

import TaskBlock from '@components/task/Block/TaskBlock'


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
            PropTypes.arrayOf(PropTypes.object),
            PropTypes.objectOf(PropTypes.object)
    ]),
    hLevel: PropTypes.number,
    expandAllTasks: PropTypes.bool,
    innerSpace: PropTypes.string
}

const defaultProps = {
    expandAllTasks: false,
    tasks: []
}

const MentorBlock = observer(props => {
    
    const contactsEl = <TagList tags={props.contacts} tagProps={{transparent: true}} />
    const fieldsEl = <TagList tags={props.fields} />
    
    const tasksEl = props.tasks.map(task => (
        <div key={task.title}> 
            <Space horizontal='m'> <hr /> </Space>
            <TaskBlock {...task} hLevel={props.hLevel + 1} /> 
        </div>
    ))


    return (
        <div>
            <Link route='mentor' params={{id: props.id}} type='block'>
                <Space all={props.innerSpace || 'm'}>
                    <H level={props.hLevel}> {props.name} </H>
                    <Space bottom='s' />

                    {contactsEl}
                    
                    <Space bottom='s' />
                    
                    {fieldsEl}
                </Space>
            </Link>
            
            { props.tasks.length ? (
                <Accordion toExpandBtn='Показать предлагаемые темы исследований' 
                           togglePos='after'
                           expanded={props.expandAllTasks}> 
                    {tasksEl} 
                </Accordion>) : null }
        </div>
    )
})

MentorBlock.propTypes    = propTypes
MentorBlock.defaultProps = defaultProps

export default MentorBlock
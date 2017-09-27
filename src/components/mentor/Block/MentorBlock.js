import React from 'react'
import PropTypes from 'prop-types'
import {observer} from 'mobx-react'
import {observable, action} from 'mobx'

import Card from '@components/_core/Card~'
import H from '@components/_core/Header~'
import Space from '@components/_core/Space~'
import TagList from '@components/_core/TagList~'
import Accordion from '@components/_core/Accordion~'

import TaskBlock from '@components/task/Block/TaskBlock'

const MentorBlock = observer(props => {
    const tasks = props.short ? [] : props.tasks
    const tasksEl = tasks.map(task => (
        <div key={task.title}> 
            <Space horizontal='m'> <hr /> </Space>
            <TaskBlock {...task} hLevel={props.hLevel + 1} /> 
        </div>
    ))

    const fieldsEl = <TagList tags={props.fields} />
    const contactsEl = <TagList tags={props.contacts} transparent={true} />

    return (
        <div>
            <Space all={props.innerSpace || 'm'}>
                <H level={props.hLevel}> {props.name} </H>
                <Space bottom="s" />

                {contactsEl}
                
                <Space bottom="s" />
                
                {fieldsEl}
            </Space>
            
            { tasks.length ? (
                <Accordion toOpenBtn='Показать предлагаемые темы исследований' 
                           togglePos='after'> 
                    {tasksEl} 
                </Accordion>) : null }
        </div>
    )
})

MentorBlock.propTypes = {
    name: PropTypes.string.isRequired,
    contacts: PropTypes.arrayOf(PropTypes.string).isRequired,
    
    fields: PropTypes.arrayOf(PropTypes.string).isRequired,
    
    tasks: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default MentorBlock
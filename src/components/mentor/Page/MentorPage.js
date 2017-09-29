import React from 'react'
import PropTypes from 'prop-types'

import Card from '@components/_core/Card~'
import Space from '@components/_core/Space~'
import H from '@components/_core/Header~'

import TaskBlock from '@components/task/Block/TaskBlock'
import TagList from '@components/_core/TagList~'


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
    innerSpace: PropTypes.string
}

const defaultProps = {
    hLevel: 2,
    tasks: []
}

const MentorPage = props => {
    const contactsEl = <TagList tags={props.contacts} tagProps={{transparent: true}} />
    const fieldsEl = <TagList tags={props.fields} tagProps={{transparent: true}} />

    const tasksEl = props.tasks.map((task, idx) => (
        <Space top={idx ? 'm' : 0} key={task.title}>
            <Card> 
                <TaskBlock {...task} hLevel={5} /> 
            </Card>
        </Space>
    ))

    return (
        <Space all={props.innerSpace || 'm'}>
            <H level={props.hLevel}> {props.name} </H>
            <Space bottom='s' />

            <Space bottom="m">
                <H level={3}> Контакты </H> 
                {contactsEl}
            </Space>
            
            <Space bottom="m">
                <H level={3}> Области исследований </H> 
                {fieldsEl}
            </Space>

            <H level={3}> Задачи </H>
            <Space bottom='s' />
            {tasksEl}
        </Space>
    )
}

MentorPage.propTypes    = propTypes
MentorPage.defaultProps = defaultProps


export default MentorPage
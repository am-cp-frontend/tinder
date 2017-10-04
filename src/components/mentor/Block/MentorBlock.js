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
    tasks: [],
    expandAllTasks: false,
    hLevel: 4,
    innerSpace: 'm'
}

const MentorBlock = observer(props => {
    
    const contactsEl = <TagList tags={props.contacts} tagProps={{transparent: true}} />
    const fieldsEl = <TagList tags={props.fields} />
    
    const taskEl = task => <TaskBlock {...task} hLevel={props.hLevel + 1} innerSpace={props.innerSpace} />


    return (
        <div>
            <Link to={`mentor/${props.id}`} type='block'>
                <Space all={props.innerSpace}>
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
                    <List data={props.tasks}
                          divider={<Space horizontal={props.innerSpace}> <hr /> </Space>}
                          item={taskEl} />
                </Accordion>) : null }
        </div>
    )
})

MentorBlock.propTypes    = propTypes
MentorBlock.defaultProps = defaultProps

export default MentorBlock
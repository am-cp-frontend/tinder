import React from 'react'
import PropTypes from 'prop-types'

import H from '@components/_core/Header~'
import Space from '@components/_core/Space~'

const TaskBlock = props => (
    <Space all={props.innerSpace || 'm'}>
         <H level={props.hLevel}> {props.title} </H>
         <Space bottom='xs' />

         <H level={props.hLevel + 1}> Описание </H>
         <Space bottom='xs' />
         {props.desc} 
         
         <Space bottom='s' />

         <H level={props.hLevel + 1}> Необходимые навки </H>
         <Space bottom='xs' />
         {props.skills} 
    </Space>
)

TaskBlock.propTypes = {
    title: PropTypes.string.isRequired,
    skills: PropTypes.element.isRequired,
    desc: PropTypes.element.isRequired
}

export default TaskBlock
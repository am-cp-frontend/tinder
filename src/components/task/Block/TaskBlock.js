import React from 'react'
import PropTypes from 'prop-types'

import H from '@components/_core/Header~'
import Space from '@components/_core/Space~'

const propTypes = {
    title: PropTypes.string.isRequired,
    skills: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired
}

const TaskBlock = props => (
    <Space all={props.innerSpace || 'm'}>
         <H level={props.hLevel}> {props.title} </H>
         <Space bottom='xxs' />

         <H level={props.hLevel + 1}> Описание </H>
         <Space bottom='xxs' />
         {props.desc} 
         
         <Space bottom='s' />

         <H level={props.hLevel + 1}> Необходимые навки </H>
         <Space bottom='xxs' />
         {props.skills} 
    </Space>
)

TaskBlock.propTypes = propTypes

export default TaskBlock
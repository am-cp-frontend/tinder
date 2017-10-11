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
    hLevel: PropTypes.number,
    innerSpace: PropTypes.string
}

const defaultProps = {
    hLevel: 4,
    innerSpace: 'm'
}

const StudentBlock = props => (
        <Space all={props.innerSpace}>
            <H level={props.hLevel}> {props.name} </H>
            <Space bottom='s' />
            <TagList tags={props.contacts} tagProps={{transparent: true}} />
        </Space>
)

StudentBlock.propTypes    = propTypes
StudentBlock.defaultProps = defaultProps

export default StudentBlock
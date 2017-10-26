import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

import Card from '@components/_core/Card~'
import List from '@components/_core/List~'
import Space from '@components/_core/Space~'
import H from '@components/_core/Header~'
import TagList from '@components/_core/TagList~'

import TaskBlock from '@components/task/Block/TaskBlock'
import StudentBlock from '@components/student/Block/StudentBlock'


import styles from './MentorPage.sass'

const containerOf = type => PropTypes.oneOfType([
    PropTypes.arrayOf(type),
    PropTypes.objectOf(type)
])

const propTypes = {
    name: PropTypes.string.isRequired,
    contacts: containerOf(PropTypes.string).isRequired,
    fields: containerOf(PropTypes.string).isRequired,
    
    about: PropTypes.string,

    tasks: containerOf(PropTypes.string),
    ex: containerOf(PropTypes.object),
    
    acceptsOwn: PropTypes.oneOf(['none', 'any', 'inField']),
    hLevel: PropTypes.number,
    innerSpace: PropTypes.string
}

const defaultProps = {
    hLevel: 2,
    innerSpace: 'm',
    acceptsOwn: 'none',
    tasks: [],
    ex: []
}

const ownToRus = {
    none: 'Не принимает поднаучных со своей темой исследования',
    inField: 'Принимает учеников со своими исследованиями в перечисленных выше областях',
    any: 'Примает поднаучных со своими исследованиями в любой области'
}

const MentorPage = observer(props => {
    const contactsEl = <TagList tags={props.contacts} tagProps={{transparent: true}} />
    const fieldsEl = <TagList tags={props.fields} tagProps={{transparent: true}} />

    const taskCard = props => <Card> <TaskBlock {...props} hLevel={5} /> </Card>
    const exCard = props => <Card> <StudentBlock {...props} hLevel={5} /> </Card>

    console.log(props)

    return (
        <div className={styles.view}>
            <H level={props.hLevel}> {props.name} </H>
            <Space bottom='m' />            

            <Space bottom='m'>
                <H level={3}> {props.contacts.length ? 'Контакты' : 'Не оставил контактов' } </H> 
                {contactsEl}
            </Space>
            
            <Space bottom='m'>
                <H level={3}> Области исследований </H> 
                {fieldsEl}
            </Space>

            <Space bottom='m'>
                <H level={3}> {ownToRus[props.acceptsOwn]} </H>
            </Space>

            {props.about ? 
                (
                    <Space bottom='m'>
                        <H level={3}> Дополнительная информация </H> 
                        {props.about}
                    </Space>
                ) : null    
            }

            <Space bottom='m'>
                { props.tasks.length ? (
                    <div>
                        <H level={3}> Предлагаемые задачи </H>
                        <Space bottom='s' />
                        <List data={props.tasks} 
                                item={taskCard}
                                divider={<Space top={props.innerSpace} />} />
                    </div>
                ) : <H level={3}> Не предлагает задач </H> }
            </Space>

            { props.ex.length ? (
                <div>
                    <H level={3}> Прошлые поднаучные </H>
                    <Space bottom='s' />
                    <List data={props.ex}
                          item={exCard} 
                          divider={<Space top={props.innerSpace} />} />
                </div>
            ) : <H level={3}> Прошлые поднаучные не оставили своих контактов </H> }
        </div>
    )
})

MentorPage.propTypes    = propTypes
MentorPage.defaultProps = defaultProps


export default MentorPage
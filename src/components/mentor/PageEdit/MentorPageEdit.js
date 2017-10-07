import React from 'react'
import PropTypes from 'prop-types'

import Card from '@components/_core/Card~'
import List from '@components/_core/List~'
import Space from '@components/_core/Space~'
import H from '@components/_core/Header~'

import TextInput from '@components/_input/Text~'
import TagInput from '@components/_input/TagInput~'



import styles from './MentorPageEdit.sass'

const containerOf = type => PropTypes.oneOfType([
    PropTypes.arrayOf(type),
    PropTypes.objectOf(type)
])

const propTypes = {
    name: PropTypes.string.isRequired,
    contacts: containerOf(PropTypes.string).isRequired,
    fields: containerOf(PropTypes.string).isRequired,
    
    tasks: containerOf(PropTypes.object),
    
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
    none: 'Никогда',
    inField: 'В интересных вам областях',
    any: 'В любой области'
}

const MentorPageEdit = props => {
    const acceptsOwnEl = []
    for(let option in ownToRus) {
        acceptsOwnEl.push(
            <option value={option} key={option}> 
                {ownToRus[option]}
            </option>
        )
    }
    
    return (
        <div className={styles.view}>
            <Space bottom='m'>
                <H level={2}> Редактирование </H>
            </Space>

            <Space bottom='m'>
                <H level={3}> ФИО </H>
                {/* <Space bottom='xxs' /> */}
                <TextInput id='fullName' value={props.name} autofocus> 
                </TextInput> 
            </Space>
        
            <Space bottom='m'>
                <H level={3}> Контакты </H>
                {/* <Space bottom='xxs' /> */}
                <TagInput tags={props.contacts} tagProps={{transparent: true}} />
            </Space>

            <Space bottom='m'>
                <H level={3}> Интересные вам области исследований </H> 
                <Space bottom='xxs' />
                <TagInput tags={props.fields} />
            </Space>


            <Space bottom='m'>
                <H level={3}> Принимаете поднаучных со своей темой исследований </H> 
                <Space bottom='xxs' />
                <select defaultValue={props.acceptsOwn}>
                    {acceptsOwnEl} 
                </select>
            </Space>

            <Space bottom='m'>
                <H level={3}> Задачи для поднаунчных </H> 
                <Space bottom='xs' />
                ...Tasks
            </Space>
            
        </div>
    )
}

MentorPageEdit.propTypes    = propTypes
MentorPageEdit.defaultProps = defaultProps


export default MentorPageEdit

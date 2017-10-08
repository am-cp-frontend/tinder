import React from 'react'
import PropTypes from 'prop-types'

import Card from '@components/_core/Card~'
import List from '@components/_core/List~'
import Space from '@components/_core/Space~'
import H from '@components/_core/Header~'

import Button from '@components/_input/Button~'
import TextInput from '@components/_input/Text~'
import RichEditor from '@components/_input/RTE~'
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
    
    tasks: containerOf(PropTypes.string),
    
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

const TaskEl = props => (
    <Card>
    <Space all='m'>
        <Space bottom='m'>
            <H level={6}> Заголовок задачи </H>
            <TextInput id={'task-'+props.key} 
                       defaultValue={props.title} 
                       placeholder='Например: Алгоритм классификации графов заданного порядка' />
        </Space>

        <Space bottom='m'>
            <H level={6}> Описание задачи </H>
            <RichEditor id={'desc'+props.key}
                        defaultValue={props.desc}
                        placeholder='bla' />
        </Space>

        <Space bottom='m'>
            <H level={6}> Необходимые навыки </H>
            <RichEditor id={'skills'+props.key} 
                        defaultValue={props.skills}
                        placeholder='bla' />
        </Space>

        <Button> Удалить </Button>
    </Space>
    </Card>
)

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
                <TextInput id='fullName' defaultValue={props.name} autofocus /> 
            </Space>
        
            <Space bottom='m'>
                <H level={3}> Контакты </H>
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
                
                <List data={props.tasks} 
                      divider={<hr />}
                      item={TaskEl} />
                <Space bottom='m' />

                <Button> Добавить задачу </Button> 
            </Space>

            <Space bottom='0'>
                <H level={3}> Сохранить изменения? </H> 
                <Space bottom='xs' />
                <div className={styles.row}>
                    <Space right='s'>
                        <Button> Да </Button> 
                    </Space>
                    <Button> Вернуть как было </Button>
                </div>
            </Space>
            
        </div>
    )
}

MentorPageEdit.propTypes    = propTypes
MentorPageEdit.defaultProps = defaultProps


export default MentorPageEdit

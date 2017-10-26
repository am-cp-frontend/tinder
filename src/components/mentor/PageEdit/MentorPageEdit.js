import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'

import Card from '@components/_core/Card~'
import List from '@components/_core/List~'
import Space from '@components/_core/Space~'
import H from '@components/_core/Header~'

import Button from '@components/_input/Button~'
import TextInput from '@components/_input/Text~'
import TagInput from '@components/_input/TagInput~'

import TaskEdit from '@components/task/Edit/TaskEdit'
import RichEditor from '@components/_input/RTE~'

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

class TaskEditItem extends React.Component {
    render() {
        const handlers = this.props.makeTaskHandlers(this.props.keyValue)

        return (
            <Card key={this.props.key}>
                <TaskEdit {...(this.props)}
                          handleTitleChange      = {handlers.titleChange}
                          handleDescChange       = {handlers.descChange}
                          handleSkillsChange     = {handlers.skillsChange}
                          handleRemove           = {handlers.remove}
                          hadnleAddAttachment    = {handlers.addAttachment}
                          makeAttachmentHandlers = {handlers.makeAttachmentHandlers} />
            </Card>
        )
    }
}

const MentorPageEdit = observer(props => {
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
                <TextInput id='fullName' 
                           value={props.name}
                           onChange={props.handleNameChange}
                           autoFocus /> 
            </Space>
        
            <Space bottom='m'>
                <H level={3}> Контакты </H>
                <TagInput tags={props.contacts}
                          placeholder='Любой способ с вами связаться'
                          tagProps={{transparent: true}} />
            </Space>

            <Space bottom='m'>
                <H level={3}> Интересные вам области исследований </H> 
                <Space bottom='xxs' />
                <TagInput tags={props.fields}
                          placeholder='Вы также можете ввести области отстутствующие в списке, который появится при клике'
                          autocomplete={props.fieldsAutocomplete || []} />

                <Space bottom='m' />
                <div className={styles.row}>
                    <Space right='xs' className={styles.flexPriority}>
                        <TextInput id='FieldsReinforce' 
                                value={props.tmpVals.reinforce}
                                onChange={props.handleFieldsReinforceChange}
                                onKeyUp={[
                                    {key: 13, cb: props.handleFieldsReinforceAdd}
                                ]}
                                placeholder='Дополнительная область' />
                    </Space>
                    <Button onClick={props.handleFieldsReinforceAdd}> 
                        Добавить область
                    </Button>
                </div>
            </Space>


            <Space bottom='m'>
                <H level={3}> Принимаете учеников со своей темой исследований </H> 
                <Space bottom='xxs' />
                <select value={props.acceptsOwn} onChange={props.handleAcceptsOwnChange}>
                    {acceptsOwnEl} 
                </select>
            </Space>

            <Space bottom='m'>
                <H level={3}> Дополнительная информация </H>
                <RichEditor value={props.about}
                            placeholder='Заполняется по желанию, как и все остальное. Укажите информацию, для которой не нашли подходящего поля'
                            onChange={props.handleAboutChange} />
            </Space>

            <Space bottom='m'>
                <H level={3}> Задачи для учеников </H> 
                <Space bottom='xs' />
                
                <List data={props.tasks}
                      getKey={(data, idx) => idx}
                      divider={<Space bottom='m' />}
                      item={TaskEditItem}
                      itemProps={{makeTaskHandlers: props.makeTaskHandlers, 
                                  makeAttachmentHandlers: props.makeAttachmentHandlers}} />
                {props.tasks.length ? <Space bottom='m' /> : null}

                <Button onClick={props.handleAddTask}> Добавить задачу </Button> 
            </Space>

            <Space bottom='0'>
                <H level={3}> Сохранить изменения? </H> 
                <Space bottom='xs' />
                <div className={styles.row}>
                    <Space right='s'>
                        <Button onClick={props.handleSave}> Сохранить </Button> 
                    </Space>
                    <Button onClick={props.handleRevert}> Вернуть как было </Button>
                </div>
            </Space>
        </div>
    )
})

MentorPageEdit.propTypes    = propTypes
MentorPageEdit.defaultProps = defaultProps


export default MentorPageEdit

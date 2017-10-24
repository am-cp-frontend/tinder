import React from 'react'
import { observer } from 'mobx-react'

import Card from '@components/_core/Card~'
import List from '@components/_core/List~'
import Space from '@components/_core/Space~'
import H from '@components/_core/Header~'

import Button from '@components/_input/Button~'
import TextInput from '@components/_input/Text~'
import RichEditor from '@components/_input/RTE~'

@observer
class AttachmentsEdit extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const handlers = this.props.makeAttachmentHandlers(this.props.keyValue)

        return (
            <Card>
                <Space all='m'>
                    <Space bottom='m'>
                        <H level={6}> Название вложения </H>
                        <TextInput onChange={handlers.titleChange}
                                   value={this.props.title} 
                                   placeholder='Учебник по алгоритмам' />
                    </Space>

                    <Space bottom='m'>
                        <H level={6}> Ссылка на вложение </H>
                        <TextInput onChange={handlers.linkChange}
                                   value={this.props.link} 
                                   placeholder='http://example.com' />
                    </Space>
                    <Button onClick={handlers.remove}> Удалить </Button>
                </Space>
            </Card>
        )
    }
}

@observer
class TaskEdit extends React.Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        return (
            <Space all='m'>
                <Space bottom='m'>
                    <H level={6}> Заголовок задачи </H>
                    <TextInput id={'task-'+this.props.keyValue}
                            onChange={this.props.handleTitleChange}
                            value={this.props.title} 
                            placeholder='Например: Алгоритм классификации графов заданного порядка' />
                </Space>
    
                <Space bottom='m'>
                    <H level={6}> Описание задачи </H>
                    <RichEditor id={'desc'+this.props.keyValue}
                                onChange={this.props.handleDescChange}
                                value={this.props.desc}
                                placeholder='Например: Алгоритм должен будет отличать циклические, одно-дву...' />
                </Space>
    
                <Space bottom='m'>
                    <H level={6}> Необходимые навыки </H>
                    <RichEditor id={'skills'+this.props.keyValue}
                                onChange={this.props.handleSkillsChange} 
                                value={this.props.skills}
                                placeholder='Например: Уверенное знание теории графов, ООП в C++' />
                </Space>
    
                <Space bottom='m'>
                    <H level={6}> Вложения </H> 
                    <Space bottom='xs' />
                    
                    <List data={this.props.attachments}
                          getKey={(data, idx) => idx}
                          divider={<hr />}
                          item={AttachmentsEdit}
                          itemProps={{makeAttachmentHandlers: this.props.makeAttachmentHandlers}} />
                    {this.props.attachments.length ? <Space bottom='m' /> : null}

                    <Button onClick={this.props.hadnleAddAttachment}> Добавить вложение </Button> 
                </Space>

                <Button onClick={this.props.handleRemove}> Удалить </Button>
            </Space>
        )
    }
}

export default TaskEdit
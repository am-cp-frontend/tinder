import React from 'react'
import { observer } from 'mobx-react'

import Space from '@components/_core/Space~'
import H from '@components/_core/Header~'

import Button from '@components/_input/Button~'
import TextInput from '@components/_input/Text~'
import RichEditor from '@components/_input/RTE~'

@observer
class TaskEdit extends React.Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        const handlers = this.props.makeTaskHandlers(this.props.keyValue)
        
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
    
                <Button onClick={this.props.handleRemove}> Удалить </Button>
            </Space>
        )
    }
}

export default TaskEdit
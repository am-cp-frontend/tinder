import React from 'react'
import {storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'

import CenterWrapper from '@stories/_wrappers/Center'

import TagList from '@components/_core/TagList~'


const stories = storiesOf('TagList', module)
stories.addDecorator((story, context) => withInfo('Simple tag component')(story)(context))

stories
    .add('empty', () => ( 
        <CenterWrapper>
            <TagList />
        </CenterWrapper>
    ))
    .add('with 1 tag', () => ( 
        <CenterWrapper>
            <TagList tags={['a tag']} />
        </CenterWrapper>
    ))
    .add('Row', () => ( 
        <CenterWrapper>
            <TagList tags={['tag 1', 'tag 2']} />
        </CenterWrapper>
    ))
    .add('Multiline', () => {
        const tags = Array(5)
        for(let i = 0; i < tags.length; i++) 
            tags[i] = Math.random().toString().slice(0, 8)
        return ( 
            <CenterWrapper>
                <div style={{maxWidth: '400px'}}>
                    <TagList tags={tags} />
                </div>
            </CenterWrapper>
        )
    })
    .add('Custom tag props', () => ( 
        <CenterWrapper>
            <TagList tags={['tag 1', 'tag 2']} tagProps={{transparent: true}} />
        </CenterWrapper>
    ))
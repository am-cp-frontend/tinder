import React from 'react'
import {storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'

import CenterWrapper from '@stories/_wrappers/Center'

import Tag from '@components/_core/Tag~'


const stories = storiesOf('Tag', module)
   
stories.addDecorator((story, context) => withInfo('Simple tag component')(story)(context))

stories
    .add('default', () => ( 
        <CenterWrapper>
            <Tag> Tag content </Tag>  
        </CenterWrapper>
    ))
    .add('transparent', () => ( 
        <CenterWrapper>
            <Tag transparent={true}> Tag content </Tag>  
        </CenterWrapper>
    ))
    .add('width divider', () => (
        <CenterWrapper>
            <Tag withDivider={true}> Tag content </Tag>  
        </CenterWrapper>
    ))
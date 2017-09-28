import React from 'react'
import {storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'

import CenterWrapper from '@stories/_wrappers/Center'

import Accordion from '@components/_core/Accordion~'
import Space from '@components/_core/Space~'


const spinner = 'https://assets-cdn.github.com/images/spinners/octocat-spinner-32.gif'

const text = `
    Accordions (from 19th century German Akkordeon,
    from Akkord—"musical chord, concord of sounds"[1])
    are a family of box-shaped musical instruments 
    of the bellows-driven free-reed aerophone type, 
    colloquially referred to as a squeezebox. 
    A person who plays the accordion is called an accordionist. 
    The concertina and bandoneón are related; 
    the harmonium and American reed organ are in the same family.`

const stories = storiesOf('Accordion', module)
stories.addDecorator((story, context) => withInfo(`Component that conditionally renders it's content`)(story)(context))

stories
    .add('default', () => ( 
        <CenterWrapper>
            {text}
            <Space bottom='m' />
            <Accordion> {text} </Accordion>  
        </CenterWrapper>
    ))
    .add('With custom messages', () => ( 
        <CenterWrapper>
            {text}
            <Space bottom='m' />
            <Accordion toExpandBtn='Expand me pls'
                       toCollapseBtn={<img src={spinner} />}>
                {text}
            </Accordion>  
        </CenterWrapper>
    ))
    .add('After contnet',() => ( 
        <CenterWrapper>
            {text}
            <Space bottom='m' />
            <Accordion togglePos='after'> 
                {text}
            </Accordion>  
        </CenterWrapper>
    ))
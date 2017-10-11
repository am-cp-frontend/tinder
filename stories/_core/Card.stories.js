import React from 'react'
import {storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'

import CenterWrapper from '@stories/_wrappers/Center'

import Card from '@components/_core/Card~'
import Space from '@components/_core/Space~'

const stories = storiesOf('Card', module)
stories.addDecorator((story, context) => withInfo('Basically a div with special styles')(story)(context))

stories
    .add('default', () => ( 
        <CenterWrapper>
            <Card> Hello card </Card>  
        </CenterWrapper>
    ))
    .add('with space inside', () => ( 
        <CenterWrapper>
            <Card> <Space all = 'm'> 😀😎👍💯 </Space> </Card>
        </CenterWrapper>
    ))
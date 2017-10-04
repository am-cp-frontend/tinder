import React from 'react'

import H from '@components/_core/Header~'
import Space from '@components/_core/Space~'
import ViewBox from '@components/_utility/ViewBox~'


const ErrorPage = props => (
    <ViewBox>
        <Space all='xl'>
            <H level={1}> {props.code} </H>
        </Space>
    </ViewBox>
)

export default ErrorPage
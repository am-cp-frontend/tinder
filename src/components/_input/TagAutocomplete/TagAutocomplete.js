import React from 'react'

import Tag from '@components/_core/Card~'
import Space from '@components/_core/Space~'

const TagAutocomplete = props => (
    <Space all='m'> 
        <h2> Поиск научрука </h2>
        <Space bottom='s' />

        <div className='filter'> 
            <Checkbox id='1'> Своя тема </Checkbox>
        </div>
        <Space bottom='m' />
        
        <CardList items={props.mentors} card={MentorCard} /> 
    </Space>
)

export default FindMentor
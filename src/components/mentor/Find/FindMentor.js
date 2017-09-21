import React from 'react'

import Space from '@components/core/Space~'
import CardList from '@components/core/CardList~'

import Checkbox from '@components/input/Checkbox~'

import MentorCard from '@components/mentor/Card/MentorCard'

const FindMentor = props => (
    <Space all='m'> 
        <h2> Tinder </h2>
        <Space bottom='s' />

        <div className='filter'> 
            <Checkbox id='1'> Своя тема </Checkbox>
        </div>
        <Space bottom='m' />
        
        <CardList items={props.mentors} card={MentorCard} /> 
    </Space>
)

export default FindMentor
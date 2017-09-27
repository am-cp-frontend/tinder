import React from 'react'


import Card from '@components/_core/Card~'
import Space from '@components/_core/Space~'
import CardList from '@components/_core/CardList~'

import Checkbox from '@components/_input/Checkbox~'
import TextInput from '@components/_input/Text~'

import MentorBlock from '@components/mentor/Block/MentorBlock'


import styles from './FindMentor.sass'

const MentorCard = props => <Card key={props.key}> <MentorBlock {...props} hLevel={4} /> </Card>

const FindMentor = props => (
    <Space all='m' className={styles.view}> 
        <h2> Поиск научрука </h2>
        <Space bottom='s' />

        <div className={styles.filter}> 
            <Checkbox id='1'> Своя тема </Checkbox>
            <TextInput id='text' placeholder='Область исследований' className={styles.tagInput} />
        </div>
        <Space bottom='m' />
        
        <CardList items={props.mentors} card={MentorCard} /> 
    </Space>
)

export default FindMentor
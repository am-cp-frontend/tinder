import React from 'react'

import Card from '@components/_core/Card~'
import Space from '@components/_core/Space~'
import List from '@components/_core/List~'

import Checkbox from '@components/_input/Checkbox~'
import TextInput from '@components/_input/Text~'

import MentorBlock from '@components/mentor/Block/MentorBlock'


import styles from './FindMentor.sass'

const MentorCard = props => <Card> <MentorBlock {...props} hLevel={4} /> </Card>

const FindMentor = props => (
    <Space all='m' className={styles.view}> 
        <h2> Поиск научрука </h2>
        <Space bottom='s' />

        <div className={styles.filter}> 
            <Checkbox id='ownTopic'> Своя тема </Checkbox>
            <TextInput id='FieldOfStudy' 
                       placeholder='Область исследований'
                       className={styles.tagInput} />
        </div>
        <Space bottom='m' />
        
        <List data={props.mentors} item={MentorCard} getKey={data => data.id}/> 
    </Space>
)

export default FindMentor
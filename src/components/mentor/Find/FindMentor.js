import React from 'react'

import Card from '@components/_core/Card~'
import Space from '@components/_core/Space~'
import List from '@components/_core/List~'

import Checkbox from '@components/_input/Checkbox~'
import TagInput from '@components/_input/TagInput~'

import MentorBlock from '@components/mentor/Block/MentorBlock'


import styles from './FindMentor.sass'

const MentorCard = props => <Card> <MentorBlock {...props} hLevel={4} /> </Card>

const FindMentor = props => (
    <Space all='m' className={styles.view}> 
        <h2> Поиск научрука </h2>
        <Space bottom='s' />

        <div className={styles.filter}> 
            <Checkbox id='ownTopic'> Своя тема </Checkbox>
            <TagInput id='FieldOfStudy' 
                      placeholder='Область исследований'
                      className={styles.tagInput} 
                      tags={props.selectedFields} />
        </div>
        <Space bottom='m' />
        {props.mentors.length ? <List data={props.mentors} item={MentorCard} getKey={data => data.id}/> : 'Loading...'}
    </Space>
)

export default FindMentor
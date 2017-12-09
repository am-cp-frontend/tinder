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
    <div className={styles.view}>
        <h2> Поиск научного руководителя </h2>
        <Space bottom='s' />

        <div className={styles.filter}> 
            <Checkbox id='ownTopic'
                      autoFocus
                      checked={props.hasOwnTopicValue}
                      onChange={props.hasOwnTopicChange}>
                Своя тема 
            </Checkbox>
            <TagInput id='FieldOfStudy' 
                      placeholder='Область исследований'
                      className={styles.tagInput}
                      autocomplete={props.mentorTags}
                      tags={props.selectedFields} />
        </div>
        <Space bottom='m' />
        {
            props.mentors.length 
            ? <List data={props.mentors} item={MentorCard} itemProps={{onTagClick: props.mentorTagCick}} getKey={data => data._id}/> 
            : 'Подходящих научных руководителей нет :('
        }
    </div>
)

export default FindMentor
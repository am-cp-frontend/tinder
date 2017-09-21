import React from 'react'

import Space from '@components/core/Space~'
import Tag from '@components/core/Tag~'

import styles from './TagList.sass' 

const ListItem = props => (
    <Tag transparent={props.transparent}
         withDivider={props.idx != 0}> 
        {props.children} 
    </Tag>
)

const TagList = props => {
    return (
        <div className={styles.tagList}>
            {props.tags.map((tag, i) => <ListItem key={i} idx={i} transparent={props.transparent}> {tag} </ListItem>)}         
        </div>
    )   
}

export default TagList
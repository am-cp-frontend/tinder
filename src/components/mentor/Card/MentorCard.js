import React from 'react'
import PropTypes from 'prop-types'

import Card from '@components/core/Card~'
import Space from '@components/core/Space~'
import TagList from '@components/core/TagList~'

const MentorCard = props => {
    const tasks = props.short ? [] : props.tasks
    const tasksEl = tasks.map(task => null)

    const fieldsEl = <TagList tags={props.fields} />
    const contactsEl = <TagList tags={props.contacts} transparent={true} />

    return (
        <Card>
            <h4> {props.name} </h4>
            <Space bottom="s" />

            {contactsEl}
            <Space bottom="s" />
            
            {fieldsEl}
            
            { tasks.length ? <div> <Space bottom="s" /> {tasksEl} </div> : null }
        </Card>
    )
}

MentorCard.propTypes = {
    name: PropTypes.string.isRequired,
    contacts: PropTypes.arrayOf(PropTypes.string).isRequired,
    
    fields: PropTypes.arrayOf(PropTypes.string).isRequired,
    
    tasks: PropTypes.arrayOf(
        PropTypes.objectOf({
            skills: PropTypes.string.isRequired,
            explanation: PropTypes.string.isRequired
        })
    ).isRequired
}

export default MentorCard
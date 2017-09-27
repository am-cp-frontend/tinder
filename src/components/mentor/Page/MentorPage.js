import React from 'react'
import PropTypes from 'prop-types'

import Card from '@components/_core/Card~'

const MentorPage = props => (
    <Card>
        <h1> {props.name} </h1>
        {/* fields */}
        {/* contacts */}
        {/* tasks */}
    </Card>
)

MentorCard.propTypes = {
    name: PropTypes.string.isRequired,
    contacts: PropTypes.arrayOf(PropTypes.string).isRequired,

    description: PropTypes.element,
    fields: PropTypes.arrayOf(PropTypes.string).isRequired,
    
    tasks: PropTypes.arrayOf(
        PropTypes.objectOf({
            skills: PropTypes.string.isRequired,
            explanation: PropTypes.string.isRequired
        })
    ).isRequired
}

export default MentorCard
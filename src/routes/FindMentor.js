import React from 'react'

import FindMentorView from '@components/mentor/Find/FindMentor'

const mentors = [{
    name: 'Якушкин Олег Олегович',
    fields: ['Многопроцессорные системы', ' Компьютерное зрение'],
    contacts: ['mrj@email.com','447 каб.'],
    tasks: []
}]

class FindMentor extends React.Component {
    constructor(props) { 
        super(props) 
    }

    render() {
        return <FindMentorView mentors={mentors} />
    }
}

export default FindMentor
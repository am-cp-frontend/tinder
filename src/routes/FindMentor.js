import React from 'react'

import FindMentorView from '@components/mentor/Find/FindMentor'

const mentors = [{
    name: 'Якушкин Олег Олегович',
    fields: ['Многопроцессорные системы', ' Компьютерное зрение'],
    contacts: ['mrj@email.com','417 каб.'],
    tasks: []
}, {
    name: 'Погожев Сергей Владимирович',
    fields: [' Компьютерное зрение', 'Тег 1', 'English is fine, long is too'],
    contacts: ['best@apmath.spbu','447 каб.'],
    tasks: [{
        title: "Восстановление параметров модели морского подвижного объекта",
        desc: <div>  Надо будет... </div>,
        skills: <div> Fluid Dynamics, OpenGL, Cuda </div>
    }, {
        title: "Алгоритм классификации графов заданного порядка",
        desc: <div> Из названия понятно </div>,
        skills: <div> Графы, любой язык программирования </div>
    }]
}, {
    name: 'Погожев Сергей Владимирович',
    fields: [' Компьютерное зрение', 'Тег 1', 'English is fine, long is too'],
    contacts: ['best@apmath.spbu','447 каб.'],
    tasks: [{
        title: "Восстановление параметров модели морского подвижного объекта",
        desc: <div>  Надо будет... </div>,
        skills: <div> Fluid Dynamics, OpenGL, Cuda </div>
    }]
}
]

class FindMentor extends React.Component {
    constructor(props) { 
        super(props) 
    }

    render() {
        return <FindMentorView mentors={mentors} />
    }
}

export default FindMentor
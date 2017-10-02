import React from 'react'
import { inject, observer } from 'mobx-react'

import AsyncDataStore from '@src/store/AsyncDataStore'

import ViewBox from '@components/_utility/ViewBox~'
import FindMentorView from '@components/mentor/Find/FindMentor'

//stabs
const fetchMentors = cb => setTimeout(() => cb([{
    id: '0',
    name: 'Якушкин Олег Олегович',
    acceptsOwn: 'inField',
    fields: ['Многопроцессорные системы', ' Компьютерное зрение'],
    contacts: ['mrj@email.com','417 каб.'],
    tasks: []
}, {
    id: '1',
    name: 'Погожев Сергей Владимирович',
    acceptsOwn: 'none',
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
}]), 0)

@inject('store') @observer
class FindMentor extends React.Component {
    constructor(props) { 
        const store = props.store
        super(props)
        store.mount.mentors = new AsyncDataStore([])

        fetchMentors(mentorsData => store.mount.mentors.load(mentorsData))
    }

    render() {
        const store = this.props.store
        return (
            <ViewBox>
                <FindMentorView mentors={store.mount.mentors.data}
                                selectedFields={store.selectedFields} />
            </ViewBox>
        )
    }
}

export default FindMentor
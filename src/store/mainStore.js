import React from 'react'

import {observable} from 'mobx'
import {RouterStore} from 'mobx-router';

import AsyncDataStore from './AsyncDataStore'


//stabs
const mentors = [{
    id: 0,
    name: 'Якушкин Олег Олегович',
    fields: ['Многопроцессорные системы', ' Компьютерное зрение'],
    contacts: ['mrj@email.com','417 каб.'],
    tasks: []
}, {
    id: 1,
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
}]


class MainStore {
    @observable user = undefined
    constructor() {
        this.router = new RouterStore()
        this.route = new AsyncDataStore()

        this.mentors = mentors
    }
}

const store = new MainStore()

export default store
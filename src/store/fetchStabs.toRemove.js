import React from 'react'

const LOADTIME = 0

//stabs
export const fetchMentors = cb => setTimeout(() => cb([{
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
}]), LOADTIME)

//stab
export const fetchMentorData = cb => setTimeout(() => cb({
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
    }],
    ex: [{
        name: 'Трофимов Всеволод',
        contacts: ['vk.com/v-trof']
    }, {
        name: 'Трофимов Всеволод',
        contacts: ['seva.trofimov2@gmail.com', 'vk.com/v-trof']
    }]
}), LOADTIME)
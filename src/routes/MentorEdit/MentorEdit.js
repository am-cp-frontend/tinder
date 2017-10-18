import React from 'react'
import { inject, observer } from 'mobx-react'
import { autorun, toJS } from 'mobx'

import { Redirect } from 'react-mobx-router'

import ViewBox from '@components/_utility/ViewBox~'
import Spinner from '@components/_utility/Spinner~'

import MentorEditPage from '@components/mentor/PageEdit/MentorPageEdit'
import MentorEditStore from './MentorEditStore'

import request from '@utility/request'


const serverErrorsToRus = {
    'No rights': 'У вас нет прав для редактирования этой страницы',
    'No login': 'Сначала нужно войти'
}

@inject('store', 'history') @observer

class MentorEdit extends React.Component {
    constructor(props) {
        super(props)
        this.handleSaveResponce = this.handleSaveResponce.bind(this)
    }

    componentWillMount() {
        const mainStore = this.props.store
        this.store = new MentorEditStore({})
        
        this.mountId = mainStore.mount(this.store)
        
        if(mainStore.user.auth && mainStore.user.type === 'mentor')
            request('/data/mentor/' + mainStore.user.id, this.store)
        
        autorun(() => {
            document.title = 'Ред. ' + this.store.data.name || '...'
        })
    }

    componentWillUnmount() {
        this.props.store.unmount(this.mountId)
    }

    handleNameChange(e) {
        this.store.data.name = e.target.value
    }

    handleAcceptsOwnChange(e) {
        this.store.data.acceptsOwn = e.target.value
    }
    
    handleAboutChange(e) {
        this.store.data.about = e.target.value
    }

    handleAddTask() {
        this.store.addTask()
    }

    makeTaskHandlers(idx) {
        const tasks = this.store.data.tasks
        return {
            titleChange: (e) => tasks[idx].title = e.target.value,
            descChange: (e) => tasks[idx].desc = e.target.value,
            skillsChange: (e) => tasks[idx].skills = e.target.value,
            remove: () => tasks.splice(idx, 1)
        }
    }

    handleRevert() {
        this.store.revert()
    }

    handleSave() {
        request({
            type: 'POST',
            url: '/update/mentor/' + this.props.store.user.id,
            data: toJS(this.store.data)
        }, {
            load: this.handleSaveResponce
                
        })
    }

    handleSaveResponce(responce) {
        const mainStore = this.props.store

        if(responce.ok) {
            mainStore.notifications.add({
                type: 'success',
                message: 'Изменения сохранены'
            })

            request.forget('/data/mentors')
            request.forget('/data/mentor/'  + mainStore.user.id)

            this.store.save()
        } else {
            mainStore.notifications.add({
                type: 'error',
                message: serverErrorsToRus[responce.data.error]
            })
        }
    }

    render() {
        const user = this.props.store.user
        const mentorData = this.store.data
        
        if( ! user.auth || ! user.type === 'mentor') {
            user.destination = this.props.history.location.pathname
            return <Redirect to='/auth/magic/0' />
        }

        if( mentorData.error ) {
            return <Redirect to='/404' />
        }

        if( ! this.store.loaded) {
            return (
                <ViewBox center='horizontal'>
                    <Spinner />  
                </ViewBox>
            )
        }

        return (
            <ViewBox center='horizontal'>
                <MentorEditPage  {...mentorData}
                                 handleNameChange={e => this.handleNameChange(e)}
                                 handleAcceptsOwnChange={e => this.handleAcceptsOwnChange(e)}
                                 handleAboutChange={e => this.handleAboutChange(e)}

                                 handleAddTask={e => this.handleAddTask(e)}
                                 makeTaskHandlers={idx => this.makeTaskHandlers(idx)}

                                 handleRevert={() => this.handleRevert()}
                                 handleSave={() => this.handleSave()} />  
            </ViewBox>
        )
    }
}

export default MentorEdit
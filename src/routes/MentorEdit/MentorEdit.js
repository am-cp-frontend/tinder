import React from 'react'
import { inject, observer } from 'mobx-react'
import { autorun, toJS, observable, action } from 'mobx'
import deepEqual from 'deep-equal'

import { Redirect } from 'react-mobx-router'

import ViewBox from '@components/_utility/ViewBox~'
import Spinner from '@components/_utility/Spinner~'
import Space from '@components/_core/Space~'
import Card from '@components/_core/Card~'

import MentorPage from '@components/mentor/Page/MentorPage'
import MentorEditPage from '@components/mentor/PageEdit/MentorPageEdit'
import MentorEditStore from './MentorEditStore'
import AsyncDataStore from '@store/AsyncDataStore'

import request from '@utility/request'

import styles from './MentorEdit.sass'

const serverErrorsToRus = {
    'No rights': 'У вас нет прав для редактирования этой страницы',
    'No login': 'Сначала нужно войти'
}

@inject('store', 'history') @observer

class MentorEdit extends React.Component {
    @observable tmpVals = {
        reinforce: ''
    }
    constructor(props) {
        super(props)
        this.handleSaveResponce = this.handleSaveResponce.bind(this)
        this.handleSave = this.handleSave.bind(this)
    }

    componentWillMount() {
        const mainStore = this.props.store
        this.store = new MentorEditStore({})
        this.autocompleteStore = new AsyncDataStore([])

        this.autosaveTimeout = setTimeout(() => {}, 0)
        this.mountId = mainStore.mount(this.store)
        
        if(mainStore.user.auth && mainStore.user.type === 'mentor')
            request('/data/mentor/' + mainStore.user.id, this.store)
            request('data/fields/', this.autocompleteStore)

        let oldFields = [], oldContacts = []
        let initialSet = false

        autorun(() => {
            document.title = 'Ред. ' + this.store.data.name || '...'

            if(this.store.loaded && !initialSet) {
                oldFields = this.store.data.fields.toJS()
                oldContacts = this.store.data.contacts.toJS()
                initialSet = true
            }

            //binding
            if(this.store.data.fields && this.store.data.contacts) {
                const newFields = this.store.data.fields.toJS()
                const newContacts = this.store.data.contacts.toJS()

                if(! deepEqual(newContacts, oldContacts)
                || ! deepEqual(newFields, oldFields)) {
                    oldFields = newFields
                    oldContacts = newContacts
                    if(initialSet) this.autosave()
                }
            }
        })

        const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)

        if(isSafari) {
            mainStore.notifications.add({
                type: 'warning',
                message: 'В Safari временно возможны неплоладки, пожалуйста, воспользуйтесь Chrome \\ Firefox'
            })
        }
    }

    componentWillUnmount() {
        this.props.store.unmount(this.mountId)
        clearTimeout(this.autosaveTimeout)
    }

    handleNameChange(e) {
        this.store.data.name = e.target.value
        this.autosave()
    }

    handleFieldsReinforceChange(e) {
        this.tmpVals.reinforce = e.target.value
    }

    @action handleFieldsReinforceAdd() {
        if(this.$reinforce && this.tmpVals.reinforce === '') {
            this.$reinforce.focus()
        } else {
            this.store.data.fields.push(this.tmpVals.reinforce)
            this.tmpVals.reinforce = ''
        }
    }

    setFieldsReinforce($el) {
        if( ! this.$reinforce)
            this.$reinforce = $el.input
    }

    handleAcceptsOwnChange(e) {
        this.store.data.acceptsOwn = e.target.value
        this.autosave()
    }
    
    handleAboutChange(e) {
        this.store.data.about = e.target.value
        this.autosave()
    }

    handleAddTask() {
        this.store.addTask()
        this.autosave()
    }

    autosave() {
        clearTimeout(this.autosaveTimeout)
        this.autosaveTimeout = setTimeout(this.handleSave, 1000)
    }

    makeTaskHandlers(idx) {
        const autosave = this.autosave.bind(this)
        const tasks = this.store.data.tasks
        return {
            titleChange:  (e) => {tasks[idx].title = e.target.value; autosave()},
            descChange:   (e) => {tasks[idx].desc = e.target.value; autosave()},
            skillsChange: (e) => {tasks[idx].skills = e.target.value; autosave()},
            remove: () => {tasks.splice(idx, 1); autosave()},
            addAttachment: () => {
                autosave()
                tasks[idx].attachments.push({
                    title: '',
                    link: ''
            })},
            makeAttachmentHandlers: (attachmentIdx) => {
                const attachment = tasks[idx].attachments[attachmentIdx]
                return {
                    titleChange: (e) => {attachment.title = e.target.value; autosave()},
                    linkChange:  (e) => {attachment.link = e.target.value; autosave()},
                    remove: () => {tasks[idx].attachments.splice(attachmentIdx, 1); autosave()}
                }
            }
        }
    }

    handleRevert() {
        this.store.revert()
        this.autosave()
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
            <div className={styles.row}>
                <ViewBox center='horizontal'>
                    <MentorEditPage  {...mentorData}
                                    tmpVals={this.tmpVals}
                                    fieldsAutocomplete={this.autocompleteStore.data}

                                    handleNameChange={e => this.handleNameChange(e)}
                                    handleAcceptsOwnChange={e => this.handleAcceptsOwnChange(e)}
                                    handleAboutChange={e => this.handleAboutChange(e)}

                                    handleFieldsReinforceChange={e => this.handleFieldsReinforceChange(e)}
                                    handleFieldsReinforceAdd={e => this.handleFieldsReinforceAdd()}
                                    setFieldsReinforce = {$el => this.setFieldsReinforce($el)}

                                    handleAddTask={e => this.handleAddTask(e)}
                                    makeTaskHandlers={idx => this.makeTaskHandlers(idx)}

                                    handleRevert={() => this.handleRevert()}
                                    handleSave={() => this.handleSave()} />  
                </ViewBox>
                <ViewBox center='horizontal'>
                    <Card> 
                        <Space all='s'>
                            <h3> Предварительный просмотр </h3>
                        </Space> 
                    </Card>
                    <Space bottom='m' />
                    <MentorPage {...mentorData} />
                </ViewBox>
            </div>
        )
    }
}

export default MentorEdit
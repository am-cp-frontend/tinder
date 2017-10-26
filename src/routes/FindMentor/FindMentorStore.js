import { observable, computed } from 'mobx'
import AsyncDataStore from '@src/store/AsyncDataStore'

import mainStore from '@store/mainStore'

import simplify from '@utility/simplify'

class FindMentorStore extends AsyncDataStore {
    @observable selectedFields = []
    @observable hasOwnTopic = false
    
    @computed get mentors() {
        const priorityMentos = []
        const fineMentors = []

        this.data.forEach(mentor => {
            if(mentor.fields < 10)
                priorityMentos.push(mentor)
            else 
                fineMentors.push(mentor)
        })

        return priorityMentos.concat(fineMentors)
    }
    
    @computed get stortedMentors() {
        if(!this.hasOwnTopic && this.selectedFields.length === 0) 
            return this.mentors
        
        const priorityMentos = []
        const fineMentors = []
        const simpleFields = this.selectedFields.map(simplify)

        const fullDataMentors = this.mentors.map(mentorData => {
            let inField = this.selectedFields.length === 0
            let hasTasks = mentorData.tasks.length > 0

            simpleFields.forEach(field => {
                if(mentorData._simpleFields.includes(field)) inField = true
            })

            return {
                inField,
                hasTasks,
                acceptsOwn: mentorData.acceptsOwn,
                data: mentorData
            }
        })

        if(this.hasOwnTopic) {
            fullDataMentors.forEach(mentor => {
                if(mentor.inField && mentor.acceptsOwn !== 'none') priorityMentos.push(mentor.data)
                else if(mentor.acceptsOwn === 'any') fineMentors.push(mentor.data)
            })
        }
        else {
            fullDataMentors
                .filter(mentor => mentor.inField)
                .forEach(mentor => {
                    if(mentor.hasTasks)
                        priorityMentos.push(mentor.data)
                    else 
                        fineMentors.push(mentor.data)
                })
        }

        return priorityMentos.concat(fineMentors)
    }

    @computed get mentorTags() {
        //impure but fast
        const mentorTags = this.mentors.reduce((oldVal, mentor) => {
            mentor.fields.toJS().forEach(field => oldVal.add(field))
            return oldVal
        }, new Set([]))
        return [...mentorTags]
    }

    load(data) {
        if(data.ok === false) {
            mainStore.notifications.add({
                type: 'error',
                message: 'Не удалось получть список научных руководителей с сервера'
            })
            data = []
        }
        data.forEach(mentor => {
            mentor._simpleFields = mentor.fields.map(simplify)
        })
        super.load(data)
    }
}

export default FindMentorStore
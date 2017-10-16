import { observable, computed } from 'mobx'
import AsyncDataStore from '@src/store/AsyncDataStore'

import mainStore from '@store/mainStore'

import simplify from '@utility/simplify'

class FindMentorStore extends AsyncDataStore {
    @observable selectedFields = []
    @observable hasOwnTopic = false
    
    @computed get mentors() {
        return this.data
    }
    
    @computed get stortedMentors() {
        if(!this.hasOwnTopic && this.selectedFields.length === 0) 
            return this.mentors
        
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
            const priorityMentos = []
            const fineMentors = []

            fullDataMentors.forEach(mentor => {
                if(mentor.inField && mentor.acceptsOwn !== 'none') priorityMentos.push(mentor.data)
                else if(mentor.acceptsOwn === 'any') fineMentors.push(mentor.data)
            })

            return [...priorityMentos, ...fineMentors]
        }
        else {
            return fullDataMentors
                    .filter(mentor => mentor.hasTasks && mentor.inField)
                    .map(mentor => mentor.data)
        }        
    }

    load(data) {
        if(data.ok === false) {
            mainStore.notifications.add({
                type: 'error',
                message: 'Не удалось получть список научруков с сервера'
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
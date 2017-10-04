import { observable, computed } from 'mobx'
import AsyncDataStore from '@src/store/AsyncDataStore'

class FindMentorStore extends AsyncDataStore {
    @observable selectedFields = []
    @observable hasOwnTopic = false
    
    @computed get mentors() {
        return this.data
    }

    @computed get stortedMentors() {
        const fullDataMentors = this.mentors.map(mentorData => {
            let inField = this.selectedFields.length === 0
            let hasTasks = mentorData.tasks.length > 0

            this.selectedFields.forEach(field => {
                if(mentorData.fields.includes(field)) inField = true
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
}

export default FindMentorStore
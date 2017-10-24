import { toJS, observable, computed } from 'mobx'

import AsyncDataStore from '@src/store/AsyncDataStore'

class MentorEditStore extends AsyncDataStore {
    constructor(data) {
        super(data)
        this.backup = data
    }

    load(data) {
        data.tasks.forEach(task => {
            task.attachments = task.attachments || []
        })
        super.load(data)
        this.backup = Object.assign(data)
    }

    addTask() {
        this.data.tasks.push({
            title: '',
            desc: '',
            skills: '',
            attachments: []
        })
    }

    revert() {
        this.load(this.backup)
    }

    save() {
        this.load(toJS(this.data))
    }
}

export default MentorEditStore
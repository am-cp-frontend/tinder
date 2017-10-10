import { toJS, observable, computed } from 'mobx'
import deepCopy from 'deepcopy'

import AsyncDataStore from '@src/store/AsyncDataStore'

class MentorEditStore extends AsyncDataStore {
    constructor(data) {
        super(data)
        this.backup = data
    }

    load(data) {
        super.load(data)
        this.backup = deepCopy(data)
    }

    addTask() {
        this.data.tasks.push({
            title: '',
            desc: '',
            skills: ''
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
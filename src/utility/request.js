import AsyncDataStore from './AsyncDataStore'

const memory = {}

const handleError = error => {
    console.error(error)
}

const handleRequest = {
    'GET': (req, dataStore, options) => {
        if( ! options.noCache && memory[req.url]) 
            dataStore.load(memory[req.url])
        else 
            fetch(req.url).then(dataStore.load).catch(handleError)
    },
    'POST': (req, dataStore, options) => {
        const xhr = new XMLHttpRequest()
        const formData = new FromData()

        if(req.data instanceof FormData) 
            for(key in req.data) formData.append(key, req[key])
        else 
            formData = req.data

        xhr.onreadystatechange = data => {
            if(xhr.readyState == 4 && xhr.status == 200) 
                dataStore.load(xhr.response)
        }
        xhr.onerror = handleError

        xhr.open(req.type, req.url, true)
        xhr.send(formData)
    }
}

const defaults = {
    noCache: false
}

const request = (req, dataStore, options) => {
    if(typeof req === 'String' || req instanceof String) {
        req = {
            type: 'GET',
            url: req
        }
    }

    if( ! dataStore) dataStore = new AsyncDataStore({})
    
    options = Object.Assign({}, defaults, options)

    handleRequest(req, dataStore, options)        
    return dataStore
}

export default request
import AsyncDataStore from '@store/AsyncDataStore'

const memory = {}

const handleError = error => {
    console.error(error)
}

const handleRequest = {
    'GET': (req, dataStore, options) => {
        if( ! options.noCache && memory[req.url]) 
            dataStore.load(memory[req.url])
        else {
            fetch(req.url)
                .then(options.parser)
                .then(data => {
                    if( ! options.noCache) memory[req.url] = data
                    dataStore.load(data)
                })
                .catch(handleError)
        }
    },
    'POST': (req, dataStore, options) => {
        const xhr = new XMLHttpRequest()
        const formData = req.data instanceof FormData ? req.data : new FromData()

        if( ! req.data instanceof FormData) 
            for(key in req.data) formData.append(key, req[key])

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
    noCache: false,
    parser: responce => responce.clone().json()
}

const request = (req, dataStore, options) => {
    if(typeof req === 'string' || req instanceof String) {
        req = {
            type: 'GET',
            url: req
        }
    }

    if( ! dataStore) dataStore = new AsyncDataStore({})
    
    options = Object.assign({}, defaults, options)

    handleRequest[req.type](req, dataStore, options)        
    return dataStore
}

export default request
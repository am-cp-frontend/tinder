import AsyncDataStore from '@store/AsyncDataStore'

const memory = {}

const handleError = error => {
    console.error(error)
}

const forget = url => {
    delete memory[url]
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

        xhr.onreadystatechange = data => {
            if(xhr.readyState == 4 && xhr.status == 200) 
                dataStore.load(xhr.response)
        }
        xhr.onerror = handleError
        
        xhr.open(req.type, req.url, true)
        xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8')
        
        xhr.send(JSON.stringify(req.data))
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

request.forget = forget

export default request
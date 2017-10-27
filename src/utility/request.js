import AsyncDataStore from '@store/AsyncDataStore'
import 'whatwg-fetch'
require('es6-promise').polyfill()

const memory = {}

const handleError = dataStore => error => {
    console.error(error)
    if(error.loaded) {
        dataStore.load({
            ok: false,
            data: 'Ошибка на сервере'
        })
    } else {
        dataStore.load({
            ok: false,
            data: 'Не удалось связаться с сервером'
        })
    }
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
                .catch(handleError(dataStore))
        }
    },
    'POST': (req, dataStore, options) => {
        const xhr = new XMLHttpRequest()

        xhr.onreadystatechange = data => {
            if(xhr.readyState == 4 && xhr.status == 200) {
                try {
                    dataStore.load(JSON.parse(xhr.response))
                } catch(err) {
                    dataStore.load(xhr.response)
                }
            }       
        }
        xhr.onerror = handleError(dataStore)
        
        xhr.open(req.type, req.url, true)
        xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8')
        
        xhr.send(JSON.stringify(req.data))
    }
}

const defaults = {
    noCache: false,
    parser: responce => {
        try {
            return responce.json()
        } catch(err) {
            return responce.text()
        }
    }
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
import React from 'react'
import request from '@utility/request'

const LOADTIME = 1000 * 0

export const auth = (data, cb) => {   
    if(data.login === 'err') {
        setTimeout(() => cb({
            error: 'wrong login',
            message: 'Такого email нет в нашей базе'
        }), LOADTIME)
        return false
    }

    request('/data/mentors', {load: data => {
        setTimeout(() => cb({
            token: '24x541fd',
            type: 'mentor',
            id: data[0]._id
        }), LOADTIME)
    }})
}
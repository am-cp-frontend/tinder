import React from 'react'

import H from '@components/_core/Header~'
import Space from '@components/_core/Space~'
import Card from '@components/_core/Card~'

import TextInput from '@components/_input/Text~'
import Button from '@components/_input/Button~'

import styles from './Login.sass'

const Login = props => (
    <Card> 
        <Space all='m' className={styles.host}> 
            <H level={2}> Вход </H>
            <table><tbody>
                <tr>
                    <td> <Space right='xs'> SPBU login </Space> </td>
                    <td> 
                        <TextInput id='login' 
                                   placeholder='как в BlackBoard' /> 
                    </td>
                </tr>
                <tr>
                    <td> <Space right='xs'> Пароль </Space> </td>
                    <td> 
                        <TextInput type='password'
                                   id='pass'
                                   placeholder='как в BlackBoard' />
                    </td>
                </tr>
            </tbody></table>
            <Space bottom='s' />
            <div>
                <Button> Войти </Button>
            </div>
        </Space>
    </Card>
)

export default Login
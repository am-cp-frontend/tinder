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
        <Space bottom='xxs' />
        <table><tbody>
            <tr>
                <td> <Space right='xs'> Email </Space> </td>
                <td> 
                    <TextInput id='login'
                               className={styles.input}
                               autoFocus
                               onChange={props.handleLoginChange}
                               onKeyUp={[
                                    {key: 13, cb: props.onSubmit}
                                ]}
                               placeholder='Указанный на сайте ПМ-ПУ' /> 
                </td>
            </tr>
        </tbody></table>
        <Space bottom='s' />
        <div>
            <Button onClick={props.onSubmit}> Войти </Button>
        </div>
    </Space>
    </Card>
)

export default Login
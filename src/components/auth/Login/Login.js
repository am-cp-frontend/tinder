import React from 'react'

import H from '@components/_core/Header~'
import Space from '@components/_core/Space~'
import Card from '@components/_core/Card~'
import Spinner from '@components/_utility/Spinner~'

import TextInput from '@components/_input/Text~'
import Button from '@components/_input/Button~'

import styles from './Login.sass'

const EmailRequestForm = props => (
    <div>
        <H level={2} className={styles.title}> Вход </H>
        <Space bottom='xxs' />
        <table><tbody>
            <tr>
                <td> <Space right='xs'> Email </Space> </td>
                <td> 
                    <TextInput id='email'
                               className={styles.input}
                               autoFocus
                               onChange={props.handleEmailChange}
                               type='email'
                               onKeyUp={[
                                    {key: 13, cb: props.onSubmit}
                               ]}
                               placeholder='Указанный на сайте ПМ-ПУ' /> 
                </td>
            </tr>
        </tbody></table>
        <Space bottom='s' />
        <div className={styles.actions}>
            <Button onClick={props.onSubmit}> Далее </Button>
        </div>
    </div>
)

const Sending = props => (
    <div className={styles.spinnerBox}>
        <Spinner />
    </div>
)

const EmailSent = props => (
    <div>
        <Space bottom='s'>
            Мы отправили ссылку для входа на адрес {props.email}. <br /><br />
            Если она не пришла в течение 5 минут нажмите
            <br /> "Отправить еще раз"
        </Space>
        <div className={styles.actions}>
            <Space right='s'>
                <Button onClick={props.onResend} autoFocus>
                    Отправить еще раз
                </Button>
            </Space>
            <Button onClick={props.onEmailSwap}>
                Отправить на другой email
            </Button>
        </div>
    </div>
)

const sendStateViewMap = {
    'todo': EmailRequestForm,
    'sending': Sending,
    'sent': EmailSent
}

const Login = props => (
    <Space all='m' className={styles.host}>
        {React.createElement(sendStateViewMap[props.sendState], props)}
    </Space>
)

export default Login
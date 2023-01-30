import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import { Button } from '@mui/material';
import { useState } from 'react';
import Helper from '../../image/helper.png'

function Chat() {

    const [checked, setChecked] = useState(false)

    return  <>
                {checked?
                    <div className='chat-bg' onClick={() => setChecked(false)}>
                        <div className='chat activ-chat' onClick={(e) => e.stopPropagation() }>
                        <div className='chat-header'>
                            <img alt='img-helper' className='img-helper' src={Helper}></img>
                            <div className='helper-nickName'>
                                <div style={{fontWeight: "bold"}}>Служба поддержки</div>
                                <div style={{fontSize: '12px'}}>Онлайн</div>
                            </div>
                        </div>
                        <div></div>
                        <div className='body-chat-sms'>
                        <input
                            style={{padding: '.375rem .75rem', border: '.5px solid #ced4da', width: '100%', marginRight: '1px',borderRadius: '0 0 0 9px'}}
                            type={'text'}
                            placeholder='Введите сообщение'
                            >
                            </input>
                            <Button
                            size='large'
                            sx={{
                            border: "0.5px solid black",
                            borderRadius: '0 0 9px 0',
                            width: "60%",
                            background: "black",
                            alignSelf: 'flex-end',
                            color: '#FFFFFF',
                            borderColor: '#FFF',
                            marginLeft: 'auto',
                            }}>Отправить</Button>
                        </div>
                        </div>
                    </div>:
                ''}
                <HeadsetMicIcon onClick={() => setChecked(!checked)} className='chat-icon icon-chat-sizes'></HeadsetMicIcon>
            </>
}

export default Chat
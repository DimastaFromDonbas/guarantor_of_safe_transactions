import { Button } from '@mui/material';
import { useState } from 'react';
import Helper from '../../image/helper.png'
import CloseIcon from '@mui/icons-material/Close';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';

function Chat() {

    const [checked, setChecked] = useState(false)

    return  <>
                {checked?
                    <div className='chat-bg' onClick={() => setChecked(false)}>
                        <div className={checked?"chat activ-chat":"chat"} onClick={(e) => e.stopPropagation()}>
                        <div className='chat-header'>
                            <img alt='img-helper' className='img-helper' src={Helper}></img>
                            <div className='helper-nickName'>
                                <div style={{fontWeight: "bold"}}>Служба поддержки</div>
                                <div style={{fontSize: '12px'}}>Онлайн</div>
                            </div>
                            <CloseIcon onClick={() => setChecked(false)} style={{color: 'white', position: 'absolute', right: '15px',width:'30px',height:'30px'}}></CloseIcon>
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
                            border: '1px black',
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
                {/* {!checked?<HeadsetMicIcon onClick={() => setChecked(!checked)} className='chat-icon icon-chat-sizes'></HeadsetMicIcon> : ''} */}
                {!checked?<div className='chat-icon'><Badge style={{color:'white'}} onClick={() => setChecked(!checked)} badgeContent={4} className='icon-chat-sizes2' color="primary">
                    <MailIcon color="action" />
                </Badge> </div>: ''}
            </>
}

export default Chat
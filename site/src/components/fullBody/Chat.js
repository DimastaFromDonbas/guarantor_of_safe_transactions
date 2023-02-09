import { Button } from '@mui/material';
import { useState } from 'react';
import Helper from '../../image/helper.png'
import CloseIcon from '@mui/icons-material/Close';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import SendIcon from '@mui/icons-material/Send';

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
                            style={{padding: '.375rem .75rem', border: '.5px solid #ced4da', width: '80%', marginRight: '1px',borderRadius: '0 0 0 9px'}}
                            type={'text'}
                            placeholder='Введите сообщение'
                            >
                            </input>
                          <input className='fileInput' name='file' id='file' multiple type={'file'}>
                          </input>
                          <label
                          htmlFor='file'
                          >
                            <span>+</span>
                          </label>
                            <Button
                            size='large'
                            sx={{
                            border: '1px black',
                            borderRadius: '0 0 9px 0',
                            width: "20%",
                            background: "black",
                            alignSelf: 'flex-end',
                            color: '#FFFFFF',
                            height: '41px',
                            borderColor: '#FFF',
                            marginLeft: 'auto',
                            }}><SendIcon className='paperPlan'></SendIcon></Button>
                        </div>
                        </div>
                    </div>:
                ''}
                {/* {!checked?<HeadsetMicIcon onClick={() => setChecked(!checked)} className='chat-icon icon-chat-sizes'></HeadsetMicIcon> : ''} */}
                {!checked?<div className='chat-icon'><Badge style={{color:'white'}} onClick={() => setChecked(!checked)} badgeContent={'!'} className='icon-chat-sizes2' color="error">
                    <MailIcon color="action" />
                </Badge> </div>: ''}
            </>
}

export default Chat
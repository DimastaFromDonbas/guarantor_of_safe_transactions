import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import { useState } from 'react';
import Helper from '../../image/helper.png'

function Chat() {

    const [checked, setChecked] = useState(false)

    return <>
                {checked?
                <div className='chat activ-chat'>
                <div className='chat-header'>
                    <img alt='img-helper' className='img-helper' src={Helper}></img>
                    <div className='helper-nickName'>
                        <div style={{fontWeight: "bold"}}>Служба поддержки</div>
                        <div style={{fontSize: '12px'}}>Онлайн</div>
                    </div>
                </div>
                <div></div>
                <div></div>
            </div>:
            ''}
            <HeadsetMicIcon onClick={() => setChecked(!checked)} className='chat-icon icon-chat-sizes'></HeadsetMicIcon>
    </>
}

export default Chat
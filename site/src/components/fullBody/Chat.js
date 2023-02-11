import { Button } from '@mui/material';
import { useState, useEffect } from 'react';
import Helper from '../../image/helper.png';
import CloseIcon from '@mui/icons-material/Close';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import SendIcon from '@mui/icons-material/Send';
import { axiosGetMessagestoAdmin } from '../../api/axios';
import { useAppSelector } from '../../store/reduxHooks';
import { useDispatch } from 'react-redux';
import { reducerTypes } from '../../store/Users/types';
import { socket } from './Header';

function Chat() {
  const dispatch = useDispatch();
  const { user, messageToAdmin } = useAppSelector((store) => store.user);
  const [checked, setChecked] = useState(false);
  const [userMessage, setUserMessage] = useState('');

  async function getMessagesToAdmin() {
    if (!user?.email) return;
    const result = await axiosGetMessagestoAdmin(user?.email);
    if (result) {
      dispatch({
        type: reducerTypes.GET_MESSAGE_TO_ADMIN,
        payload: result.sort((a, b) => a.id - b.id)
      });
    }
  }

  function sendMessageToAdmin(message) {
    if (!message) return alert('Сообщение не может быть пустым');
    if (!user?.email || !user?.nickname) return alert('Войдите в аккаунт');
    const time = new Date().toLocaleString().replaceAll(',', '');
    socket.emit('sendMessageToAdmin', { nickname: user?.nickname, email: user?.email, time, message });
    setUserMessage('');
  }

  useEffect(() => {
    getMessagesToAdmin();
    // eslint-disable-next-line
  }, [user]);

  useEffect(() => {
    socket.emit('join', { name: user?.email, room: user?.email });
  }, [user]);

  useEffect(() => {
    socket.on('messageToAdmin', ({ data }) => {
      dispatch({
        type: reducerTypes.GET_MESSAGE_TO_ADMIN,
        payload: [...messageToAdmin, data]
      });
    });
    // eslint-disable-next-line
  }, [messageToAdmin]);

  useEffect(() => {
    socket.on("updateChatStatus", ({ data }) => {
      if (data) {
        getMessagesToAdmin();
      }
    });
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {checked ? (
        <div className="chat-bg" onClick={() => setChecked(false)}>
          <div className={checked ? 'chat activ-chat' : 'chat'} onClick={(e) => e.stopPropagation()}>
            <div className="chat-header">
              <img alt="img-helper" className="img-helper" src={Helper}></img>
              <div className="helper-nickName">
                <div style={{ fontWeight: 'bold' }}>Служба поддержки</div>
                <div style={{ fontSize: '12px' }}>Онлайн</div>
              </div>
              <CloseIcon
                onClick={() => setChecked(false)}
                style={{ color: 'white', position: 'absolute', right: '15px', width: '30px', height: '30px' }}
              ></CloseIcon>
            </div>
            <div style={{ overflow: 'overlay' }}>
              {messageToAdmin?.map((item) => (
                <div style={{ color: 'white' }}>
                  {item?.id} / {item.message}
                </div>
              ))}
            </div>
            <div className="body-chat-sms">
              <input
                style={{
                  padding: '.375rem .75rem',
                  border: '.5px solid #ced4da',
                  width: '80%',
                  marginRight: '1px',
                  borderRadius: '0 0 0 9px'
                }}
                type={'text'}
                placeholder="Введите сообщение"
                value={userMessage}
                onChange={(e) => String(setUserMessage(e.target.value))}
                onKeyDown={(e) => e.key === 'Enter' && sendMessageToAdmin(userMessage)}
              ></input>
              <input className="fileInput" name="file" id="file" multiple type={'file'}></input>
              <label htmlFor="file">
                <span>+</span>
              </label>
              <Button
                size="large"
                sx={{
                  border: '1px black',
                  borderRadius: '0 0 9px 0',
                  width: '20%',
                  background: 'black',
                  alignSelf: 'flex-end',
                  color: '#FFFFFF',
                  height: '41px',
                  borderColor: '#FFF',
                  marginLeft: 'auto'
                }}
                onClick={() => sendMessageToAdmin(userMessage)}
              >
                <SendIcon className="paperPlan"></SendIcon>
              </Button>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
      {/* {!checked?<HeadsetMicIcon onClick={() => setChecked(!checked)} className='chat-icon icon-chat-sizes'></HeadsetMicIcon> : ''} */}
      {!checked ? (
        <div className="chat-icon">
          <Badge
            style={{ color: 'white' }}
            onClick={() => setChecked(!checked)}
            badgeContent={'!'}
            className="icon-chat-sizes2"
            color="error"
          >
            <MailIcon color="action" />
          </Badge>{' '}
        </div>
      ) : (
        ''
      )}
    </>
  );
}

export default Chat;

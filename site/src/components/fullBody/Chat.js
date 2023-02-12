import { Button } from '@mui/material';
import { useState, useEffect, useRef } from 'react';
import Helper from '../../image/helper.png';
import CloseIcon from '@mui/icons-material/Close';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import SendIcon from '@mui/icons-material/Send';
import { axiosGetMessagestoAdmin } from '../../api/axios';
import { useAppSelector } from '../../store/reduxHooks';
import { useDispatch } from 'react-redux';
import { reducerTypes } from '../../store/Users/types';
import { socket } from '../Main';
import ImageDisplay from './renderImage';

function Chat() {
    const dispatch = useDispatch();
    const { user, messageToAdmin } = useAppSelector((store) => store.user);
    const [checked, setChecked] = useState(false);
    const [newMessage, setNewMessage] = useState(false);
    const [userMessage, setUserMessage] = useState('');
    const chatRef = useRef(null);
    const [image, setImage] = useState(null);

    const handleChange = e => {
        setImage(e.target.files[0]);
        console.log(1, e.target.files)
    };

    async function getMessagesToAdmin() {
        if (!user?.email) return;
        const result = await axiosGetMessagestoAdmin(user?.email);
        if (result) {
            dispatch({
                type: reducerTypes.GET_MESSAGE_TO_ADMIN,
                payload: result.sort((a, b) => a.id - b.id)
            });
            const resultLength = Number(localStorage.getItem('messagetoadminLength')) || 0;
            if (result?.length > resultLength) setNewMessage(true)
        }
    }

    function sendMessageToAdmin(message) {
        if (!message) return alert('Сообщение не может быть пустым');
        if (!user?.email || !user?.nickname) return alert('Войдите в аккаунт');
        const time = new Date().toLocaleString().replaceAll(',', '');
        const reader = new FileReader();
        reader.readAsDataURL(image || new Blob([]))
        reader.onload = () => {
            socket.emit('sendMessageToAdmin', { nickname: user?.nickname, email: user?.email, time, message, image: reader?.result || null });
            setUserMessage('');
        }
    }

    useEffect(() => {
        getMessagesToAdmin();
        // eslint-disable-next-line
    }, [user]);

    useEffect(() => {
        socket.emit('join', { name: user?.email, room: user?.email });
    }, [user]);

    // useEffect(() => {
    //     if (!messageToAdmin[7]) return;
    //     const reader = new FileReader();
    //     reader.readAsDataURL(new Blob(messageToAdmin[7]?.image.data));
    //     reader.onload = () => {
    //         setImageUrl(reader.result);
    //     };
    // }, [messageToAdmin]);

    useEffect(() => {
        socket.on('messageToAdmin', ({ data }) => {
            if (messageToAdmin?.includes(data)) return;
            dispatch({
                type: reducerTypes.GET_MESSAGE_TO_ADMIN,
                payload: [...messageToAdmin, data]
            });
            setNewMessage(true)
        });
        // eslint-disable-next-line
    }, [messageToAdmin]);

    useEffect(() => {
        socket.on('updateChatStatus', ({ data }) => {
            if (data) {
                getMessagesToAdmin();
            }
        });
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (!messageToAdmin[10]) return;
        // console.log('image', messageToAdmin[7].image)
        // const blob = new Blob([messageToAdmin[7].image.data], { type: "image/jpeg" });
        // const link = document.createElement("a");
        // link.href = URL.createObjectURL(blob);
        // link.download = "image.jpeg";
        // console.log(3, messageToAdmin[7].image.data.toString('base64'))
        //link.click();
        if (chatRef?.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
        // eslint-disable-next-line
    }, [messageToAdmin]);

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
                                onClick={() => {
                                    localStorage.setItem('messagetoadminLength', String(messageToAdmin?.length))
                                    setChecked(false)
                                }}
                                style={{ color: 'white', position: 'absolute', right: '15px', width: '30px', height: '30px' }}
                            ></CloseIcon>
                        </div>
                        <div style={{ overflow: 'overlay', height: '341px' }} ref={chatRef}>
                            {messageToAdmin
                                ?.filter((el) => el.statusForUser !== 2)
                                .map((item) => (
                                    <div style={{ color: 'white' }}>
                                        {item?.id} / {item.message}
                                        {item?.image && item?.image !== "data:" ? <img width='100%' src={`${item.image}`} alt="Image from base64" /> : null}
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
                            <input className="fileInput" name="file" id="file" multiple type='file' onChange={handleChange}></input>
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
                        onClick={() => {
                            setNewMessage(false)
                            setChecked(!checked)
                            localStorage.setItem('messagetoadminLength', String(messageToAdmin?.length))
                        }}
                        badgeContent={newMessage ? '!' : null}
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

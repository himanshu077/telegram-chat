import React, { useState, useEffect } from 'react';
import moment from 'moment';
import InfiniteScroll from 'react-infinite-scroll-component';
import { v4 as uuidv4 } from 'uuid';
import phone from './images/phone.PNG';
import more from './images/more.PNG';
import search from './images/search.PNG';
import sticker from './images/sticker.PNG';
import emma from './images/emma.PNG';
import checkmark from './images/checkmark.PNG';
import mic from './images/mic.PNG';
import stickerIcon from './images/sticker-icon.PNG';
import clip from './images/clip.PNG';
import {
  CHAT_HISTORY_LENGTH,
  fakeApiCall,
  getSortedChat,
} from './fake-api/fakeApi';

import CHAT_HEADER from './fake-api/chat-header.json';
import TextChat from './components/TextChat';
import EditedChat from './components/EditedChat';
import { dateToFromNowDaily, extractDateFromISOString } from './utils';
import StickerChat from './components/StickerChat';

import './App.css';
import Spinner from './components/Spinner';

const PER_PAGE_LIMIT = 5;
const MESSAGE_SENDER_ID = '2';

console.log(moment().startOf('day').toISOString(), 'start_of_the_day');

function App() {
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [message, setMessage] = useState('');

  const fetchChatHistory = async () => {
    setLoading(true);
    const data = await fakeApiCall({
      currentPage,
      perPageLimit: PER_PAGE_LIMIT,
    });
    setLoading(false);
    setChatHistory((prevHistory) => prevHistory.concat(data));
  };

  // const fetchChatHistory = async () => {
  //   setLoading(true);
  //   const data = await fakeApiCall({
  //     currentPage,
  //     perPageLimit: PER_PAGE_LIMIT,
  //   });
  //   setLoading(false);
  //   setChatHistory(data);
  // };

  console.log(chatHistory, 'chat history goes here');

  useEffect(() => {
    fetchChatHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const onSendTextMessage = () => {
    if (message) {
      setChatHistory((prevHistory) => {
        const existingHistory = [...prevHistory];
        existingHistory.unshift({
          message_id: uuidv4(),
          userId: MESSAGE_SENDER_ID,
          avatar:
            'https://worldywcacouncil.org/wp-content/uploads/2014/10/speaker-2-v2.jpg',
          name: 'Emma Anderson',
          edited: false,
          date: new Date().toISOString(),
          message_read: false,
          message_type: 'text',
          text: message,
        });
        return existingHistory;
      });
      setMessage('');
    }
  };

  const onSendStickerMessage = () => {
    setChatHistory((prevHistory) => {
      const existingHistory = [...prevHistory];
      existingHistory.unshift({
        message_id: uuidv4(),
        userId: MESSAGE_SENDER_ID,
        avatar:
          'https://worldywcacouncil.org/wp-content/uploads/2014/10/speaker-2-v2.jpg',
        name: 'Emma Anderson',
        edited: false,
        date: new Date().toISOString(),
        message_read: false,
        message_type: 'sticker',
      });
      return existingHistory;
    });
  };

  return (
    <div className='chat-div relative'>
      <div className='flex px-4 py-2 items-center bg-gray-100 text-xl font-bold text-gray-700'>
        Telegram
      </div>
      {/* Chat Header */}
      <div className='flex user-header'>
        <div className='flex items-center'>
          <img
            className='avatar-img'
            src={CHAT_HEADER.avatar}
            alt='profile-avatar'
          />
          <div>
            <h1 className='text-black-500 text-xl font-medium'>
              {CHAT_HEADER.name}
            </h1>
            <p className='text-gray-400 font-normal'>
              {CHAT_HEADER.last_seen_status}
            </p>
          </div>
        </div>
        <div className='action-div'>
          <button type='button'>
            <img src={phone} alt='phone-icon' />
          </button>
          <button type='button'>
            <img src={search} alt='search-icon' />
          </button>
          <button type='button'>
            <img src={more} alt='more-icon' />
          </button>
        </div>
      </div>
      {loading && (
        <div className='flex justify-center items-center w-full absolute'>
          <Spinner />
        </div>
      )}
      <div id='scrollableDiv' className='scroll-div'>
        <InfiniteScroll
          dataLength={chatHistory.length}
          next={() => {
            if (chatHistory.length < CHAT_HISTORY_LENGTH) {
              console.log('Call fake api');
              setCurrentPage((prevPage) => prevPage + 1);
            }
          }}
          className='infinite-scroll'
          hasMore={chatHistory.length < CHAT_HISTORY_LENGTH}
          inverse={true}
          scrollableTarget='scrollableDiv'
        >
          {chatHistory.map((chat, index, array) => {
            const currentDate = extractDateFromISOString(chat.date);
            console.log(currentDate, 'currentDate');
            const nextDate =
              index < array.length - 1
                ? extractDateFromISOString(array[index + 1]?.date)
                : extractDateFromISOString(new Date().toISOString());

            const showDateHeader = currentDate !== nextDate;
            return (
              <React.Fragment key={chat.message_id}>
                <div>
                  {showDateHeader && (
                    <div className='date-div'>
                      <p className='flex justify-center text-gray-400 font-medium text-xl p-2'>
                        {dateToFromNowDaily(chat.date)}
                      </p>
                    </div>
                  )}
                  <div className='user-wrap'>
                    {!chat.edited && chat.message_type === 'text' && (
                      <TextChat chat={chat} />
                    )}
                    {chat.edited && chat.message_type === 'text' && (
                      <EditedChat chat={chat} />
                    )}
                    {chat.message_type === 'sticker' && (
                      <StickerChat chat={chat} sticker={sticker} />
                    )}
                    {/* <div className='flex user-list'>
                    <div className='flex items-center'>
                      <img className='avatar-img' src={emma} alt='avatar' />
                      <div className=''>
                        <h1 className='text-blue-500 text-xl font-medium user-name'>
                          Emma Anderson
                        </h1>
                        <p className='text-black-600 font-normal user-msg'>
                          Love it!!!
                        </p>
                      </div>
                    </div>
                    <div className='time-div flex items-center'>
                      <p className='text-gray-400 font-normal flex items-center'>
                        <span className='checkmark'>
                          <img src={checkmark} alt='checkmark-img' />
                        </span>{' '}
                        11:47 AM
                      </p>
                    </div>
                  </div> */}
                  </div>
                </div>
              </React.Fragment>
            );
          })}
        </InfiniteScroll>
        {/* <div ref={scrollDivRef}></div> */}
      </div>

      <div className='message-div'>
        <button className='msg-icon'>
          <img src={clip} alt='clip-icon' />{' '}
        </button>
        <input
          type='text'
          className='message-input'
          placeholder='Write a message...'
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
        <button className='msg-icon' onClick={onSendStickerMessage}>
          <img src={stickerIcon} alt='sticker-icon' />{' '}
        </button>
        <button className='msg-icon' onClick={onSendTextMessage}>
          <img src={mic} alt='mic-icon' />{' '}
        </button>
      </div>
    </div>
  );
}

export default App;

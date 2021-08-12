import React, { useState, useEffect, useRef } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import TextareaAutosize from 'react-textarea-autosize';
import SwipeableBottomSheet from 'react-swipeable-bottom-sheet';
import { v4 as uuidv4 } from 'uuid';
import phone from './images/phone.PNG';
import more from './images/more.PNG';
import search from './images/search.PNG';
import sendIcon from './images/send.png';
import stickerIcon from './images/sticker_icon.png';
import clip from './images/clip.PNG';

// stickers imports
import sticker1 from './images/stickers/sticker_1.png';
import sticker2 from './images/stickers/sticker_2.png';
import sticker3 from './images/stickers/sticker_3.png';
import sticker4 from './images/stickers/sticker_4.png';
import sticker5 from './images/stickers/sticker_5.jpg';
import sticker6 from './images/stickers/sticker_6.jpg';
import sticker7 from './images/stickers/sticker_7.png';

import { CHAT_HISTORY_LENGTH, fakeApiCall } from './fake-api/fakeApi';

import CHAT_HEADER from './fake-api/chat-header.json';
import TextChat from './components/TextChat';
import EditedChat from './components/EditedChat';
import { dateToFromNowDaily, extractDateFromISOString } from './utils';
import StickerChat from './components/StickerChat';

import Spinner from './components/Spinner';
import './App.css';

const PER_PAGE_LIMIT = 5;
const MESSAGE_SENDER_ID = '2';

const bottomSheetContainerStyle = {
  borderRadius: '20px 20px 0px 0px',
  boxShadow: 'rgb(0 0 0 / 35%) 0px 5px 15px',
};

const STICKERS = [
  sticker1,
  sticker2,
  sticker3,
  sticker4,
  sticker5,
  sticker6,
  sticker7,
];

function App() {
  const [loading, setLoading] = useState(false);
  const [openStickerSheet, setOpenStickerSheet] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [message, setMessage] = useState('');

  // to manage the state of scrolling down to new message that has been inserted
  const [newMessageInserted, setNewMessageInserted] = useState(false);

  // ref to scroll to bottom after sending message
  const scrollDivRef = useRef();

  const inputRef = useRef();

  const fetchChatHistory = async () => {
    setLoading(true);
    const data = await fakeApiCall({
      currentPage,
      perPageLimit: PER_PAGE_LIMIT,
    });
    setLoading(false);
    setChatHistory((prevHistory) => prevHistory.concat(data));
  };

  useEffect(() => {
    fetchChatHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  // scroll down to to bottom of scroll-div after new message has been inserted
  useEffect(() => {
    if (scrollDivRef && newMessageInserted) {
      scrollDivRef.current.scroll({
        top: scrollDivRef.current.scrollHeight,
        behavior: 'smooth',
      });
      setNewMessageInserted(false);
    }
  }, [newMessageInserted]);

  // add event listener to handle the functionality to send message on press of enter key
  useEffect(() => {
    inputRef.current.addEventListener('keypress', (event) => {
      if ((event.keyCode === 13 || event.which === 13) && !event.shiftKey) {
        if (event.type === 'keypress') {
          event.preventDefault();
          onSendTextMessage(event.target.value);
        }
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSendTextMessage = (_message) => {
    if (message || _message) {
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
          text: message || _message,
        });
        return existingHistory;
      });
      setMessage('');
      setNewMessageInserted(true);
      inputRef.current.focus();
    }
  };

  const onSendStickerMessage = (_sticker) => {
    setNewMessageInserted(true);
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
        sticker: _sticker,
      });
      return existingHistory;
    });
    setOpenStickerSheet(false);
    setNewMessageInserted(true);
  };

  return (
    <React.Fragment>
      <div className='chat-div relative'>
        <div className='flex px-4 py-2 items-center bg-gray-100 text-xl font-bold text-gray-700'>
          Telegram
        </div>
        {/* Chat Header */}
        <div className='flex user-header'>
          <div className='flex items-start'>
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
        <div id='scrollableDiv' className='scroll-div' ref={scrollDivRef}>
          <InfiniteScroll
            dataLength={chatHistory.length}
            next={() => {
              if (chatHistory.length < CHAT_HISTORY_LENGTH) {
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
              const nextDate =
                index < array.length - 1
                  ? extractDateFromISOString(array[index + 1]?.date)
                  : extractDateFromISOString(new Date().toISOString());

              // for grouping the messages by dates, render the date only if the next date is different than current date
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
                        <StickerChat chat={chat} sticker={chat.sticker} />
                      )}
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
          </InfiniteScroll>
        </div>

        <div className='message-div bg-white absolute left-0 right-0 bottom-0'>
          <button className='msg-icon'>
            <img src={clip} alt='clip-icon' />{' '}
          </button>
          <TextareaAutosize
            ref={inputRef}
            minRows={1}
            maxRows={3}
            className='message-input'
            placeholder='Write a message...'
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />
          <button
            className='msg-icon mx-2 h-8 w-8'
            onClick={() => setOpenStickerSheet(true)}
          >
            <img src={stickerIcon} alt='sticker-icon' />{' '}
          </button>
          <button
            className='msg-icon ml-2 mx-2 h-8 w-8'
            onClick={() => onSendTextMessage(message)}
          >
            <img src={sendIcon} alt='send-icon' />{' '}
          </button>
        </div>
      </div>
      {/* Swipeable bottom sheet */}
      <SwipeableBottomSheet
        overlay
        overflowHeight={0}
        open={openStickerSheet}
        onChange={(isOpen) => setOpenStickerSheet(isOpen)}
        bodyStyle={bottomSheetContainerStyle}
        className='bg-red-600'
      >
        <div className='flex p-4 items-center justify-between text-lg font-bold text-gray-600 border border-md'>
          <span>Stickers</span>
          <span
            className='cursor-pointer'
            onClick={() => setOpenStickerSheet(false)}
          >
            <i className='fa fa-times' aria-hidden='true'></i>
          </span>
        </div>
        <div className='p-8 flex bottom-sheet-stickers-container'>
          {STICKERS.map((_sticker, index) => (
            <div
              key={`sticker_${index}`}
              className='bottom-sheet-sticker cursor-pointer'
              onClick={() => onSendStickerMessage(_sticker)}
            >
              <img
                src={_sticker}
                className='bottom-sheet-sticker-img'
                alt='sticker'
              />
            </div>
          ))}
        </div>
      </SwipeableBottomSheet>
    </React.Fragment>
  );
}

export default App;

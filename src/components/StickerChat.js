import React from 'react';
import moment from 'moment';

const StickerChat = ({ chat, sticker }) => {
  return (
    <div className='flex user-list'>
      <div className='flex'>
        <img className='avatar-img' src={chat.avatar} alt='avatar' />
        <div className=''>
          <h1 className='text-blue-500 text-xl font-medium user-name'>
            {chat.name}
          </h1>
          <p className='text-black-600 font-normal user-msg object-contain'>
            <img src={sticker} className='sticker-img' alt='sticker' />
          </p>
        </div>
      </div>
      <div className='time-div flex'>
        <p className='text-gray-400 font-normal'>
          {moment(chat.date).format('hh:mm A')}
        </p>
      </div>
    </div>
  );
};

export default StickerChat;

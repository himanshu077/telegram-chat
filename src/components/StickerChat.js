import React from 'react';
import moment from 'moment';
import TSGViewer from './TGSViewer';

const StickerChat = ({ chat, sticker }) => {
  return (
    <div className='flex user-list'>
      <div className='flex'>
        <img className='avatar-img' src={chat.avatar} alt='avatar' />
        <div className=''>
          <h1 className='text-blue-500 text-xl font-medium user-name'>
            {chat.name}
          </h1>
          <TSGViewer sticker={sticker} style={{ width: 200, height: 200 }} />
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

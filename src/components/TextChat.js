import React from 'react';
import moment from 'moment';
import checkmark from '../images/checkmark.PNG';

const TextChat = ({ chat }) => {
  return (
    <div className='flex user-list'>
      <div className='flex items-start'>
        <img className='avatar-img' src={chat.avatar} alt='avatar' />
        <div className=''>
          <h1 className='text-blue-500 text-xl font-medium user-name'>
            {chat.name}
          </h1>
          <p className='text-black-600 font-normal user-msg'>{chat.text}</p>
        </div>
      </div>
      <div className='time-div flex items-start'>
        <p className='text-gray-400 font-normal flex items-center'>
          <span className='checkmark'>
            <img src={checkmark} alt='checkmark-img' />
          </span>
          {moment(chat.date).format('hh:mm A')}
        </p>
      </div>
    </div>
  );
};

export default TextChat;

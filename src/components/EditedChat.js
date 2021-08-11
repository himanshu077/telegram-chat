import React from 'react';
import moment from 'moment';

const EditedChat = ({ chat }) => {
  return (
    <div className='flex user-list'>
      <div className='flex items-center'>
        <div className='edited-msg'>
          <p className='text-black-600 font-normal user-msg'>{chat.text}</p>
        </div>
      </div>
      <div className='time-div flex items-start'>
        <p className='text-gray-400 font-normal edited-p'>
          <span>edited</span> {moment(chat.date).format('hh:mm A')}
        </p>
      </div>
    </div>
  );
};

export default EditedChat;

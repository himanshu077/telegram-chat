import { extractDateFromISOString } from '../utils';
import CHAT_HISTORY from './chat-history';

// this gives an object with dates as keys
// const groups = CHAT_HISTORY.reduce((acc, curr) => {
//   const date = curr.date.split('T')[0];
//   if (!acc[date]) {
//     acc[date] = [];
//   }
//   acc[date].push(curr);
//   return acc;
// }, {});

// console.log(groups, 'groups here');

// Edit: to add it in the array format instead
// const groupArrays = Object.keys(groups)
//   .map((date) => {
//     return {
//       date,
//       messages: groups[date],
//     };
//   })
//   .reverse();

// export const getSortedChat = () => {
//   const sortedChat = {};
//   // CHAT_HISTORY.forEach((chatHistory) => {
//   //   const date = extractDateFromISOString(chatHistory.date);
//   //   if (sortedChat.hasOwnProperty(date)) {
//   //     // key already have the chat history
//   //     sortedChat[date] = sortedChat[date].concat(chatHistory);
//   //   } else {
//   //     // no key exists, add first entry
//   //     sortedChat[date] = [chatHistory];
//   //   }
//   // });

//   // this gives an object with dates as keys
//   const groups = CHAT_HISTORY.reduce((acc, curr) => {
//     const date = curr.date.split('T')[0];
//     if (!acc[date]) {
//       acc[date] = [];
//     }
//     acc[date].push(curr);
//     return acc;
//   }, {});

//   console.log(groups, 'groups here');

//   // Edit: to add it in the array format instead
//   const groupArrays = Object.keys(groups).map((date) => {
//     return {
//       date,
//       messages: groups[date],
//     };
//   });

//   console.log(groupArrays, 'group arrays');
// };

// getSortedChat();

export const fakeApiCall = ({ currentPage = 1, perPageLimit = 10 }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // const sortedChat = {};
      // CHAT_HISTORY.forEach((chatHistory) => {
      //   const date = extractDateFromISOString(chatHistory.date);
      //   if (sortedChat.hasOwnProperty(date)) {
      //     // key already have the chat history
      //     sortedChat[date] = sortedChat[date].concat(chatHistory);
      //   } else {
      //     // no key exists, add first entry
      //     sortedChat[date] = [chatHistory];
      //   }
      // });

      // const items = Object.values(groupArrays).flatMap((messages) =>
      //   Object.values(messages).flat()
      // );

      // resolve(items);

      if ((currentPage - 1) * perPageLimit < CHAT_HISTORY.length) {
        resolve(
          Array.from(CHAT_HISTORY)
            .sort((a, b) => a - b)
            .reverse()
            .slice((currentPage - 1) * perPageLimit, currentPage * perPageLimit)
        );
      } else {
        resolve([]);
      }
    }, 2000);
  });
};

export const CHAT_HISTORY_LENGTH = CHAT_HISTORY.length;

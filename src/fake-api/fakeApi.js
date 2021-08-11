import CHAT_HISTORY from './chat-history';

export const fakeApiCall = ({ currentPage = 1, perPageLimit = 10 }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // pagination
      if ((currentPage - 1) * perPageLimit < CHAT_HISTORY.length) {
        resolve(
          Array.from(CHAT_HISTORY)
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

import moment from 'moment';

// call this function, passing-in your date
export function dateToFromNowDaily(myDate) {
  // get from-now for this date
  var fromNow = moment(myDate).fromNow();

  // ensure the date is displayed with today and yesterday
  return moment(myDate).calendar(null, {
    // when the date is closer, specify custom values
    lastWeek: '[Last] dddd',
    lastDay: '[Yesterday]',
    sameDay: '[Today]',
    nextDay: '[Tomorrow]',
    nextWeek: 'dddd',
    // when the date is further away, use from-now functionality
    sameElse: function () {
      return '[' + fromNow + ']';
    },
  });
}

export function extractDateFromISOString(date) {
  const dateObj = new Date(date);
  return dateObj.toISOString().substring(0, 10);
}

export function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

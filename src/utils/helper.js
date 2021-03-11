import moment from 'moment';

export function formatDatetimeToFromNow(datetime) {
  const createdAt = moment(datetime);

  if (createdAt.isSame(moment(), 'day')) {
    return createdAt.fromNow();
  }

  return createdAt.calendar();
}

export function formatDatetimeToAgo(datetime) {
  return moment(datetime).from(moment());
}

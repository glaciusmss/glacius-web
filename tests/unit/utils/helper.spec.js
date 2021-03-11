import { formatDatetimeToFromNow, formatDatetimeToAgo } from '@/utils/helper';
import moment from 'moment';

describe('test helper', () => {
  it('formatDatetimeToFromNow', () => {
    const yesterday = moment().subtract(1, 'day');
    expect(formatDatetimeToFromNow(yesterday)).toEqual(expect.stringContaining('Yesterday'));

    expect(formatDatetimeToFromNow(moment())).toEqual('a few seconds ago');
  });

  it('formatDatetimeToAgo', () => {
    const yesterday = moment().subtract(1, 'day');

    expect(formatDatetimeToAgo(yesterday)).toEqual('a day ago');
  });
});

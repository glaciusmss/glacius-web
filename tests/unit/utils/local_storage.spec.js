import { saveAuthToken, getAuthToken, removeAuthToken } from '@/utils/local_storage';

describe('test local storage', () => {
  it('saveAuthToken', () => {
    Storage.prototype.setItem = jest.fn();

    saveAuthToken('test_token');

    expect(localStorage.setItem).toHaveBeenCalledWith('token', 'test_token');
  });

  it('getAuthToken', () => {
    Storage.prototype.getItem = jest.fn();

    getAuthToken();

    expect(localStorage.getItem).toHaveBeenCalledWith('token');
  });

  it('removeAuthToken', () => {
    Storage.prototype.removeItem = jest.fn();

    removeAuthToken();

    expect(localStorage.removeItem).toHaveBeenCalledWith('token');
  });
});

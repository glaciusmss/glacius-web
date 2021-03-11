import request, {
  setAuthToHeader, removeAuthFromHeader, setRequestCancelTokenSource, cancelRequest, getRequestCancelTokenSource,
} from '@/utils/request';
import axios from 'axios';
import mockAxios from 'jest-mock-axios';

describe('test request', () => {
  it('setAuthToHeader', () => {
    expect(axios.defaults.headers.common.Authorization).toBeUndefined();

    setAuthToHeader('test_token');

    expect(axios.defaults.headers.common.Authorization).toEqual('Bearer test_token');
  });

  it('removeAuthFromHeader', () => {
    axios.defaults.headers.common.Authorization = 'Bearer test_token';

    removeAuthFromHeader();

    expect(axios.defaults.headers.common.Authorization).toBeUndefined();
  });

  it('test requestCancelTokenSource', () => {
    const source = axios.CancelToken.source();

    setRequestCancelTokenSource(source);

    expect(getRequestCancelTokenSource()).toEqual(source);
  });

  it('cancelRequest', () => {
    const source = axios.CancelToken.source();

    setRequestCancelTokenSource(source);
    cancelRequest();

    expect(getRequestCancelTokenSource()).toBeUndefined();
  });

  it('send request', async () => {
    const promise = request({
      url: '/test',
      method: 'GET',
      data: { test: 'data' },
    });

    expect(mockAxios).toHaveBeenCalledWith(
      expect.objectContaining({
        url: '/test',
        method: 'GET',
        data: { test: 'data' },
      }),
    );

    mockAxios.mockResponse({ data: 'done' });

    await promise;
  });

  it('send request should be canceled on canceled', async () => {
    expect.assertions(2);

    const promise = request({
      url: '/test',
      method: 'GET',
      data: { test: 'data' },
    });

    expect(mockAxios).toHaveBeenCalledWith(
      expect.objectContaining({
        url: '/test',
        method: 'GET',
        data: { test: 'data' },
      }),
    );

    cancelRequest();

    await promise.catch((thrown) => {
      expect(axios.isCancel(thrown)).toBeTruthy();
    });
  });
});

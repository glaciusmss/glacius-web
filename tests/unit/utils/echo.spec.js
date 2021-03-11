import Vuex from 'vuex';
import getEcho from '@/utils/echo';

describe('test echo', () => {
  it('should return Echo with default option', () => {
    const state = {
      auth: {
        token: 'test_token',
      },
    };

    const store = new Vuex.Store({ state });

    const echo = getEcho(null, store);

    expect(echo.options).toHaveProperty('broadcaster');
  });

  it('should return Echo with custom option', () => {
    const state = {
      auth: {
        token: 'test_token',
      },
    };

    const store = new Vuex.Store({ state });

    const echo = getEcho({ wsHost: 'http://example.com' }, store);

    expect(echo.options).toEqual(expect.objectContaining({ wsHost: 'http://example.com' }));
  });
});

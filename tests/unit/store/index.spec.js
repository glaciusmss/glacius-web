import { actions } from '@/store';

describe('vuex root module', () => {
  it('actions', () => {
    const commit = jest.fn();
    actions.resetAllState({ commit });

    expect(commit).toHaveBeenCalledWith('app/RESET_STATE');
    expect(commit).toHaveBeenCalledWith('auth/RESET_STATE');
    expect(commit).toHaveBeenCalledWith('layout/RESET_STATE');
    expect(commit).toHaveBeenCalledWith('setting/RESET_STATE');
    expect(commit).toHaveBeenCalledWith('shop/RESET_STATE');
  });
});

import { mount, createLocalVue } from '@vue/test-utils';
import Login from '@/containers/Login.vue';
import Vuex from 'vuex';
import { Spinner } from '@/components';
import flushPromises from 'flush-promises';
import { ErrorUtils } from '@/mixins';
import withWrapperArray from '../../test_helpers';

const localVue = createLocalVue();
localVue.component('spinner', Spinner);

localVue.use(Vuex);

describe('Login test', () => {
  let $router;
  let actions;
  let store;

  beforeEach(() => {
    $router = {
      replace: jest.fn(),
    };

    actions = {
      login: jest.fn(),
    };

    store = new Vuex.Store({
      modules: {
        auth: {
          namespaced: true,
          actions,
        },
      },
    });
  });

  it('should render', () => {
    const wrapper = mount(Login);

    expect(wrapper.text()).toContain('Email');
    expect(wrapper.text()).toContain('Password');
    expect(wrapper.text()).toContain('Sign In');
  });

  it('should Login Successfully', async () => {
    const wrapper = mount(Login, { store, localVue, mocks: { $router, $route: {} } });

    await wrapper.setData({ email: 'test@test.com', password: 'test_password' });

    const loginButton = withWrapperArray(wrapper.findAll('button')).hasText('Sign In').at(0);
    await loginButton.trigger('click');
    await flushPromises();

    expect(actions.login).toHaveBeenCalledWith(expect.objectContaining({}), { email: 'test@test.com', password: 'test_password' });

    expect($router.replace).toHaveBeenCalledWith('/portal');
  });

  it('should redirect to rtn url when specified', async () => {
    const $route = {
      query: { rtn: '/rtnurl' },
    };
    const wrapper = mount(Login, { store, localVue, mocks: { $router, $route } });

    await wrapper.setData({ email: 'test@test.com', password: 'test_password' });

    const loginButton = withWrapperArray(wrapper.findAll('button')).hasText('Sign In').at(0);
    await loginButton.trigger('click');
    await flushPromises();

    expect($router.replace).toHaveBeenCalledWith('/rtnurl');
  });

  it('should not attempt login when isSubmitting', async () => {
    const wrapper = mount(Login, { store, localVue });

    await wrapper.setData({ isSubmitting: true });

    const loginButton = wrapper.find('#password');
    await loginButton.trigger('keyup.enter');
    await flushPromises();

    expect(actions.login).not.toHaveBeenCalled();
  });

  it('should handle error', async () => {
    const mockHandleError = jest.spyOn(ErrorUtils.methods, 'handleError');
    const wrapper = mount(Login, { store, localVue });

    actions.login.mockImplementationOnce(() => { throw new Error('test_error'); });

    const loginButton = withWrapperArray(wrapper.findAll('button')).hasText('Sign In').at(0);
    await loginButton.trigger('click');
    await flushPromises();

    expect(actions.login).toHaveBeenCalled();
    expect(mockHandleError).toHaveBeenCalledWith(new Error('test_error'), 'email');
  });
});

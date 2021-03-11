import { mount, createLocalVue } from '@vue/test-utils';
import { DangerButton, Modal, Spinner } from '@/components';
import FontAwesomeIcon from '@/config/font_awesome';
import flushPromises from 'flush-promises';
import withWrapperArray from '../../test_helpers';

const localVue = createLocalVue();
localVue.component('font-awesome-icon', FontAwesomeIcon);
localVue.component('spinner', Spinner);

describe('Modal test', () => {
  it('should render', () => {
    const wrapper = mount(Modal, {
      localVue,
      propsData: {
        value: true,
      },
      slots: {
        default: '<span>hello world</span>',
      },
      stubs: {
        Portal: { template: '<div><slot /></div>' },
      },
    });

    expect(wrapper.text()).toContain('hello world');
  });

  it('should change cancel button text when btnCancelText is set', () => {
    const wrapper = mount(Modal, {
      localVue,
      propsData: {
        value: true,
        btnCancelText: 'test_cancel',
      },
      stubs: {
        Portal: { template: '<div><slot /></div>' },
      },
    });

    expect(wrapper.text()).toContain('test_cancel');
  });

  it('should close modal on cancel click', async () => {
    const wrapper = mount(Modal, {
      localVue,
      propsData: {
        value: true,
      },
      stubs: {
        Portal: { template: '<div><slot /></div>' },
      },
    });

    const cancelButton = withWrapperArray(wrapper.findAll('button')).hasText('Cancel').at(0);
    await cancelButton.trigger('click');
    await flushPromises();

    expect(wrapper.vm.$data.isOpen).toBeFalsy();
    expect(wrapper.emitted('input')).toBeTruthy();
    expect(wrapper.emitted('input')[0]).toEqual([false]);
    expect(wrapper.emitted('cancel-click')).toBeTruthy();
  });

  it('should not close modal if closeModalOnCancelClick set to false', async () => {
    const wrapper = mount(Modal, {
      localVue,
      propsData: {
        value: true,
        closeModalOnCancelClick: false,
      },
      stubs: {
        Portal: { template: '<div><slot /></div>' },
      },
    });

    const cancelButton = withWrapperArray(wrapper.findAll('button')).hasText('Cancel').at(0);
    await cancelButton.trigger('click');
    await flushPromises();

    expect(wrapper.vm.$data.isOpen).toBeTruthy();
    expect(wrapper.emitted('input')).toBeFalsy();
    expect(wrapper.emitted('cancel-click')).toBeTruthy();
  });

  it('should not close modal if isSubmitting', async () => {
    const wrapper = mount(Modal, {
      localVue,
      propsData: {
        value: true,
        isSubmitting: true,
      },
      stubs: {
        Portal: { template: '<div><slot /></div>' },
      },
    });

    const cancelButton = withWrapperArray(wrapper.findAll('button')).hasText('Cancel').at(0);
    expect(cancelButton.attributes('disabled')).toEqual('disabled');

    const modalDialog = wrapper.findAll('div').at(2);
    await modalDialog.trigger('keydown.escape');
    await flushPromises();

    expect(wrapper.vm.$data.isOpen).toBeTruthy();
  });

  it('should hide cancel button when showBtnCancel is set to false', () => {
    const wrapper = mount(Modal, {
      localVue,
      propsData: {
        value: true,
        showBtnCancel: false,
      },
      stubs: {
        Portal: { template: '<div><slot /></div>' },
      },
    });

    expect(wrapper.text()).not.toContain('Cancel');
  });

  it('should change confirm button text when btnConfirmText is set', () => {
    const wrapper = mount(Modal, {
      localVue,
      propsData: {
        value: true,
        btnConfirmText: 'test_confirm',
      },
      stubs: {
        Portal: { template: '<div><slot /></div>' },
      },
    });

    expect(wrapper.text()).toContain('test_confirm');
  });

  it('should emit confirm-click on confirm click', async () => {
    const wrapper = mount(Modal, {
      localVue,
      propsData: {
        value: true,
      },
      stubs: {
        Portal: { template: '<div><slot /></div>' },
      },
    });

    const confirmButton = withWrapperArray(wrapper.findAll('button')).hasText('Confirm').at(0);
    await confirmButton.trigger('click');
    await flushPromises();

    expect(wrapper.emitted('confirm-click')).toBeTruthy();
  });

  it('should close modal on outside click', async () => {
    const wrapper = mount(Modal, {
      localVue,
      propsData: {
        value: true,
      },
      stubs: {
        Portal: { template: '<div><slot /></div>' },
      },
    });

    const backdrop = wrapper.findAll('div').at(1);
    await backdrop.trigger('click');
    await flushPromises();

    expect(wrapper.vm.$data.isOpen).toBeFalsy();
    expect(wrapper.emitted('input')).toBeTruthy();
    expect(wrapper.emitted('input')[0]).toEqual([false]);
    expect(wrapper.emitted('outside-click')).toBeTruthy();
  });

  it('should not close on outside click when closeModalOnOutsideClick is set to false', async () => {
    const wrapper = mount(Modal, {
      localVue,
      propsData: {
        value: true,
        closeModalOnOutsideClick: false,
      },
      stubs: {
        Portal: { template: '<div><slot /></div>' },
      },
    });

    const backdrop = wrapper.findAll('div').at(1);
    await backdrop.trigger('click');
    await flushPromises();

    expect(wrapper.vm.$data.isOpen).toBeTruthy();
    expect(wrapper.emitted('outside-click')).toBeTruthy();
  });

  it('should show confirm danger button when btnConfirmDanger is set to true', () => {
    const wrapper = mount(Modal, {
      localVue,
      propsData: {
        value: true,
        btnConfirmDanger: true,
      },
      stubs: {
        Portal: { template: '<div><slot /></div>' },
      },
    });

    expect(wrapper.findComponent(DangerButton).exists()).toBeTruthy();
  });
});

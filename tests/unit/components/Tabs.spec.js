import { createLocalVue, shallowMount } from '@vue/test-utils';
import { Tabs } from '@/components';
import flushPromises from 'flush-promises';
import withWrapperArray from '../../test_helpers';

const localVue = createLocalVue();

describe('Tabs test', () => {
  it('should render', () => {
    const wrapper = shallowMount(Tabs, {
      localVue,
      propsData: {
        value: 0,
        tabList: [{ name: 'first' }, { name: 'second' }],
      },
    });

    expect(wrapper.text()).toContain('first');
    expect(wrapper.text()).toContain('second');
  });

  it('should apply disabled classes to button', () => {
    const wrapper = shallowMount(Tabs, {
      localVue,
      propsData: {
        value: 0,
        direction: 'vertical',
        tabList: [{ name: 'first' }, { name: 'second', isDisabled: true }],
      },
    });

    const secondButton = withWrapperArray(wrapper.findAll('button')).hasText('second').at(0);
    expect(secondButton.classes()).toContain('cursor-not-allowed');
  });

  it('should apply vertical classes to button', () => {
    const wrapper = shallowMount(Tabs, {
      localVue,
      propsData: {
        value: 0,
        direction: 'vertical',
        tabList: [{ name: 'first' }, { name: 'second' }],
      },
    });

    const firstButton = withWrapperArray(wrapper.findAll('button')).hasText('first').at(0);
    expect(firstButton.classes()).toContain('w-full');
  });

  it('should reject invalid props', () => {
    const directionProps = Tabs.props.direction;

    expect(directionProps.validator).toBeInstanceOf(Function);
    expect(directionProps.validator('test')).toBeFalsy();
    expect(directionProps.validator('vertical')).toBeTruthy();
    expect(directionProps.validator('horizontal')).toBeTruthy();
  });

  it('should emit and change tab on click', async () => {
    const wrapper = shallowMount(Tabs, {
      localVue,
      propsData: {
        value: 0,
        tabList: [{ name: 'first' }, { name: 'second' }],
      },
    });

    expect(wrapper.vm.$data.currentSelectedTab).toEqual(0);

    const secondButton = withWrapperArray(wrapper.findAll('button')).hasText('second').at(0);
    await secondButton.trigger('click');
    await flushPromises();

    expect(wrapper.vm.$data.currentSelectedTab).toEqual(1);
    expect(wrapper.emitted('input')).toBeTruthy();
    expect(wrapper.emitted('input')[0]).toEqual([1]);
  });

  it('should not emit and change tab when tab is disabled', async () => {
    const wrapper = shallowMount(Tabs, {
      localVue,
      propsData: {
        value: 0,
        tabList: [{ name: 'first' }, { name: 'second', isDisabled: true }],
      },
    });

    expect(wrapper.vm.$data.currentSelectedTab).toEqual(0);

    const secondButton = withWrapperArray(wrapper.findAll('button')).hasText('second').at(0);
    await secondButton.trigger('click');
    await flushPromises();

    expect(wrapper.vm.$data.currentSelectedTab).toEqual(0);
    expect(wrapper.emitted('input')).toBeFalsy();
  });
});

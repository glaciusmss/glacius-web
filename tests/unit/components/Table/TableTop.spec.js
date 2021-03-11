import { createLocalVue, shallowMount, mount } from '@vue/test-utils';
import { PerPage, TableSearch, TableTop } from '@/components';
import flushPromises from 'flush-promises';
import withWrapperArray from '../../../test_helpers';

const localVue = createLocalVue();

const meta = {
  current_page: 1,
  from: 1,
  last_page: 2,
  links: [
    { url: null, label: 'Previous', active: false },
    { url: 'http://example.com?page=1', label: 1, active: true },
    { url: 'http://example.com?page=2', label: 2, active: false },
    { url: 'http://example.com?page=2', label: 'Next', active: false },
  ],
  path: 'http://example.com',
  per_page: 10,
  to: 20,
  total: 20,
  sort_field: 'id',
  sort_order: 'desc',
};

describe('TableTop test', () => {
  it('should render', () => {
    const wrapper = shallowMount(TableTop, {
      localVue,
      propsData: {
        meta,
        perPageChanged: jest.fn(),
      },
    });

    expect(wrapper.findComponent(PerPage).exists()).toBeTruthy();
  });

  it('should call perPageChanged on per page changed', async () => {
    const perPageChanged = jest.fn();
    const wrapper = mount(TableTop, {
      localVue,
      propsData: {
        meta,
        perPageChanged,
      },
    });

    const option20 = withWrapperArray(wrapper.findAll('option')).hasText('20').at(0);
    await option20.trigger('input');
    await flushPromises();

    expect(perPageChanged).toHaveBeenCalledWith({ currentPerPage: '20' });
  });

  it('should emit search on search', async () => {
    const wrapper = mount(TableTop, {
      localVue,
      propsData: {
        meta,
        perPageChanged: () => {},
      },
    });

    const searchField = wrapper.findComponent(TableSearch).find('input');
    searchField.element.value = 'test_search_keyword';
    await searchField.trigger('input');
    await flushPromises();

    // wait for debounce
    await new Promise((resolve) => setTimeout(resolve, 300));

    expect(wrapper.emitted('search')).toBeTruthy();
    expect(wrapper.emitted('search')[0]).toEqual(['test_search_keyword']);
  });
});

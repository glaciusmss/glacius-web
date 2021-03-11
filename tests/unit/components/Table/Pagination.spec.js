import { mount, shallowMount, createLocalVue } from '@vue/test-utils';
import { Pagination, PaginationButton } from '@/components';
import flushPromises from 'flush-promises';
import FontAwesomeIcon from '@/config/font_awesome';
import withWrapperArray from '../../../test_helpers';

const localVue = createLocalVue();
localVue.component('font-awesome-icon', FontAwesomeIcon);

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

describe('Pagination test', () => {
  it('should render', () => {
    const wrapper = shallowMount(Pagination, {
      localVue,
      propsData: {
        pageChanged: jest.fn(),
        meta,
      },
    });

    expect(wrapper.findComponent(PaginationButton).exists()).toBeTruthy();
  });

  it('should call pageChanged on page click', async () => {
    const pageChanged = jest.fn();
    const wrapper = mount(Pagination, {
      localVue,
      propsData: {
        pageChanged,
        meta,
      },
    });

    const secondPage = withWrapperArray(wrapper.findAll('button')).hasText('2').at(0);
    await secondPage.trigger('click');
    await flushPromises();

    expect(pageChanged).toHaveBeenCalledWith({ currentPage: 2 });
  });

  it('should call pageChanged on next page click', async () => {
    const pageChanged = jest.fn();
    const wrapper = mount(Pagination, {
      localVue,
      propsData: {
        pageChanged,
        meta,
      },
    });

    const nextPage = wrapper.findAll('button').at(3);
    await nextPage.trigger('click');
    await flushPromises();

    expect(pageChanged).toHaveBeenCalledWith({ currentPage: 2 });
  });

  it('should call pageChanged on previous page click', async () => {
    const pageChanged = jest.fn();
    // modify to pretend that we are on page 2
    meta.links[0].url = 'http://example.com?page=1';
    meta.links[3].url = null;
    meta.links[1].active = false;
    meta.links[2].active = true;
    meta.current_page = 2;
    const wrapper = mount(Pagination, {
      localVue,
      propsData: {
        pageChanged,
        meta,
      },
    });

    const previousPage = wrapper.findAll('button').at(0);
    await previousPage.trigger('click');
    await flushPromises();

    expect(pageChanged).toHaveBeenCalledWith({ currentPage: 1 });
  });
});

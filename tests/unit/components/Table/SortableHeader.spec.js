import { createLocalVue, shallowMount, mount } from '@vue/test-utils';
import { SortableHeader } from '@/components';
import FontAwesomeIcon from '@/config/font_awesome';

const localVue = createLocalVue();
localVue.component('font-awesome-icon', FontAwesomeIcon);

describe('SortableHeader test', () => {
  it('should render', () => {
    const wrapper = shallowMount(SortableHeader, {
      localVue,
      propsData: {
        label: 'ID',
        field: 'id',
        serverSortField: 'id',
        serverSortOrder: 'desc',
      },
    });

    expect(wrapper.text()).toContain('ID');
  });

  it('should not show specific class when active', () => {
    const wrapper = mount(SortableHeader, {
      localVue,
      propsData: {
        label: 'ID',
        field: 'id',
        serverSortField: 'id',
        serverSortOrder: 'desc',
      },
    });

    expect(wrapper.findComponent(FontAwesomeIcon).classes()).not.toContain('text-gray-300');
  });

  it('should show specific class when not active', () => {
    const wrapper = mount(SortableHeader, {
      localVue,
      propsData: {
        label: 'ID',
        field: 'id',
        serverSortField: 'test',
        serverSortOrder: 'desc',
      },
    });

    expect(wrapper.findComponent(FontAwesomeIcon).classes()).toContain('text-gray-300');
  });

  it('should be not active when field is function', () => {
    const wrapper = mount(SortableHeader, {
      localVue,
      propsData: {
        label: 'ID',
        field: () => {},
        serverSortField: 'test',
        serverSortOrder: 'desc',
      },
    });

    expect(wrapper.vm.isNotActiveField).toEqual(true);
  });

  it('should show sort down icon when sort by desc', () => {
    const wrapper = mount(SortableHeader, {
      localVue,
      propsData: {
        label: 'ID',
        field: 'id',
        serverSortField: 'id',
        serverSortOrder: 'desc',
      },
    });

    expect(wrapper.findComponent(FontAwesomeIcon).classes()).toContain('fa-sort-down');
  });

  it('should show sort up icon when sort by asc', () => {
    const wrapper = mount(SortableHeader, {
      localVue,
      propsData: {
        label: 'ID',
        field: 'id',
        serverSortField: 'id',
        serverSortOrder: 'asc',
      },
    });

    expect(wrapper.findComponent(FontAwesomeIcon).classes()).toContain('fa-sort-up');
  });

  it('should show sort icon when current field is not the sorted field', () => {
    const wrapper = mount(SortableHeader, {
      localVue,
      propsData: {
        label: 'ID',
        field: 'id',
        serverSortField: 'test',
        serverSortOrder: 'desc',
      },
    });

    expect(wrapper.findComponent(FontAwesomeIcon).classes()).toContain('fa-sort');
  });
});

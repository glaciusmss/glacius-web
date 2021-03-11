<template>
  <div class="py-4 text-gray-500 dark:text-gray-400">
    <logo
      :link="`/portal/${$route.params.shopId}/dashboard`"
      class="ml-6"
    />

    <ul class="mt-6">
      <sidebar-item
        icon="tachometer-alt"
        name="Dashboard"
        :route="`/portal/${$route.params.shopId}/dashboard`"
      />
      <sidebar-item
        icon="boxes"
        name="Products"
        :route="`/portal/${$route.params.shopId}/products`"
      />
      <sidebar-item
        icon="clipboard-list"
        name="Orders"
        :route="`/portal/${$route.params.shopId}/orders`"
      />
      <sidebar-item
        icon="users"
        name="Customers"
        :route="`/portal/${$route.params.shopId}/customers`"
      />
      <sidebar-item
        icon="tools"
        name="Setting"
        :route="`/portal/${$route.params.shopId}/setting`"
      />
    </ul>
  </div>
</template>

<script>
import SidebarItem from './SidebarItem.vue';
import Logo from './Logo.vue';

export default {
  components: {
    SidebarItem,
    Logo,
  },
};
</script>

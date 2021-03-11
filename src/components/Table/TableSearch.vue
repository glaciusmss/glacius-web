<template>
  <label class="flex items-center col-span-3 sm:mt-auto sm:justify-end">
    <span class="mr-2">Search: </span>
    <input
      class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
      @input="$emit('search', $event.target.value)"
    >
  </label>
</template>

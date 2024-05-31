
<!-- TODO: Standarize a general button -->
<script>
export default {
  name: "MainButton",
};
</script>

<template>
  <div>
    <button class="hover:text-primary ease-in-out duration-200">
      <slot></slot>
    </button>
  </div>
</template>

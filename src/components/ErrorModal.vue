<script>
export default {
  name: "ErrorModal",
  props: { errorDescription: String, succeed: Boolean },
  data() {
    return {
      message: this.$props.errorDescription,
      close: true,
      succeeded: this.succeed,
    };
  },
  methods: {
    closeModal() {
      this.$emit("close-modal", this.close);
    },
  },
};
</script>

<template>
  <div
    class="fixed flex items-center bg-zinc-950 bg-opacity-70 top-0 bottom-0 right-0 left-0"
  >
    <div
      :class="succeeded ? 'border-green-500' : 'border-red-600'"
      class="mx-auto max-w-80 flex flex-col gap-4 bg-zinc-100 p-4 rounded-lg border"
    >
      <div class="self-center hover:font-semibold ease-in-out duration-150">
        <button @click="closeModal">Close</button>
      </div>
      <div>
        <p class="text-center uppercase font-bold">{{ message }}</p>
      </div>
    </div>
  </div>
</template>

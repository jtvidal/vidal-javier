<script>
export default {
  name: "ErrorModal",
  props: { errorDescription: String },
  data() {
    return {
      message: this.$props.errorDescription,
      close: true,
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
    <div class="mx-auto w-10/12 flex flex-col bg-zinc-100 p-4 rounded-lg">
      <div class="self-end"><button @click="closeModal">X</button></div>
      <div>
        <p>{{ message }}</p>
      </div>
    </div>
  </div>
</template>

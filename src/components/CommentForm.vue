<script>
export default {
  name: "CommentForm",
  // Recieves postId: id from the component PostCar (parent component).
  props: { postId: String },
  data() {
    return {
      comment: {
        content: null,
        by: null,
        avatar: null,
        inPost: null,
        date: null,
      },
    };
  },
};
</script>
<template>
  <div>
    <form
      @submit.prevent="() => {}"
      action="#"
      method="get"
      enctype="multipart/form-data"
    >
      <label for="content">Comenta aquí</label>
      <textarea name="content" id="content"> </textarea>
      <div>
        <input type="submit" value="Comment" />
      </div>
    </form>
  </div>
</template>

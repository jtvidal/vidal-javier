<script>
    export default {
        name:'CommentsView',
        data(){
            return{
                postCommented: false,
            }
        }
    }
</script>

<template>
    <div v-if="postCommented == true">

    </div>
    <div v-else>
        <p>This post has no comments yet</p>
    </div>
</template>
<script>
    export default {
        name: 'ErrorModal',
        data(){
            return{
                message: 'mensaje prueba',
            }
        }
    }
</script>

<template>
    <div>
        <div><button>X</button></div>
        <div>
            <p>{{ message }}</p>
        </div>
    </div>
</template>


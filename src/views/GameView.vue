<template>
    <div>
        {{ game.name }}
        {{ game.description }}
    </div>
</template>

<script>
import api from "../services/rawg"

    export default {
        name: "GameView",
        data() {
            return {
                game: {}
            }
        },
        async created() {
            const result = await api.getOneGame(this.$route.params.id)
            this.game = result
        }
    }
</script>

<style lang="scss" scoped>

</style>
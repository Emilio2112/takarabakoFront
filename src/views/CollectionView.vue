<template>
    <v-container>
        {{ games }}
    </v-container>
</template>

<script>
import usersAPI from '../services/users'

export default {
    data () {
        return {
            games: {}
        }
    },
    async created() {
        const result = await usersAPI.viewCollection()
        this.games = result
    }
}
</script>

<style scoped>

</style>
<template>
  <v-toolbar class="toolBar" density="compact">
    <v-app-bar-nav-icon
      color="#A1ACB4"
      @click="showMenu()"
    ></v-app-bar-nav-icon>

    <v-toolbar-title v-if="!store.token">Takarabako</v-toolbar-title>
    <v-toolbar-title v-else>{{ store.userName }}</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn icon @click="showSearch = !showSearch">
      <v-icon color="#A1ACB4">mdi-magnify</v-icon>
    </v-btn>
  </v-toolbar>

  <!-- <SearchBar v-model="showSearch" class="searchBar"></SearchBar> -->

  <v-dialog class="dialog" v-model="showSearch" scrollable>
    <SearchBar></SearchBar>
  </v-dialog>

  <v-navigation-drawer color="#3E5161" v-model="drawer" temporary>
    <v-list-item>Menú</v-list-item>
    <v-divider></v-divider>
    <v-list v-if="!store.token" density="compact" nav>
      <v-list-item @click="!showSearch">
        <router-link to="/login"
          >Login
          <span class="material-icons" id="iconSquare"
            >check_box_outline_blank</span
          >
        </router-link>
      </v-list-item>
      <v-list-item @click="!showSearch">
        <router-link to="/signup"
          >Signup
          <span class="material-icons" id="iconTriangle">change_history</span>
        </router-link></v-list-item
      >
    </v-list>
    <v-list v-else>
      <v-list-item>
        {{ store.name }}
      </v-list-item>
      <RouterLink to="/collection">
        <v-list-item>
          Mi colección
          <span class="material-icons" id="iconSquare"
            >check_box_outline_blank</span
          >
        </v-list-item>
      </RouterLink>
      <RouterLink to="/playing">
        <v-list-item>
          Jugando
          <span class="material-icons" id="iconTriangle">change_history</span>
        </v-list-item>
      </RouterLink>
      <RouterLink to="/completed">
        <v-list-item>
          Finalizados
          <span class="material-icons" id="iconCross">close</span>
        </v-list-item>
      </RouterLink>
      <v-list-item @click="logout">
        Logout
        <span class="material-icons" id="iconCircle"
          >radio_button_unchecked</span
        >
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { useAuthStore } from "../stores/auth";
import SearchBar from "./SearchBar.vue";

export default {
  name: "NavBar",
  data: () => ({
    store: useAuthStore(),
    drawer: false,
    showSearch: false,
  }),
  methods: {
    logout() {
      this.store.logout();
      this.store.roleCheck(null);
      this.drawer = false;
      this.showSearch = false;
      this.$router.push({ name: "home" });
    },
    showMenu() {
      if (this.drawer === true) {
        this.drawer = false;
      } else {
        this.drawer = true;
        this.showSearch = false;
      }
    },
  },
  components: {
    SearchBar,
  },
};
</script>

<style scoped>
.toolBar {
  background-color: #3e5161;
}
.dialog {
  justify-items: center;
  left: 10vw;
  right: 10vw;
}

.icon {
  color: #a1acb4;
}
.button {
  background-color: #3e5161;
  color: #a1acb4;
}
.closeSearch {
  color: white;
  background-color: rgb(179, 174, 174);
  margin-top: 5em;
  margin-left: 85%;
}
#iconCircle {
  color: #ef6f69;
}

#iconCross {
  color: #9cade2;
}

#iconSquare {
  color: #d591bf;
}

#iconTriangle {
  color: #38dec6;
}
</style>

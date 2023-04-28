<template>
  <v-app-bar class="toolBar" density="compact" color="#3e5161">
    <v-app-bar-nav-icon
      color="#A1ACB4"
      @click="showMenu()"
    ></v-app-bar-nav-icon>

    <v-toolbar-title v-if="!store.token" class="text-center">
      <RouterLink class="link" to="/">Takarabako</RouterLink>
    </v-toolbar-title>
    <v-toolbar-title v-else class="text-center">
      <RouterLink class="link" to="/">
        {{ store.userName }}´s Takarabako</RouterLink
      >
    </v-toolbar-title>
    <v-btn icon @click="showSearch = !showSearch">
      <v-icon color="#A1ACB4">mdi-magnify</v-icon>
    </v-btn>
  </v-app-bar>

  <!-- <SearchBar v-model="showSearch" class="searchBar"></SearchBar> -->
  <v-container>
    <v-row justify="center">
      <v-col>
        <v-dialog class="dialog" v-model="showSearch" scrollable>
          <SearchBar @event="hideSearch"></SearchBar>
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
  <v-navigation-drawer color="#3E5161" v-model="drawer" temporary>
    <v-list-item>Menu</v-list-item>
    <v-divider></v-divider>
    <v-list v-if="!store.token" density="compact" nav>
      <v-list-item @click="!showSearch" :to="{ name: 'login' }">
        <p class="pa-2">
          Login
          <span class="material-icons" id="iconSquare"
            >check_box_outline_blank</span
          >
        </p>
      </v-list-item>
      <v-list-item @click="!showSearch" :to="{ name: 'signup' }">
        <p class="pa-2">
          Signup
          <span class="material-icons" id="iconTriangle">change_history</span>
        </p>
      </v-list-item>
    </v-list>
    <v-list v-else density="compact" nav>
      <v-list-item :to="{ name: 'collectionView' }">
        <p class="pa-2">
          Collection
          <span class="material-icons" id="iconSquare"
            >check_box_outline_blank</span
          >
        </p>
      </v-list-item>

      <v-list-item :to="{ name: 'playingView' }">
        <p class="pa-2">
          Backlog
          <span class="material-icons" id="iconTriangle">change_history</span>
        </p>
      </v-list-item>

      <v-list-item :to="{ name: 'completedView' }">
        <p class="pa-2">
          Completed
          <span class="material-icons" id="iconCross">close</span>
        </p>
      </v-list-item>

      <v-list-item @click="logout" style="text-decoration: none">
        <p class="pa-2">
          Logout
          <span class="material-icons" id="iconCircle"
            >radio_button_unchecked</span
          >
        </p>
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
    hideSearch(showSearchBar) {
      this.showSearch = showSearchBar;
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
  position: fixed;
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
.link {
  text-decoration: none;
}
.link:visited {
  text-decoration: none;
  color: black;
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

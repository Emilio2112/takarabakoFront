import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import SignupView from  '../views/SignupView.vue'
import GameView from '../views/GameView.vue'
import CollectionView from '../views/CollectionView.vue'
import CompletedView from '../views/CompletedView.vue'
import PlayingView from '../views/PlayingView.vue'
import GameCollectionView from '../views/GameCollectionView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupView,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/game/:id',
      name: 'gameview',
      component: GameView,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/collection',
      name: 'collectionView',
      component: CollectionView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/completed',
      name: 'completedView',
      component: CompletedView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/playing',
      name: 'playingView',
      component: PlayingView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/collection/:id',
      name: 'gameCollectionView',
      component: GameCollectionView,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const token = useAuthStore.token
  if (to.meta.requiresAuth && !localStorage.getItem("token")) {
    next({name: "login"})
  } else {
    next()
  }
})

export default router

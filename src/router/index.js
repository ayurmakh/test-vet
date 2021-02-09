import Vue from 'vue'
import VueRouter from 'vue-router'
import { PageName, PagePath } from './constants'

Vue.use(VueRouter)

const routes = [
  {
    path: PagePath.Home,
    name: PageName.Home,
    redirect: {
      name: PageName.TaskList
    }
  },
  {
    path: PagePath.TaskList,
    name: PageName.TaskList,
    component: () => import(/* webpackChunkName: "TaskList" */ '@/views/TaskList')
  },
  {
    path: PagePath.Task,
    name: PageName.Task,
    component: () => import(/* webpackChunkName: "Task" */ '@/views/Task')
  },
  {
    path: PagePath.CreateTask,
    name: PageName.CreateTask,
    component: () => import(/* webpackChunkName: "Task" */ '@/views/Task')
  },
  {
    path: PagePath.NotFound,
    name: PageName.NotFound,
    component: () => import(/* webpackChunkName: "NotFound" */ '@/views/NotFound')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

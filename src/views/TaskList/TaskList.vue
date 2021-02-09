<template lang="pug">
  .task-list
    Preloader(v-if="!taskList")
    template(v-else)
      button.create-task-button
        router-link(:to="toCreateTask") Создать задачу
      template(v-if="taskList.length === 0")
        p Задач нет
      template(v-else)
        table.table
          thead
            tr
              th
                p Задачи
          tbody
            tr(
              v-for="(task, i) of taskList"
              :key="i"
              @dblclick="watchTask(task)"
              class="table__row"
              :style="getBgColor(task.status)"
            )
              td
                h4.ellipsis {{ task.title || '-' }}
                p.line-clamp-2 {{ task.description || '-' }}
</template>

<script>
import api from '@/sevices/ApiService'
import { PageName } from '@/router/constants'
import { isInteger } from '@/utils'
import { statuses } from '@/constants'
import Preloader from '@/components/Preloader'

export default {
  name: "TaskList",

  components: {
    Preloader
  },

  data() {
    return {
      taskList: null
    }
  },
  computed: {
    toCreateTask () {
      return {
        name: PageName.CreateTask
      }
    }
  },
  async mounted () {
    this.taskList = await api({
      url: 'tasks'
    })
  },
  methods: {
    watchTask (task) {
      if (!task.id || !isInteger(task.id)) {
        return
      }
      this.$store.dispatch('setTask', task)
      this.$router.push({
        name: PageName.Task,
        params: {
          id: task.id
        }
      })
    },
    getBgColor (taskStatus) {
      const status = statuses.find(item => item.id === taskStatus)

      if (!status) {
        return
      }

      return `background: ${status.color}`
    }
  }
}
</script>

<style lang="sass">
@import "src/assets/sass/styles"

.table
  border: 1px solid
  border-collapse: collapse
  border-radius: 4px
  margin: 50px auto 0 auto
  width: 900px

  th
    text-align: left

  tr
    border-bottom: 1px solid

  th, td
    padding: 15px
    max-width: 900px

  &__row
    cursor: pointer

.create-task-button
  a
    text-decoration: none
    color: #000
</style>

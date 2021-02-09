<template lang="pug">
  div
    router-link(:to="toTasks") К задачам
    template(v-if="task")
      .task-wrapper
        h2 {{ isEditMode ? `Редактирование задачи ${task.id}` : 'Создание задачи' }}
        .field-wrapper
          h4 Название
          input(v-model="task.title")
        .field-wrapper
          h4 Описание
          textarea(v-model="task.description")
        .field-wrapper(v-if="isEditMode")
          h4 Дата создания
          span {{ task.created_date }}
        .field-wrapper(v-if="isEditMode")
          h4 Статус
          select(v-model="task.status")
            option(
              v-for="(item, i) of statuses"
              :key="i"
              :value="item.id"
            ) {{ item.title }}
        .flex.m-top
          button(@click="save") Сохранить
          button(@click="deleteTask") Удалить

    Preloader(v-else)
      p Задача не обнаружена
</template>

<script>
import { mapState } from 'vuex'
import api from '@/sevices/ApiService'
import { statuses } from '@/constants'
import { isInteger, formatDate } from '@/utils'
import { PageName } from '@/router/constants'
import { ApiMethod } from '@/sevices/ApiService/constants'
import Preloader from '@/components/Preloader/Preloader'

export default {
  name: "Task",
  components: {
    Preloader
  },
  data() {
    return {
      isEditMode: false,
      task: null
    }
  },

  computed: {
    ...mapState([
        'currentTask'
    ]),
    statuses () {
      return statuses
    },
    toTasks () {
      return {
        name: PageName.TaskList
      }
    }
  },

  async mounted () {
    if (this.$route.params.id && this.$route.params.id !== 'new') {
      if (!isInteger(this.$route.params.id)) {
        await this.$router.push({
          name: PageName.NotFound
        })
        return
      }
      if (!this.currentTask) {
        try {
          this.task = await api({
            url: `tasks/${this.$route.params.id}`
          })
        } catch (e) {
          await this.$router.push({
            name: PageName.NotFound
          })
        }
      } else {
        this.task = this.currentTask
      }
      this.isEditMode = true
    } else {
      this.task = {}
    }
  },

  methods: {
    async save () {
      let parameters = {}
      if (this.isEditMode) {
        parameters = {
          url: `tasks/${this.$route.params.id}`,
          method: ApiMethod.PATCH
        }
      } else {
        this.task.created_date = formatDate(new Date())
        this.task.status = 1
        parameters = {
          url: 'tasks',
          method: ApiMethod.POST
        }
      }
      parameters.payload = this.task
      try {
        await api(parameters)
      } catch (e) {
        console.error(e)
      }
      await this.$router.push({
        name: PageName.TaskList
      })
    },
    async deleteTask () {
      await api({
        method: ApiMethod.DELETE,
        url: `tasks/${this.$route.params.id}`
      })
      await this.$router.push({
        name: PageName.TaskList
      })
    }
  }

}
</script>

<style lang="sass">
@import "src/assets/sass/styles.sass"

.task-wrapper
  width: 900px
  margin: 0 auto

.field-wrapper
  margin-top: 15px

  span
    margin-right: 40px

.flex
  button:first-child
    margin-right: 30px
</style>

<template>
  <div id="app">
    <h2>To Do list</h2>
    <input type="text" placeholder="Add something..." @keyup.enter="addToDo" v-model="tarea">
    <button @click="addToDo">Add Task</button>
    <hr>
    <h2>List</h2>
    <ul>
      <li v-for="(item, index) in newTask" :key="index">
        <!-- EDITING PART -->
        <div v-if="!item.editing">
          <p>{{item.titulo}}</p>
          <button @click="enableEditing (item)">Edit</button>
          <button @click="changeCompletado (item)">Completed</button>
          <button @click="deleteTask (index)">Delete</button>
        </div>
        <div v-if="item.editing">
          <input v-model="item.titulo" class="input"/>
          <button @click="disableEditing (item)"> Cancel </button>
          <button @click="saveEdit (item)"> Save </button>
        </div>
      </li>
    </ul>
    <hr>
    <h2>Tasks Completed</h2>
    <ul>
      <li v-for="(completed, index) in completedTask" :key="index">
        <!-- EDITING PART -->
        <div v-if="!completed.editing">
          <p>{{completed.titulo}}</p>
          <button @click="enableEditing (completed)">Edit</button>
          <button @click="undoneTask (completed)">Not Completed</button>
          <button @click="deleteTask (index)">Delete</button>
        </div>
        <div v-if="completed.editing">
          <input v-model="completed.titulo"/>
          <button @click="disableEditing"> Cancel </button>
          <button @click="saveEdit"> Save </button>
        </div>
      </li>
    </ul>
    <hr>
  </div>
</template>

<script>
// import List from '../src/components/List.vue'
export default {
  name: 'App',
  // components: {
  //   List
  // },
  data() {
    return {
      tarea: '',
      tareaTemporal: null,
      list: [
        {
          titulo: 'Practicar Vue JS',
          completado: false,
          editing: false
        }
      ]
    }
  },
  methods: {
    addToDo() {
      if (this.tarea === '') {
        this.$toast.error('Error', {
          position: 'bottom'
        })
      } else {
        this.list.push({ titulo: this.tarea, completado: false, editing: false })
        this.$toast.info('Task Added', {
          position: 'bottom'
        })
      }
      this.tarea = ''
    },
    changeCompletado(task) {
      task.completado = !this.completado
      this.$toast.success('Task Completed', {
        position: 'bottom'
      })
    },
    undoneTask(task) {
      task.completado = false
      this.$toast.warning('Task Not Completed', {
        position: 'bottom'
      })
    },
    deleteTask(task) {
      this.list.splice(task, 1)
      this.$toast.error('Task Deleted', {
        position: 'bottom'
      })
    },
    // hideAlert() {
    //   this.textAlert = ''
    // },
    // showAlert(text) {
    //   this.textAlert = text
    //   setTimeout(this.hideAlert, 2 * 1000)
    // }
    enableEditing(task) {
      this.tareaTemporal = task.titulo
      task.editing = true
    },
    disableEditing(task) {
      task.titulo = this.tareaTemporal
      task.editing = false
    },
    saveEdit(task) {
      this.tareaTemporal = task.titulo
      this.disableEditing(task)
    }
  },
  computed: {
    completedTask() {
      return this.list.filter(task => task.completado)
    },
    newTask() {
      return this.list.filter(task => !task.completado)
    }
  }
}

</script>

<style>
#app {
  margin: 50px;
}
ul {
  display:flex;
  flex-direction: column;
}
</style>

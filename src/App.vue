<template>
  <div id="app">
    <div class="main-title">
      <h2>TO DO LIST</h2>
    </div>
    <el-input type="text" placeholder="Add something..."
      @keyup.enter.native="addToDo" v-model="tarea" class="input" style="width: 30%;" maxlength="20" show-word-limit>
    </el-input>
    <el-button @click="addToDo" type="primary" class="addButton">Add Task</el-button>
    <hr>
    <el-row :gutter="20">
      <el-col :span="10">
        <div class="grid-content bg-purple">
          <h2 class="title">List <i class="el-icon-s-order"></i></h2>
          <ul>
            <span v-for="(item, index) in newTask" :key="index">
              <!-- EDITING PART -->
              <div class="main-item" v-if="!item.editing">
                <p>{{item.titulo}}</p>
                <div class="buttons">
                  <el-button @click="changeCompletado (item)" type="success" icon="el-icon-check" circle></el-button>
                  <el-button @click="enableEditing (item)" type="primary" icon="el-icon-edit" circle></el-button>
                  <el-button @click="deleteTask (item)" type="danger" icon="el-icon-delete" circle></el-button>
                </div>
              </div>
              <div class="edit" v-if="item.editing">
                <div class="buttons-edit">
                  <el-input type="text" v-model="item.titulo" style="width: 50%" class="input"></el-input>
                  <el-button type="success" style="margin-left: 10px" @click="saveEdit (item)"> Save </el-button>
                  <el-button type="info" @click="disableEditing (item)"> Cancel </el-button>
                </div>
              </div>
            </span>
          </ul>
        </div>
      </el-col>
      <!-- <hr> -->
      <el-col :span="10">
        <div class="grid-content bg-purple">
          <h2 class="title">Tasks Completed <i class="el-icon-s-claim"></i></h2>
          <ul>
            <li v-for="(completed, index) in completedTask" :key="index">
              <!-- EDITING PART -->
              <div v-if="!completed.editing">
                <p>{{completed.titulo}}</p>
                <el-button @click="undoneTask (completed)" type="warning" icon="el-icon-close" circle></el-button>
                <el-button @click="deleteTask (completed)" type="danger" icon="el-icon-delete" circle></el-button>
              </div>
            </li>
          </ul>
        </div>
      </el-col>
    </el-row>
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
      list: [
        {
          titulo: 'Practicar Vue JS',
          completado: false,
          editing: false,
          tareaTemporal: null
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
        this.list.push({ titulo: this.tarea, completado: false, editing: false, tareaTemporal: null })
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
      const index = this.list.indexOf(task)
      this.list.splice(index, 1)
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
*{
  margin: 0;
  padding: 0;
}
.main-title{
  background-color: rgb(89, 177, 94);
  padding: 20px 20px 20px 80px;
  color: white;
  margin-bottom: 20px;
}
ul {
  /* display:flex;
  flex-direction: column; */
}
.el-row {
    position: absolute;
    left: 50%;
    transform: translate(-41%, 0);
  }
.bg-purple {
    margin-top: 20px;
    background: #d3dce6;
    padding: 10px 10px 10px 20px;
}
.grid-content {
  border-radius: 10px;
}
.title{
  text-align: center;
  font-size: 30px;
  text-transform: uppercase;
}
.main-item{
  display:flex;
  align-items: center;
  margin-top: 30px;
}
.main-item p{
  font-size: 25px;
  margin-left: 10%;
  width: 200px;
}
.buttons{
  margin-left: 50px;
}
.edit{
  display: flex;
  align-content: center;
}
.buttons-edit{
  margin-top: 10px;
}
.input{
  margin: 0px 10px 20px 30px;
}
</style>

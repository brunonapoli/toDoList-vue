<template>
  <div id="app">
    <div class="main-title">
      <h2>TO DO LIST</h2>
    </div>
    <div class="input-button">
      <el-input type="text" placeholder="Add something..."
        @keyup.enter.native="addToDo" v-model="tarea" class="input" style="width: 30%" maxlength="20" show-word-limit>
      </el-input>
      <el-button @click="addToDo" type="primary" class="addButton">Add Task</el-button>
    </div>
    <hr>
    <el-row :gutter="20">
      <el-col :span="10">
        <div class="grid-content bg-purple">
          <div class="div-title">
            <h2 class="title">List <i class="el-icon-s-order"></i></h2>
          </div>
          <ul>
            <span v-for="(item, index) in newTask" :key="index">
              <div class="main-item" v-if="!item.editing">
                <p>{{item.titulo}}</p>
                <div class="buttons">
                  <el-button @click="changeCompletado (item)" type="success" icon="el-icon-check" circle></el-button>
                  <el-button @click="enableEditing (item)" type="primary" icon="el-icon-edit" circle></el-button>
                  <el-button @click="deleteTask (item)" type="danger" icon="el-icon-delete" circle></el-button>
                </div>
              </div>
              <!-- EDIT PART -->
              <div class="edit-item" v-if="item.editing">
                <div class="buttons edit">
                  <el-input type="text" v-model="item.titulo" class="input"></el-input>
                  <div class="only-buttons">
                    <el-button type="success" icon="el-icon-check" circle @click="saveEdit (item)"></el-button>
                    <el-button type="info" icon="el-icon-close" circle @click="disableEditing (item)"></el-button>
                  </div>
                </div>
              </div>
            </span>
          </ul>
        </div>
      </el-col>
      <!-- <hr> -->
      <el-col :span="10">
        <div class="grid-content bg-purple">
          <div class="div-title">
            <h2 class="title">Tasks Completed <i class="el-icon-s-claim"></i></h2>
          </div>
          <ul>
            <span v-for="(completed, index) in completedTask" :key="index">
              <div class="main-item" v-if="!completed.editing">
                <p>{{completed.titulo}}</p>
                <div class="buttons">
                  <el-button @click="undoneTask (completed)" type="warning" icon="el-icon-close" circle></el-button>
                  <el-button @click="deleteTask (completed)" type="danger" icon="el-icon-delete" circle></el-button>
                </div>
              </div>
            </span>
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
          position: 'bottom',
          duration: 800,
          queue: true
        })
      }
      this.tarea = ''
    },
    changeCompletado(task) {
      task.completado = !this.completado
      this.$toast.success('Task Completed', {
        position: 'bottom',
        duration: 800,
        queue: true
      })
    },
    undoneTask(task) {
      task.completado = false
      this.$toast.warning('Task Not Completed', {
        position: 'bottom',
        duration: 800,
        queue: true
      })
    },
    deleteTask(task) {
      const index = this.list.indexOf(task)
      this.list.splice(index, 1)
      this.$toast.error('Task Deleted', {
        position: 'bottom',
        duration: 800,
        queue: true
      })
    },
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
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
body{
  background: #f2f2f2;
}
.main-title{
  background-color: rgb(89, 177, 94);
  padding: 20px 20px 20px 80px;
  color: white;
  margin-bottom: 20px;
}
.el-row {
    position: absolute;
    left: 50%;
    transform: translate(-41%, 0);
  }
.bg-purple {
    margin-top: 20px;
    padding: 10px 10px 10px 20px;
}
.grid-content {
  border-radius: 10px;
}
.div-title{
  margin-bottom: 30px;
  background: rgb(89, 177, 94);
  border-radius: 10px;
  padding: 10px 0;
}
.title{
  text-align: center;
  font-size: 30px;
  text-transform: uppercase;
  color: #fff;
}
.main-item{
  display:flex;
  align-items: center;
  margin: 20px 0 10px 0;
  padding: 10px 0;
  background: rgb(251, 250, 252);
  border-radius: 10px;
  box-shadow: 0 0 4px 4px #d0d0d0;
}
.main-item p{
  font-size: 25px;
  margin-left: 6%;
  width: 270px;
}
.edit-item{
  display:flex;
  align-items: center;
  margin: 20px 0 10px 0;
  background: rgb(251, 250, 252);
  border-radius: 10px;
  box-shadow: 0 0 4px 4px #d0d0d0;
}
.edit-item .el-input{
  font-size: 25px;
  top: 10px;
  right: 50px;
  width: 60%
}
.buttons{
  margin-left: 50px;
}
.edit{
  display: flex;
  align-items: center;
}
.input{
  margin: 0px 10px 20px 30px;
}
@media only screen and (max-width: 1300px) {
  .buttons{
  margin-left: 20px;
  }
  .main-item p{
  font-size: 21px;
  margin-left: 3%;
  width: 160px;
  }
}
@media only screen and (max-width: 1000px) {
  .title{
    font-size: 20px;
  }
  .main-item p {
    font-size: 20px;
  }
}
@media only screen and (max-width: 950px){
  .el-row{
    display: flex;
    flex-direction: column;
    left: 65%;
  }
  .grid-content{
    width: 400px;
  }
  .main-item p{
    margin-left: 6%;
    width: 190px;
    font-size: 25px;
  }
  .edit-item .el-input{
    font-size: 20px;
    padding-left: 10px;
    margin-right: 10px;
  }
}
@media only screen and (max-width: 760px){
  .main-item p{
    font-size: 18px;
    width: 140px;
  }
  .buttons{
    margin-left: 40px;
  }
  .el-row{
    left: 60%;
  }
}
@media only screen and (max-width: 500px){
  .main-item{
    flex-direction: column;
  }
  .main-item p{
    font-size: 18px;
    width: 140px;
    margin-bottom: 10px;
  }
  .buttons{
    margin-left: 10px;
  }
  .grid-content{
    width: 200px;
  }
  .title{
    font-size: 15px;
  }
  .el-row{
    left: 68%;
  }
  .edit{
    flex-direction: column;
  }
  .edit-item .el-input{
    width: 190px;
    margin-left: 35px;
  }
  .edit .el-button{
    display: flex;
  }
  .only-buttons{
    display: flex;
    margin: 0 60px 10px 0;
  }
}
</style>

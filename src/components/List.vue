<template>
<div>
  <div v-if="!editing">
    <span class='text'>{{msg}}</span>
    <button @click="enableEditing">Edit</button>
  </div>
  <div v-if="editing">
    <input v-model="tarea" class="input"/>
    <button @click="disableEditing"> Cancel </button>
    <button @click="saveEdit"> Save </button>
  </div>
</div>
</template>

<script>
// import Vue from 'vue'
export default {
  props: {
    msg: String,
    tarea: String
  },
  data() {
    return {
      // value: '',
      tempValue: '',
      editing: false
    }
  },
  methods: {
    enableEditing: function() {
      this.tempValue = this.msg
      this.editing = true
    },
    disableEditing: function() {
      this.tempValue = ''
      this.editing = false
    },
    saveEdit: function() {
      // However we want to save it to the database
      this.msg = this.tempValue
      // this.arrayEditedTask.push(this.msg)
      // Vue.set(this.arrayEditedTask, this.index, this.msg)
      this.disableEditing()
    }
  }
}
</script>

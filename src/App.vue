<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'app'
}
</script>

<style>
body {
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 60px;*/
}
.el-backtop, .el-calendar-table td.is-today {
  color: #DC3838 !important;
}

.el-button:focus, .el-button:active {
  color: #FFF !important; 
  background: #DC3838 !important;
  border-color: #DC3838 !important;
}
</style>

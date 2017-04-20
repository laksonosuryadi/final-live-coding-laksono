<template>
  <div>
    <nav class="navbar navbar-inverse">
      <div class="container-fluid">
        <div class="navbar-header">
          <a class="navbar-brand" href="/#/home"><b>Blogsss</b></a>
        </div>

        <ul class="nav navbar-nav navbar-right">
          <li v-if="statusLoginNav" @click="logout"><a href="#"><span class="glyphicon glyphicon-log-in"></span>Logout</a></li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  props: ['statusLoginNav'],
  methods: {
    logout() {
      this.$emit('logout')
    }
  }
}
</script>

<style>

</style>

<template>
  <div v-if="article != null">
    <h3 id="login-as-who"><b>You are signing in as: {{ current.username }}.</b></h3>
    <div class="containerQuestion">
      <h1>{{article.title}}</h1>
      <h4>Author: {{article.author.username}}</h4>
      <h4>{{article.content}}</h4>
    </div>
  </div>
</template>


<script>
import axios from 'axios'

export default {
  data() {
    return {
      id: this.$route.params.id,
      article: null,
      current: ''
    }
  },
  methods: {
    getThisArticle(){
      let config = {
        headers: {'token': localStorage.getItem('token')}
      };

      let self = this;
      axios.get(`http://localhost:3000/articles/${self.id}`, config)
      .then(function (response){
        self.article = response.data
        //console.log(response.data);
      })
      .catch(function(error){
        console.log(error);
      })
    },
    getCurrentUser() {
      let config = {
        headers: {'token': localStorage.getItem('token')}
      };

      let self = this;
      axios.get(`http://localhost:3000/articles/current`, config)
      .then(function (response){
        self.current = response.data
      })
      .catch(function(error){
        console.log(error);
      })
    }
  },
  mounted() {
    this.getThisArticle(),
    this.getCurrentUser()
  }
}
</script>

<style>

#login-as-who {
  padding: 20px;
  padding-top: 80px;
  color: DarkRed;
}

.containerQuestion {
  padding-left: 40px;
  padding-bottom: 20px;
  padding-right: 40px;
}
</style>

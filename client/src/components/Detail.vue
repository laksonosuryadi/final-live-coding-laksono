<template>
  <div v-if="article != null">
    <h5 id="login-as-who"><b>Signed in as: {{ current.name }}.</b></h5>
    <div class="containerArticles">
      <h1>{{article.title}}</h1>
      <h4>Author: {{article.author.name}}</h4>
      <hr>
      <h4 id="arts">{{article.content}}</h4>
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
  padding-right: 40px;
  padding-top: 20px;
  float: right;
  color: DarkRed;
}

#arts {
  line-height: 30px;
}

.containerArticles {
  padding-top: 13px;
  padding-left: 40px;
  padding-bottom: 20px;
  padding-right: 40px;
  line-height: 20pt;
}
</style>

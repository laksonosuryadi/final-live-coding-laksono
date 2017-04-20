<template lang="html">
  <div class="container">
    <h1>Add New Article</h1>
    <h4>Title</h4>
    <textarea rows="2" cols="155" placeholder="Input title here..." v-model="newArticleTitle">
    </textarea><br>
    <h4>Content</h4>
    <textarea rows="14" cols="155" placeholder="Input content here..." v-model="newArticleContent">
    </textarea>
    <br><br>
    <button type="button" class="btn btn-primary btn-lg" @click="newArticle()">Post Article</button>
    <br>
    <p id="warning">{{warning}}</p>

  </div>


</template>

<script>

import axios from 'axios'

export default {
  data() {
    return {
      newArticleTitle: '',
      newArticleContent: '',
      warning: ''
    }
  },
  methods: {
    newArticle() {
      let self = this;
      if(self.newArticleTitle == '' || self.newArticleContent == ''){
        self.warning = "All fields must be filled!"
      } else {
        axios.post(`http://localhost:3000/articles/`, {title: self.newArticleTitle, content: self.newArticleContent}, {headers: {'token': localStorage.getItem('token')}})
        .then(function (response){
          console.log(response);
          window.location = '/#/home'
        })
        .catch(function(error){
          console.log(error);
        })
      }
    },
  }
}
</script>

<style lang="css">
#warning {
  color: red;
}
</style>

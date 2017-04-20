<template>
  <div>
    <h3 id="login-as-who"><b>Welcome, {{ current.name }}.</b></h3>

<!--///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////-->
    <!-- Button trigger modal List of My Article -->
    <button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal" id="listArticleBtn" @click="getMyArticles(current._id)"><span class="glyphicon glyphicon-star"></span>
      My Articles
    </button>

    <!-- Modal for List of My Article -->
    <h4 id="rapi">Hover and click on below articles to see the details</h4>
    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h3 class="modal-title" id="myModalLabel">List of My Articles</h3>
          </div>
          <div class="modal-body" v-for="article in myArticles">
            <h4>Title: </h4><p>{{article.title}}</p>
            <h4>Content: </h4><p>{{article.content}}</p>
            <br>
            <h5><b><i>Edit Title</i></b></h5>
            <textarea rows="1" cols="78" placeholder="Input edited title here..." v-model="editArticleTitle">
            </textarea><br>
            <h5><b><i>Edit Content</i></b></h5>
            <textarea rows="6" cols="78" placeholder="Input edited content here..." v-model="editArticleContent">
            </textarea><br>
            <button type="button" class="btn btn-primary" @click="editMyArticle(article._id)"><span class="glyphicon glyphicon-pencil"></span> Edit This Article</button>
            <button id="del" type="button" class="btn btn-default" data-dismiss="modal" @click="deleteMyArticle(article._id)"><span class="glyphicon glyphicon-trash"></span> Delete This Article</button>
            <p id="warning">{{warning}}</p>
            <br>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>

<!--///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////-->
<!-- SHOW LIST OF ARTICLES -->

    <div class="threads" v-for="data in alldata">
      <router-link :to="'detail/'+data._id" id="removeUnderline">
        <h2>{{ data.title }}</h2>
        <h4>Author: {{data.author.name}}</h4>
      </router-link>
    </div>

<!--///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////-->
<!-- ADD NEW ARTICLE BUTTON AND MODAL -->
    <div>
      <router-link :to="'newarticle'" id="removeUnderline">
        <button type="button" class="btn btn-primary btn-lg" id="addArticle"><span class="glyphicon glyphicon-plus"></span>
          New Articles
        </button>
      </router-link>
    </div>
  </div>
</template>

<!--///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////-->


<script>

import axios from 'axios'

export default {
  data() {
    return {
      alldata: [],
      current: '',
      myArticles: '',
      editArticleTitle: '',
      editArticleContent: '',
      warning: ''
    }
  },
  methods: {
    getAllData() {
      let config = {
        headers: {'token': localStorage.getItem('token')}
      };

      let self = this;
      axios.get(`http://localhost:3000/articles/`, config)
      .then(function (response){
        self.alldata = response.data
      })
      .catch(function(error){
        console.log(error);
      })
    },
    getMyArticles(authorId) {
      let config = {
        headers: {'token': localStorage.getItem('token')}
      };

      let self = this;
      axios.get(`http://localhost:3000/articles/list/${authorId}`, config)
      .then(function (response){
        self.myArticles = response.data
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
        self.getMyArticles(response.data._id)
      })
      .catch(function(error){
        console.log(error);
      })
    },
    deleteMyArticle(articleId){
      var ask = confirm("Are you sure want to Delete this Article?");
      if(ask == true){
        let config = {
          headers: {'token': localStorage.getItem('token')}
        };

        let self = this;
        axios.delete(`http://localhost:3000/articles/${articleId}`, config)
        .then(function (response){
          //console.log("DELETE SUCCESS", response.data);
          self.getAllData();
          window.location.reload()
        })
        .catch(function(error){
          console.log(error);
        })
      }
    },
    editMyArticle(articleId){
      let config = {
        headers: {'token': localStorage.getItem('token')}
      };

      let self = this;
      if(self.editArticleTitle == '' || self.editArticleContent == ''){
        self.warning = "All fields must be filled to complete the Editing"
      } else {
        axios.put(`http://localhost:3000/articles/${articleId}`, {title: self.editArticleTitle, content: self.editArticleContent}, config)
        .then(function (response){
          self.getAllData();
          window.location.reload()
        })
        .catch(function(error){
          console.log(error);
        })
      }
    }
  },
  mounted() {
    this.getAllData(),
    this.getCurrentUser()
  }
}
</script>

<style>
#logout {
  margin-right: 20px;
  margin-top: 20px;
  float: right;
  border-radius: 6px;
  background-color: white;
  font-weight: 800;
  color: DarkRed;
}

#logout:hover {
  background-color: DarkRed;
  color: white;
}

.threads {
  padding: 20px;
  padding-bottom: 40px;
  border: 1px solid;
  margin-left: 40px;
  margin-right: 40px;
  margin-bottom: 30px;
  box-shadow: 5px 5px 5px #888888;
  border-radius: 10px;
}

.threads:hover {
  padding: 20px;
  padding-bottom: 40px;
  border: 1px solid;
  margin-left: 40px;
  margin-right: 40px;
  margin-bottom: 30px;
  box-shadow: 5px 5px 5px #888888;
  border-radius: 10px;
  background-color: LightBlue;
}

#login-as-who {
  padding: 20px;
  padding-top: 80px;
  color: DarkRed;
  margin-left: 20px;
}

#listArticleBtn {
  margin-top: 30px;
  margin-left: 40px;
  background-color: White;
  border-color: Green;
  margin-bottom: 50px;
  color: Green;
}

#listArticleBtn:hover {
  margin-top: 30px;
  margin-left: 40px;
  background-color: Green;
  border-color: Green;
  margin-bottom: 50px;
  color: White;
}

#addArticle {
  margin-left: 40px;
  background-color: White;
  border-color: DarkRed;
  margin-bottom: 50px;
  color: DarkRed;
}

#addArticle:hover {
  margin-left: 40px;
  background-color: DarkRed;
  border-color: DarkRed;
  margin-bottom: 50px;
  color: White;
}

#del {
  background-color: DarkRed;
  color: white;
  border-radius: 10px;
  float: right;
}

#removeUnderline {
  text-decoration: none;
}

#warning {
  color: red;
  font-size: 1.2em;
  margin-top: 10px;
}

#rapi {
  margin-left: 40px;
}
</style>

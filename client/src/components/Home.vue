<template>
  <div>
    <h3 id="login-as-who"><b>Welcome, {{ current.name }}.</b></h3>

<!--///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////-->
    <!-- Button trigger modal List of My Article -->
    <button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal" id="listArticleBtn" @click="getMyArticles(current._id)"><span class="glyphicon glyphicon-star"></span>
      My Articles
    </button>

    <!-- Modal for List of My Article -->
    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="myModalLabel">My Articles</h4>
          </div>
          <div class="modal-body" v-for="article in myArticles">
            <h4>Title: {{article.title}}</h4>
            <h4>Content: {{article.content}}</h4>
            <!-- <h3>ID: {{article._id}}</h3> -->
            <h5><b><i>Edit Title</i></b></h5>
            <textarea rows="1" cols="78" placeholder="Input edited title here..." v-model="editArticleTitle">
            </textarea><br>
            <h5><b><i>Edit Content</i></b></h5>
            <textarea rows="6" cols="78" placeholder="Input edited content here..." v-model="editArticleContent">
            </textarea><br>
            <button type="button" class="btn btn-primary" @click="editMyArticle(article._id)">Edit This Article</button>
            <button id="del" type="button" class="btn btn-default" data-dismiss="modal" @click="deleteMyArticle(article._id)">Delete This Article</button>

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

    <!-- Button trigger modal New Article -->
    <button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal2" id="addArticle">
      Add New Article
    </button>

    <!-- Modal for New Article -->
    <div class="modal fade" id="myModal2" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="myModalLabel2">New Article</h4>
          </div>
          <div class="modal-body">
            <h4>Title</h4>
            <textarea rows="4" cols="78" placeholder="Input title here..." v-model="newArticleTitle">
            </textarea><br>
            <h4>Content</h4>
            <textarea rows="4" cols="78" placeholder="Input content here..." v-model="newArticleContent">
            </textarea>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" @click="newArticle()">Post Article</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import axios from 'axios'

export default {
  name: 'isi',
  components : {
  },
  data() {
    return {
      alldata: [],
      newArticleTitle: '',
      newArticleContent: '',
      current: '',
      myArticles: '',
      editArticleTitle: '',
      editArticleContent: '',
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
        console.log("RESPONSE 2: ", response);
      })
      .catch(function(error){
        console.log(error);
      })
    },

    newArticle() {
      let self = this;
      axios.post(`http://localhost:3000/articles/`, {title: self.newArticleTitle, content: self.newArticleContent}, {headers: {'token': localStorage.getItem('token')}})
      .then(function (response){
        console.log(response);
        self.getAllData();
        $('#myModal2').modal('hide');
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
        console.log("RESPONSE 1: ", response.data._id);
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
      console.log(articleId);
      let self = this;
      axios.put(`http://localhost:3000/articles/${articleId}`, {title: self.editArticleTitle, content: self.editArticleContent}, config)
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

#login-as-who {
  padding: 20px;
  padding-top: 80px;
  color: DarkRed;
  margin-left: 20px;
}

#addArticle {
  margin-left: 40px;
  background-color: White;
  border-color: DarkRed;
  margin-bottom: 50px;
  margin-top: 30px;
  color: DarkRed;
}

#addArticle:hover {
  margin-left: 40px;
  background-color: DarkRed;
  border-color: DarkRed;
  margin-bottom: 50px;
  margin-top: 30px;
  color: White;
}

#listArticleBtn {
  margin-left: 40px;
  background-color: White;
  border-color: Green;
  margin-bottom: 50px;
  color: Green;
}

#listArticleBtn:hover {
  margin-left: 40px;
  background-color: Green;
  border-color: Green;
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

#rapi {
  margin-left: 40px;
}
</style>

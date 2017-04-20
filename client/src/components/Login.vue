<template>
  <div id="loginpage">
    <center>
    Username:
    <input type="text" v-model="username">
    <br><br>
    Password:
    <input type="password" v-model="password">
    <br>
    <br>
    <button type="submit" @click="login()" id="loginBtn">Login</button>
    <br><br>
    <p id="response">{{ response }}</p>

    <!-- Button trigger modal -->
    <p>Don't have account? Please <a data-toggle="modal" data-target="#myModal">Sign Up</a></p>

    <!-- Modal -->
    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="myModalLabel">Sign Up</h4>
          </div>
          <div class="modal-body">
            Name:<br>
            <textarea rows="2" cols="30" placeholder="Input your username here..." v-model="newName">
            </textarea><br><br>
            Email:<br>
            <textarea rows="2" cols="30" placeholder="Input your username here..." v-model="newEmail">
            </textarea><br><br>
            Username:<br>
            <textarea rows="2" cols="30" placeholder="Input your username here..." v-model="newUsername">
            </textarea><br><br>
            Password:<br>
            <textarea rows="2" cols="30" placeholder="Input your password here..." v-model="newPassword">
            </textarea>
            <br>
            <p style="color: red"><b>{{warning}}</b></p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" @click="signup()">Sign Up</button>
            <br>

          </div>
        </div>
      </div>
    </div>
  </center>
  </div>
</template>


<script>
import axios from 'axios'

export default {
  data() {
    return {
      username: '',
      password: '',
      response: '',
      newName: '',
      newEmail: '',
      newUsername: '',
      newPassword: '',
      warning: ''
    }
  },
  methods: {
      login: function(){
        let self = this;
        axios.post(`http://localhost:3000/login`, {
          username: self.username,
          password: self.password
        })
        .then(function (response){
          if (response.data.success == false) {
            self.response = response.data.msg
            console.log(response);
          } else {
            self.response = response.data
            console.log(response.data);
            self.$emit('login')
            localStorage.setItem('token', response.data)
            window.location = '/#/home'
          }

        })
        .catch(function(error){
          console.log(error);
        })
      },
      signup: function() {
        let self = this;
        if(self.newName == '' || self.newEmail == '' || self.newUsername == '' || self.newPassword == ''){
          self.warning = "Please fill in all fields to complete the Sign Up process."
        } else {
          axios.post(`http://localhost:3000/users`, {
            name: self.newName,
            email: self.newEmail,
            username: self.newUsername,
            password: self.newPassword
          })
          .then(function (){
            $('#myModal').modal('hide');
          })
        }
      }
  }
}
</script>

<style>
 #loginpage {
   margin-top: 200px;
 }

 #loginBtn {
   border-radius: 6px;
   background-color: white;
   color: DarkRed;
   font-weight: 800;
   padding: 10px 20px;
 }

 #loginBtn:hover {
   background-color: DarkRed;
   color: white;
 }

 #response {
   color: red;
 }
</style>

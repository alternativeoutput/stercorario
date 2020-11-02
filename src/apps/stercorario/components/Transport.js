import { cl } from '../../../core/common/Utils'
import * as jQuery from 'jquery'
import Cookies from 'js-cookie'

function csrfSafeMethod(method) {
  // these HTTP methods do not require CSRF protection
  return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}






class Transport {
  constructor(cb)
  {
    this.django_pfx = '/chat'
  
    this.chat_socket = null;
    this.cb = cb.bind(this)
    this.proof_success_cb = this.proof_success_cb.bind(this)
    this.proof_error_cb = this.proof_error_cb.bind(this)
    this.login_success_cb = this.login_success_cb.bind(this)
    this.logout_success_cb = this.logout_success_cb.bind(this)

    this.logout = this.logout.bind(this)

    $.ajaxSetup({
      crossDomain: false, // obviates need for sameOrigin test
      beforeSend: function(xhr, settings) {
        if (!csrfSafeMethod(settings.type)) {
          xhr.setRequestHeader("X-CSRFToken", Cookies.get('csrftoken'));
        }
        xhr.setRequestHeader("x-csrf-token", "fetch");
      }
    })
  }

  chan_name_set(chan_name)
  {
    this.chan_name = chan_name
  }
  
  proof_success_cb(content, y, xhr)
  {
    this.cb('proof1', content)

    if (content.is_auth) {
      this.start(content.table);
    }
  }

  proof_error_cb(content, y, xhr)
  {
    this.cb('proof2', {is_initialized: true, is_auth: false})
  }
  
  proof()
  {
    cl('proof common')
    $.ajax({
      type: "POST",
      url: this.django_pfx + "/proof/",
      success: this.proof_success_cb,
      error: this.proof_error_cb})
  }

  login_success_cb(content, y, xhr)
  {
    console.log('login_success_cb')
    console.log(content.table)
    this.cb('login', content)

    if (content.is_auth) {
      this.start(content.table);
    }
  }
  
  login(user, passwd, table) {
    let login_success_cb = this.login_success_cb.bind()
    console.log('mirri: ' + table)
    $.ajax({
      type: "POST",
      cache: 'FALSE',
      error: function() {
        console.log('error fired');
      },
      statusCode: {
        302: function() {
          console.log( "page redir" );
          return(false);
        }
      },
      // url: "//127.0.0.1:9000/chat/login/",
      url: this.django_pfx + "/login/",
      data: {username: user,
             password: passwd,
             table: table},
      success: login_success_cb
    });
  }

  logout_success_cb(content, y, xhr)
  {
    // if (chatSocket) {
    //   this.chat_socket.onclose = null;
    //   this.chat_socket.close();
    //   this.chat_socket = null;
    // }
    this.cb('logout4', {is_auth: false})
    console.log('logout_success_cb');
  }
  
  logout(e) {
    let logout_success_cb = this.logout_success_cb.bind()
    let JSON = window.JSON

    console.log('logout_cb common');
    $.ajax({
      type: "GET",
      // url: "//127.0.0.1:9000/chat/logout/",
      url: this.django_pfx + "/logout/",
      success: logout_success_cb});
    
    if (this.chat_socket != null) {
      this.chat_socket.send(JSON.stringify({
        'type': 'logout'
      }));
    }
  }
    

  start(chan_name)
  {
    var url = window.location.href
    var arr = url.split("/")
    var ws_proto = 'ws'
    let JSON = window.JSON
    
    if (arr[0] == 'https:')
      ws_proto = 'wss';

    this.chan_name_set(chan_name)

    this.chat_socket = new WebSocket(
      ws_proto + '://' + window.location.host +
        '/ws/chat/' + this.chan_name + '/')
    
    this.chat_socket.onmessage = function(e) {
      cl('Received')
      var data = JSON.parse(e.data);
      let user = data['username']
      var message = data['message'];
      var lis = document.querySelector('#chat-log');
      if (lis != undefined)
        lis.value += (user + ': ' + message + '\n');
    };
  
    this.chat_socket.onclose = function(e) {
      console.error('Chat socket closed unexpectedly')
    };
  }

  restart()
  {
    this.chat_socket.close();
    this.start()
  }

  send(msg)
  {
    console.log('send')
    console.log(msg)
    this.chat_socket.send(msg)
  }


      // function check_ajax_success_cb(content, b, c) {
      // console.log("check_ajax_success_cb");
      // $("div[name='check-ajax-res']").html(
      // content.is_auth == true ? "IS AUTH" : "IS NOT AUTH");
      // }
    
      // function check_ajax_cb(e) {
      // $("div[name='check-ajax-res']").html("TO BE SET");
      // var $form = $("form[name='form-check-ajax']");
      // $.ajax({
      // type: "POST",
      // cache: 'FALSE',
      // error: function() {
      // console.log('error fired');
      // },
      // statusCode: {
      // 302: function() {
      // console.log( "page redir" );
      // return(false);
      // }
      // },
      // url: "/chat/check_ajax/",
      // success: check_ajax_success_cb
      // });
      // }
      // }
  

  
}

export default Transport

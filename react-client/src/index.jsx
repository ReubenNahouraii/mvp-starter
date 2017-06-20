import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Login from './components/Login.jsx';
import User from './components/User.jsx';
import Nav  from './components/Nav.jsx';
import Topics  from './components/Topics.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
      items: [],
      page: 'Login',
      links: {
        showLogin: true,
        showLogout: false,
      },
      showLogin: true,
      showUser: false,
      showTopics: false,
      userInfo: null
    }
  }

  hitDatabase(url, data, method = 'GET') {
    if(method === 'POST') {
      data = JSON.stringify(data);
    }

    return new Promise((resolve, reject) => {
      $.ajax({
        url: url,
        method: method,
        data: data,
        contentType: 'application/json',
        dataType: 'json',
        success: (data) => {
          console.log(data);
          resolve(data);
        },
        error: (err) => {
          console.log('err', err);
          reject(err)
        }
      });
    });
  }

  componentDidMount() {

  }

  login(event, username) {
    // debugger;
    event.preventDefault();

    this.hitDatabase('/login', {username})
      .then(response => {
        // debugger;
        if(!response.name) { // no user let's signup
          return this.hitDatabase('/signup', {username}, 'POST');
        } else { // there is a username, get username stuff
          console.log('user exists, response should have the goods');
          throw response;
        }
      })
      .then(response => { // user has just signed up
        throw response;
      })
      .catch(userInfo => {

        // user is logged in
        this.setState({
          loggedIn: true,
          page: 'Converse Sated',
          links: {
            showLogin: !this.state.loggedIn,
            showLogout: this.state.loggedIn
          },
          showLogin: false,
          showUser: true,
          userInfo: userInfo
        }, this.updateShowLogin);

        console.log('response caught');

      });

    console.log('need to login', username);
  }

  navigate(event) {
    // debugger;
    let link = event.target.innerHTML;

    if(link.match(/login/)) {
      this.setState({
        page: 'Login',
        showTopics: false,
        showLogin: true
      }, this.updateShowLogin);
      console.log('login clicked');
    } else if(link.match(/logout/)) {

      // debugger;
      this.setState({
        loggedIn: false,
        page: 'Login',
        showUser: false,
        showLogin: true,
        showTopics: false
      }, this.updateShowLogin);
      console.log('logout clicked');
    } else if(link.match(/topics/)) {
      this.setState({
        page: 'Topics',
        showUser: false,
        showLogin: false,
        showTopics: true
      }, this.updateShowLogin);
    }

  }

  updateShowLogin() {
    this.setState({
      links: {
          showLogin: !this.state.loggedIn,
          showLogout: this.state.loggedIn
        }
    });
  }
  render () {
    return (
      <div>
        <Nav click={this.navigate.bind(this)} page={this.state.page} links={this.state.links} />
        <Login click={this.login.bind(this)} show={this.state.showLogin} />
        <User show={this.state.showUser} info={this.state.userInfo} />
        <Topics show={this.state.showTopics} db={this.hitDatabase} />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
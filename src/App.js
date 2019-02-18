import React, { Component } from 'react';
import './App.css';
import newimg from './new.jpg';
import icon from './icon.png';

class App extends Component {
  checkTime() {
    let dingTime = new Date(2019, 1, 18, 16, 0, 0);
    let nowTime = new Date();
    if (nowTime >= dingTime) {
      console.log('dingdingdingggg');
      this.handleNotify();
    } else {
      console.log('not yet');
      setTimeout(()=> this.checkTime(), 1000);
    }
  }
  componentDidMount() {
    if (Notification && Notification.permission === 'default') {
      Notification.requestPermission(function (permission) {
        if (!('permission' in Notification)) {
          Notification.permission = permission;
        }
      });
    }
    this.checkTime();
    // setTimeout(this.handleNotify, 3000);
  }
  handleNotify = (e) => {
    function sendNotification(text) {
      let notification = new Notification('Reminder:', {
        icon: icon,
        image: newimg,
        body: text,
        tag: 'DingDing',
      });
      notification.onclick = function(e) {
        e.preventDefault();
        window.focus();
        this.close();
      }
    }
    if (Notification.permission === 'granted') {
      let text = 'Time to workout!';
      sendNotification(text);
    }
    
  }
  render() {
    return (
      <div className="App">
        <button onClick={this.handleNotify}>Notify</button>
      </div>
    );
  }
}

export default App;

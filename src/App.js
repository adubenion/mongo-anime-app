import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { ToWatch } from './To-Watch';
import { Watched } from './Watched';
import { Add } from './Add';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toWatch: [],
      watched: [],
      add: ''
    }
    this.updateText = this.updateText.bind(this);
    this.submitAnime = this.submitAnime.bind(this);
    this.labelWatched = this.labelWatched.bind(this);
    this.updatetoWatch = this.updatetoWatch.bind(this);
    this.updateWatched = this.updateWatched.bind(this);
    this.deleteWatch = this.deleteWatch.bind(this);
    this.deleteWatched = this.deleteWatched.bind(this);
  }
  componentDidMount() {
    console.log(this.state)
    fetch('http://localhost:3001/api/toWatch')
    .then((result, err) => {
      if (!undefined && !null) {
        console.log(result)
        return result.json()
      } else {
        throw err
      }
    })
    .then((resultJson, err) => {
      if (!undefined && !null) {
        this.setState({
          toWatch: resultJson
        })
        console.log('initial state: ', this.state.toWatch)
      }
    })
    fetch('http://localhost:3001/api/watched')
    .then((result, err) => {
      if (!undefined && !null) {
        console.log(result)
        return result.json()
      } else {
        throw err
      }
    })
    .then((resultJson, err) => {
      if (!undefined && !null) {
        this.setState({
          watched: resultJson
        })
        console.log('initial state: ', this.state.watched)
      }
    })
  }

  componentDidUpdate() {
    console.log('Updated (LifeCycle)')
  }

  updateText(i) {
      this.setState({
        add: i.target.value
      })
  }

  labelWatched(i) {
    console.log(i.name)
    fetch('http://localhost:3001/api/switch', {
      method: 'put',
      headers: new Headers({
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }),
      body: JSON.stringify({
        name: i.name
      })
    })
    .then(this.updateWatched)
    .then(this.updatetoWatch)
  }

  updatetoWatch() {
    fetch('http://localhost:3001/api/toWatch')
    .then((result, err) => {
      if (!err && !null && !undefined) {
        return result.json()
      } else {
        console.log('error:', err)
      }
    })
    .then(resultJson => {
      if (this.state.towatch !== resultJson) {
        this.setState({
        toWatch: resultJson
      })
        console.log('updated state: ', this.state.toWatch)
      }
    })
  }

  updateWatched() {
    fetch('http://localhost:3001/api/watched')
    .then((result, err) => {
      if (!err && !null && !undefined) {
        return result.json()
      } else {
        throw err
      }
    })
    .then(resultJson => {
      this.setState({
        watched: resultJson
      })
      console.log('updated state: ', this.state.watched)
    })
  }

  submitAnime(i) {
    i.preventDefault();
    var newAnime = this.state.add
    fetch('http://localhost:3001/api/toWatch/add', {
      method: 'post',
      headers: new Headers({
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }),
      body: JSON.stringify({
        name: newAnime
      })
    })
    .then(this.updatetoWatch)
  }

  deleteWatch(anime) {
    console.log('deleted item: ', anime)
    fetch('http://localhost:3001/api/toWatch/delete', {
      method: 'delete',
      headers: new Headers({
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }),
      body: JSON.stringify({
        anime
      })
    })
    .then(this.updatetoWatch)
  }

  deleteWatched(anime) {
    console.log('deleted item: ', anime)
    fetch('http://localhost:3001/api/watched/delete', {
      method: 'delete',
      headers: new Headers({
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }),
      body: JSON.stringify({
        anime
      })
    })
    .then(this.updateWatched)
  }

  render() {
    return(
      <div>
        <h1>My Anime List</h1>
          <Add textInput={this.updateText} value={this.state.add} submit={this.submitAnime} />
          <ToWatch list={this.state.toWatch} delete={this.deleteWatch} done={this.labelWatched} />
          <Watched list={this.state.watched} delete={this.deleteWatched} />
      </div>
    );
  }
}

export default App;
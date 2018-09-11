import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank'
import 'tachyons'
import Particles from 'react-particles-js';



const params = {
  "particles": {
    "number": {
      "value": 180,
      "density": {
        "enable": false,
        "value_area": 800
      }
    },
    "color": {
      "value": "#ffffff"
    },
    "shape":{
      "type": "star"
    },
    "size":{
      "value": 5,
      "random": true
    }
  }
}

const initialState ={
    input:'',
    imageURL:'',
    box:[],
    route:'signin',
    isLoggedIn: false,
    user: {
      id: '',
      name: '',
      email: '',
      entries: 0,
      joindata: ''
    }
}

class App extends Component {
  constructor(){
    super();
    this.state=initialState;
  }

  calcFaceLocation = (data) =>{
    const regionsArray = data.outputs[0].data.regions;
    const clarifaiFaceArray = regionsArray.map(region =>{
      return region.region_info.bounding_box;
    })
    const image = document.getElementById('inputImage');
    const height = Number(image.height);
    const width = Number(image.width);

    return clarifaiFaceArray.map(clarifaiFace =>{
    return{
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
      }
    });
  }

  displayFaceBox = (box) =>{
    this.setState({ box: box })
  }

  onInputChange = (event) =>{
    this.setState({ input: event.target.value });
  }

  onImageSubmit = () =>{
    this.setState({ imageURL: this.state.input })
    fetch('http://localhost:3000/imageurl',{
      method:'post',
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify({
        input: this.state.input
      })
    })
    .then(response => response.json())
    .then(response => { 
      if(response){
        fetch('http://localhost:3000/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
        .then(resp => resp.json())
        .then(count => this.setState(Object.assign(this.state.user, {entries: count} )))
        .catch(err=>{ console.log(err) })
      }
      this.displayFaceBox(this.calcFaceLocation(response)) 
    })
    .catch(err => console.log(err));
  }

  onRouteChange = (route) =>{
    this.setState({route: route});
    if(route === 'home'){
      this.setState({isLoggedIn: true})
    } else if(route === 'logout') {
      this.setState(initialState);
    }
  }

  loadUser = (user) =>{
    const {id, name, email, entries, joindata} = user;
    this.setState({
      user:{
        id: id,
        name: name,
        email: email,
        entries: entries,
        joindata: joindata
      }
    })
  }
  render() {
    const { isLoggedIn, box, imageURL, route } = this.state;
    return (
      <div className="App">
        <Particles className='particles' params={params}/>
        <Navigation routeChange={ this.onRouteChange } isLoggedIn={isLoggedIn} />
        {
          route ==='home'
          ? <div>
              <Logo />
              <Rank name={ this.state.user.name } entries={ this.state.user.entries } />
              <ImageLinkForm 
                onInputChange={ this.onInputChange }
                onImageSubmit={ this.onImageSubmit }
              />
              <FaceRecognition boxes={ box } imageURL={ imageURL }/>
            </div>
          : ( route === 'signin'
            ? <Signin routeChange={ this.onRouteChange } loadUser={ this.loadUser } />
            : <Register routeChange={ this.onRouteChange } loadUser={ this.loadUser } />
          )
        }
      </div>
    );
  }
}

export default App;

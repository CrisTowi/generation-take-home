// Libraries imports
import React, { Component } from 'react';
import axios                from 'axios';

// Custom Components
import GoogleMaps from './components/GoogleMaps';
import FavStories from './components/FavStories';

export default class YourComponent extends Component {
  // Constructor function that is called at first
  constructor(props) {
    super(props);

    // Initialize state object literal
    this.state = {
      data: null,
      favStories: []
    };

    // Define "local" functions and binding "this" context
    this._onClickMarker = this._onClickMarker.bind(this);
    this._onClickFav    = this._onClickFav.bind(this);
  }

  _onClickMarker(markerData) {
    let existsInFavs = false;

    // Ask for some element on the favorite list that is the same of the marker clicked
    this.state.favStories.forEach((element, index) => {
      if (markerData.Name == element.Name) {
        existsInFavs = true;
      }
    });    

    // If history doesn't exists
    if (!existsInFavs) {
      // Ask for confirmation to add favorite story to the list
      if (confirm('Are ypu sure you want to add this story?')) {

        // Add the element to the list of favorites and update state
        this.state.favStories.push(markerData);
        this.setState({
          favStories: this.state.favStories
        });
      }
    }

  }

  _onClickFav(favData) {
    // Ask for confirmation to remove favorite story from the list
    if (confirm('Are ypu sure you want to remove this story?')) {
      let indexToRemove = 0;

      // Looking for the index of the object to remove
      this.state.favStories.forEach((element, index) => { 
        if (favData.Name == element.Name) {
          indexToRemove = index;
        }
      });

      // Remove element from index and update state
      this.state.favStories.splice(indexToRemove, 1);
      this.setState({
        favStories: this.state.favStories
      });
    }
  }

  componentDidMount() {
    // API GET call to file and getting
    // content of JSON file
    axios.get('../store_directory.json')
      // When we get data call a function with the response
      .then(response => {
        this.setState({
          data: response.data
        });
      });
  }

  render() {
    return (
      <section style={{ marginLeft: '20px', marginRight: '20px' }}>
        <h1>{"Generation's Stories"}</h1>
        <h3>{'What is happening near you! (Click the stories in red to add to favorite stories)'}</h3>
        <div className={'row'} style={{height: "600px", marginBottom: '150px'}}>
          <div className={'col-md-8'}>
            <GoogleMaps
              onClickMarker={this._onClickMarker}
              markersData={this.state.data}
            />
          </div>
          <div className={'col-md-4'}>
            <FavStories
              onClick={this._onClickFav}
              data={this.state.favStories}/>
          </div>
        </div>
      </section>
    );
  }
}
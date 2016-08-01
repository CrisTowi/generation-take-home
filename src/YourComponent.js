import React, { Component } from 'react';
import axios                from 'axios';

import GoogleMaps from './components/GoogleMaps';
import FavStories from './components/FavStories';

export default class YourComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      favStories: []
    };

    this._onClickMarker = this._onClickMarker.bind(this);
    this._onClickFav    = this._onClickFav.bind(this);
  }

  _onClickMarker(markerData) {
    let existsInFavs = false;

    this.state.favStories.forEach((element, index) => {
      if (markerData.Name == element.Name) {
        existsInFavs = true;
      }
    });    

    if (!existsInFavs) {
      if (confirm('Are ypu sure you want to add this storie?')) {
        this.state.favStories.push(markerData);

        this.setState({
          favStories: this.state.favStories
        });
      }
    }

  }

  _onClickFav(favData) {
    if (confirm('Are ypu sure you want to remove this storie?')) {
      let indexToRemove = 0;

      this.state.favStories.forEach((element, index) => {
        if (favData.Name == element.Name) {
          indexToRemove = index;
        }
      });

      this.state.favStories.splice(indexToRemove, 1);
      this.setState({
        favStories: this.state.favStories
      });
    }
  }

  componentDidMount() {
    axios.get('../store_directory.json')
      .then(response => {
        this.setState({
          data: response.data
        });
      });
  }

  render() {
    let props = this.props;

    return (
      <section style={{height: "600px", display: 'flex', marginBottom: '150px'}}>
        <div style={{width: '80%'}}>
          <GoogleMaps
            onClickMarker={this._onClickMarker}
            markersData={this.state.data}
          />
        </div>
        <div style={{width: '20%'}}>
          <FavStories
            onClick={this._onClickFav}
            data={this.state.favStories}/>
        </div>
      </section>
    );
  }
}
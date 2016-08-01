import React    from 'react';
import ReactDOM from 'react-dom';

import Marker   from './Marker';

export default class GoogleMaps extends React.Component {
  constructor(props) {
    super(props)

    this.state = {};

    this._onClickMarker = this._onClickMarker.bind(this);
  }

  _onClickMarker(markerData) {
    this.map.setCenter(new google.maps.LatLng(markerData.coords.lat, markerData.coords.lng));

    this.props.onClickMarker(markerData);
  }

  componentDidMount() {
    var mapOptions = {
      center: new google.maps.LatLng(19.4238623, -99.1754808),
      zoom:15,
      disableDefaultUI: true,
      mapTypeId:google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(ReactDOM.findDOMNode(this), mapOptions);

    if (!this.props.coords) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          this.map.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude))
        });
      }
    }
  }

  render() {
    let props   = this.props;
    let markers; 
    if (this.props.markersData) {
      markers = this.props.markersData.map((element, index) => {
        return (
          <Marker
            key={'marker-' + index}
            onClick={this._onClickMarker}
            map={this.map}
            data={element}
          />
        );
      });
    }

    return (
      <div style={{...this.props.style, height: '600px'}}>
        {markers}
      </div>
    );
  }
}

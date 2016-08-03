// Libraries imports
import React    from 'react';
import ReactDOM from 'react-dom';

// Custom Components
import Marker   from './Marker';

export default class GoogleMaps extends React.Component {
  constructor(props) {
    super(props)

    // Set initial state
    this.state = {};

    // Define "local" functions and binding "this" context
    this._onClickMarker = this._onClickMarker.bind(this);
  }

  _onClickMarker(markerData) {
    this.map.setCenter(new google.maps.LatLng(markerData.coords.lat, markerData.coords.lng));

    this.props.onClickMarker(markerData);
  }

  componentDidMount() {
    // Setting default options to create map
    var mapOptions = {
      center: new google.maps.LatLng(19.4238623, -99.1754808),
      zoom:15,
      disableDefaultUI: true,
      mapTypeId:google.maps.MapTypeId.ROADMAP
    };

    // Initialize map object from Google Maps API
    this.map = new google.maps.Map(ReactDOM.findDOMNode(this), mapOptions);

    // If there is not coords by default get user geolocation
    if (!this.props.coords) {
      if (navigator.geolocation) {
        // Get geolocation and receive position from callback
        navigator.geolocation.getCurrentPosition(position => {
          var pinColor = "2E2EFE";
          var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
              new google.maps.Size(21, 34),
              new google.maps.Point(0,0),
              new google.maps.Point(10, 34));

          this.userLocation = new google.maps.Marker({
            position: {lat: position.coords.latitude, lng: position.coords.longitude},
            map: this.map,
            icon: pinImage,
            title: 'Your location'
          });


          this.map.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
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

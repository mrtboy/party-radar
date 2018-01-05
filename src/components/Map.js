import React from 'react';
import { connect } from 'react-redux';
import { initMap } from '../actions/map';

class Map extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      map: {},
      lat: props.event ? props.event.geolocation.lat : 48.858608,
      lng: props.event ? props.event.geolocation.lng : 2.294471,
    };

  }

  componentDidMount() {
    let self = this;
    loadScript(
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyBydgZ_6S3Gq5F7xFGf_s1t_nob1M5Vy_M&libraries=places",
      function () {

        self.map = new google.maps.Map(self.refs.map, { center: { lat: this.state.lat, lng: this.state.lng }, zoom: 15 });
        this.setState(() => ({ map: self.map }));

        let pos = {
          lat: this.state.lat,
          lng: this.state.lng
        };

        createMarker(pos);
      }.bind(this));

    function createMarker(place) {
      let markerOptions = {
        position: place,
        map: self.map,
        clickable: true
      };

      let marker = new google.maps.Marker(markerOptions);

      let infoWindow = new google.maps.InfoWindow({
        // content: this.props.event.title
      });

      marker.addListener('click', function () {
        infoWindow.open(self.map, marker);
      });
    }
  }

  componentDidUpdate() {

    if (!this.props.event) {
      this.getCurrenctLocation();
    }

    this.props.initMap(this.map);
  }

  componentWillUnmount() {
    window.google = {};
  }
  getCurrenctLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        this.state.map.setCenter(pos);
      });
    }
  }

  render() {
    return (
      <div >
        <div ref="map" className="map"><img src="/images/loader.gif" /></div>
      </div>
    );
  }
}


const mapDispatchToProps = (dispatch) => ({
  initMap: (map) => dispatch(initMap(map))
});

export default connect(undefined, mapDispatchToProps)(Map);


// export default Map;

function loadScript(url, callback) {
  // Adding the script tag to the head as suggested before
  var head = document.getElementsByTagName('head')[0];
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = url;

  // Then bind the event to the callback function.
  // There are several events for cross browser compatibility.
  script.onreadystatechange = callback;
  script.onload = callback;

  // Fire the loading
  head.appendChild(script);
}
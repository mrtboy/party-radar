import React from 'react';
import { connect } from 'react-redux';
import { initMap, setLocation , getLocation} from '../actions/map';

class Map extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      map: {},
      geolocation: {
        lat: props.event ? props.event.geolocation.lat : 48.858608,
        lng: props.event ? props.event.geolocation.lng : 2.294471,
      },
      place_id: props.event ? props.event.place_id : '',
      address: props.event ? props.event.address : '',
      locationName: props.event ? props.event.locationName : '',
    };

  }

  autoComplete = () => {
    let map = this.state.map;
    let autocomplete = {};

    let infowindowContent = document.getElementById('infowindow-content');
    let input = document.getElementById('pac-input');

    autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', map);

    // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    let infowindow = new google.maps.InfoWindow();

    infowindow.setContent(infowindowContent);
    let marker = new google.maps.Marker({
      map: map
    });
    marker.addListener('click', function () {
      infowindow.open(map, marker);
    });

    autocomplete.addListener('place_changed', function () {
      infowindow.close();
      var place = autocomplete.getPlace();
      if (!place.geometry) {
        return;
      }
      this.props.setLocation(
        {
          address: place.formatted_address,
          locationName: place.name,
          place_id: place.place_id,
          geolocation: {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
          }
        })

      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);
      }

      // Set the position of the marker using the place ID and location.
      marker.setPlace({
        placeId: place.place_id,
        location: place.geometry.location
      });
      marker.setVisible(true);
      this.setState(() => {
        return {
          locationName: place.name,
          place_id: place.place_id,
          address: place.formatted_address,
          geolocation: {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
          }
        }
      });
    }.bind(this));

  }

  componentDidMount() {
    let self = this;
    loadScript(
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyBydgZ_6S3Gq5F7xFGf_s1t_nob1M5Vy_M&libraries=places",
      function () {

        self.map = new google.maps.Map(self.refs.map, { center: { lat: this.state.geolocation.lat, lng: this.state.geolocation.lng }, zoom: 15 });
        this.setState(() => ({ map: self.map }));

        let geolocation = {
          lat: this.state.geolocation.lat,
          lng: this.state.geolocation.lng
        };

        createMarker(geolocation);
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
    this.getCurrenctLocation();
    this.autoComplete();
    // this.props.initMap(this.map);
  }

  componentWillUnmount() {
    let map = this.state.map;
    this.props.initMap({});
    window.google = {};
  }

  getCurrenctLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        this.setState(() => ({ geolocation: pos }));
        this.state.map.setCenter(pos);
        this.props.getLocation(pos);

      });
     
    }
  }



  onAddressChange = (e) => {
    const address = e.target.value;
    this.setState(() => ({ address }));
  }

  render() {
    return (
      <div >
        {this.props.autoComplete && <input type="text"
          className="text-input"
          placeholder="Address"
          onChange={this.onAddressChange}
          value={this.state.address}
          id="pac-input" />}
        <div ref="map" className="map"><img src="/images/loader.gif" /></div>
      </div>
    );
  }
}


const mapDispatchToProps = (dispatch) => ({
  initMap: (map) => dispatch(initMap(map)),
  setLocation: ({ address, locationName, place_id, geolocation}) =>
    dispatch(setLocation({ address, locationName, place_id, geolocation })),
  getLocation: (geolocation) => dispatch(getLocation(geolocation))
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
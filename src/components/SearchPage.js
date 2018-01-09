import React from 'react';
import Map from './Map';
import { connect } from 'react-redux';

class SearchPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      markers: [],
      search: ''
    };

    this.getMyLocation = this.getMyLocation.bind(this);
    this.createMarker = this.createMarker.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  createMarker(place) {
    let markerOptions = {
      position: place,
      map: this.props.map.map,
      clickable: true
    };
    let marker = new google.maps.Marker(markerOptions);

    this.setState(prevState => ({
      markers: [...prevState.markers, marker]
    }));

    let infoWindow = new google.maps.InfoWindow({
      content: `${this.state.lat}`
    });

    marker.addListener('click', function () {
      infoWindow.open(this.map, marker);
    });
  }

  getMyLocation() {
    var map = this.props.map.map;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        map.setCenter(pos);
        this.createMarker(pos);

      });
    }
  }


  onSearchChange(e) {
    const search = e.target.value;
    this.setState(() => ({ search }));
  }

  onSubmit = (e) => {
    let map = this.props.map.map
    e.preventDefault();

    var script = document.createElement('script');
    script.src = "./data.json"
    document.getElementsByTagName('head')[0].appendChild(script);

    window.eqfeed_callback = function(results) {
      for (var i = 0; i < results.features.length; i++) {
        var coords = results.features[i].geometry.coordinates;
        var latLng = new google.maps.LatLng(coords[1],coords[0]);
        var marker = new google.maps.Marker({
          position: latLng,
          map: map
        });
      }
    }
  };

  render() {
    return (
      <div className="content-container">
        
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            value={this.state.search}
            placeholder="Search Event"
            onChange={this.onSearchChange} />
          <button onClick={this.onSrachClickHangle}>Search</button>
        </form>
        <button onClick={this.getMyLocation}>My Location</button>
        
        <Map info={this.map}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  map: state.map
});



export default connect(mapStateToProps)(SearchPage);
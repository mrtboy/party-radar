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

  panToArcDeTriomphe() {
    this.props.map.map.setCenter({ lat: 48.873947, lng: 2.295038 });
    this.setState(() => ({ lat: 48.873947, lng: 2.295038 }));
    this.createMarker({ lat: 48.873947, lng: 2.295038 });
  }

  onSearchChange(e) {
    const search = e.target.value;
    this.setState(() => ({ search }));
  }

  onSubmit = (e) => {
    e.preventDefault();
    var outerCoords = [
      { lat: -32.364, lng: 153.207 }, // north west
      { lat: -35.364, lng: 153.207 }, // south west
      { lat: -35.364, lng: 158.207 }, // south east
      { lat: -32.364, lng: 158.207 }  // north east
    ];

    // Define the LatLng coordinates for an inner path.
    var innerCoords1 = [
      { lat: -33.364, lng: 154.207 },
      { lat: -34.364, lng: 154.207 },
      { lat: -34.364, lng: 155.207 },
      { lat: -33.364, lng: 155.207 }
    ];

    // Define the LatLng coordinates for another inner path.
    var innerCoords2 = [
      { lat: -33.364, lng: 156.207 },
      { lat: -34.364, lng: 156.207 },
      { lat: -34.364, lng: 157.207 },
      { lat: -33.364, lng: 157.207 }
    ];

    this.map.data.add({
      geometry: new google.maps.Data.Polygon([outerCoords,
        innerCoords1,
        innerCoords2])
    })

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
          <button>Search</button>
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
import uuid from 'uuid';


//Add
export const addEvent = (
  {
  title= '',
  startDate= 0,
  endDate= 0,
  startTime= 0,
  endTime= 0,
  createdAt= 0,
  type= '',
  description= '',
  themeClothes= '',
  place_Id='',
  address='',
  locationName= '',
  geolocataion={}

  }= {}
) => ({
  type: 'ADD_EVENT',
  event: {
    id: uuid(),
    title,
    startDate,
    endDate,
    startTime,
    endTime,
    createdAt,
    type,
    description,
    themeClothes,
    place_Id,
    address,
    locationName,
    geolocataion
  }
});


export const removeEvent = ({id}={}) => ({
  type: 'REMOVE_EVENT',
  id
});

export const editEvent = (id, updates) => ({
  type: 'EDIT_EVENT',
  id,
  updates
});

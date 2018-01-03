import uuid from 'uuid';
import database from '../firebase/firebase';
import moment from 'moment';
//Add
export const addEvent = ({event} = {}
) => ({
  type: 'ADD_EVENT',
  event
});

export const addEventTodb = (eventData = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const {
      title = '',
      createdAt = 0,
      type = '',
      startDate=0,
      endDate=0,
      startTime=0,
      endTime=0,
      description = '',
      themeClothes = '',
      place_id = '',
      address = '',
      locationName = '',
      geolocation = {}
    } = eventData;
    const event = {
      title,
      createdAt,
      type,
      startDate,
      endDate,
      startTime,
      endTime,
      description,
      themeClothes,
      place_id,
      address,
      locationName,
      geolocation
    };
    return database.ref(`users/${uid}/events`).push(event)
      .then((ref) => {
        dispatch(addEvent({
          id: ref.key,
          ...event
        }));
      });
  };
};

export const removeEvent = ({ id } = {}) => ({
  type: 'REMOVE_EVENT',
  id
});

export const removeEventFromdb = (({id} = {}) => {
 
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/events/${id}`).remove().then(() => {
      dispatch(removeEvent({id}));
    });
  }
});

export const editEvent = (id, updates) => ({
  type: 'EDIT_EVENT',
  id,
  updates
});

export const editEventFromdb = (id, update) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/events/${id}`).update(update).then(()=>{
      dispatch(editEvent(id, update));
    }); 
  };
};

export const setEvents = (events) => ({
  type: 'SET_EVENTS',
  events
});

export const setEventsTodb = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/events`).once('value').then((snapshot) => {
      const events = [];
    
      snapshot.forEach((childSnapshot) => {
        events.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        });
      });

      dispatch(setEvents(events));
    });
  }
};

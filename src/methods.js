const axios = require("axios");
const moment = require("moment");
export const getUserFromLocalStorage = () => {
  return localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
};

export const getEvents = (jwt, onSuccess, onError) => {
  axios
    .get("http://localhost:4000/events", {
      headers: {
        authorization: `Bearer ${jwt}`
      }
    })
    .then(result => {
      onSuccess(result.data);
    })
    .catch(err => {
      console.error(err);
      if (onError) onError(err);
    });
};
export const performDeleteEventRequest = (event_id, onSuccess, onError) => {
  axios
    .post("http://localhost:4000/delete-event", {
      event_id: event_id
    })
    .then(result => {
      if (onSuccess) onSuccess(result);
    })
    .catch(err => {
      if (onError) onError(err);
    });
};
export const performEditEventRequest = (
  event_id,
  date,
  title,
  description,
  completed,
  onSuccess,
  onError
) => {
  axios
    .post("http://localhost:4000/update-event", {
      event_id: event_id,
      date: moment(date).format("YYYY-MM-DD HH:mm:ss"),
      title: title,
      description: description,
      completed: completed
    })
    .then(result => {
      if (onSuccess) onSuccess(result);
    })
    .catch(err => {
      if (onError) onError(err);
    });
};
export const performAddEventRequest = (
  jwt,
  date,
  title,
  description,
  completed,
  onSuccess,
  onError
) => {
  axios
    .post("http://localhost:4000/events", {
      headers: {
        authorization: `Bearer ${jwt}`
      },
      date: moment(date).format("YYYY-MM-DD HH:mm:ss"),
      title: title,
      description: description,
      completed: completed
    })
    .then(result => {
      if (onSuccess) onSuccess(result);
    })
    .catch(err => {
      if (onError) onError(err);
    });
};

export const filterEventsByDate = (date, eventsList) => {
  date = moment(date);
  let newEventsList = [];
  eventsList.forEach(event => {
    if (moment(event.date).isSame(date, "day")) {
      newEventsList.push(event);
    }
  });
  return newEventsList;
};

export const createGraphDataForEvents = (from, to, events, user_id) => {
  from = moment(from);
  to = moment(to);
  let countList = {};
  console.log(from);
  events.forEach(event => {
    if (user_id) {
      if (event.user_id != user_id) return;
    }
    let eventDate = moment(event.date);
    if (eventDate.isBefore(from) || eventDate.isAfter(to)) {
      return;
    }
    let mappedDateString = eventDate.startOf("day").format();
    if (countList[mappedDateString]) {
      countList[mappedDateString] += 1;
    } else {
      countList[mappedDateString] = 1;
    }
  });
  countList = Object.entries(countList);
  let newList = [];
  countList.forEach(entry => {
    console.log(entry);
    newList.push({
      date: moment(entry[0]).format("Do MMM"),
      count: entry[1]
    });
  });
  return newList;
};

export const getAllEvents = (onSuccess, onError) => {
  axios
    .post("http://localhost:4000/all-events")
    .then(result => {
      console.log(result);
      onSuccess(result.data);
    })
    .catch(err => {
      console.log(err);
      onError(err);
    });
};

export const getAllUsers = (onSuccess, onError) => {
  axios
    .post("http://localhost:4000/all-users")
    .then(result => {
      onSuccess(result.data);
    })
    .catch(err => {
      onError(err);
    });
};

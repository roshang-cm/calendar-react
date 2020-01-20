const axios = require("axios");
const moment = require("moment");

//LocalStorage functions

/**
 * Returns the user object from localStorage if exists, otherwise null.
 *
 */
export const getUserFromLocalStorage = () => {
  return localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
};

//Filtering and Data Processing

/**
 *
 * @param {Date | moment} date
 * @param {object[]} eventsList
 * @returns {object[]}
 */
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

/**
 *
 * Creates graph data in list form, from eventList
 * @param {Date | moment} from
 * @param {Date | moment} to
 * @param {object[]} events
 * @param {number} user_id
 */
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

// Axios API handling methods (under api namespace)

function getEvents(jwt) {
  return new Promise((resolve, reject) => {
    axios
      .get("http://localhost:4000/events", {
        headers: {
          authorization: `Bearer ${jwt}`
        }
      })
      .then(result => resolve(result.data))
      .catch(err => reject(err));
  });
}

function deleteEvent(jwt, event_id) {
  return new Promise((resolve, reject) => {
    axios
      .post(
        "http://localhost:4000/delete-event",
        {
          event_id: event_id
        },
        {
          headers: {
            authorization: `Bearer ${jwt}`
          }
        }
      )
      .then(result => resolve(result.data))
      .catch(err => reject(err));
  });
}

function editEvent(jwt, event_id, date, title, description, completed) {
  return new Promise((resolve, reject) => {
    axios
      .post(
        "http://localhost:4000/update-event",
        {
          event_id: event_id,
          date: moment(date).format("YYYY-MM-DD HH:mm:ss"),
          title: title,
          description: description,
          completed: completed
        },
        {
          headers: {
            authorization: `Bearer ${jwt}`
          }
        }
      )
      .then(result => {
        resolve(result.data);
      })
      .catch(err => {
        reject(err);
      });
  });
}
function addEvent(jwt, date, title, description, completed) {
  return new Promise((resolve, reject) => {
    axios
      .post(
        "http://localhost:4000/events",

        {
          date: moment(date).format("YYYY-MM-DD HH:mm:ss"),
          title: title,
          description: description,
          completed: completed
        },
        {
          headers: {
            authorization: `Bearer ${jwt}`
          }
        }
      )
      .then(result => {
        resolve(result);
      })
      .catch(err => {
        reject(err);
      });
  });
}

function getAllEvents(jwt) {
  return new Promise((resolve, reject) => {
    axios
      .post("http://localhost:4000/all-events", {
        headers: {
          authorization: `Bearer ${jwt}`
        }
      })
      .then(result => {
        resolve(result.data);
      })
      .catch(err => {
        reject(err);
      });
  });
}

function getAllRoles(jwt) {
  return new Promise((resolve, reject) => {
    axios
      .post("http://localhost:4000/all-roles", {
        headers: {
          authorization: `Bearer ${jwt}`
        }
      })
      .then(result => {
        resolve(result.data);
      })
      .catch(err => {
        reject(err);
      });
  });
}
function getAllUsers(jwt) {
  return new Promise((resolve, reject) => {
    axios
      .post("http://localhost:4000/all-users", {
        headers: {
          authorization: `Bearer ${jwt}`
        }
      })
      .then(result => {
        resolve(result.data);
      })
      .catch(err => {
        reject(err);
      });
  });
}

export const api = {
  getEvents,
  getAllEvents,
  getAllUsers,
  getAllRoles,
  addEvent,
  deleteEvent,
  editEvent
};

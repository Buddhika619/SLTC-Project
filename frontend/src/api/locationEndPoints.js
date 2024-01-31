import api from "./api.js";

export const viewLocationList = async () => {
  return api.get(`/api/session-location`);
};

export const createOrUpdateLocation = async (location) => {
  if (location.locationID) {
    return api.put(`/api/session-location/${location.locationID}`, location);
  } else {
    return api.post(`/api/session-location`, location);
  }
};

export const deleteLocation = async (id) => {
  return api.delete(`/api/session-location/${id}`);
};

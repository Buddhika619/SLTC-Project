import api from "./api.js";

export const viewSessionList = async () => {
  return api.get(`/api/session`);
};

export const createOrUpdateSession = async (session) => {
  console.log('ddddd')
  if (session.sessionID) {
    return api.put(`/api/session/${session.sessionID}`, session);
  } else {
    return api.post(`/api/session`, session);
  }
};

export const deleteSession = async (id) => {
  return api.delete(`/api/session/${id}`);
};

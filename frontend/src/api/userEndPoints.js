import api from "./api.js";

export const viewPendingUsers = async () => {
  return api.get(`/api/users/unapproved`);
};

export const viewTeacherList = async () => {
  console.log("ddddd");
  return api.get(`/api/users/teachers`);
};

export const viewStudentList = async () => {
  return api.get(`/api/users/students`);
};

export const viewNonacList = async () => {
  return api.get(`/api/users/staff`);
};

export const updateUserById = async (user) => {
  console.log("user" + user.userID);
  return api.put(`/api/users/${user.userID}`, user);
};

export const deletePendingUser = async (id) => {
  return api.delete(`/api/users/${id}`);
};

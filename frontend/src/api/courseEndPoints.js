import api from "./api.js";

export const viewCourseList = async () => {
  return api.get(`/api/course`);
};

export const createOrUpdateCourse = async (faculty) => {
  if (faculty.facultyID) {
    return api.put(`/api/course/${faculty.facultyID}`, faculty);
  } else {
    return api.post(`/api/course`, faculty);
  }
};

export const deleteCourse = async (id) => {
  return api.delete(`/api/course/${id}`);
};

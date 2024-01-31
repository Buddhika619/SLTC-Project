import api from "./api.js";

export const viewStudentCourseRelations = async () => {
  return api.get(`/api/students-courses`);
};

export const createStudnetCourseRelations = async (payload) => {
  if (payload.facultyID) {
    return api.put(`/api/students-courses/${payload.facultyID}`, payload);
  } else {
    return api.post(`/api/students-courses`, payload);
  }
};

export const createOrDeleteRelation = async (payload) => {
  console.log(payload)
  if (payload.enroll) {
    return api.delete(
      `/api/students-courses/${payload.studentID}/${payload.courseID}`
    );
  } else {
    return api.post(`/api/students-courses`, payload);
  }
};

export const viewStudentCourseRelationsforSingleStudent = async ({
  queryKey,
}) => {
  return api.get(`/api/students-courses/student/${queryKey[0].split("/")[1]}`);
};
export const deleteStudentCourseRelations = async (id) => {
  return api.delete(`/api/students-courses/student/${id}`);
};

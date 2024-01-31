import api from "./api.js";

export const viewFacultyList = async () => {
  return api.get(`/api/faculty`);
};

export const createOrUpdate = async (faculty) => {
    console.log('faculty')
    if(faculty.facultyID) {
        return api.put(`/api/faculty/${faculty.facultyID}`, faculty);
    }else {
        return api.post(`/api/faculty`,faculty);
    }
  
//  
};

export const getFacultyById = async (id) => {
  return api.get(`/api/faculty/${id}`);
};

export const updateFaculty = async (id) => {
    return api.put(`/api/faculty/${id}`);
  };

  
export const deleteFaculty = async (id) => {
    return api.delete(`/api/faculty/${id}`);
  };

import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";

import AdminHeader from "../../../components/AdminHeader";
import { useMemo, useRef, useState } from "react";

import { useNavigate, useLocation } from "react-router-dom";

import { useMutation } from "react-query";
import { toast } from "react-toastify";

import { createOrUpdateCourse } from "../../../api/courseEndPoints";

const checkoutSchema = yup.object().shape({
  courseName: yup.string().required("required"),
  year: yup.number().required("required"),
  teacherID: yup.string().required("required"),
  facultyName: yup.string().required("required"),
});

const CourseUpdateForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { state: courseInfo } = useLocation();

  const [formic, setFormicState] = useState({});

  const headerTextRef = useRef("");
  const headerSubRef = useRef("");

  useMemo(() => {
    if (courseInfo) {
      headerTextRef.current = "Update Course";
      headerSubRef.current = "Manage Course";

      setFormicState({
        courseName: courseInfo.courseName,
        year: courseInfo.year,
        teacherID: courseInfo.teacherID,
        facultyName: courseInfo.faculty.department,
      });
    } else {
      headerTextRef.current = "Create Course";
      headerSubRef.current = "Manage Course";
      setFormicState({
        courseName: "",
        year: "",
        teacherID: "",
        facultyName: "",
      });
    }
  }, [courseInfo]);

  const formMutation = useMutation(createOrUpdateCourse, {
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: (data, variable) => {
      setLoading(false);

      toast.success("Update Success!");

      navigate("/admin/courselist");
    },
    onError: (err) => {
      setLoading(false);
      toast.error(err.response.data.message);
    },
  });

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (value) => {
    if (courseInfo) {
      formMutation.mutate({
        ...value,
        facultyID: courseInfo.courseID,
      });
    } else {
      formMutation.mutate({
        ...value,
      });
    }
  };

  if (loading) {
    return <h1>Loading....</h1>;
  }

  return (
    <Box m="20px">
      <AdminHeader
        title={` ${headerTextRef.current}`}
        subtitle={` ${headerSubRef.current}`}
      />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={formic}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Course Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.courseName}
                name="courseName"
                error={!!touched.courseName && !!errors.courseName}
                helperText={touched.courseName && errors.courseName}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Acedemic Year"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.year}
                name="year"
                error={!!touched.year && !!errors.year}
                helperText={touched.year && errors.year}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Teacher ID"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.teacherID}
                name="teacherID"
                error={!!touched.teacherID && !!errors.teacherID}
                helperText={touched.teacherID && errors.teacherID}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Faculty Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.facultyName}
                name="facultyName"
                error={!!touched.facultyName && !!errors.facultyName}
                helperText={touched.facultyName && errors.facultyName}
                sx={{ gridColumn: "span 2" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                {courseInfo ? "Update Course" : "Create Course"}
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default CourseUpdateForm;

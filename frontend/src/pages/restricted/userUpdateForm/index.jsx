import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../components/Header";
import AdminHeader from "../../../components/AdminHeader";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";

import ButtonGroup from "@mui/material/ButtonGroup";
import { toast } from "react-toastify";

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().required("required"),
  password: yup.string().required("required"),
  role: yup.string().required("required"),
  faculty: yup.string().required("required"),
  date: yup.date().required("required"),
  year: yup.number().when("role", {
    is: "STUDENT",
    then: yup.number().required("required"),
    otherwise: yup.number(),
  }),
});

const UserUpdateForm = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    isApproved: false,
    isAdmin: false,
  });

  const [formic] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
    year: "",

    faculty: "",
    date: "",
  });

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (value) => {
    console.log("dd");
    console.log({...value,...form});

    // dispatch(updateUser({ _id: id, isAdmin, role }))
  };

  const change = (e) => {
    let boolean = null;
  

    if (e.target.value === "on") {
      boolean = !form[e.target.id];
    }

    setForm((prevState) => ({
      ...prevState,
      [e.target.id ?? e.target.name]: boolean ?? e.target.value, //if e.target.id is boolean set as true or false, if it's null set as e.target.value ?? ---nulish operator
    }));
  };

  return (
    <Box m="20px">
      <AdminHeader title="UPDATE USER" subtitle="Update User Profile" />

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
                label="First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name="firstName"
                error={!!touched.firstName && !!errors.firstName}
                helpertext  ={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Last Name"
                onChange={handleChange}
                value={values.lastName}
                id="lastName"
                sx={{ gridColumn: "span 2" }}
                name="lastName"
                error={!!touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onChange={handleChange}
                value={values.email}
                id="email"
                sx={{ gridColumn: "span 2" }}
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
              />

              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="Password"
                onChange={handleChange}
                value={values.password}
                id="password"
                sx={{ gridColumn: "span 2" }}
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Faculty"
                onChange={handleChange}
                value={values.faculty}
                id="faculty"
                sx={{ gridColumn: "span 2" }}
                error={!!touched.faculty && !!errors.faculty}
                helperText={touched.faculty && errors.faculty}
              />

              <TextField
                fullWidth
                variant="filled"
                type="date"
                label="Date"
                onChange={handleChange}
                value={values.date}
                id="date"
                sx={{ gridColumn: "span 2" }}
                error={!!touched.date && !!errors.date}
                helperText={touched.date && errors.date}
              />

            
              <FormControl sx={{ gridColumn: "span 2" }} value="id">
                <InputLabel id="role" sx={{ gridColumn: "span 2" }} value="id">
                  Role
                </InputLabel>
                <Select
                  labelId="role"
                  id="role"
                  value={values.role}
                  label="Role"
                  name="role"
                  onChange={handleChange}
                  style={{ gridColumn: "span 2", backgroundColor: "#293040" }}
                  error={!!touched.role && !!errors.role}
                 
                >
                  <MenuItem value="STUDENT">Student</MenuItem>
                  <MenuItem value="TEACHER">Teacher</MenuItem>
                  <MenuItem value="NONAC">Non-Academic</MenuItem>
                </Select>
              </FormControl>

              {values.role === "STUDENT" && (
                <FormControl sx={{ gridColumn: "span 2" }} value="id">
                  <InputLabel
                    id="year"
                    sx={{ gridColumn: "span 2" }}
                    value="year"
                  >
                    Year
                  </InputLabel>
                  <Select
                    labelId="Acedemic year"
                    id="year"
                    value={values.year}
                    label="Year"
                    name="year"
                    onChange={handleChange}
                    style={{ gridColumn: "span 2", backgroundColor: "#293040" }}
                    error={!!touched.year && !!errors.year}
                  
                  >
                    <MenuItem value="1">First Year</MenuItem>
                    <MenuItem value="2">Second Year</MenuItem>
                    <MenuItem value="3">Third Year</MenuItem>

                    <MenuItem value="4">Fourth Year</MenuItem>
                  </Select>
                </FormControl>
              )}

<div style={{ gridColumn: "span 2", display: "flex" }}>
                <FormControlLabel
                  control={
                    <Switch
                      id="isApproved"
                      checked={values.isApproved}
                      color="warning"
                      onChange={change}
                    />
                  }
                  label="Approved Account"
                  labelPlacement="start"
                  sx={{ marginRight: "100px" }}
                  
                />

                <FormControlLabel
                  label="Is an admin"
                  labelPlacement="start"
                  control={
                    <Switch
                      id="isAdmin"
                      checked={values.isAdmin}
                      color="warning"
                      onChange={change}
                    />
                  }
                />
              </div>

            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Update User
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default UserUpdateForm;

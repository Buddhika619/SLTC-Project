import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";

import AdminHeader from "../../../components/AdminHeader";
import { useMemo, useRef, useState } from "react";

import { useNavigate, useLocation } from "react-router-dom";

import { useMutation } from "react-query";
import { toast } from "react-toastify";

import { createOrUpdateLocation } from "../../../api/locationEndPoints";

const checkoutSchema = yup.object().shape({
  locationName: yup.string().required("required"),
  facultyName: yup.string().required("required"),
});

const LocationUpdateForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { state: locationInfo } = useLocation();

  const [formic, setFormicState] = useState({});

  const headerTextRef = useRef("");
  const headerSubRef = useRef("");

  useMemo(() => {
    if (locationInfo) {
      headerTextRef.current = "Update Location";
      headerSubRef.current = "Manage Location";

      setFormicState({
        locationName: locationInfo.name,
        facultyName: locationInfo.faculty.department,
      });
    } else {
      headerTextRef.current = "Create Location";
      headerSubRef.current = "Manage Location";
      setFormicState({
        locationName: "",
        facultyName: "",
      });
    }
  }, [locationInfo]);

  const formMutation = useMutation(createOrUpdateLocation, {
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: (data, variable) => {
      setLoading(false);

      toast.success("Update Success!");

      navigate("/admin/locationlist");
    },
    onError: (err) => {
      setLoading(false);
      toast.error(err.response.data.message);
    },
  });

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (value) => {
    if (locationInfo) {
      formMutation.mutate({
        ...value,
        locationID: locationInfo.locationID,
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
                label="Location Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.locationName}
                name="locationName"
                error={!!touched.locationName && !!errors.locationName}
                helperText={touched.locationName && errors.locationName}
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
                {locationInfo ? "Update Location" : "Create Location"}
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default LocationUpdateForm;

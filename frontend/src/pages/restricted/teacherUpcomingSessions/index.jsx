import { Box, Button, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../theme";

import DeleteOutline from "@mui/icons-material/DeleteOutline";
import DesignServices from "@mui/icons-material/DesignServices";

import AdminHeader from "../../../components/AdminHeader";
import { useState } from "react";
import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";

import { useNavigate } from "react-router-dom";

import { useQuery, useMutation, useQueryClient } from "react-query";

import { toast } from "react-toastify";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import { deleteLocation, viewLocationList } from "../../../api/locationEndPoints";
import { deleteSession, viewSessionList, viewUpcomingSessionListTeacher } from "../../../api/sessionEndPoints";

const TeacherUpcomingSessionList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selectedRows, setSelectedRows] = useState([]);


  const {
    isLoading,
    isError,
    error,
    data: sessionlist,
  } = useQuery("sessionListTeacher", viewUpcomingSessionListTeacher);



  let content;
  if (isLoading) {
    return <p>Loading</p>;
  } else if (isError) {
    return <p>{error.message}</p>;
  } else {
    content = sessionlist;
  }



  const columns = [
    {
      field: "id",
      headerName: "Session ID",
      width: 250,
      cellClassName: "name-column--cell",
    },
    {
      field: "minutes",
      headerName: "Minutes",
      width: 60
   
    },
    {
      field: "date",
      headerName: "Date",
      width: 150
    
    },
    {
        field: "time",
        headerName: "Time",
        width: 100
      
      },
    {
      field: "courseName",
      headerName: "Course Name",
      width: 250
     
    },
    {
      field: "year",
      headerName: "Academic Year",
      width: 100
      
    },
    {
      field: "teacherFirstName",
      headerName: "Teacher First Name",
      width: 120
   
    },
    {
      field: "teacherSecondName",
      headerName: "Teacher Second Name",
      width: 120
    
    },
    {
      field: "email",
      headerName: "Teacher Email",
      width: 200
     
    },
    {
      field: "location",
      headerName: "Location Name",
      width: 100
    },
    {
      field: "faculty",
      headerName: "Faculty",
      width: 150
    },
  ];
  




  let rows = content?.map((content) => ({
    id: content?.sessionID,
    minutes: content.minutes,
    date:  content?.dateTime ? new Intl.DateTimeFormat('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(content.dateTime)) : '',

    time: new Date(content?.dateTime).toLocaleString().substring(10, 25),

    courseName: content.course?.courseName,
    year: content.course?.year,
    teacherFirstName: content.course?.teacher?.user?.firstName,
    teacherSecondName: content.course?.teacher?.user?.lastName,
    email: content.course?.teacher?.user?.email,
    location: content?.session_location?.name,
    faculty: content?.session_location?.faculty.department

  }));

  const CustomToolbar = () => {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport printOptions={{ disableToolbarButton: false }} />

      </GridToolbarContainer>
    );
  };

  return (
    <Box m="20px">
      <AdminHeader title="Upcoming Session List" subtitle="Manage Sessions" />

      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          checkboxSelection
          onSelectionModelChange={(ids) => {
            const selectedIDs = new Set(ids);
            const selectedRows = content.filter((row) =>
              selectedIDs.has(row.sessionID)
            );

            setSelectedRows(selectedRows);
          }}
          components={{
            Toolbar: CustomToolbar,
          }}
        />
      </Box>
    </Box>
  );
};

export default TeacherUpcomingSessionList;

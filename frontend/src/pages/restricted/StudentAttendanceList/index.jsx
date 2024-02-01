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

import { useNavigate, useLocation } from "react-router-dom";

import { useQuery, useMutation, useQueryClient } from "react-query";
import {useSelector } from 'react-redux'
import { toast } from "react-toastify";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { deleteCourse } from "../../../api/courseEndPoints";
import {
  deleteLocation,
  viewLocationList,
} from "../../../api/locationEndPoints";
import { deleteAttendance, getStudentAttendance } from "../../../api/attendanceEndPoints";

const StudentAttendnaceList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selectedRows, setSelectedRows] = useState([]);
  const auth = useSelector((state) => state.auth);
  const {  userInfo } = auth



  const {
    isLoading,
    isError,
    error,
    data: courseList,
  } = useQuery(`locationList/${userInfo.userData.studentID}`, getStudentAttendance);


  let content;
  if (isLoading) {
    return <p>Loading</p>;
  } else if (isError) {
    return <p>{error.message}</p>;
  } else {
    content = courseList;
  }
;


  const columns = [

    {
      field: "sessionId",
      headerName: "Session ID",
      flex: 1,
    },
    {
      field: "courseName",
      headerName: "Course Name",
      flex: 1,
    },
    {
      field: "courseId",
      headerName: "Course ID",
      flex: 1,
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
    },
    {
      field: "time",
      headerName: "Time",
      flex: 1,
    },
  
  ];

  let rows = content?.map((content) => ({
    id: `${content.studentID}-${content.sessionID}`,
    sessionId: content.sessionID,
    courseName: content?.session?.course?.courseName,
    courseId: content?.session?.courseID,
    date: new Date(content?.session?.dateTime).toDateString(),
    time: new Date(content?.session?.dateTime)
      .toLocaleString()
      .substring(10, 25),
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
      <AdminHeader title={`My attendance list`} subtitle="Manage Student Attendance" />

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
              selectedIDs.has(`${row.studentID}-${row.sessionID}`)
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

export default StudentAttendnaceList;

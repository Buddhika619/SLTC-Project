import { Box, Button, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../theme";

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

import { toast } from "react-toastify";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import {
  viewStudentCourseRelationsforSingleStudent,
  createOrDeleteRelation,
} from "../../../api/studentCourseRelationEndPonts";
import { viewStudentSessions } from "../../../api/sessionEndPoints";

const StudentSessionsList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selectedRows, setSelectedRows] = useState([]);
  const { state: studentInfo } = useLocation();

  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const {
    isLoading,
    isError,
    error,
    data: courseList,
  } = useQuery(`studentsessions/${studentInfo.studentID}`, viewStudentSessions);

  const mutation = useMutation(createOrDeleteRelation, {
    onSuccess: () => {
      queryClient.invalidateQueries("facultyList");
      toast.success("Success!");
    },
    onError: (error) => {
      toast.error(error.response.data.message);
      console.log(error);
    },
  });

  let content;
  if (isLoading) {
    return <p>Loading</p>;
  } else if (isError) {
    return <p>{error.message}</p>;
  } else {
    content = courseList;
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
      flex:1
     
    },
    {
      field: "year",
      headerName: "Academic Year",
      width: 100
      
    },
    

    {
      field: "email",
      headerName: "Teacher Email",
      width: 200
     
    },
    
    {
      field: "faculty",
      headerName: "Faculty",
      width: 150
    },

    {
        field: "location",
        headerName: "Location Name",
        width: 100
      },
  ];
  



//   {
// 	"0": {
// 		"sessionID": "3629c16e-102e-4f23-90f5-b213dedd7a1a",
// 		"courseID": "ef16fb94-5c18-46dd-88aa-2d029103ee4f",
// 		"dateTime": "2024-04-14T16:00:00.000Z",
// 		"minutes": 90,
// 		"locationID": "8e0cfa6a-87a0-44a7-9e21-b7fa1adcacbc",
// 		"createdAt": "2024-01-31T14:24:12.000Z",
// 		"updatedAt": "2024-01-31T14:24:12.000Z",
// 		"course": {
// 			"courseID": "ef16fb94-5c18-46dd-88aa-2d029103ee4f",
// 			"courseName": "Introduction to cyber securityxxxaD",
// 			"teacherID": "f819b51c-c95a-4323-a500-7ff5e48bc19a",
// 			"facultyID": "7b22a206-c90e-4a4b-b60b-f8538fb78b91",
// 			"year": 3,
// 			"createdAt": "2024-01-29T14:36:05.000Z",
// 			"updatedAt": "2024-01-31T09:32:07.000Z",
// 			"teacher": {
// 				"teacherID": "f819b51c-c95a-4323-a500-7ff5e48bc19a",
// 				"hireDate": "2024-01-28T17:25:21.000Z",
// 				"facultyID": "7b22a206-c90e-4a4b-b60b-f8538fb78b91",
// 				"createdAt": "2024-01-28T17:25:21.000Z",
// 				"updatedAt": "2024-01-31T06:23:06.000Z",
// 				"userID": "632a0aca-3188-4f91-873c-e5ce20464ec2",
// 				"user": {
// 					"userID": "632a0aca-3188-4f91-873c-e5ce20464ec2",
// 					"firstName": "TONE",
// 					"lastName": "Doe",
// 					"isAdmin": false,
// 					"email": "john.teacher@example.com",
// 					"isApproved": true,
// 					"password": "$2a$10$9QSC20TEEZl.Ziq5h8Ex9ul.jj29JWcWBGuXYA6yPIuZ9esZ9vi2q",
// 					"createdAt": "2024-01-28T17:24:37.000Z",
// 					"updatedAt": "2024-01-31T06:23:06.000Z"
// 				}
// 			}
// 		},
// 		"session_location": {
// 			"locationID": "8e0cfa6a-87a0-44a7-9e21-b7fa1adcacbc",
// 			"name": "dfdf",
// 			"facultyID": "7b22a206-c90e-4a4b-b60b-f8538fb78b91",
// 			"createdAt": "2024-01-31T11:45:00.000Z",
// 			"updatedAt": "2024-01-31T11:45:00.000Z"
// 		}
// 	}
// }

let rows = content?.map((content) => ({
    id: content?.sessionID,
    minutes: content.minutes,
    date: new Date(content?.dateTime).toDateString(),
    time: new Date(content?.dateTime).toLocaleString().substring(10, 25),

    courseName: content.course?.courseName,
    year: content.course?.year,
 
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
      <AdminHeader
        title={`Session Info of ${studentInfo.user.firstName} ${studentInfo.user.lastName}`}
        subtitle="Manage Student Sessions"
      />

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
              selectedIDs.has(row.item.courseID)
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

export default StudentSessionsList;

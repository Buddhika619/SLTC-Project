import React from "react";
import { Badge, Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../theme";
import InputBase from "@mui/material/InputBase";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import { useDispatch } from "react-redux";
import {useNavigate } from 'react-router-dom'

import SearchIcon from "@mui/icons-material/Search";

import { Link } from "react-router-dom";
import { logout } from "../api/authEndPoints";

const TopBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate ()

  let bllueprintlength = 10;

  const signOutHandler = (e) => {
    dispatch(logout())
    navigate('/')

  };

  return (
    <Box display="flex" justifyContent="flex-end" pr={10} pt={2}>


      {/* ICONS */}
      <Box display="flex">
        <Link to="/admin/blueprint">
          <IconButton>
            <Badge badgeContent={bllueprintlength} color="secondary">
              <NotificationsOutlinedIcon />
            </Badge>
          </IconButton>
        </Link>

        <IconButton  sx={{marginLeft:'10px'}} onClick={signOutHandler}>
          <LogoutIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default TopBar;

import {  Routes, Route } from 'react-router-dom'
import {navigationItems} from './constants/naviagationMenuContent'


import 'react-toastify/dist/ReactToastify.css'

import { ColorModeContext, colorModeContext, useMode } from './theme'
import { CssBaseline, ThemeProvider } from '@mui/material'
import Sidebar from "./layouts/SideBar";
import TopBar from  "./layouts/TopBar";
import PendingUserList from './pages/restricted/pendingUserList'
import UserUpdateForm from './pages/restricted/userUpdateForm'


function AdminRoutes() {
  const [theme, colorMode] = useMode()
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar navigationItems={navigationItems} />
          <main className="content">
            <TopBar />
            <Routes>
            <Route path = '/pendingusers' element = {<PendingUserList />} />
            <Route path = '/users/update/:id' element = {<UserUpdateForm />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default AdminRoutes


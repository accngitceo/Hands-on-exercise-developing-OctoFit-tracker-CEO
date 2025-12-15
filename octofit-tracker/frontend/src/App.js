import React from 'react'
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'
import { API_BASE } from './config'

export default function App() {
  console.log('App using API base:', API_BASE)

  return (
    <BrowserRouter>
      <div className="container mt-3">
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
          <div className="container-fluid">
            <NavLink className="navbar-brand" to="/">OctoFit</NavLink>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item"><NavLink className="nav-link" to="/activities">Activities</NavLink></li>
                <li className="nav-item"><NavLink className="nav-link" to="/workouts">Workouts</NavLink></li>
                <li className="nav-item"><NavLink className="nav-link" to="/teams">Teams</NavLink></li>
                <li className="nav-item"><NavLink className="nav-link" to="/users">Users</NavLink></li>
                <li className="nav-item"><NavLink className="nav-link" to="/leaderboard">Leaderboard</NavLink></li>
              </ul>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<div><h1>Welcome to OctoFit Tracker</h1><p>Select a section from the nav.</p></div>} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

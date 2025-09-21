import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import MainLayout from './layout/MainLayout'
import HomePage from './pages/HomePage'
import AddNotes from './pages/AddNotes'
import NoteDetail from './pages/NoteDetail'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path='/add-notes' element={<AddNotes />} />
          <Route path='/notes/:slug' element={<NoteDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
import React, { useState, useEffect } from 'react'
import Container from '@material-ui/core/Container'
import BannerSearch from './components/BannerSearch'
import Sidebar from './components/Sidebar'
import MainContent from './components/MainContent'
import './App.scss'

const URL =
  process.env.NODE_ENV === 'production'
    ? 'https://ghjobs.netlify.app/.netlify/functions/proxy'
    : ''

function App() {
  const [jobs, setJobs] = useState([])
  const [filter, setFilter] = useState([])
  const [locations, setLocations] = useState([])
  const [types, setTypes] = useState([])

  useEffect(() => {
    ;(async function getData() {
      try {
        const res = await fetch(`${URL}positions.json`)
        const data = await res.json()

        const locations = data.map((loc) => loc.location)
        setLocations(locations)

        const types = data.map((loc) => loc.type)
        setTypes(types)

        setJobs(data)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])

  const searchNewJobs = (newJobs) => {
    const locations = newJobs.map((loc) => loc.location)
    setLocations(locations)

    const types = newJobs.map((loc) => loc.type)
    setTypes(types)
    setJobs(newJobs)
  }

  const filterJobsType = (type) => {
    const filtered = jobs.filter((job) => job.type === type)
    setFilter(filtered)
  }

  const filterJobsLoc = (location) => {
    const filtered = jobs.filter((job) => job.location === location)
    setFilter(filtered)
  }

  return (
    <main className="App">
      <Container>
        <BannerSearch
          searchNewJobs={searchNewJobs}
          setJobs={setJobs}
          setTypes={setTypes}
          setLocations={setLocations}
          url={URL}
        />
        <div className="flex">
          <Sidebar
            types={types}
            locations={locations}
            filterJobsType={filterJobsType}
            filterJobsLoc={filterJobsLoc}
          />
          <MainContent jobs={jobs} filter={filter} />
        </div>

        <div className="footer">
          <span>Created by</span>
          <a href="http://markanthonyuy.com" rel="noopener">
            Mark Anthony Uy
          </a>
          <span>API by</span>
          <a href="https://jobs.github.com/api" rel="noopener">
            Github Jobs
          </a>
        </div>
      </Container>
    </main>
  )
}

export default App

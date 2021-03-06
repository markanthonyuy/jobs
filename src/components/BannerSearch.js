import React, { useRef, useState } from 'react'
import BANNER from '../img/banner.jpg'
import {
  FormControl,
  TextField,
  Button,
  RadioGroup,
  Radio,
  FormControlLabel,
} from '@material-ui/core'

function BannerSearch({
  url,
  searchNewJobs,
  setJobs,
  setLocations,
  setTypes,
  setLoading,
}) {
  const searchField = useRef()
  const [filter, setFilter] = useState('description')

  const searchJobs = async (param) => {
    try {
      setLoading(true)
      setJobs([])
      setLocations([])
      setTypes([])

      const res = await fetch(`${url}positions.json?${filter}=${param}`)
      const data = await res.json()

      searchNewJobs(data)
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  return (
    <div className="banner">
      <img src={BANNER} alt="Working People" />
      <div>
        <FormControl className="search-text">
          <TextField
            id="outlined-basic"
            label="Search"
            variant="outlined"
            helperText={
              filter === 'description'
                ? 'Filter by title, benefits, companies, expertise'
                : 'E.g. US, UK, Berlin, Amsterdam or Remote '
            }
            inputRef={searchField}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                searchJobs(e.target.value)
              }
            }}
          />
          <RadioGroup
            defaultValue="description"
            aria-label="gender"
            name="search-filter"
            row
            className="banner-search-filter"
            onChange={(e) => setFilter(e.target.value)}
          >
            <FormControlLabel
              value="description"
              control={<Radio size="small" color="primary" />}
              label="Description"
              labelPlacement="end"
              className="first-radio"
            />
            <FormControlLabel
              value="location"
              control={<Radio size="small" color="primary" />}
              label="Location"
              labelPlacement="end"
            />
          </RadioGroup>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          onClick={() => searchJobs(searchField.current.value)}
        >
          Search
        </Button>
      </div>
    </div>
  )
}

export default BannerSearch

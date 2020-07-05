import React, { useState } from 'react'
import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  InputAdornment,
  FormLabel,
} from '@material-ui/core'
import PublicIcon from '@material-ui/icons/Public'

function Sidebar({ locations, types, filterJobsLoc, filterJobsType }) {
  const [filterLoc, setFilterLoc] = useState([])
  const distincLoc = [...new Set(locations)].sort()
  const distincTypes = [...new Set(types)]

  return (
    <aside className="sidebar">
      <h3>Filter Result</h3>
      {distincTypes.length > 1 && (
        <FormControl component="fieldset">
          <RadioGroup defaultValue="reset">
            <FormControlLabel
              control={<Radio name="type" value="reset" color="primary" />}
              color="primary"
              label="Show All"
              key={`type-reset`}
              onChange={() => filterJobsType([])}
            />
            {distincTypes.map((type) => (
              <FormControlLabel
                control={<Radio name="type" value={type} color="primary" />}
                color="primary"
                label={type}
                key={`type-${type}`}
                onChange={() => filterJobsType(type)}
              />
            ))}
          </RadioGroup>
        </FormControl>
      )}
      <FormControl component="fieldset" className="location">
        <FormLabel component="legend">Location</FormLabel>
        <FormControl className="location-search">
          <TextField
            id="outlined-start-adornment"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PublicIcon />
                </InputAdornment>
              ),
            }}
            variant="outlined"
            placeholder="Type location below"
            onChange={(e) => {
              const loc = distincLoc.filter((loc) =>
                loc.toLowerCase().includes(e.target.value.toLowerCase())
              )
              setFilterLoc(loc)
            }}
          />
        </FormControl>
        {filterLoc.length ? (
          <RadioGroup defaultValue="reset" className="filter-loc-radio">
            <FormControlLabel
              control={<Radio name="location" value="reset" color="primary" />}
              color="primary"
              label="Show All"
              key={`loc-reset`}
              onChange={() => filterJobsLoc([])}
            />
            {filterLoc.map((loc) => (
              <FormControlLabel
                control={<Radio name="location" value={loc} color="primary" />}
                color="primary"
                label={loc}
                key={`loc-${loc}`}
                onChange={() => filterJobsLoc(loc)}
              />
            ))}
          </RadioGroup>
        ) : (
          distincLoc.length > 1 && (
            <RadioGroup defaultValue="reset" className="filter-loc-radio">
              <FormControlLabel
                control={
                  <Radio name="location" value="reset" color="primary" />
                }
                color="primary"
                label="Show All"
                key={`loc-reset`}
                onChange={() => filterJobsLoc([])}
              />
              {distincLoc.map((loc) => (
                <FormControlLabel
                  control={
                    <Radio name="location" value={loc} color="primary" />
                  }
                  color="primary"
                  label={loc}
                  key={`loc-${loc}`}
                  onChange={() => filterJobsLoc(loc)}
                />
              ))}
            </RadioGroup>
          )
        )}
      </FormControl>
    </aside>
  )
}

export default Sidebar

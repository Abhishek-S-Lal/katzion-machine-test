import React, { useEffect, useState } from 'react'
import {
  countryFilterOptions,
  universitySortByOptions
} from '../../data/constants'
import {  useSelector } from 'react-redux'

const HomeSortFilter = ({setSortedFilteredUniversities}) => {
 
  const universityList = useSelector(state => state.universities) || [];

  const [sortDirection, setSortDirection] = useState('asc') 
  const [filteredCountry, setFilteredCountry] = useState('') 

  useEffect(()=>{
    sortAndFilterUniversities(sortDirection, filteredCountry);
  },[universityList, sortDirection, filteredCountry, sortAndFilterUniversities])

  const sortUniversities = direction => {
    const sortedUniversities = [...universityList]

    sortedUniversities.sort((a, b) => {
      const nameA = a.name.toLowerCase()
      const nameB = b.name.toLowerCase()

      if (direction === 'asc') {
        return nameA.localeCompare(nameB)
      } else {
        return nameB.localeCompare(nameA)
      }
    })

    return sortedUniversities
  }

  const filterUniversities = (data, country) => {
    if (!country) {
      return data
    }
    return data.filter(university => university.country === country)
  }

  function sortAndFilterUniversities (direction, country)  {
    const newList = filterUniversities(sortUniversities(direction), country);
    setSortedFilteredUniversities(newList);
  }

  const handleSort = newSortDirection => {
    setSortDirection(newSortDirection)
    sortAndFilterUniversities(newSortDirection, filteredCountry)
  }

  const handleFilter = selectedCountry => {
    setFilteredCountry(selectedCountry)
    sortAndFilterUniversities(sortDirection, selectedCountry)
  }

  return (
    <div className='d-flex gap-2 justify-content-between mb-3 mt-2'>
      <div>
        <label className='me-2'>Page Sort by: </label>
        <select
          style={{
            padding: '0.25rem 1rem',
            borderRadius: '4px',
            borderColor: '#c9ccd0'
          }}
          onChange={e => handleSort(e.target.value)}
        >
          {universitySortByOptions.map(option => {
            return <option key={option.value} value={option.value}>{option.label}</option>
          })}
        </select>
      </div>

      <div>
        <label className='me-2'>Page Filter: </label>
        <select
          style={{
            padding: '0.25rem 1rem',
            borderRadius: '4px',
            borderColor: '#c9ccd0'
          }}
          onChange={e => handleFilter(e.target.value)}
        >
          {countryFilterOptions.map(option => {
            return <option key={option.value} value={option.value}>{option.label}</option>
          })}
        </select>
      </div>
    </div>
  )
}

export default HomeSortFilter

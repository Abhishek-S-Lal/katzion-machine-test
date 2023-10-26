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
    sortAndFilterUniversities();
    // eslint-disable-next-line
  },[universityList, sortDirection, filteredCountry])

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

  const filterUniversities = (universities, country) => {
    if (!country) {
      return universities
    }
    return universities.filter(university => university.country === country)
  }

  function sortAndFilterUniversities ()  {
    const sortedList = sortUniversities(sortDirection);
    const newList = filterUniversities(sortedList, filteredCountry);
    setSortedFilteredUniversities(newList);
  }

  const handleSort = newSortDirection => {
    setSortDirection(newSortDirection)
    // sortAndFilterUniversities(newSortDirection, filteredCountry)
  }

  const handleFilter = selectedCountry => {
    setFilteredCountry(selectedCountry)
    // sortAndFilterUniversities(sortDirection, selectedCountry)
  }

  return (
    <div className='d-flex gap-2 justify-content-between flex-wrap mb-3 mt-2'>
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

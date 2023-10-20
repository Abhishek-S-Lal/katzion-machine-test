import React from 'react'
import CustomTable from '../../components/Table/CustomTable'
import { tableConstants } from '../../constants/tableConstants'
import { data } from '../../constants/mockData'

const Home = () => {
  const handleEdit = item => () => {
    // write your logic
    alert(JSON.stringify(item))
  }

  return (
    <div className='row m-3'>
      <div className='col-sm-12 mt-2'>
        <div className='d-flex justify-content-between align-items-start gap-2'>
          <h4 className='mb-3'>University Details</h4>
          <button className='btn btn-primary' style={{padding: "0.25rem 1.5rem"}}>
            Add New University
          </button>
        </div>
        <CustomTable cols={tableConstants(handleEdit)} data={data} striped />
      </div>
    </div>
  )
}

export default Home

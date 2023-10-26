import React, { useEffect, useState } from 'react'
import CustomTable from '../../components/Table/CustomTable'
import { tableConstants } from '../../data/tableConstants'
// import { data } from '../../constants/mockData'
import { useDispatch } from 'react-redux'
import {
  addAllUniversities,
  addUniversity,
  deleteUniversity,
  editUniversity
} from '../../redux/universitySlice'
import { getUniversityList } from '../../api/university'
import Pagination from '../../components/Pagination/Pagination'
import HomeSortFilter from './HomeSortFilter'
import { AddEditUniversity } from './AddEditUniversity'
import CustomModal from '../../components/CustomModal/CustomModal'
import { backgroundColors } from '../../data/constants'

const Home = () => {
  const dispatch = useDispatch()

  const [sortedFilteredUniversities, setSortedFilteredUniversities] = useState(
    []
  )
  const [showModal, setShowModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)

  let lastColor = localStorage.getItem('lastColor') || backgroundColors[0]
  let lastColorIndex = backgroundColors.indexOf(lastColor)

  useEffect(() => {
    const nextColorIndex = (lastColorIndex + 1) % backgroundColors.length
    const nextColor = backgroundColors[nextColorIndex]
    document.body.style.backgroundColor = nextColor
    localStorage.setItem('lastColor', nextColor)
  }, [])

  const [page, setPage] = useState(1)
  const [offset, setOffset] = useState(1)
  const itemsPerPage = 20
  const limit = 200

  useEffect(() => {
    setOffset(page === 1 ? 1 : itemsPerPage * (page - 1) + 1)
  }, [page])

  useEffect(() => {
    getUniversityList({ offset: offset, limit: itemsPerPage }).then(result => {
      if (result.data) {
        dispatch(addAllUniversities(result.data))
      }
    })
  }, [offset, dispatch])

  const handleEdit = item => {
    setShowModal(true)
    setSelectedItem(item)
  }

  const onEdit = data => {
    const updatedUniversity = {
      ...selectedItem,
      name: data.name,
      country: data.country,
      web_pages: [data.website]
    }
    dispatch(editUniversity({ id: selectedItem.id, updatedUniversity }))
    handleCloseModal()
  }

  const handleAdd = () => {
    setSelectedItem(null)
    setShowModal(true)
  }

  const onAdd = data => {
    const newUniversity = {
      name: data.name,
      country: data.country,
      web_pages: [data.website]
    }

    dispatch(addUniversity(newUniversity))

    handleCloseModal()
  }

  const handleDelete = item => {
    setSelectedItem(item)
    setShowDeleteModal(true)
  }

  const onDelete = () => {
    dispatch(deleteUniversity(selectedItem.id))
    handleCloseModal()
  }

  const handleCloseModal = () => {
    setSelectedItem(null)
    setShowModal(false)
    setShowDeleteModal(false)
  }

  return (
    <div className='row m-3'>
      <div className='col-sm-12 mt-2'>
        <div className='d-flex justify-content-between align-items-start gap-2'>
          <h4 className='mb-3'>University Details</h4>
          <button
            className='btn btn-primary'
            style={{ padding: '0.25rem 1.5rem' }}
            onClick={handleAdd}
          >
            Add New University
          </button>
        </div>

        <HomeSortFilter
          setSortedFilteredUniversities={setSortedFilteredUniversities}
        />

        <CustomTable
          cols={tableConstants({
            handleEdit: handleEdit,
            handleDelete: handleDelete
          })}
          data={sortedFilteredUniversities}
          striped
        />
        <Pagination
          totalItems={limit}
          itemsPerPage={itemsPerPage}
          page={page}
          setPage={setPage}
        />
      </div>
      {showModal && (
        <AddEditUniversity
          selected={selectedItem}
          handleClose={handleCloseModal}
          onSubmit={selectedItem ? onEdit : onAdd}
        />
      )}
      {showDeleteModal && (
        <CustomModal
          showModal={true}
          title='Confirm Delete'
          onCancel={handleCloseModal}
          onOk={onDelete}
          okButtonLabel='Delete'
          cancelButtonLabel='Cancel'
          btnType='danger'
        >
          <p></p>
          <p>Are you sure you want to delete this row?</p>
        </CustomModal>
      )}
    </div>
  )
}

export default Home

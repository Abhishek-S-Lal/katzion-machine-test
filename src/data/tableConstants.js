import React from 'react'

export const tableConstants = ({handleEdit, handleDelete}) => {
  return [
    {
      title: 'University',
      render: rowData => {
        return <span>{rowData?.name || 'NA'}</span>
      }
    },
    {
      title: 'Country',
      render: rowData => {
        return <span>{rowData?.country || 'NA'}</span>
      }
    },
    {
      title: 'Website',
      render: rowData => {
        return <span>{rowData?.web_pages?.[0] || 'NA'}</span>
      }
    },

    {
      title: 'Action',
      render: rowData => {
        return (
          <div className='d-flex gap-2'>
            <button
              className='btn btn-warning'
              style={{ padding: '0.25rem 1rem' }}
              onClick={()=>handleEdit(rowData)}
            >
              Edit
            </button>
            <button
              className='btn btn-danger'
              style={{ padding: '0.25rem 1rem' }}
              onClick={()=>handleDelete(rowData)}
            >
              Delete
            </button>
          </div>
        )
      }
    }
  ]
}

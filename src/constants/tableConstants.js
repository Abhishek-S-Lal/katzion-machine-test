import React from 'react'

// This is the table constant/settings which needed to render table elements
export const tableConstants = handleEdit => {
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
          <button className='btn btn-warning' style={{padding:"0.25rem 1rem"}} onClick={handleEdit(rowData)}>
            Edit
          </button>
        )
      }
    }
  ]
}

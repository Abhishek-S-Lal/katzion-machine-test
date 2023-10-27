import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import CustomModal from '../../components/CustomModal/CustomModal'

export const AddEditUniversity = ({ selected, handleClose, onSubmit }) => {
  const { control, handleSubmit, formState: { errors } } = useForm()
console.log(errors)
  return (
    <CustomModal
      showModal={true}
      title={selected ? 'Edit University' : 'Add New University'}
      onCancel={handleClose}
      onOk={handleSubmit((data)=>onSubmit(data))}
      okButtonLabel={selected ? 'Update' : 'Save'}
      cancelButtonLabel='Cancel'
      btnType='primary'
    >
      <form>
        <div className='form-group'>
          <label className='mb-1'>Name:</label>
          <Controller
            name='name'
            control={control}
            defaultValue={selected ? selected?.name : ''}
            rules={{ required: 'Name is required', minLength: {value:3, message: "Minimum characters is 3"} }}
            render={({ field }) => (
              <input
                type='text'
                className={`form-control ${errors?.name ? 'is-invalid' : ''}`}
                {...field}
              />
            )}
          />
          <div className='invalid-feedback'>
            {errors?.name && errors?.name?.message}
          </div>
        </div>

        <div className='form-group mt-3'>
          <label className='mb-1'>Website:</label>
          <Controller
            name='website'
            control={control}
            defaultValue={selected ? selected.web_pages[0] : ''}
            rules={{
              required: 'Website is required',
              pattern: {
                value: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,
                message: 'Invalid website address'
              }
            }}
            render={({ field }) => (
              <input
                type='text'
                className={`form-control ${
                  errors?.website ? 'is-invalid' : ''
                }`}
                {...field}
              />
            )}
          />
          <div className='invalid-feedback'>
            {errors?.website && errors?.website.message}
          </div>
        </div>

        <div className='form-group mt-3 mb-4'>
          <label className='mb-1'>Country:</label>
          <Controller
            name='country'
            control={control}
            defaultValue={selected ? selected.country : ''}
            rules={{ required: 'Country is required', pattern: /^[A-Za-z\s]+$/ }}
            render={({ field }) => (
              <input
                type='text'
                className={`form-control ${
                  errors?.country ? 'is-invalid' : ''
                }`}
                {...field}
              />
            )}
          />
          <div className='invalid-feedback'>
            {errors?.country && errors?.country.message}
          </div>
        </div>
      </form>
    </CustomModal>
  )
}

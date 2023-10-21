import axios from 'axios'

export const getUniversityList = async ({ country, offset, limit }) => {
  try {
    return await axios.get(
      `http://universities.hipolabs.com/search`,{
        headers: { 'Content-Type': 'application/json'},
        params:  { country: country, offset, limit }
      }
    )
    
  } catch (error) {
    console.error(error)
    throw error
  }
}

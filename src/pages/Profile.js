import { useSelector } from 'react-redux'
import '../styles/profile.css'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
    const navigate=useNavigate()
  const { userInfo } = useSelector((state) => state.auth)
  useEffect(()=>{
    if(!userInfo){
        navigate('/login')
    }
  },[userInfo,navigate])
  

  return (
    <div>
      <figure>{userInfo?.firstName.charAt(0).toUpperCase()||''}</figure>
      
      <span>
        Welcome <strong>{userInfo?.firstName}!</strong> 
      </span>
    </div>
  )
}
export default Profile
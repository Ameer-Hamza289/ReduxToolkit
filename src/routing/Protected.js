import {  useSelector } from "react-redux";
import { NavLink,Outlet } from "react-router-dom";

 const Protected = () => {
    const {userInfo}=useSelector((state)=>state.auth);
    // console.log(userInfo)
    if(!userInfo){
        return (
            <div className='unauthorized'>
        <h1>Unauthorized :|</h1>
        <span>
          <NavLink to='/login' >Login</NavLink> to gain access
        </span>
      </div>
        )
    }
    return <Outlet/>    //returns child route elements
  
}

export default Protected;


// import { Navigate } from "react-router-dom";
// const Protected = ({ userToken, children }) => {
//     // const navigate=useNavigate();
//   if (!userToken) {
//     return <Navigate to="/login" replace />;
//   }
// //   navigate('/')
//   return children;
// };
// export default Protected;   
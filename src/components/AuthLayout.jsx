import React,{useEffect,useState} from 'react'
import { useSelector } from 'react-redux'
import { useFetcher, useNavigate } from 'react-router-dom'

// protection mechanism of route--> protected container
// authentication=true --> user is giving true -> if user is not giving even then it is true
export default function Protected({children,authentication=true}) {
     const navigate=useNavigate()
     const[loader,setLoader]=useState(true)
     const authStatus=useSelector(state=> state.auth.status)

     // ask from authStatus(store) - logged in or not
     useEffect(()=>{
// TODO : make it more easy to understand
// if(authStatus=== true){
// navigate("/")
// } else if(authStatus===false){
//      navigate("/login")
// }


          //  if in case authentication is not true-< in store
          // if not condition satisfied-< not log in
          // true && false !== true=> false!== true
          if (authentication && authStatus !== authentication){
               navigate("/login")
          }
          // if in case authentication is true-< in store
          // false && true !== true
          // false!== true -> true
          else if(!authentication && authStatus !== authentication){
               navigate("/")
          }
          setLoader(false)
     },[authStatus,navigate,authentication])
  return  loader? <h1>Loading...</h1>:<>{children}</>
}


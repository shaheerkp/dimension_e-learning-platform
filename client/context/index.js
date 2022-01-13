import { useReducer, createContext,useEffect } from "react";
import axios from 'axios'
import {useRouter}from "next/router"

//initial state
const intialState = {
  user: null,
};

//create context
const Context = createContext();

//root reducer
const rootReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN": 
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null }; 
    default:
      return state; 
  }
};

//context provider
const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, intialState);
  const router=useRouter()

  useEffect(() => {
    dispatch({
      type:"LOGIN",
      payload:JSON.parse(window.localStorage.getItem('User'))
    })
    
  }, [])

  axios.interceptors.response.use(
    function(response){
      return response
    },
    function(error){
      console.log("error",error);
      let res =error.response
      if (res.status===401&&res.config&&res.config.__isRetryRequest){
        return new Promise((resolve,reject)=>{
          axios.get("/api/logout").then((data)=>{
            dispatch({type:"LOGOUT"})
            window.localStorage.removeItem("User")
            router.push("/login")

          }).catch((err)=>{
            console.log("AXIOS INTERPRETOR ERRORRR",err);
            reject(err)
          })
        })
      }
      return Promise.reject(error)
    }
  );
  useEffect(() => {
    const getcsrtToken=async()=>{
      const {data}=await axios.get("/api/csrf-token")
      console.log("csrf",data);
      axios.defaults.headers['X-CSRF-Token']=data.getcsrfToken;

    };
    getcsrtToken();
   
  }, [])





  return (
    <Context.Provider value={{ state, dispatch }}>
      {children}
    </Context.Provider>
  );
};

export { Context, Provider };

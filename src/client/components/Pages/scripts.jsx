import axios from 'axios';
import React, { useState, useEffect } from "react"; 




const Script = ({ location, history }) => {
  const [stateData, setStateData] = useState();
  
  useEffect(() => {

const { pathname } = location;
//console.log('LOCATION Test', pathname);
// const [stateSucc, setStateSucc] = useState();

const dataForm = {
  success: true,
};
const runScript = () => {
  const url = `${process.env.REACT_APP_API_URL}${pathname}`;
  axios({
    method: "put",
    url,
    data: dataForm,
    headers: {
      "x-access-token": localStorage.getItem("token"),
    },
  })
    .then((res) => {
      setStateData(res.data);
      //history.push(`/${pathname}`);
    })
    .catch((error) => {
      const { status } = error.response;
      // console.error("ERROR Scripts->scripts.jsx", data);
      //return (window.location = `/error`);
      history.push(`/error?error=${status}`);
    });
};


    runScript()
    //console.log("Run Script " );
  }, [location, history]);

  // console.log("SUccess Data ", stateSucc);
  // console.log("Data ", stateData);

  return (
    <>
      {stateData && (
        <div>
          <h2>{stateData.description}</h2>
          <p>{JSON.stringify(stateData.payload)}</p>
          
        </div>
      )}
    </>
  );
}




  
export default Script

import React from 'react' 



//import { useEffect } from "react";


const TestPage = ({ location }) => {
   const { pathname } = location;
  console.log('LOCATION Test', pathname);
  // const [stateSucc, setStateSucc] = useState();
  // const [stateData, setStateData] = useState();
  
  
  // useEffect(() => {
  //   const {  pathname } = location;
  //   const familyProfile = pathname.split("/")[1];
    
  //   console.log("TEst ", familyProfile);
  // }, [location]);

  // console.log("SUccess Data ", stateSucc);
  // console.log("Data ", stateData);

  return (
    <>
      
      {location &&
        
          <p>DATOS DE {pathname}</p>
        }
    </>
  );
}




  
export default TestPage

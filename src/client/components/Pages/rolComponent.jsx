import React, { useState } from 'react' 
import { useEffect } from "react";
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import { getAxios } from '../Atoms/functions/httpReq' 
import Load from '../Organisms/load';
import dataRol from '../Atoms/dto/roles.json' 

const Accesos = ({ location, history, user }) => {
  const { pathname } = location;
  console.log('path RolComponent', pathname);
  
  const pathClean = pathname.split("/").filter(Boolean);// limpio los elementos nulos del endpoint
  // Boolean("foo"); // true
  // Boolean(0); // false, si en el endpoint existe un 0 lo omitira
  // Boolean(false); // false
  // Boolean(NaN); // false
  //  console.log("PATHNAME ", pathname, "SPLIT ", pathname.split("/"), 'path Limpio ', pathClean, 'elementos path Limpio', pathClean.length);  
  let rolPath
  if (pathClean.length === 2){
    rolPath = pathClean[1]; // el primer elemento siempre es la Familia
  }else if (pathClean.length === 3) {
    rolPath = `${pathClean[1]}/${pathClean[2]}`;
  }
   console.log('ENDPOINT ', rolPath);
  
  let objectRol=[{title:'NADA DE NADA', id:'0',aliasFields:{primary:''}}] // Prueba de error
  for (const key in dataRol) {
    if (Object.hasOwnProperty.call(dataRol, key)) {
      const clave = key;
      const valor = dataRol[key];
      // Armo mi objeto con variables para el endpoint
      if (clave === rolPath) {
        objectRol = valor
      }
      // console.log("CLAVE ", clave, " VALOR ", valor);
    }
  }
  const { title } = objectRol[0];
  const dtaThead = Object.values(objectRol[0].aliasFields);
  // const { primary, field1, field2, field3 } = objectRol[0].aliasFields;
  // console.log(
  //   "Objeto Endpoint ",
  //   objectRol,
  //   " TITULO ",
  //   objectRol[0].title,
  //   " FIELDS ",
  //   objectRol[0].aliasFields,
  //   " PRIMARY KEY ",
  //   objectRol[0].aliasFields.primary,
    
  // );
  // console.log("valores ", Object.values(objectRol[0].aliasFields), "cantidad ", Object.values(objectRol[0].aliasFields).length, 'primero ', Object.values(objectRol[0].aliasFields)[0]);
  // console.log("typo de data ",typeof objectRol[0].aliasFields);
  
  //console.log('history AND user ', history, user);
  const [stateData, setStateData] = useState({success:false, payload:''});
 
  useEffect(() => {
    const abortCtrl = new AbortController();
    const { pathname } = location;
    const api = process.env.REACT_APP_API_URL;
    const url = `${api}${pathname}`;
    const token = localStorage.getItem("token");
    const run = async () => {
      const dataAxios = await getAxios(user, url, token, history, abortCtrl);
      //console.log("dataAxios ", dataAxios);
      if(dataAxios){
        setStateData({
          success: dataAxios.success,
          payload: dataAxios.payload,
        });
      }
      
    };
    run();
    return () => {
      //console.log("DESMONTANDO ", abortCtrl);
      abortCtrl.abort();
    };
  }, [location, history, user]);
  
  //console.log("Data ACCESOS", stateData);
    return (
      <>
        {!stateData.payload ? (
          <Load></Load>
        ) : // <p>formando</p>
        stateData.success === true ? (
          <div>
            <h1>{title}</h1>
            <table>
              <thead>
                <tr>
                  {dtaThead.map((tdHead, itdH) => {
                    return <td key={itdH}>{tdHead}</td>;
                  })}
                </tr>
              </thead>
              <tbody>
                {stateData.payload.map((trBody, itrB) => {
                  return (
                    <tr key={itrB}>
                      {
                        Object.values(trBody).map((tdBody,itdB)=>{
                          return(
                            <td key={itdB}>{tdBody}</td>
                          )
                        })
                      }
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          //trae los datos de los limitadores de solicitud
          <p>{JSON.stringify(stateData.payload)}</p>
        )}
      </>
    );
}

const mapStateToProps = (state) => ({
  user: state.userReducer.user,
}); 
export default connect(mapStateToProps,{})(Accesos)


//-- USEEFFECT Modelo A - AbortController
// useEffect(() => {
//   const abortCtrl = new AbortController();
//   const { pathname } = location;
//   const api = process.env.REACT_APP_API_URL;
//   const url = `${api}${pathname}`;
//   const token = localStorage.getItem("token");
//   const run = async () => {
//       try {
//         const res = await axios.get(url, {
//           headers: {
//             "x-access-token": token,
//           },
//           signal: abortCtrl.signal
//         });
//         console.log("DATA DISPATCH ACCESOS ", res.data);
//         const { success, payload } = res.data;
//         setStateData({success,payload})

//       } catch (error) {
//         console.log("ERROR DISPATCH ACCESOS ", error.response);
//         const { status } = error.response;
//         history.push(`/error?error=${status}`);
//         outSession(user)

//       }
//     }
// run()
//   return () => {
//     console.log("DESMONTANDO");
//     abortCtrl.abort();
//   };
// }, [location, history, user]);
//-----


// -- USEEFFECT MODELO B CON axios cancel
// useEffect(() => {
// const { pathname } = location;
//   const api = process.env.REACT_APP_API_URL;
//   const url = `${api}${pathname}`;
//   const token = localStorage.getItem("token");
//  let source = axios.CancelToken.source();
//  const run = async () => {
//    try {
//      const res = await axios.get(url, {
//        headers: {
//          "x-access-token": token,
//        },
//        cancelToken: source.token,
//      });
//      console.log("DATA DISPATCH ACCESOS ", res.data);
//      const { success, payload } = res.data;
//      setStateData({ success, payload });
//    } catch (error) {
//      console.log("ERROR DISPATCH ACCESOS ", error.response);
//      const { status } = error.response;
//      history.push(`/error?error=${status}`);
//      outSession(user);
//      // if(axios.isCancel(error)){
//      //   console.log('CAUGHT CANCEL');
//      // }else {
//      //   throw error
//      // }
//    }
//  }; 
// run()
//   return () => {
//     console.log("DESMONTANDO");
//     source.cancel();
//   };
// }, [location, history, user]);
//----

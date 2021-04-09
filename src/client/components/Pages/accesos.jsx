import React, { useState } from 'react' 
import { useEffect } from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAxios } from '../Atoms/functions/httpReq' 
import Load from '../Organisms/load';

const Accesos = ({ location, history, user }) => {
  
  const { pathname } = location;
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
      setStateData({
        success: dataAxios.success,
        payload: dataAxios.payload,
      });
    };
    run();
    return () => {
      console.log("DESMONTANDO");
      abortCtrl.abort();
    };
  }, [location, history, user]);
  
  console.log("Data ACCESOS", stateData);
 
  return (
    <>
      {!stateData.payload ? (
        <Load></Load>
        // <p>formamndo</p>
      ) : stateData.success === true ? (
        <div>
          <h1 >USUARIOS CERTIGNV</h1>
          <table>
            <thead>
              <tr>
                <td>Usuario</td>
                <td>Nombre</td>
                <td>Correo</td>
                <td>Dirección</td>
                <td>Telefono</td>
              </tr>
            </thead>
            <tbody>
              {stateData.payload.map((e) => {
                return (
                  <tr key={e.K_USUARIO}>
                    <td>
                      <Link to={`${pathname}/${e.K_USUARIO}`}>
                        {e.K_USUARIO}
                      </Link>
                    </td>
                    <td>{e.D_NOMBRE}</td>
                    <td>{e.D_CORREO}</td>
                    <td>{e.D_DIRECCION}</td>
                    <td>{e.D_TELEFONO}</td>
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

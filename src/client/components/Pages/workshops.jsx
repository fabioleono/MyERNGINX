import React, { useState } from 'react' 
import { connect } from 'react-redux';
// import { getWorkshops } from '../../Redux/actionCreators';
// import { store } from '../../Redux/store';
import { useEffect } from "react";
import { getAxios } from '../Atoms/functions/httpReq';
import Load from '../Organisms/load';


const Workshops = ({ location, history, user }) => {
  //  const { pathname } = location;
   //console.log('history AND user ', history, user);
   const [stateData, setStateData] = useState({ success: false, payload:'' });
    
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
  
  console.log("Data TALLERES", stateData);
  return (
    <>
      {!stateData.payload ? (
        <Load />
        // <p>formamndo</p>
      ) : stateData.success === true ? (
        <div>
          <h1 >TALLERES CERTIGNV</h1>
          <table>
            <thead>
                <tr>
                  <td>key</td>
                  <td>nit</td>
                  <td>sigla</td>
                  <td>direccion</td>
                  <td>telefono</td>
                </tr>
              </thead>
            <tbody>
              {stateData.payload.map((e) => {
                return (
                  <tr key={e.K_TALLER}>
                        <td>{e.K_TALLER}</td>
                        <td>{e.N_NIT}</td>
                        <td>{e.D_SIGLA}</td>
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

  
export default connect(mapStateToProps,{})(Workshops)

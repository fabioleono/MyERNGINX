import axios from 'axios';
import React, { useState } from 'react' 
import { useEffect } from "react";
import { Link } from 'react-router-dom';
import { logOutUser } from '../../Redux/actionCreators';
import { store } from '../../Redux/store';

const Accesos = ({ location, history }) => {
  
  //let history = useHistory();
  const { pathname } = location;
  //console.log('location Accesos ', location);
  const [stateData, setStateData] = useState({success:'', payload:false});
  const letHome = () => {
    history.push('/contacto')
  }

  const getUsers = async (url, token) => { 
    try {
        const res = await axios.get(url, {
        headers: {
          "x-access-token": token,
        },
      });
      // console.log("DATA DISPATCH ACCESOS ", res.data);
      const { success, payload } = res.data
      //console.log('TIPO DENTRO DE AXIOS ', success, typeof(payload));
      setStateData({success,payload})
      // setSuccess(success)
    } catch (error) {
      //console.log("ERROR DISPATCH ACCESOS ", error.response);
      const { status } = error.response;
      store.dispatch(logOutUser())
      history.push(`/error?error=${status}`);
    }
  }
  
  useEffect(() => {
    const { pathname } = location;
    const api = process.env.REACT_APP_API_URL;
    const token = localStorage.getItem("token");
    const url = `${api}${pathname}`;
    getUsers(url, token);  
  }, [location]);
  
  // console.log("SUccess Data ", stateSuccess);
  // console.log("Data ACCESOS", stateData);
 
  
  
  return (
    <>
      {!stateData.payload ? (
        <div id="loader">
          {/* montar en Hook , con gif no carga inmediato se pierde el estado false*/}
          <svg>
            <circle cx="70" cy="70" r="30"></circle>
          </svg>
          
        </div>
        // <p>formamndo</p>
      ) : stateData.success === true ? (
        <div>
          <h1 onClick={letHome.bind()}>USUARIOS CERTIGNV</h1>
          <table>
            <thead>
              <tr>
                <td>Usuario</td>
                <td>Nombre</td>
                <td>Correo</td>
                <td>Direccion</td>
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

export default Accesos

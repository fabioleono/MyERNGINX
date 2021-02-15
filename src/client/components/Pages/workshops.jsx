import React from 'react' 
import { connect } from 'react-redux';
import { getWorkshops } from '../../Redux/actionCreators';
import { store } from '../../Redux/store';
import { useEffect } from "react";


const Workshops = ({ location, workshops }) => {
  console.log('LOCATION TALLERES', location);
  useEffect(() => {
    const { master, pathname } = location;
    const familyProfile = pathname.split("/")[1];
    store.dispatch(getWorkshops(master, familyProfile));
    console.log("TERMINO DE CARGAR ");
  }, [location]);

  //console.log("DATA WORKSHOPS ", workshops);

  return (
    <>
      {workshops && (
        <div>
          <h1>Talleres GNV</h1>
          <h3>Info Talleres</h3>
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
              {workshops &&
                workshops.map((e) => {
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
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus
            aliquam aperiam fugit commodi. Dolorum amet temporibus corporis
            debitis doloremque deleniti quas excepturi error, alias accusantium
            fugit. Nam voluptatum laborum nobis.
          </p>
          <p>
            Voluptatibus assumenda quos nobis architecto iure? Sapiente
            reprehenderit, fugiat, omnis est neque maiores mollitia, error
            voluptatum nam nesciunt unde dolore nihil ratione voluptatem
            dignissimos quisquam possimus modi! Impedit, tempore modi.
          </p>
          <p>{JSON.stringify(workshops)}</p>
        </div>
      )}
    </>
  );
}


const mapStateToProps = state => ({
  workshops: state.workshopReducer.workshops,
}) 

  
export default connect(mapStateToProps,{})(Workshops)

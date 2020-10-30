import React, { useEffect } from 'react' 
import { connect } from 'react-redux';
import { getWorkshops } from '../../Redux/actionCreators';
import { store } from '../../Redux/store';

const Workshops = ({ location, workshops, user, familiy }) => {
  // document.addEventListener("DOMContentLoaded", function (event) {
  //   console.log("CARGARLO ", workshops);
  // });
   //console.log('user ', user, ' maestro ', master, ' familia ', family);
  
useEffect(() => {
const { master, pathname } = location

const familyProfile = pathname.split("/")[1];
  store.dispatch(getWorkshops(master, familyProfile))
}, [location])
// console.log("DATA WORKSHOPS ", workshops);

  return (
    <>
    {workshops && 
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
            Object.values(workshops).map((e) => {
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
        aliquam aperiam fugit commodi. Dolorum amet temporibus corporis debitis
        doloremque deleniti quas excepturi error, alias accusantium fugit. Nam
        voluptatum laborum nobis.
      </p>
      <p>
        Voluptatibus assumenda quos nobis architecto iure? Sapiente
        reprehenderit, fugiat, omnis est neque maiores mollitia, error
        voluptatum nam nesciunt unde dolore nihil ratione voluptatem dignissimos
        quisquam possimus modi! Impedit, tempore modi.
      </p>

      
    </div>
    }
    </>
  );
}
const mapStateToProps = state => ({
  workshops: state.workshopReducer,
  user: state.userReducer.user,
  family: state.userReducer.family
}) 
const mapDispatchToProps = state => ({})
  
export default connect(mapStateToProps,mapDispatchToProps)(Workshops)

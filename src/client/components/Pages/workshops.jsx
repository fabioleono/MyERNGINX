import React, { useEffect } from 'react' 
import { connect } from 'react-redux';
import { getWorkshops } from '../../Redux/actionCreators';
import { store } from '../../Redux/store';

const Workshops = ({ location, workshops }) => {
  document.addEventListener("DOMContentLoaded", function (event) {
    console.log("CARGARLO ", workshops);
  });
   //console.log('user ', user, ' maestro ', master, ' familia ', family);
  
useEffect(() => {
const { master, family } = location
  store.dispatch(getWorkshops(master, family))
}, [location])

  return (
    <div>
      <h1>Talleres GNV</h1>
      <h3>Info Talleres</h3>
      { JSON.stringify(workshops)}
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus aliquam aperiam fugit commodi. Dolorum amet temporibus corporis debitis doloremque deleniti quas excepturi error, alias accusantium fugit. Nam voluptatum laborum nobis.</p>
      <p>Voluptatibus assumenda quos nobis architecto iure? Sapiente reprehenderit, fugiat, omnis est neque maiores mollitia, error voluptatum nam nesciunt unde dolore nihil ratione voluptatem dignissimos quisquam possimus modi! Impedit, tempore modi.</p>
    </div>
  )
}
const mapStateToProps = state => ({
  workshops: state.workshopReducer
}) 
const mapDispatchToProps = state => ({})
  
export default connect(mapStateToProps,mapDispatchToProps)(Workshops)

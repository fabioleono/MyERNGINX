import React from 'react' 
import { getTechnicals } from '../../Redux/actionCreators';
import { connect } from "react-redux";
import { store } from "../../Redux/store";
import { useEffect } from "react";

const Technicals = ({ location, technicals }) => {
  console.log("LOCATION TECNICOS TALLERES", location);
  useEffect(() => {
    const { master, pathname } = location;
    const familyProfile = pathname.split("/")[1];
    store.dispatch(getTechnicals(master, familyProfile));
    
  }, [location]);
  return (
    <>
      {technicals && (
        <div>
          <h1>Tecnicos de Talleres GNV</h1>
          <h3>Competencias Laborales</h3>
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
          <p>{JSON.stringify(technicals)}</p>
        </div>
      )}
    </>
  );
}
const mapStateToProps = (state) => ({
  technicals: state.technicalReducer.technicals,
});

export default connect(mapStateToProps, {})(Technicals);
 

import React from 'react' 
import axios from "axios";
const authPublic = e => {
  // e.preventDefault();
  e.preventDefault();
  const url = `${process.env.REACT_APP_API_URL}/Login`
  const dataForm = {
    user: e.target.consumer.value,
    pass: e.target.code.value,
  };
  axios.post(url, dataForm)
  .then((res) => {
    console.log('data', res.data);
    if(res.data.token){
      localStorage.removeItem("token");
      localStorage.setItem('tokenPublic', res.data.token)
      window.location='/Info'
    }else{
      document.getElementById('msgError').innerHTML=res.data.message
    }
    
  })
  .catch((e) => console.log('error axios', e))

}

const Info = () => {
  return (
    <div>
      <h2>Login Info Publica</h2>
      <img src="/images/favicon.png" alt="enable" />
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere veniam
        ipsa fugiat sunt pariatur nam dolorum assumenda, illum explicabo culpa
        quam dicta placeat tempora ducimus, molestiae minus sit libero
        doloribus.
      </p>
      <p>
        Debitis ea quibusdam unde dolorum quia, dolor sunt! Earum, assumenda
        laboriosam? Odio iste unde mollitia vitae amet illum perferendis!
        Doloribus animi assumenda quia quod iusto laborum, odit est consectetur
        officiis?
      </p>
      <p>
        Consequatur aliquam eaque mollitia consectetur impedit maiores? Corrupti
        eligendi perspiciatis, ducimus explicabo animi harum fugit libero quia.
        Excepturi iusto, vitae sint nobis autem, ullam animi ex ratione amet
        veniam tempore.
      </p>
      <form  onSubmit={authPublic.bind()}>
        <label htmlFor="iden">
          Identificacion
          <input
            type="text"
            name="consumer"
            id="consumer"
            placeholder="Ingrese su usuario"
          />
        </label>
        <label htmlFor="code">
          Clave
          <input
            type="password"
            name="code"
            id="code"
            placeholder="Ingrese su Clave"
          />
        </label>
        <input type="submit" value="Enviar" />
      </form>
      <div id="msgError"></div>
    </div>
  );
}
export default Info

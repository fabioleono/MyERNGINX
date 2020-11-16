import axios from "axios";

export const logOutSession = (user) => {
  //console.log("ENTRA A LOGOUT SESSION");
  localStorage.removeItem("token");
  localStorage.removeItem("persist:nIeTzScHe"); //id del token creado por persist-redux
  axios
    .put(`${process.env.REACT_APP_API_URL}/logout/${user}`)
    .then((res) => {
      //console.log("SET  SESSION ", res.data);
      return (window.location = `/`);
    })
    .catch((error) => {
      console.log("ERROR SET DISPATCH SESSION", error.response);
      //return (window.location = `/error`);
    });
};;

const errorHelperToken = (callback) => {
  return async (req, res, next) => {
    try {
      await callback(req, res, next);
    } catch (error) {
      //console.log("Error Helper Token ", error);
      // req.log.error(`ERROR HELPER TOKEN : ${error}`);
      // for (const e in error) {
      //   req.log.error(`${e}: ${error[e]}`);
      // }
      req.log.error(`Error HelperToken: ${JSON.stringify(error)}`);
      const { name, status, message } = error 
      if (
        name === "JsonWebTokenError" ||
        name === "TokenExpiredError" ||
        name === "NotBeforeError" ||
        name === "JsonWebTokenErrorFamily" ||
        name === "JsonWebTokenErrorUser"
      ) {
        // 3 primeros Error por validacion de TOKEN lib jsonwebtoken, 4-5 Errores creados en middleware (verifyToken.js)
        const errorToken = {
          name: "Token Authentication Failed",
          status: status ? status : 403,
          message,
        };
        return res.status(errorToken.status).json(errorToken);
      } else { // Errores por BD (profile.js) y envio de mails(verifyToken.js)
        return res.status(500).json({
          name: "Server error",
          message: "Something Went Wrong HT",
        });
      }
    }
  };
};

module.exports = errorHelperToken

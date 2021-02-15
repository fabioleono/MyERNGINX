const errorHelperCtrl = (callback) => {
  return async (req, res, next) => {
    try {
      await callback(req, res);
    } catch (error) {
      //console.log("Error Helper DataBase ", error);
      req.log.error(`ERROR HELPER CONTROLLER: ${error}`);
      for (const e in error) {
        req.log.error(`${e}: ${error[e]}`);
      }
      if (error.name === "Form Validation Error") {
        // Error por validaciones  procedimientos DB
        return res.status(error.status).json(error);
      } else {
        return res.status(500).json({
          name: "Server error",
          messagge: "Something Went Wrong HCtrl",
        });
      }
    }
  };
};

module.exports = errorHelperCtrl

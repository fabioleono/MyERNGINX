const errorHelperDB = (callback) => {
  return async (req, res, next) => {
    try {
      await callback(req, res);
    } catch (error) {
      console.log('Error Handler ', error);
      if (error.name === "Form Validation Error") {
        // Error por validaciones  procedimientos
        return res.status(error.status).json(error);
      } else {
        return res.status(500).json({
          name: "Server error",
          messagge: "Something Went Wrong HELPER",
        });
      }
    }
  };
};

module.exports = errorHelperDB

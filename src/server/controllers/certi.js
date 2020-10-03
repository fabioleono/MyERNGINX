const ctrlCerti ={}

ctrlCerti.list = (req, res) => {
  res.status(201).send({"certignv": "ok"})
}

module.exports = ctrlCerti

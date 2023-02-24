import  Query from "../models/Queries.model.js";

export const httpCreateQuery = async (req, res) => {
/* istanbul ignore next*/
  try {
    const query = new Query(req.body);
    await query.save();

    return res.status(201).json({
      success: true,
      message: "query create succefully",
      Query,
    });
  } catch (error) {
    /* istanbul ignore next*/
    return res.status(500).json({
      success: false,
      message: "Error while creating a query!",
      error: error.message,
    });
  }
};
export const findQueri = async(req,res) =>{
  /* istanbul ignore next*/
  const queries = await Query.find();
  res.send(queries);
}

export const deletequery = async (req, res) => {
  /* istanbul ignore next*/
  try {
      const  queries = await Query.deleteOne({ _id: req.params.id });
    res.status(207).send({ok:'delete success'});
  } catch (error) {
    res.status(406);
    res.send({ error: "query doesn't exist!" });
  }
}


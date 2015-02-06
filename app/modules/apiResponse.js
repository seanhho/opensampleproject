module.exports = function(req,res, err, response){
	return res.json({err: err, response: response});
}
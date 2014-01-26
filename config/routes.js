
/*
 * GET home page.
 */

exports.index = function(req, res){
	res.setHeader('Content-Type', 'text/html');
	res.render('index', { title: 'Express' });
};
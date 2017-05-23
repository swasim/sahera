
exports.home = function (req, res) {
    res.render("home");
};


exports.error = function (req, res) {
    res.render("error");
};


exports.notFound = function(req, res) {
	res.render('notFound', {
		title : "Oops, this page doesn't exist"
	});
};

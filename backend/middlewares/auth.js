import jwt from 'jsonwebtoken';

function authenticateToken(req, res, next) {
	const authHeader = req.headers['authorization'];

	let token;
	if (authHeader) {
		token = authHeader && authHeader.split(' ')[1];
	}
	
	if (!token)
		return res.status(401).json({
			message: 'Unauthorized, please insert a correct token',
		});

	jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
		if (err)
			return res.status(403).json({
				message: 'Forbidden to access this resource',
			});
		req.user = user;
		next();
	});
}

export default authenticateToken;

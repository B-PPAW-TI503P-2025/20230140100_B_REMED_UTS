const isAdmin = (req, res, next) => {
    const role = req.headers['x-user-role'];
    if (role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Akses ditolak. Butuh role admin.' });
    }
};

const isUser = (req, res, next) => {
    const role = req.headers['x-user-role'];
    const userId = req.headers['x-user-id']; 
    
    if (role === 'user' && userId) {
        req.userId = userId; 
        next();
    } else {
        res.status(403).json({ message: 'Akses ditolak. Butuh role user dan user ID.' });
    }
};

module.exports = { isAdmin, isUser };
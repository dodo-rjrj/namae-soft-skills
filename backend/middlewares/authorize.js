module.exports = (...rolesAutorises) => {
    return (req, res, next) => {
        if (!req.utilisateur || !rolesAutorises.includes(req.utilisateur.role)) {
            return res.status(403).json({ error: 'Accès interdit : rôle insuffisant.' });
        }
        next();
    };
};


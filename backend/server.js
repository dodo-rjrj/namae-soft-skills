const app = require('./app');
const sequelize = require('./config/database');

const port = process.env.PORT || 3009;

sequelize.authenticate()
    .then(() => {
        console.log('✅ Connexion à la base de données réussie !');
        app.listen(port, () => {
            console.log(`🚀 Backend is listening at http://localhost:${port}`);
        });
    })
    .catch((err) => {
        console.error('❌ Connexion à la base de données échouée :', err.message);
        process.exit(1);
    });

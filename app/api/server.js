(async function () {
    const path = require('path');
    const config = require(path.join(process.cwd(), 'src/config/config'));

    await config.initEnvironmentVariables();

    const sequelize = require('./src/config/lib/sequelize');

    try {
        await sequelize.authenticate();
        await sequelize.sync({ alter: true });

        const app = require('./src/config/lib/app');
        app.start();
    } catch (error) {
        console.error('Database connection/sync failed:', error);
    }
})();
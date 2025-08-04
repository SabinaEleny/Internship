import app from './app';
import config from './config/config';

app.listen(config.port, () => {
    console.log(`✅ Server running at http://localhost:${config.port}`);
});
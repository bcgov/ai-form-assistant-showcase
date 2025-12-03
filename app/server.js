import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import compression from 'compression';
import helmet from 'helmet';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;

app.use(helmet());
app.use(compression());

app.get('/healthz', (req, res) => res.status(200).send('ok'));
app.get('/readyz', (req, res) => res.status(200).send('ready'));

const staticDir = path.join(__dirname, 'public');
app.use(express.static(staticDir));

app.get('*', (req, res) => {
  res.sendFile(path.join(staticDir, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on http://0.0.0.0:${PORT}`);
});


// get environment variables for client-side use
app.get('/config.js', (req, res) => {
  const cfg = {
    ssoRedirecUri: process.env.SSO_REDIRECT_URI || 'http://localhost:5173',
    ssoAuthServerUrl: process.env.SSO_AUTH_SERVER_URL || 'https://dev.loginproxy.com/auth',
    ssoRealm: process.env.SSO_REALM || 'standard',
    ssoClientId: process.env.SSO_CLIENT_ID,
  };
  res.type('application/javascript').send(`window.__APP_CONFIG__ = ${JSON.stringify(cfg)};`);
});


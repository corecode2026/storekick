require('dotenv').config();
const express = require('express');
const session = require('express-session');
const path    = require('path');

const app  = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret:            process.env.SESSION_SECRET || 'change_this_secret',
  resave:            false,
  saveUninitialized: false,
  cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 * 7 }
}));

app.use('/auth',       require('./routes/auth'));
app.use('/api/store',  require('./routes/store'));
app.use('/api/points', require('./routes/points'));

app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));

app.listen(PORT, () => {
  console.log(`✅ السيرفر شغّال: http://localhost:${PORT}`);
  console.log(`🔑 Kick Client ID: ${process.env.KICK_CLIENT_ID ? '✓ موجود' : '✗ غير موجود'}`);
});

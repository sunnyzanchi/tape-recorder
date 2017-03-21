const express = require('express');
const favicon = require('serve-favicon');
const path = require('path');
const app = express();

/* Public */
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.listen(process.env.PORT || 3000);

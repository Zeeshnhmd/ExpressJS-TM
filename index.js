const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');

const logger = require('./middleware/logger');
const router = require('./routes/api/members');
const members = require('./Members');

const app = express();

//* Handlebars Middleware
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

//* Body parser middlware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(logger);

const PORT = process.env.PORT || 5000;

app.use('/api', router);

//* Homepage route
app.get('/', (req, res) =>
	res.render('home', { title: 'Member App', members })
);

/*
 * - Set static folder
 * - Very easy to setup static file in express.
 * - Remember in NodeJS we have too much code to for static file like looking for extension and all.
 */
// app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`));

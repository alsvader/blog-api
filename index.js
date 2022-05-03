require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const app = express();
const axios = require('axios');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const fm = require('front-matter');
const port = 5000;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/media', express.static(path.join(__dirname, 'public/images')));

app.post('/captchaVerification', async (req, res) => {
	const isValidCaptcha = await validateCaptcha(req.body.captcha);

	if (!isValidCaptcha) {
		res.status(400);
		res.json({ message: 'Please verify the reCaptcha' });
		return;
	}

	res.json({ success: true });
});

const validateCaptcha = async (token) => {
	const { RECAPTCHA_KEY } = process.env || '';

	const response = await axios.post(
		`https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_KEY}&response=${token}`,
	);

	return response.data.success;
};

app.get('/articles', (req, res) => {
	const articles = loadArticles();
	res.json(articles);
});

const loadArticles = () => {
	try {
		const dirPath = path.join(__dirname, 'articles');
		const filenames = fs.readdirSync(dirPath);
		const articles = [];

		filenames.forEach((filename) => {
			const markDownFile = path.join(dirPath, filename);
			const data = fs.readFileSync(markDownFile, 'utf8');
			const content = fm(data);
			articles.push(content);
		});

		return articles;
	} catch (error) {
		return [];
	}
};

app.listen(port, () => {
	console.log(`App listening at http://localhost:${port}`);
});

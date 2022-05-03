---
title: Creating a blog with React JS
slug: creating-a-blog-with-react-js
published: 03/17/2022
tag: react
imageCover: blog_with_react.jpeg
description: Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugit molestias deleniti in dicta quasi, rerum tempora corrupti dolor voluptatibus, assumenda, illum quod ut quidem iusto possimus sequi saepe autem beatae!
---

Hello guys!! Today I wanna show you how to create you very first component using react js. React js is one of the most popular javascript libraries, it was developed by Facebook years ago.

```js
import React from 'react';

const Index = () => {
	return <h1>My first component!</h1>;
};

export default Index;
```

```js
export const loadConfiguration = async (dispatch, getState) => {
	try {
		let language = 'en'; // set 'en' by default

		if (navigator.language) {
			const languageTag = navigator.language.split('-');
			language = languageTag[0];
		}

		const langKey = AVAILABLE_LANGUAGES.findIndex(
			(lang) => lang.code === language,
		);

		localStorage.setItem('i18nextLng', language);

		dispatch(SYSTEM_ACTIONS.setLanguageCode(AVAILABLE_LANGUAGES[langKey].code));
		dispatch(SYSTEM_ACTIONS.setLanguageMenuItemSelected(langKey));
		dispatch(
			SYSTEM_ACTIONS.setLanguageLabel(AVAILABLE_LANGUAGES[langKey].label),
		);

		const response = await fetch(
			`${process.env.REACT_APP_API_BASE_URL}/articles`,
		);

		const articles = await response.json();

		articles.sort(
			(a, b) =>
				new Date(b.attributes.published) - new Date(a.attributes.published),
		);

		let tags = articles.map((article) => article.attributes.tag.toLowerCase());
		tags = [...new Set(tags)];

		dispatch(ARTICLES_ACTIONS.setAllArticles(articles));
		dispatch(ARTICLES_ACTIONS.setTags(tags));
	} catch (error) {
		console.log(error);
	}
};
```

```js
import React from 'react';

const Index = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>Home</li>
        </ul>
      </nav>
    </header>
    <main>
      <section>
        <h1>Hello World!</h1>
      </section>
    </main>
    <footer>
      <h3>This the footer</h3>
    </footer>
  )
};

export default index;
```

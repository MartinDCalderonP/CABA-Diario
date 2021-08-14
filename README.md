# CABA Diario

CABA Diario is a newspaper website made in React with React-Materialize. The name comes from the Ciudad Autónoma de Buenos Aires acronym. The styles are on JavaScript, it is responsive and is deployed on Netlify: [https://caba-diario.netlify.app/](https://caba-diario.netlify.app/). It has a backend made in NodeJS, Express and a SQL database deployed on Heroku that it has here own repo: [https://github.com/MartinDCalderonP/CABA-Diario-Backend](https://github.com/MartinDCalderonP/CABA-Diario-Backend).

# Things that are working now

Home Page shows the latest news in database ordered by most important sections and more readed news. It has a bar connected to an API that brings the two principal dollar prices here in Argentina 🇦🇷. One can access the news as well as the sections pages to which they belong and the authors pages.

The header of the Home Pase has a search input to search between the news (for now it only works on home page). 

The sidebar has the authors page, the sections that exists on the database and the theme switcher. One can login but can't register (because there is an error), but for now only shows the user avatar. The login for the authors works but is hidden route for the common users. Here the author can create, update, delete the news that it belongs to him.

The News Page shows the selected news and his details. The Author and the Section Page shows the news that belongs to the author (with an avatar and a bio) or the section selected.

# Next things to add to the project

Fix register.

Reorder files.

Search not only on Home Page.

Site from all the dollar prices.

And a lot more of stuff.
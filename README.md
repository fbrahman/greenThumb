# The Best App You'll Ever Need!
## greenThumb
### **Overview**
Ahhhh, another hot summer, and another chance to fulfill your lifelong desire to grow your own vegetables. You fantasize about sinking your teeth into juicy tomatoes or feeling the crisp kale snap beneath your fingers.... But oh no! You just rememebred...you don't know how to garden! And you can barley keep your smartphone alive, let alone a living, photosythensizing being. Whatever are you going to do? If only there were an app for that....oh wait there is!

Introducing greenThumb, a web application for the modern day gardener. greenThumb provides detailed growing information for your favorite vegetables and how to maximize your yield. Simply type in a desired vegetable, and watch your results flow in. Each result lists key data for each plant, including sun exposure, soil pH, and time to harvest. Educate yourself on crops that grow well in your region and which crops you can grow togther. Create an account, and favorite your most coveted botanicals. Share with friends your success. The fun goes onion on!

### **Technical Overview**
The following packages were used
- express
- body parser
- handlebars
- express validator
- sequelize
- express-session
- cookieParser
- passport
- MySQLStore
- LocalStartegy
- bcrypt

greenThumb accesses a database of vegetable iformation through damwhit's public database found at "https://github.com/damwhit/harvest_helper/blob/master/data/garden_vegetables.csv"

Bulma was the framwork utlized for the front end design. MySQL hosts the database through sequelize which is queried when an entry is inputed. The primary languages used are javascript, html, and css.

The code is stored at https://github.com/fbrahman/greenThumb.

### **Design Features**
The app is simple and intuitve. The Landing Page prompts you to write a vegetable that you would like to grow. If you type in a partial word, the app will search for all vegetables containg those words. For example, if you type in "to" you would get results for "tomato" and "potato". The results propogate on a separate page as pictures of the search results. Upon clicking on the desired vegetable, you will be presented with a page that outlines very detailed information about how to grow the crop. This data was borrowed from the aforementioned public database.

The navigation bar offers a Sign Up feature where you can create a free account so that you may store your favorite vegetables. CLicking this button will take you to a new page where you will be prompted for a username, an email address, and a password.

The navigation bar offers a search bar for you to search for new vegetbales. The bar also offers a home and about page which will take you to the landing page and page about the developers respectively.
```
git clone https://github.com/ecdpalma/alt-cart-react-phonegap
cd alt-cart-react-phonegap/www-src

npm install -g webpack
npm install -g babel
npm install -g gulp

npm install

# Builds Phonegap www
gulp build-app --phonegap

# Serves local with hot reloading
gulp serve

# In project's root directory
phonegap run android --verbose

```

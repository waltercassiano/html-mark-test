# HTML Register Mark Test

# Install Mocha

https://mochajs.org/#installation
$ npm -g install mocha

# Chai Assert Documentation

http://chaijs.com/api/assert/

# Usage
mocha index.js --url="http://example.com" 

### Basic HTTP authentication
* --username="user"
* --username="password"

mocha index.js --url="http://example.com"  --username="user" --username="password"

### Search in a section 
mocha index.js --url="http://example.com"  --wrapper=".selector"

##### Required
* --url="http://example.com"

##### Optional
* --wrapper=".selector"
* --username="user"
* --username="password"

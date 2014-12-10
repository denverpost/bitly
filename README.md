# bitly

A repository of Joe's Bit.ly plugin plus other issues arising from bit.ly shortcoding.

# Developing against shortcoder.php
All you need to try everything but the FTP'ing to prod out is a file named .api_key in your project dir with your bitly API key.

## Complete development instructions:
### Getting Started
```
git clone git@github.com:denverpost/bitly.git
cd bitly
echo 'VALUE_OF_THE_API_KEY' > .api_key
```
### Testing It Out
```
php shortcoder.php
```

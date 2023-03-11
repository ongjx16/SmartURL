# url-shorterner
A React.js x Nest.js project that takes in long urls and transforms it into short, easy-to-use urls.

## How it works
1. Input a normal URL into the text box and press submit
2. React frontend will send a POST request with the long url and receive a JSON payload consisting of the shortened URL
3. Upon clicking on the short URL or entering it into the browser, a GET request will be sent. The SQL3-Lite database in the backend will be queried according to the URL id and user will be redirected to the longURL corresponding to that id. 
4. The shortened URLS are persistent and can be used to accessed the original across system reboots

## Format of shortened URL
As the Nest.js app is deployed using Replit, all the shortened URLS have a base URL of "https://u.jing-xuanxuan2.repl.co/". It is then followed by a 10 digit unique id that is used to idenitfy its corresponding long URL in the database. 

### Sample request: 
https://www.google.com/search?q=govtech&sxsrf=AJOqlzVeRZqtIIYpMBaO-zW1mlwumHOOxA%3A1678525687386&ei=90QMZKmaF6234t4PqLKGwAM&ved=0ahUKEwjp8d66w9P9AhWtm9gFHSiZATgQ4dUDCA8&uact=5&oq=govtech&gs_lcp=Cgxnd3Mtd2l6LXNlcnAQAzIECCMQJzIECCMQJzIECCMQJzIQCAAQgAQQFBCHAhCxAxCDATIFCAAQkQIyBQgAEJECMgoIABCABBAUEIcCMgUIABCABDILCAAQgAQQsQMQgwEyBQgAEIAEOgcIABCxAxBDOgoIABCxAxCDARBDOhAILhCxAxCDARDHARDRAxBDOgQIABBDOgoILhCxAxCDARBDOgcILhCxAxBDOgoILhDHARDRAxBDOhEILhCABBCxAxCDARDHARDRAzoECC4QQzoGCAAQChBDSgQIQRgAUABYxwhg9QloAXABeAGAAeUCiAHECJIBBzIuMS4yLjGYAQCgAQHAAQE&sclient=gws-wiz-serp
### Sample response: 
https://u.jing-xuanxuan2.repl.co/zm6UfxQ3-Y

# nodejs-streamelements 0.0.2
*node-streamelements drop-in replacement w/o request module (node-fetch instead)*

[![npm version](https://badge.fury.io/js/nodejs-streamelements.svg)](https://badge.fury.io/js/nodejs-streamelements)

`npm install nodejs-streamelements`

```javascript
StreamElements = require("nodejs-streamelements");

const se = new StreamElements({
	accountId: "ID",
	token: "TOKEN",
});
```

Intended to be a drop-in replacement for `node-streamelements`. Report any bugs and I will try to fix them.
var url = require('url');
const link = "https://localhost:3000/api/2015-10-12";
var q = url.parse(link, true);
console.log(q.pathname);
console.log(/[0-9]{4}-[0-9]{2}-[0-9]{2}$\b/.test(q.pathname));
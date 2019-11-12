const html = require('html-template-tag')
const layout = require('./layout')

module.exports = () => layout(html`
<h3>404!!</h3>
<p>The page you requested has not been found, you fool. Try something else.</p>
`)

let domainName = document.getElementById('domain').value;
const convertBtn = document.getElementById('convert');
let sourceUrl = document.getElementById('sourceUrl').value;
let destinationUrl = document.getElementById('destinationUrl').value;
const resultsEl = document.getElementById('results');
const condSpan = document.getElementById('cond');
const ruleSpan = document.getElementById('rule');
convertBtn.addEventListener('click', function (e) {
    e.preventDefault();
    domainName = document.getElementById('domain').value;
    sourceUrl = document.getElementById('sourceUrl').value;
    destinationUrl = document.getElementById('destinationUrl').value;
    function domainToHtaccessRewriteCond(domain) {
        if (domain) {
            const url = new URL(domain);
            const hostname = url.hostname;
            const escapedHostname = hostname.replace(/\./g, '\\.');
            const rewriteCond = `RewriteCond %{HTTP_HOST} ^${escapedHostname}$ [NC]`;
            condSpan.innerHTML = '';
            condSpan.appendChild(document.createTextNode(rewriteCond));
            return rewriteCond;
        }
    }
    function createHtaccessRewriteRule(sourceUrl, destinationUrl) {
        const source = new URL(sourceUrl);
        const sourcePathname = source.pathname;
        const rewriteRule = `RewriteRule ^${sourcePathname}$  ${destinationUrl} [NC, R=301, L]`;
        ruleSpan.innerHTML = '';
        ruleSpan.appendChild(document.createTextNode(rewriteRule));
        return rewriteRule;
    }
    domainToHtaccessRewriteCond(domainName);
    createHtaccessRewriteRule(sourceUrl, destinationUrl)
});
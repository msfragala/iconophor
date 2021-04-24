const fetch = require('node-fetch');
const statusesUrl = process.env.STATUSES_URL;

let tm = setTimeout(checkStatus, 0);

async function checkStatus() {
  const [status] = await fetch(statusesUrl).then((res) => res.json());

  if (status && status.state === 'success') {
    console.log(`::set-output name=preview_url::${status.target_url}`);
    clearTimeout(tm);
    return;
  }

  tm = setTimeout(checkStatus, 1000 * 15);
}

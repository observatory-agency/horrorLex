const https = require('https');
const crypto = require('crypto');

module.exports = ({
  collection,
  groupId,
  clusterName,
  publicKey,
  privateKey,
}, searchIndexJson) => new Promise((resolve, reject) => {
  if (!collection.modelAttributes.searchIndexJson) {
    resolve(null);
  }

  const options = {
    hostname: 'cloud.mongodb.com',
    port: 443,
    path: `/api/atlas/v1.0/groups/${groupId}/clusters/${clusterName}/fts/indexes?pretty=true`,
    method: 'POST',
    headers: {
      Authorization: crypto
        .createHash('md5')
        .update(`${publicKey}:${privateKey}`)
        .digest('hex'),
      'Content-Type': 'application/json',
      'Content-Length': searchIndexJson.length,
    },
  };
  const callback = (res) => {
    const data = [];
    res.on('data', (chunk) => data.push(chunk));
    res.on('end', () => resolve(data.join('')));
  };

  const req = https.request(options, callback);

  req.on('error', (err) => reject(err));
  req.write(searchIndexJson);
  req.end();
});

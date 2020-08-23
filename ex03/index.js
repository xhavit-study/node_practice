const fs = require('fs');
const { extname } = require('path');

module.exports.parser = (path) => {
    const readStream = fs.createReadStream(path);
    let reqData = [];
    let size = 0;

    return new Promise((resolve, reject) => {
        const ext = extname(path);
        const stream = fs.createReadStream(path);

        stream.on('data', (chunk) => {
            reqData.push(chunk);
            size += chunk.length;
        });

        stream.on('end', () => {
            let content = Buffer.concat(reqData, size).toString();

            if (ext === '.json') {
                try {
                    content = JSON.parse(content);
                } catch (e) {
                    return reject(e);
                }
            }
            resolve(content);
        });

        stream.on('error', reject);
    });
};

const ZoomdataSDK = require('zoomdata-client/distribute/sdk/zoomdata-client.node');

async function run() {
    const application = {
        secure: true,
        host: '2-5-latest.zoomdata.com',
        port: 443,
        path: '/zoomdata'
    };
    
    const credentials = {
        key: 'oUvpLx0eCi'
    };

    const client = await ZoomdataSDK.createClient({ application, credentials });

    console.log('Client ready');
    
    const queryConfig = {
        filters: [],
        groups: [{
            name: 'position',
            limit: 10,
            sort: { dir: 'asc', name: 'position' }
        }],
        metrics: [
            { name: 'satisfaction', func: 'sum' }
        ]
    };

    try {
        const data = await fetchData(client, 'My FLAT FILE Source', queryConfig);
        console.log('Received data:', data);
    } finally {
        client.close();
    }
}

async function fetchData(client, name, queryConfig) {
    const query = await client.createQuery({ name }, queryConfig);

    console.log('Query created');

    return new Promise((resolve, reject) => {
        console.log('Running query...');
        client.runQuery(query, resolve, reject);
    });
}

run().catch(console.error);

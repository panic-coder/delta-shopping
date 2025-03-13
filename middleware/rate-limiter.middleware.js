// In-memory store to keep track of request counts
const requestCountMap = new Map();

// Rate limiting middleware
const rateLimitMiddleware = (req, res, next) => {
    const clientId = req.ip; // Use IP address as the client identifier (you may use a more secure method in production)
    const limit = 5; // Maximum number of requests allowed per minute
    const windowMs = 60 * 1000; // 1 minute
    console.log("clientId", clientId)
    const currentTimestamp = Date.now();
    let requests = requestCountMap.get(clientId) || [];

    // Filter out requests that fall outside the current time window
    requests = requests.filter((timestamp) => currentTimestamp - timestamp <= windowMs);

    if (requests.length < limit) {
        // If within the limit, add the current request timestamp to the list and proceed with the request
        requests.push(currentTimestamp);
        requestCountMap.set(clientId, requests);
        next();
    } else {
        // If the client exceeded the rate limit, send a 429 Too Many Requests response
        const timeToReset = requests[0] + windowMs - currentTimestamp;
        res.setHeader('Retry-After', Math.ceil(timeToReset / 1000));
        res.status(429).json({ Success: false, Message: 'Too many requests, please try again later.' });
    }
};


module.exports = rateLimitMiddleware;
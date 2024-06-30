const generateShortId = require('ssid');

const URL = require('../models/url');
const { log } = require('console');

async function generateShortURL(req, res){
 const body = req.body;
 if(!body.url) return res.status(400).json({error : 'url is required'});

 const shortID = generateShortId();
 await URL.create({
    shortID : shortID,
    redirectURL : body.url,
    visitHistorty : [],

 });
 
 return res.json({ id : shortID});
 
};

async function getAnalytics(req, res){
    const shortID = req.params.shortID ;
    const result = await URL.findOne({shortID});
    return res.json({
        totalClicks : result.visitHistory.length,
        analytics : result.visitHistory
    });

}

module.exports = {
    generateShortURL,
    getAnalytics,
};
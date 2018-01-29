const mongoose = require('mongoose');
const moment = require('moment');
const Message = mongoose.model('messages');

module.exports = app => {

    app.get('/api/messageData', async (req, res) => {

        const messageData = {
            gpsCount: 0,
            canCount: 0,
            uniqueCanCount: 0,
            totalRuntime: 0,
            canAvgPerSecond: 0,
            canAvgPerGps: 0,
            firstTsMostCans: 0,
            firstTsLeastCans: 0
        }


        // Total GPS messages.
        var gpsTotal = await Message.count({ message_id: '' });
        messageData.gpsCount = gpsTotal;

        // Total CAN messages.
        var canTotal = await Message.count({ gps_id: '' });
        messageData.canCount = canTotal;

        //Total unique CAN messages (for purposes of this count message_id define a unique CAN message)
        const distinctMessagesArr = await Message.distinct('message_id', { 'message_id': { $nin: ['', null] } });
        messageData.uniqueCanCount = distinctMessagesArr.length;

        // Total run time of the data in the file base on the ts (timestamps)
        var start = await Message.find({}, { ts: 1, _id: 0 }).sort({ 'ts': 1 }).limit(1);
        var startTime = start[0].ts;
        console.log('startTime: ', startTime);

        var end = await Message.find({}, { ts: 1, _id: 0 }).sort({ 'ts': -1 }).limit(1);
        var endTime = end[0].ts;
        console.log('endTime: ', endTime);

        var runtimeInMS = (endTime - startTime);

        var tempTime = moment.duration(runtimeInMS);
        var hrs = tempTime.hours() + ' hours ';
        var mins = tempTime.minutes() + ' minutes';

        var runtime = hrs + mins;

        console.log('runtime: ', runtime);
        messageData.totalRuntime = runtime;


        // Average CAN messages per second of run time
        var runtimeInSeconds = runtimeInMS / 1000;
        console.log('seconds: ', runtimeInSeconds);
        var canSecResults = (canTotal / runtimeInSeconds).toFixed(2) + ' cans';
        messageData.canAvgPerSecond = canSecResults;

        // Average CAN messages per gps message
        var canGpsResults = (canTotal / gpsTotal).toFixed(2) + ' cans';
        messageData.canAvgPerGps = canGpsResults;

        // The first ts (timestamp) that contains the most CAN messages
        var firstWithMost = await Message.aggregate([
            { $match: { gps_id: "" } },
            { $group: { _id: "$ts", tsCanCount: { $sum: 1 } } },
            { $sort: { tsCanCount: -1, _id: 1 } },
            { $limit: 1 }
        ]);

        console.log('firstWithMost: ', firstWithMost);
        var mostResults = 'Timestamp: ' + firstWithMost[0]._id + ' CAN message count: ' + firstWithMost[0].tsCanCount;

        messageData.firstTsMostCans = mostResults;

        // The first ts (timestamp) that contains the least CAN messages
        var firstWithLeast = await Message.aggregate([
            { $match: { gps_id: "" } },
            { $group: { _id: "$ts", tsCanCount: { $sum: 1 } } },
            { $sort: { tsCanCount: 1, _id: 1 } },
            { $limit: 1 }
        ]);

        console.log('firstWithLeast: ', firstWithLeast);
        var leastResults = 'Timestamp: ' + firstWithLeast[0]._id + ' CAN message count: ' + firstWithLeast[0].tsCanCount;
        messageData.firstTsLeastCans = leastResults;

        console.log('messageData: ', messageData);

        res.send(messageData);
    });

};
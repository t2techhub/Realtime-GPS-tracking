'use strict';
//const cron = require('node-cron');
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

//var task = cron.schedule('* * * * *', function(){
//  console.log('running a task every minute');
//}, false);

/* exports.cron_job =functions.pubsub.topic('minutely-tick').onPublish((event) => {
	console.log('minutely-tick');
	//task.feed();
	return null;
  }); */
exports.updatePublic = functions.database.ref('/user_devices/{uid}/{deviceId}/public').onWrite((event) => {
    const deviceRef = event.data.ref.parent;
    const isPublic = event.data.val();
    console.log('updatePublic', event.params.uid, event.params.deviceId, isPublic);
    if (isPublic === true)
        return deviceRef.once('value').then((snapshot) => {

            return admin.database().ref('/public_devices/' + snapshot.key).update(snapshot.val());
        });
    else
        return admin.database().ref('/public_devices/' + event.params.deviceId).remove();
});

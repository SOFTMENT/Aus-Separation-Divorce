/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();
const functions = require('firebase-functions');
const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

const stripe = require("stripe")('sk_test_51KFL8tSDWf0JstBgRJPOUYfqUYsQ9LGcOWcvlDqwBCQBkYbh2seevHBkEWetM5qk5GhOlmRR2SSDHYyKg85nb2kQ00RK4Hzq2l');

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
exports.createCustomer = functions.https.onCall(async (data, res) => {
   try{
    const { email,name,uid } = data; 
    const customer = await stripe.customers.create({
        email: email,
        name: name,
          address: {
            city: 'Sydney',
            country: 'AU',
            line1: '27 Fredrick Ave',
            postal_code: '97712',
            state: 'VIP',
          },
      });
      const userRef = db.collection("Users");
      await userRef.doc(uid).update({
        customerId:customer.id
      })
      return {
        customerId:customer.id,
      }
    }
    catch (error) {
        throw new functions.https.HttpsError('error', { error: { message: error.message } });
    }
})
exports.createSubscription = functions.https.onCall(async (data, context) => {
    console.log(functions.config().stripe.api_key)
     // Checking if the request is authenticated
  if (!context.auth) {
    // Throwing an error if not authenticated
    throw new functions.https.HttpsError('unauthenticated', 'You are not authenticated.');
  }
    const {customerId} = data;    
    const priceId = 'price_1P8DhpSDWf0JstBgmCsUdjPO'
    try {
      // Create the subscription. Note we're expanding the Subscription's
      // latest invoice and that invoice's payment_intent
      // so we can pass it to the front end to confirm the payment
      const subscription = await stripe.subscriptions.create({
        customer: customerId,
        items: [{
          price: priceId,
        }],
        payment_behavior: 'default_incomplete',
        payment_settings: { save_default_payment_method: 'on_subscription' },
        expand: ['latest_invoice.payment_intent'],
      });
    
      return {
        subscriptionId: subscription.id,
        clientSecret: subscription.latest_invoice.payment_intent.client_secret,
        subscription
      }
    } catch (error) {
        console.log(error)
        throw new functions.https.HttpsError('error', 'something went wrong');
    }
})

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyCHrkm9mzaZXpZ7rJe8PVh_p0E0QZB2K8Y',
  authDomain: 'music-app-e5501.firebaseapp.com',
  projectId: 'music-app-e5501',
  storageBucket: 'music-app-e5501.appspot.com',
  appId: '1:276186052264:web:da872cc2e1a6ecbee6349d'
}

firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()
const db = firebase.firestore()
const storage = firebase.storage()

db.enablePersistence().catch((err) => {
  console.log(`Firebase persistance error ${err.code}`)
})

const usersCollection = db.collection('users')
const songsCollection = db.collection('songs')
const commentsCollection = db.collection('comments')

export { auth, db, usersCollection, songsCollection, commentsCollection, storage }

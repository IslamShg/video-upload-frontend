import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyDT0V0hBEBX3H2VhQmngzscim41SL-Jwso',
  authDomain: 'video-upload-app-1a36a.firebaseapp.com',
  projectId: 'video-upload-app-1a36a',
  storageBucket: 'video-upload-app-1a36a.appspot.com',
  messagingSenderId: '66809810775',
  appId: '1:66809810775:web:9739dee77a10dbe0e2f812'
}

export const firebaseApp = initializeApp(firebaseConfig)
export const firebaseAuth = getAuth()

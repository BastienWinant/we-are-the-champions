// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getDatabase, ref, push } from "firebase/database"

// FIREBASE APP/DATABASE SETUP
// Your web app's Firebase configuration
const firebaseConfig = require('../firebase.config.json')

// Initialize Firebase App & Database
const app = initializeApp(firebaseConfig);
const database = getDatabase(app)
const endorsementsInDB = ref(database, 'endorsements')

// DOM ELEMENTS
const textArea = document.querySelector("#text-area")
const fromInput = document.querySelector("input[name='from']")
const toInput = document.querySelector("input[name='to']")
const publishBtn = document.querySelector("#publish-btn")

// EVENT LISTENERS
publishBtn.addEventListener("click", () => {
  const postDetails = getInputDetails()
  publishEndorsement(postDetails)
})

// HELPER FUNCTIONS
function getInputDetails() {
  const endorsementText = textArea.value
  const fromName = fromInput.value
  const toName = toInput.value

  const postDetails = {
    text: endorsementText,
    from: fromName,
    to: toName,
    likes: 0,
    date: new Date().toLocaleDateString('en-US')
  }

  return postDetails
}

function publishEndorsement(endorsementData) {
  push(endorsementsInDB, endorsementData)
}
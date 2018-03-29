// ----
// DATA
// ----

var jokes = JSON.parse(window.localStorage.getItem('jokes'))
if (!jokes) {
  // A couple jokes to start with
  jokes = {
    'the horse': {
      setup: 'A horse walks into the bar. The bartender asks...',
      punchline: 'Why the long face?'
    },
    'Orion\'s pants': {
      setup: 'How does Orion keep his pants up?',
      punchline: 'With an asteroid belt.'
    }
  }
}

// The message to display if the jokes object is empty
var noJokesMessage = 'I... I don\'t know any jokes. 😢'

// -------------
// PAGE UPDATERS
// -------------

// Update the listed jokes, based on the jokes object
var jokesMenuList = document.getElementById('jokes-menu')
var updateJokesMenu = function () {
  // Don't worry too much about this code for now.
  // You'll learn how to do advanced stuff like
  // this in a later lesson.
  var jokeKeys = Object.keys(jokes)
  var jokeKeyListItems = jokeKeys.join('</li><li>') || noJokesMessage
  jokesMenuList.innerHTML = '<li>' + jokeKeyListItems + '</li>'
}

// Update the displayed joke, based on the requested joke
var requestedJokeInput = document.getElementById('requested-joke')
var jokeBox = document.getElementById('joke-box')
var updateDisplayedJoke = function () {
  var requestedJokeKey = requestedJokeInput.value
  // jokeBox.textContent = requestedJokeKey
  if (requestedJokeKey in jokes) {
    jokeBox.textContent = jokes[requestedJokeKey].setup + jokes[requestedJokeKey].punchline
  } else {
    jokeBox.textContent = 'No matching joke found'
  }
}

// Function to keep track of all other
// page update functions, so that we
// can call them all at once
var updatePage = function () {
  updateJokesMenu()
  updateDisplayedJoke()
}

// -------
// STARTUP
// -------

// Update the page immediately on startup
updatePage()

// ---------------
// EVENT LISTENERS
// ---------------

// Keep the requested joke up-to-date
requestedJokeInput.addEventListener('input', updateDisplayedJoke)

// Add new jokes
// jokes.KEY = {setup: "SETUPTXT", punchline: "PUNCHTXT"}
var newJoke = document.getElementById('remeber-joke')
var newJokeKey = document.getElementById('new-joke-key')
var newJokeSetup = document.getElementById('new-joke-setup')
var newJokePunch = document.getElementById('new-joke-punchline')
var addNewJoke = function () {
  jokes['' + newJokeKey.value] = {setup: '' + newJokeSetup.value, punchline: '' + newJokePunch.value}
  window.localStorage.setItem('jokes', JSON.stringify(jokes))
  updatePage()
}

newJoke.addEventListener('click', addNewJoke)

var forgetJokeBtn = document.getElementById('forget-joke')
var forgetJokeKey = document.getElementById('forget-joke-key')
var eraseJoke = function () {
  delete jokes['' + forgetJokeKey.value]
  window.localStorage.setItem('jokes', JSON.stringify(jokes))
  updatePage()
}

forgetJokeBtn.addEventListener('click', eraseJoke)

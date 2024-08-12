const passkeyContainer = document.getElementById('passkey-container');
const passkeyInput = document.getElementById('passkey');
const passkeySubmit = document.getElementById('passkey-submit');
const errorMessage = document.getElementById('error-message');

// Use your actual Apps Script web app URL
const scriptURL = 'https://script.google.com/macros/s/AKfycby8q1dKTRmu6j1_rXwJknNsYl0rfool0Jf3YaooZo5vTNMW0m_V2NA0FqxREL_UkqB1kw/exec';

const userPasskey = 'apl soss';  // Your passkey (Alex)
const girlfriendPasskey = 'oranj joos';  // Girlfriend's passkey (Logann)

let currentUser = '';  // To store who is currently logged in (Alex or Logann)

passkeySubmit.addEventListener('click', function () {
    const enteredPasskey = passkeyInput.value;
    if (enteredPasskey === userPasskey || enteredPasskey === girlfriendPasskey) {
        passkeyContainer.style.display = 'none';
        currentUser = enteredPasskey === userPasskey ? 'Alex' : 'Logann';
        createMainContent();
        loadMessages();
    } else {
        errorMessage.innerText = 'Incorrect Passkey';
        errorMessage.style.display = 'block';
    }
});

function createMainContent() {
    const container = document.createElement('div');
    container.classList.add('container');
    container.style.display = 'block';

    const heading = document.createElement('h1');
    heading.innerText = `Goodnight, ${currentUser} 💕`;
    container.appendChild(heading);

    const messageBox = document.createElement('div');
    messageBox.classList.add('message-box');
    messageBox.setAttribute('id', 'message-box');
    container.appendChild(messageBox);

    const messageInput = document.createElement('textarea');
    messageInput.classList.add('message-input');
    messageInput.setAttribute('id', 'message-input');
    messageInput.setAttribute('placeholder', 'Write a message...');
    container.appendChild(messageInput);

    const sendBtn = document.createElement('button');
    sendBtn.classList.add('send-btn');
    sendBtn.innerText = 'Send';
    sendBtn.addEventListener('click', sendMessage);
    container.appendChild(sendBtn);

    const clearBtn = document.createElement('button');
    clearBtn.classList.add('clear-btn');
    clearBtn.innerText = 'Clear Messages';
    clearBtn.addEventListener('click', clearMessages);
    container.appendChild(clearBtn);

    document.body.appendChild(container);
}

function sendMessage() {
    const messageInput = document.getElementById('message-input');
    const messageText = messageInput.value;

    if (messageText) {
        fetch(scriptURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                action: 'send',
                sender: currentUser,
                message: messageText
            })
        }).then(response => response.text())
          .then(result => {
              messageInput.value = '';
              loadMessages(); // Reload messages after sending
          })
          .catch(error => console.error('Error:', error));
    }
}

function loadMessages() {
    fetch(scriptURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'get' })
    }).then(response => response.json())
      .then(data => {
          const messageBox = document.getElementById('message-box');
          messageBox.innerHTML = ''; // Clear previous messages

          data.forEach(message => {
              const messageElement = document.createElement('p');
              messageElement.innerText = `${message.sender}: ${message.message}`;
              messageElement.style.fontFamily = 'Cinzel Decorative, cursive';
              messageElement.style.color = '#fdf5e6';
              messageBox.appendChild(messageElement);
          });

          messageBox.scrollTop = messageBox.scrollHeight; // Scroll to the bottom
      })
      .catch(error => console.error('Error:', error));
}

function clearMessages() {
    // Clearing messages from Google Sheets is not supported in this implementation.
    alert('Clear functionality not supported.');
}

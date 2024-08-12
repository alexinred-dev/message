const passkeyContainer = document.getElementById('passkey-container');
const mainContent = document.getElementById('main-content');
const passkeyInput = document.getElementById('passkey');
const passkeySubmit = document.getElementById('passkey-submit');
const errorMessage = document.getElementById('error-message');

// Set the passkeys
const userPasskey = 'apl soss';  // Your passkey
const girlfriendPasskey = 'oranj joos';  // Girlfriend's passkey

passkeySubmit.addEventListener('click', function () {
    const enteredPasskey = passkeyInput.value;
    if (enteredPasskey === userPasskey || enteredPasskey === girlfriendPasskey) {
        passkeyContainer.classList.add('hidden');
        mainContent.classList.remove('hidden');

        if (enteredPasskey === userPasskey) {
            console.log("Logged in as user.");
            // Additional customization if needed for user account
        } else if (enteredPasskey === girlfriendPasskey) {
            console.log("Logged in as girlfriend.");
            // Additional customization if needed for girlfriend's account
        }
    } else {
        errorMessage.innerText = 'Incorrect Passkey';
        errorMessage.style.display = 'block';
    }
});

// Message Handling
const messageBox = document.getElementById('message-box');
const messageInput = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');

// Load messages from localStorage
let messages = JSON.parse(localStorage.getItem('messages')) || [];

function renderMessages() {
    messageBox.innerHTML = '';
    messages.forEach(msg => {
        const messageElement = document.createElement('p');
        messageElement.innerText = msg;
        messageBox.appendChild(messageElement);
    });
}

sendBtn.addEventListener('click', function () {
    const message = messageInput.value;
    if (message) {
        messages.push(message);
        if (messages.length > 5) {
            messages.shift();
        }
        localStorage.setItem('messages', JSON.stringify(messages));
        renderMessages();
        messageInput.value = '';
    }
});

// Render messages on page load
renderMessages();

// Profile Picture Handling
const profilePic = document.getElementById('profile-pic');
const uploadPic = document.getElementById('upload-pic');

uploadPic.addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            profilePic.src = e.target.result;
            localStorage.setItem('profilePic', e.target.result);
        };
        reader.readAsDataURL(file);
    }
});

// Load profile picture from localStorage
const savedProfilePic = localStorage.getItem('profilePic');
if (savedProfilePic) {
    profilePic.src = savedProfilePic;
}

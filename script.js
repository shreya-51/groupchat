function addTypingIndicator(aiClass, senderName) {
    let typingContainer = document.getElementById('typing-container');
    typingContainer.innerHTML += `<div class="${aiClass} typing-indicator"><p>${senderName} is typing...</p><div class="dots"><div class="dot"></div><div class="dot"></div><div class="dot"></div></div></div>`;
    document.getElementById('chat-box').style.borderBottom = "none";  // Remove border
    document.getElementById('chat-box').scrollTop = document.getElementById('chat-box').scrollHeight;
}

function removeTypingIndicator(aiClass) {
    const typingIndicator = document.querySelector(`.${aiClass}.typing-indicator`);
    if (typingIndicator) typingIndicator.remove();
    // Add border if no typing indicators are left
    if (!document.querySelector('.typing-indicator')) {
        document.getElementById('chat-box').style.borderBottom = "1px solid #ddd";  // Add border
    }
}

async function sendMessage() {
    const inputElement = document.getElementById('user-input');
    const message = inputElement.value;
  
    if (message.trim() === '') return;
  
    const chatBox = document.getElementById('chat-box');
    chatBox.innerHTML += `<p class="user">You: ${message}</p>`;
    chatBox.scrollTop = chatBox.scrollHeight;
    inputElement.value = '';
  
    addTypingIndicator('ai1-typing', 'AI 1'); // Add AI1 typing indicator
  
    // Run AI1 in the background
    const ai1Promise = window.api.runPythonScript('./python/ai1.py', message).then(response1 => {
        removeTypingIndicator('ai1-typing'); // Remove AI1 typing indicator
        chatBox.innerHTML += `<p class="ai1">AI 1: ${response1}</p>`;
        chatBox.scrollTop = chatBox.scrollHeight;
    }).catch(error => {
        removeTypingIndicator('ai1-typing'); // Remove AI1 typing indicator
        console.error(`AI1 Error: ${error}`);
    });
  
    addTypingIndicator('ai2-typing', 'AI 2'); // Add AI2 typing indicator
  
    // Run AI2 in the background
    const ai2Promise = window.api.runPythonScript('./python/ai2.py', message).then(response2 => {
        removeTypingIndicator('ai2-typing'); // Remove AI2 typing indicator
        chatBox.innerHTML += `<p class="ai2">AI 2: ${response2}</p>`;
        chatBox.scrollTop = chatBox.scrollHeight;
    }).catch(error => {
        removeTypingIndicator('ai2-typing'); // Remove AI2 typing indicator
        console.error(`AI2 Error: ${error}`);
    });
  
    // Optionally, if you want to wait for both AIs to finish before doing something else:
    await Promise.all([ai1Promise, ai2Promise]);
}

// Event listener for the 'Enter' key
document.getElementById('user-input').addEventListener('keypress', function(e) {
    if(e.key === 'Enter' && !e.shiftKey) { 
        e.preventDefault(); 
        sendMessage();
    }
});

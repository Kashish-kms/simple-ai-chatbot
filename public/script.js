document.addEventListener('DOMContentLoaded', () => {
    const chatForm = document.getElementById('chat-form');
    const userInput = document.getElementById('user-input');
    const chatMessages = document.getElementById('chat-messages');
    const typingIndicator = document.getElementById('typing-indicator');
    const themeToggle = document.getElementById('theme-toggle');
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    const newChatBtn = document.getElementById('new-chat-btn');
    const historyList = document.getElementById('history-list');

    let conversationHistory = [];

    // Theme Toggle
    themeToggle.addEventListener('click', () => {
        const isDark = document.body.classList.toggle('dark-theme');
        document.body.classList.toggle('light-theme');
        const icon = themeToggle.querySelector('i');
        const text = themeToggle.querySelector('span');
        
        if (isDark) {
            icon.className = 'fas fa-moon';
            text.textContent = 'Dark Mode';
        } else {
            icon.className = 'fas fa-sun';
            text.textContent = 'Light Mode';
        }
    });

    // Sidebar Toggle (Mobile)
    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });

    // Auto-resize textarea
    userInput.addEventListener('input', () => {
        userInput.style.height = 'auto';
        userInput.style.height = userInput.scrollHeight + 'px';
    });

    // Handle form submission
    chatForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const message = userInput.value.trim();
        
        if (!message) return;

        // Add user message to UI
        addMessage(message, 'user');
        userInput.value = '';
        userInput.style.height = 'auto';

        // Add to history
        conversationHistory.push({ role: 'user', content: message });

        // Show typing indicator
        showTypingIndicator();

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ messages: conversationHistory }),
            });

            const data = await response.json();

            if (data.error) {
                throw new Error(data.error);
            }

            // Hide typing indicator and add AI message
            hideTypingIndicator();
            addMessage(data.message, 'ai');
            conversationHistory.push({ role: 'assistant', content: data.message });

            // Update sidebar history if it's the first message
            if (conversationHistory.length === 2) {
                updateSidebarHistory(message);
            }

        } catch (error) {
            console.error('Error:', error);
            hideTypingIndicator();
            addMessage('Sorry, something went wrong. Please check your API key and try again.', 'ai');
        }
    });

    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message animate-in`;
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.innerHTML = sender === 'ai' ? '<i class="fas fa-robot"></i>' : '<i class="fas fa-user"></i>';
        
        const content = document.createElement('div');
        content.className = 'message-content';
        
        const p = document.createElement('p');
        p.textContent = text;
        
        const time = document.createElement('span');
        time.className = 'message-time';
        time.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        content.appendChild(p);
        content.appendChild(time);
        
        if (sender === 'ai') {
            messageDiv.appendChild(avatar);
            messageDiv.appendChild(content);
        } else {
            messageDiv.appendChild(content);
            messageDiv.appendChild(avatar);
        }
        
        chatMessages.appendChild(messageDiv);
        scrollToBottom();
    }

    function showTypingIndicator() {
        typingIndicator.classList.remove('hidden');
        scrollToBottom();
    }

    function hideTypingIndicator() {
        typingIndicator.classList.add('hidden');
    }

    function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function updateSidebarHistory(firstMessage) {
        const item = document.createElement('div');
        item.className = 'history-item';
        item.innerHTML = `<i class="far fa-comment"></i> ${firstMessage.substring(0, 20)}...`;
        historyList.prepend(item);
    }

    // New Chat button
    newChatBtn.addEventListener('click', () => {
        chatMessages.innerHTML = '';
        conversationHistory = [];
        addMessage("Hello! I'm your AI Assistant. How can I help you today?", 'ai');
    });

    // Close sidebar on mobile when clicking outside
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && 
            !sidebar.contains(e.target) && 
            !sidebarToggle.contains(e.target) && 
            sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
        }
    });
});

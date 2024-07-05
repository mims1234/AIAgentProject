document.addEventListener('DOMContentLoaded', () => {
    const chatForm = document.getElementById('chatForm');
    const chatOutput = document.getElementById('chatOutput');
    const modelSelect = document.getElementById('modelSelect');
    const temperatureSlider = document.getElementById('temperatureSlider');
    const topPSlider = document.getElementById('topPSlider');
    const temperatureValue = document.getElementById('temperatureValue');
    const topPValue = document.getElementById('topPValue');

    chatForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const message = document.getElementById('messageInput').value;
        const model = modelSelect.value;
        const temperature = temperatureSlider.value;
        const topP = topPSlider.value;

        displayMessage('You', message, true);
        document.getElementById('messageInput').value = '';

        try {
            const response = await fetch('/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ model, message, temperature, topP })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            displayMessage('AI', data.response, false, model, data.temperature, data.topP, data.tokens, data.timestamp);
        } catch (error) {
            console.error('Error:', error);
            displayMessage('Error', 'Failed to get response from AI');
        }
    });

    function displayMessage(sender, message, isUser = false, model = '', temperature = '', topP = '', tokens = '', timestamp = '') {
        const messageElement = document.createElement('div');
        messageElement.className = `message ${sender.toLowerCase()}`;
        
        const senderElement = document.createElement('strong');
        senderElement.textContent = isUser ? `${sender}:` : `${sender}: (${model})`;
        messageElement.appendChild(senderElement);

        const contentElement = document.createElement('div');
        contentElement.className = 'message-content';

        if (isUser) {
            contentElement.textContent = message;
        } else {
            let codeBlock = false;
            let codeContent = '';
            let codeLanguage = '';

            message.split('\n').forEach(line => {
                if (line.trim().startsWith('```')) {
                    if (codeBlock) {
                        // End of code block
                        const pre = document.createElement('pre');
                        const code = document.createElement('code');
                        if (codeLanguage) {
                            code.className = `language-${codeLanguage}`;
                        }
                        code.textContent = codeContent.trim();
                        pre.appendChild(code);
                        contentElement.appendChild(pre);
                        codeBlock = false;
                        codeContent = '';
                        codeLanguage = '';
                    } else {
                        // Start of code block
                        codeBlock = true;
                        codeLanguage = line.trim().slice(3).trim(); // Get language if specified
                    }
                } else if (codeBlock) {
                    codeContent += line + '\n';
                } else if (line.startsWith('**') && line.endsWith('**')) {
                    const heading = document.createElement('h3');
                    heading.textContent = line.slice(2, -2);
                    contentElement.appendChild(heading);
                } else if (line.startsWith('*') && line.endsWith('*')) {
                    const emphasis = document.createElement('em');
                    emphasis.textContent = line.slice(1, -1);
                    contentElement.appendChild(emphasis);
                } else {
                    const paragraph = document.createElement('p');
                    paragraph.textContent = line;
                    contentElement.appendChild(paragraph);
                }
            });

            // If there's any remaining code content
            if (codeBlock && codeContent) {
                const pre = document.createElement('pre');
                const code = document.createElement('code');
                if (codeLanguage) {
                    code.className = `language-${codeLanguage}`;
                }
                code.textContent = codeContent.trim();
                pre.appendChild(code);
                contentElement.appendChild(pre);
            }

            // Add metadata for AI responses
            if (!isUser) {
                const metadataElement = document.createElement('div');
                metadataElement.className = 'message-metadata';
                metadataElement.innerHTML = `
                    <em>Timestamp: ${timestamp} | Tokens: ${tokens} | Temperature: ${temperature} | Top P: ${topP}</em>
                `;
                contentElement.appendChild(metadataElement);
            }
        }

        messageElement.appendChild(contentElement);
        chatOutput.appendChild(messageElement);
        chatOutput.scrollTop = chatOutput.scrollHeight;

        // Highlight code blocks and add copy buttons
        messageElement.querySelectorAll('pre code').forEach((block) => {
            hljs.highlightElement(block);
            addCopyButton(block.parentElement);
        });
    }

    function addCopyButton(block) {
        const button = document.createElement('button');
        button.textContent = 'Copy';
        button.className = 'copy-button';
        button.addEventListener('click', () => {
            const codeText = block.querySelector('code').textContent;
            navigator.clipboard.writeText(codeText).then(() => {
                button.textContent = 'Copied!';
                setTimeout(() => {
                    button.textContent = 'Copy';
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
                button.textContent = 'Copy failed';
            });
        });
        block.insertBefore(button, block.firstChild);
    }

    temperatureSlider.addEventListener('input', () => {
        temperatureValue.textContent = temperatureSlider.value;
    });

    topPSlider.addEventListener('input', () => {
        topPValue.textContent = topPSlider.value;
    });
});
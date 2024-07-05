document.getElementById('chatForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const model = document.getElementById('modelSelect').value;
    const message = document.getElementById('messageInput').value;
    const temperature = document.getElementById('temperatureSlider').value;
    const topP = document.getElementById('topPSlider').value;

    const response = await fetch('/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model, message, temperature, topP })
    });

    const data = await response.json();
    document.getElementById('chatOutput').innerHTML += `<p><strong>You:</strong> ${message}</p><p><strong>AI:</strong> ${data.response}</p>`;
});

document.getElementById('urlForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const url = document.getElementById('urlInput').value;

    const response = await fetch('/upload/url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
    });

    const data = await response.json();
    document.getElementById('tokenCount').textContent = `Tokens: ${data.tokens}`;
});

document.getElementById('fileForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', document.getElementById('fileInput').files[0]);

    const response = await fetch('/upload/file', {
        method: 'POST',
        body: formData
    });

    const data = await response.json();
    document.getElementById('tokenCount').textContent = `Tokens: ${data.tokens}`;
});

['temperatureSlider', 'topPSlider'].forEach(id => {
    const slider = document.getElementById(id);
    const value = document.getElementById(id.replace('Slider', 'Value'));
    slider.addEventListener('input', () => {
        value.textContent = slider.value;
    });
});
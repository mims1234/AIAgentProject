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
    document.getElementById('messageInput').value = '';
});

['temperatureSlider', 'topPSlider'].forEach(id => {
    const slider = document.getElementById(id);
    const value = document.getElementById(id.replace('Slider', 'Value'));
    slider.addEventListener('input', () => {
        value.textContent = slider.value;
    });
});
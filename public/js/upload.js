document.getElementById('urlForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const url = document.getElementById('urlInput').value;

    const response = await fetch('/upload/url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
    });

    const data = await response.json();
    updateTokenCount(data.tokens);
    addDocumentToList(url, data.tokens);
});

document.getElementById('fileForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const file = document.getElementById('fileInput').files[0];
    formData.append('file', file);

    const response = await fetch('/upload/file', {
        method: 'POST',
        body: formData
    });

    const data = await response.json();
    updateTokenCount(data.tokens);
    addDocumentToList(file.name, data.tokens);
});

function updateTokenCount(tokens) {
    document.getElementById('tokenCount').textContent = `Tokens: ${tokens}`;
}

function addDocumentToList(name, tokens) {
    const li = document.createElement('li');
    li.textContent = `${name} - Tokens: ${tokens}`;
    document.getElementById('documentList').appendChild(li);
}
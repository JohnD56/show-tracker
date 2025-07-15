const form = document.getElementById('show-form');
const logList = document.getElementById('log-list');

let entries = [];

// ✅ Save to localStorage
function saveEntries() {
  localStorage.setItem('watchLogs', JSON.stringify(entries));
}

// ✅ Load from localStorage
function loadEntries() {
  const saved = localStorage.getItem('watchLogs');
  entries = saved ? JSON.parse(saved) : [];
}

// ✅ Render all entries
function renderEntries() {
  logList.innerHTML = '';
  entries.forEach((entry, index) => addEntry(entry.show, entry.episode, entry.timestamp, entry.video, index));
}

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const show = document.getElementById('show').value.trim();
  const episode = document.getElementById('episode').value.trim(); // optional
  const timestamp = document.getElementById('timestamp').value.trim(); // optional
  const video = document.getElementById('video').value.trim(); // optional

  if (show) {
    const newEntry = { show, episode, timestamp, video };
    entries.push(newEntry);
    saveEntries();
    renderEntries();
    form.reset();
  }
});

// ✅ Add a single entry to the DOM
function addEntry(show, episode, timestamp, video, index) {
  const listItem = document.createElement('li');

  const textSpan = document.createElement('span');
  textSpan.innerHTML =
    `${show}` +
    (episode ? ` - ${episode}` : '') +
    (timestamp ? ` @ ${timestamp}` : '') +
    (video ? ` — <a href="${video}" target="_blank" rel="noopener noreferrer">Watch</a>` : '');

  const editBtn = document.createElement('button');
  editBtn.textContent = '✏️ Edit';
  editBtn.className = 'edit';

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '❌ Delete';
  deleteBtn.className = 'delete';

  listItem.appendChild(textSpan);
  listItem.appendChild(editBtn);
  listItem.appendChild(deleteBtn);
  logList.appendChild(listItem);

  // ✅ Edit function
  editBtn.addEventListener('click', () => {
    const newEpisode = prompt('Update Episode (optional):', entries[index].episode || '');
    const newTimestamp = prompt('Update Timestamp (optional):', entries[index].timestamp || '');
    const newVideo = prompt('Update Video Link (optional):', entries[index].video || '');

    if (newEpisode !== null) {
      entries[index].episode = newEpisode.trim();
      entries[index].timestamp = newTimestamp ? newTimestamp.trim() : '';
      entries[index].video = newVideo ? newVideo.trim() : '';
      saveEntries();
      renderEntries();
    }
  });

  // ✅ Delete function
  deleteBtn.addEventListener('click', () => {
    if (confirm('Delete this entry?')) {
      entries.splice(index, 1);
      saveEntries();
      renderEntries();
    }
  });
}

// ✅ QUOTE SECTION
let quoteIndex = 0;
let allQuotes = [];

function showQuoteWithFade(quote) {
  const quoteText = document.getElementById('quote-text');
  const quoteAuthor = document.getElementById('quote-author');

  if (!quoteText || !quoteAuthor) return;

  // Add fade-out
  quoteText.classList.add('fade-out');
  quoteAuthor.classList.add('fade-out');

  setTimeout(() => {
    quoteText.textContent = `"${quote.text}"`;
    quoteAuthor.textContent = `— ${quote.author}`;

    // Fade back in
    quoteText.classList.remove('fade-out');
    quoteAuthor.classList.remove('fade-out');
    quoteText.classList.add('fade-in');
    quoteAuthor.classList.add('fade-in');

    // Remove fade-in class after animation
    setTimeout(() => {
      quoteText.classList.remove('fade-in');
      quoteAuthor.classList.remove('fade-in');
    }, 500);
  }, 300);
}

function startQuoteRotation(quotes) {
  allQuotes = quotes;

  // Show first quote
  showQuoteWithFade(allQuotes[quoteIndex]);

  setInterval(() => {
    quoteIndex = (quoteIndex + 1) % allQuotes.length;
    showQuoteWithFade(allQuotes[quoteIndex]);
  }, 10000);
}

// ✅ Initial Load
window.addEventListener('DOMContentLoaded', () => {
  loadEntries();
  renderEntries();

  fetch('quotes.json')
    .then(response => response.json())
    .then(data => startQuoteRotation(data))
    .catch(error => {
      console.error('Quote fetch failed:', error);
      document.getElementById('quote-text').textContent = "Couldn't load quote.";
    });
});

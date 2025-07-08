const form = document.getElementById('show-form');
const logList = document.getElementById('log-list');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const show = document.getElementById('show').value.trim();
  const episode = document.getElementById('episode').value.trim();
  const timestamp = document.getElementById('timestamp').value.trim();

  if (show && episode) {
    addEntry(show, episode, timestamp);
    form.reset();
  }
});

function addEntry(show, episode, timestamp) {
  const listItem = document.createElement('li');

  const textSpan = document.createElement('span');
  textSpan.textContent = `${show} - ${episode}` + (timestamp ? ` @ ${timestamp}` : '');

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

  editBtn.addEventListener('click', () => {
    const newEpisode = prompt('Update Episode:', episode);
    const newTimestamp = prompt('Update Timestamp (optional):', timestamp);
    if (newEpisode !== null) {
      textSpan.textContent = `${show} - ${newEpisode}` + (newTimestamp ? ` @ ${newTimestamp}` : '');
    }
  });

  deleteBtn.addEventListener('click', () => {
    if (confirm('Delete this entry?')) {
      listItem.remove();
    }
  });
}
const quotes = [
  {
    text: "I am catastrophically in love with you.",
    author: "Cassandra Clare, Clockwork Princess"
  },
  {
    text: "You’re the only thing I’ve ever really wanted. You and all your contradictions.",
    author: "Rebecca Yarros, Fourth Wing"
  },
  {
    text: "If there’s a war, I’d burn the world down just to make sure you survived it.",
    author: "Rebecca Yarros, Iron Flame"
  },
  {
    text: "There is no pretending. I love you, and I will love you until I die.",
    author: "Cassandra Clare, Clockwork Prince"
  }
];
function displayRandomQuote() {
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  const quoteText = document.getElementById('quote-text');
  const quoteAuthor = document.getElementById('quote-author');

  if (!quoteText || !quoteAuthor) {
    console.error("Missing quoteText or quoteAuthor element");
    return;
  }

  quoteText.textContent = `"${quote.text}"`;
  quoteAuthor.textContent = `— ${quote.author}`;
}

window.addEventListener('DOMContentLoaded', () => {
  displayRandomQuote();
});

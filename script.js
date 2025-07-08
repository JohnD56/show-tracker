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
  },
   {
    text: "I’ve wanted to kiss you for a long time, and I want to do it every day for the rest of my life.",
    author: "Cassandra Clare, City of Glass"
  },
   {
    text: "I will love you until I die. And if there is a life after that, I’ll love you then too.",
    author: "Cassandra Clare, City of Glass"
  },
   {
    text: "When I’m with you, I’m more me than I’ve ever been.",
    author: "Cassandra Clare, Clockwork Angel"
  },
  {
    "text": "You’re it. You’re the person I’d choose in every lifetime.",
    "author": "Rebecca Yarros, Fourth Wing"
  },
  {
    text: "There is no pretending. I love you, and I will love you until I die.",
    author: "Cassandra Clare, Clockwork Prince"
  },
  {
    text: "You are my heart. My life. My entire existence.",
    author: "Cassandra Clare, City of Glass"
  },
  {
    text: "I don’t care how many lives I live, it’s you in all of them.",
    author: "Rebecca Yarros, Iron Flame"
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

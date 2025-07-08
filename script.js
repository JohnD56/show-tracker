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
.quote-box {
  position: relative;
  margin-top: 40px;
  padding: 20px;
  border-radius: 16px;
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.5);
  overflow: hidden;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
}

.quote-box blockquote {
  font-size: 16px;
  font-style: italic;
  margin-bottom: 10px;
  color: #333;
  z-index: 2;
  position: relative;
}

.quote-box cite {
  font-size: 14px;
  color: #555;
  font-weight: 500;
  z-index: 2;
  position: relative;
}

.quote-bg {
  position: absolute;
  inset: 0;
  background-image: url('https://i.imgur.com/5IGxBtx.jpeg'); /* Replace with your image */
  background-size: cover;
  background-position: center;
  filter: blur(12px) brightness(0.6);
  z-index: 1;
  opacity: 0.7;
}

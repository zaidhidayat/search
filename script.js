let csvData = [];
let isSearchDone = false;

// Load CSV data on page load
fetch('data.csv')
  .then(response => response.text())
  .then(text => {
    csvData = parseCSV(text);
  });

function parseCSV(text) {
  const lines = text.trim().split('\n');
  const headers = lines[0].split(',');
  return lines.slice(1).map(line => {
    const values = line.split(',');
    let row = {};
    headers.forEach((h, i) => row[h.trim()] = values[i].trim());
    return row;
  });
}

document.getElementById('searchForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const input = document.getElementById('searchInput');
  const keyword = input.value.trim().toLowerCase();
  const resultDiv = document.getElementById('result');
  const button = document.getElementById('searchButton');

  if (!isSearchDone) {
    // Cari data
    const results = csvData.filter(row =>
      Object.values(row).some(val => val.toLowerCase().includes(keyword))
    );

    if (results.length > 0) {
      let html = '';
      results.forEach(row => {
        html += `<div class="data-row">${Object.values(row).join(' - ')}</div>`;
      });
      resultDiv.innerHTML = html;
      button.textContent = 'Cari Lagi';
      isSearchDone = true;
    } else {
      resultDiv.innerHTML = '<div class="data-row">Data tidak ditemukan.</div>';
      button.textContent = 'Cari Lagi';
      isSearchDone = true;
    }
  } else {
    // Reset pencarian
    input.value = '';
    resultDiv.innerHTML = '';
    button.textContent = 'Cari';
    isSearchDone = false;
    input.focus();
  }
});

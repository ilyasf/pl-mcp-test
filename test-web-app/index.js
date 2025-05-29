// Helper: List of 40 popular stock symbols and names
const STOCKS = [
  { symbol: 'AAPL', name: 'Apple' },
  { symbol: 'MSFT', name: 'Microsoft' },
  { symbol: 'GOOGL', name: 'Alphabet' },
  { symbol: 'AMZN', name: 'Amazon' },
  { symbol: 'META', name: 'Meta Platforms' },
  { symbol: 'TSLA', name: 'Tesla' },
  { symbol: 'NVDA', name: 'NVIDIA' },
  { symbol: 'BRK.B', name: 'Berkshire Hathaway' },
  { symbol: 'JPM', name: 'JPMorgan Chase' },
  { symbol: 'V', name: 'Visa' },
  { symbol: 'UNH', name: 'UnitedHealth' },
  { symbol: 'HD', name: 'Home Depot' },
  { symbol: 'PG', name: 'Procter & Gamble' },
  { symbol: 'MA', name: 'Mastercard' },
  { symbol: 'XOM', name: 'Exxon Mobil' },
  { symbol: 'LLY', name: 'Eli Lilly' },
  { symbol: 'ABBV', name: 'AbbVie' },
  { symbol: 'AVGO', name: 'Broadcom' },
  { symbol: 'PEP', name: 'PepsiCo' },
  { symbol: 'COST', name: 'Costco' },
  { symbol: 'MRK', name: 'Merck' },
  { symbol: 'KO', name: 'Coca-Cola' },
  { symbol: 'WMT', name: 'Walmart' },
  { symbol: 'MCD', name: 'McDonald’s' },
  { symbol: 'BAC', name: 'Bank of America' },
  { symbol: 'DIS', name: 'Disney' },
  { symbol: 'ADBE', name: 'Adobe' },
  { symbol: 'CSCO', name: 'Cisco' },
  { symbol: 'VZ', name: 'Verizon' },
  { symbol: 'CMCSA', name: 'Comcast' },
  { symbol: 'PFE', name: 'Pfizer' },
  { symbol: 'T', name: 'AT&T' },
  { symbol: 'NFLX', name: 'Netflix' },
  { symbol: 'ABT', name: 'Abbott Labs' },
  { symbol: 'NKE', name: 'Nike' },
  { symbol: 'ORCL', name: 'Oracle' },
  { symbol: 'INTC', name: 'Intel' },
  { symbol: 'QCOM', name: 'Qualcomm' },
  { symbol: 'TXN', name: 'Texas Instruments' },
  { symbol: 'CRM', name: 'Salesforce' },
  { symbol: 'HON', name: 'Honeywell' }
];

// Load Chart.js from CDN
document.addEventListener('DOMContentLoaded', () => {
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
  script.onload = main;
  document.body.appendChild(script);
});

async function main() {
  const tableBody = document.querySelector('#stocks-table tbody');
  let stocksData = await fetchStocksData();
  stocksData.sort((a, b) => a.name.localeCompare(b.name));
  renderTable(stocksData, tableBody);
  let selectedIdx = 0;
  renderGraphAndSuggestion(stocksData[selectedIdx]);

  tableBody.addEventListener('click', (e) => {
    const row = e.target.closest('tr[data-idx]');
    if (!row) return;
    selectedIdx = +row.dataset.idx;
    document.querySelectorAll('tr[data-idx]').forEach(tr => tr.classList.remove('selected'));
    row.classList.add('selected');
    renderGraphAndSuggestion(stocksData[selectedIdx]);
  });
  // Highlight first row by default
  tableBody.querySelector('tr[data-idx]')?.classList.add('selected');
}

async function fetchStocksData() {
  // Use Financial Modeling Prep API with your API key
  const apiKey = '5tj4NTyA5J2TQBMY2SVBZqHL0tsaVtNp';
  const base = 'https://financialmodelingprep.com/api/v3';
  // Get quotes for all stocks
  const symbols = STOCKS.map(s => s.symbol).join(',');
  const quoteUrl = `${base}/quote/${symbols}?apikey=${apiKey}`;
  let quotes = [];
  try {
    const res = await fetch(quoteUrl);
    quotes = await res.json();
  } catch {
    // fallback: empty
  }
  // Map to our stock list
  return STOCKS.map((s, i) => {
    const q = quotes.find(q => q.symbol === s.symbol) || {};
    return {
      ...s,
      price: q.price || 0,
      changesPercentage: q.changesPercentage || 0,
      idx: i
    };
  });
}

function renderTable(stocks, tableBody) {
  tableBody.innerHTML = stocks.map((s, i) => `
    <tr data-idx="${i}">
      <td>${s.name}</td>
      <td>${s.symbol}</td>
      <td>${s.price ? s.price.toFixed(2) + ' $' : '-'}</td>
    </tr>
  `).join('');
}

async function renderGraphAndSuggestion(stock) {
  const ctx = document.getElementById('stock-graph').getContext('2d');
  // Fetch 1 month historical data (daily)
  const apiKey = '5tj4NTyA5J2TQBMY2SVBZqHL0tsaVtNp';
  const base = 'https://financialmodelingprep.com/api/v3';
  const histUrl = `${base}/historical-price-full/${stock.symbol}?serietype=line&timeseries=30&apikey=${apiKey}`;
  let hist = [];
  try {
    const res = await fetch(histUrl);
    const data = await res.json();
    hist = (data.historical || []).reverse();
  } catch {
    // fallback: random walk
    hist = Array.from({length: 30}, (_, i) => ({
      date: `Day ${i+1}`,
      close: stock.price * (1 + (Math.random()-0.5)*0.1)
    }));
  }
  // Prepare data for chart
  const labels = hist.map(h => h.date);
  const prices = hist.map(h => h.close);
  // Destroy previous chart if exists
  if (window.stockChart) window.stockChart.destroy();
  window.stockChart = new window.Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: `${stock.name} (${stock.symbol}) - Last Month`,
        data: prices,
        borderColor: '#1976d2',
        backgroundColor: 'rgba(25, 118, 210, 0.08)',
        fill: true,
        tension: 0.2,
        pointRadius: 0
      }]
    },
    options: {
      plugins: { legend: { display: false } },
      scales: {
        x: { display: false },
        y: { display: true, beginAtZero: false }
      },
      responsive: true,
      maintainAspectRatio: false
    }
  });
  // Suggestion block
  const suggestion = getSuggestion(prices);
  document.getElementById('suggestions-block').innerHTML = `
    <div class="suggestion-header">AI Suggestion</div>
    <div class="suggestion-text">${suggestion}</div>
  `;
}

function getSuggestion(prices) {
  if (!prices.length) return 'No data available.';
  const diff = prices[prices.length-1] - prices[0];
  const trend = diff > 0 ? 'increasing' : 'decreasing';
  const action = diff > 0 ? 'hold or buy' : 'sell';
  const randomAdvice = [
    `Based on the trend, it would keep ${trend}. AI suggests to ${action} this stock now.`,
    `AI analysis: The price is ${trend}. Consider to ${action}.`,
    `Trend detected: ${trend}. Action: ${action}.`,
    `AI suggests: ${action} (trend: ${trend}).`
  ];
  return randomAdvice[Math.floor(Math.random()*randomAdvice.length)];
}

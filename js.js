  const API_KEY = 'YOUR_API_KEY_HERE'; // Get free key from exchangerate-api.com

  const amountInput = document.getElementById('amount');
  const fromCurrency = document.getElementById('fromCurrency');
  const toCurrency = document.getElementById('toCurrency');
  const convertedAmount = document.getElementById('convertedAmount');
  const exchangeRateDisplay = document.getElementById('exchangeRate');

  // Fetch exchange rate and convert
  async function convertCurrency() {
    const amount = amountInput.value || 1;
    const from = fromCurrency.value;
    const to = toCurrency.value;

    if (!amount || amount < 0) return;

    exchangeRateDisplay.textContent = 'Loading...';
    exchangeRateDisplay.classList.add('loading');

    try {
      const response = await fetch(
        `https://api.exchangerate-api.com/v4/latest/${from}`
      );
      const data = await response.json();
      const rate = data.rates[to];
      const converted = (amount * rate).toFixed(2);

      convertedAmount.value = converted;
      exchangeRateDisplay.textContent = `1 ${from} = ${rate.toFixed(4)} ${to}`;
      exchangeRateDisplay.classList.remove('loading');
    } catch (error) {
      exchangeRateDisplay.textContent = 'Error fetching exchange rate';
      console.error('Error:', error);
    }
  }

  function swapCurrencies() {
    [fromCurrency.value, toCurrency.value] = [
      toCurrency.value,
      fromCurrency.value,
    ];
    convertCurrency();
  }

  // Event listeners
  amountInput.addEventListener('input', convertCurrency);
  fromCurrency.addEventListener('change', convertCurrency);
  toCurrency.addEventListener('change', convertCurrency);

  // Initial conversion
  convertCurrency();
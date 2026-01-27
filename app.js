// API Configuration
// Using Metals-API.com (free tier available with API key)
// Alternative APIs: goldapi.io, metalpriceapi.com
const API_CONFIG = {
    // Replace with your actual API key from https://metals-api.com
    apiKey: 'YOUR_API_KEY_HERE',
    baseUrl: 'https://metals-api.com/api/latest',
    // Symbols for precious metals
    symbols: 'XAU,XAG,XPT,XPD', // Gold, Silver, Platinum, Palladium
    baseCurrency: 'USD'
};

// State management
let lastPrices = {
    gold: null,
    silver: null,
    platinum: null,
    palladium: null
};

// Fetch prices from API
async function fetchMetalPrices() {
    try {
        // For demo purposes, if no API key is set, use mock data
        if (API_CONFIG.apiKey === 'YOUR_API_KEY_HERE') {
            return getMockPrices();
        }

        const url = `${API_CONFIG.baseUrl}?access_key=${API_CONFIG.apiKey}&base=${API_CONFIG.baseCurrency}&symbols=${API_CONFIG.symbols}`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.success) {
            // Metals-API returns prices per gram in base currency
            // Convert to per troy ounce (1 troy oz = 31.1035 grams)
            const GRAMS_PER_TROY_OUNCE = 31.1035;
            
            return {
                gold: (1 / data.rates.XAU) * GRAMS_PER_TROY_OUNCE,
                silver: (1 / data.rates.XAG) * GRAMS_PER_TROY_OUNCE,
                platinum: (1 / data.rates.XPT) * GRAMS_PER_TROY_OUNCE,
                palladium: (1 / data.rates.XPD) * GRAMS_PER_TROY_OUNCE
            };
        } else {
            throw new Error('API request was not successful');
        }
    } catch (error) {
        console.error('Error fetching metal prices:', error);
        // Return mock data as fallback
        return getMockPrices();
    }
}

// Mock data for demonstration (realistic price ranges as of 2026)
function getMockPrices() {
    const basePrice = {
        gold: 2350 + (Math.random() * 100 - 50),
        silver: 28 + (Math.random() * 2 - 1),
        platinum: 1150 + (Math.random() * 50 - 25),
        palladium: 1050 + (Math.random() * 40 - 20)
    };
    
    return basePrice;
}

// Calculate percentage change
function calculateChange(current, previous) {
    if (!previous) return 0;
    return ((current - previous) / previous) * 100;
}

// Format price to currency
function formatPrice(price) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(price);
}

// Format percentage change
function formatChange(change) {
    const sign = change >= 0 ? '+' : '';
    return `${sign}${change.toFixed(2)}%`;
}

// Update UI with new prices
function updatePriceDisplay(prices) {
    const metals = ['gold', 'silver', 'platinum', 'palladium'];
    
    metals.forEach(metal => {
        const priceElement = document.getElementById(`${metal}Price`);
        const changeElement = document.getElementById(`${metal}Change`);
        
        // Update price
        priceElement.textContent = formatPrice(prices[metal]);
        priceElement.classList.remove('loading');
        
        // Calculate and update change
        const change = calculateChange(prices[metal], lastPrices[metal]);
        changeElement.textContent = formatChange(change);
        
        // Update change styling
        changeElement.classList.remove('positive', 'negative');
        if (change > 0) {
            changeElement.classList.add('positive');
        } else if (change < 0) {
            changeElement.classList.add('negative');
        }
        
        // Store current price for next comparison
        lastPrices[metal] = prices[metal];
    });
    
    // Update timestamp
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    document.getElementById('lastUpdate').textContent = timeString;
}

// Initialize and start price updates
async function init() {
    // Show loading state
    document.querySelectorAll('.price').forEach(el => {
        el.classList.add('loading');
    });
    
    // Initial fetch
    const prices = await fetchMetalPrices();
    updatePriceDisplay(prices);
    
    // Update prices every 30 seconds
    setInterval(async () => {
        const prices = await fetchMetalPrices();
        updatePriceDisplay(prices);
    }, 30000);
}

// Smooth scroll for navigation links
document.addEventListener('DOMContentLoaded', () => {
    // Initialize price updates
    init();
    
    // Smooth scroll functionality
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Log API setup instructions
    console.log('%c💡 API Setup Instructions', 'font-size: 16px; font-weight: bold; color: #FFD700;');
    console.log('To display live prices, get a free API key from:');
    console.log('1. https://metals-api.com (recommended)');
    console.log('2. https://goldapi.io');
    console.log('3. https://metalpriceapi.com');
    console.log('\nThen update the API_CONFIG.apiKey in app.js with your key.');
    console.log('\nCurrently using mock data for demonstration.');
});

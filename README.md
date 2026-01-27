# NEXUS COIN & BULLION

A modern, responsive website for a coin and bullion shop featuring live precious metal prices for gold, silver, platinum, and palladium.

## Features

- 🥇 **Live Price Tracking** - Real-time precious metal prices
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- 🎨 **Professional Styling** - Modern, clean design with precious metal theme
- ⚡ **Fast & Lightweight** - Pure HTML, CSS, and JavaScript (no frameworks)
- 🔄 **Auto-Refresh** - Prices update automatically every 30 seconds

## Precious Metals Tracked

- **Gold (XAU)** - Per troy ounce in USD
- **Silver (XAG)** - Per troy ounce in USD
- **Platinum (XPT)** - Per troy ounce in USD
- **Palladium (XPD)** - Per troy ounce in USD

## Getting Started

### Quick Start

1. Clone or download this repository
2. Open `index.html` in your web browser
3. The site will display mock prices by default

### Setting Up Live Prices

To display real-time precious metal prices, you'll need an API key:

1. **Get a free API key** from one of these providers:
   - [Metals-API.com](https://metals-api.com) (Recommended)
   - [GoldAPI.io](https://goldapi.io)
   - [MetalPriceAPI.com](https://metalpriceapi.com)

2. **Update the API configuration** in `app.js`:
   ```javascript
   const API_CONFIG = {
       apiKey: 'YOUR_API_KEY_HERE', // Replace with your actual API key
       baseUrl: 'https://metals-api.com/api/latest',
       symbols: 'XAU,XAG,XPT,XPD',
       baseCurrency: 'USD'
   };
   ```

3. **Refresh the page** - Prices will now update from the live API

## Project Structure

```
nexus-coin-bullion/
├── index.html      # Main HTML structure
├── styles.css      # Styling and responsive design
├── app.js          # JavaScript for price fetching and UI updates
└── README.md       # This file
```

## Customization

### Changing Colors

Edit the CSS variables in `styles.css`:

```css
:root {
    --gold: #FFD700;
    --silver: #C0C0C0;
    --platinum: #E5E4E2;
    --dark-bg: #1a1a2e;
    --accent: #0f3460;
}
```

### Modifying Update Frequency

In `app.js`, change the interval (default: 30000ms = 30 seconds):

```javascript
setInterval(async () => {
    const prices = await fetchMetalPrices();
    updatePriceDisplay(prices);
}, 30000); // Change this value
```

### Adding More Information

Edit `index.html` to add:
- Business hours
- Location/address details
- Product catalog
- Contact form
- Gallery of products

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Technologies Used

- HTML5
- CSS3 (Grid, Flexbox, Custom Properties)
- Vanilla JavaScript (ES6+)
- Fetch API for data retrieval

## Deployment

This is a static website and can be deployed to:

- **GitHub Pages** - Free hosting for static sites
- **Netlify** - Automatic deployment from Git
- **Vercel** - Zero-config deployments
- **Any web hosting** - Simply upload all files via FTP

### Example: Deploy to GitHub Pages

1. Create a new repository on GitHub
2. Push this code to the repository
3. Go to Settings → Pages
4. Select the main branch as the source
5. Your site will be live at `https://yourusername.github.io/nexus-coin-bullion`

## License

This project is open source and available for personal and commercial use.

## Support

For questions or issues, please contact: info@nexuscoinbullion.com

---

**Note**: This website displays indicative precious metal prices. For actual buy/sell rates and transactions, please contact the business directly.

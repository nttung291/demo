describe('Currency List', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
    
    // Make sure we have data in the list
    await element(by.id('action-button')).tap();
    await element(by.text('Insert All Data')).tap();
  });

  it('should display currency items correctly', async () => {
    // Check that the list is visible
    await expect(element(by.id('currency-list'))).toBeVisible();
    
    // Check that at least one currency item is visible
    await expect(element(by.id('currency-item'))).toBeVisible();
  });

  it('should filter to show only crypto currencies', async () => {
    // Tap on the "Crypto" filter
    await element(by.id('crypto-filter')).tap();
    
    // Check that Bitcoin is visible (it's a crypto)
    await expect(element(by.text('Bitcoin'))).toBeVisible();
    
    // Check that USD is not visible (it's a fiat)
    await expect(element(by.text('US Dollar'))).not.toBeVisible();
  });

  it('should filter to show only fiat currencies', async () => {
    // Tap on the "Fiat" filter
    await element(by.id('fiat-filter')).tap();
    
    // Check that USD is visible (it's a fiat)
    await expect(element(by.text('US Dollar'))).toBeVisible();
    
    // Check that Bitcoin is not visible (it's a crypto)
    await expect(element(by.text('Bitcoin'))).not.toBeVisible();
  });

  it('should search for currencies by name', async () => {
    // Type "Bitcoin" in the search bar
    await element(by.id('search-input')).typeText('Bitcoin');
    
    // Check that Bitcoin is visible
    await expect(element(by.text('Bitcoin'))).toBeVisible();
    
    // Check that Ethereum is not visible
    await expect(element(by.text('Ethereum'))).not.toBeVisible();
    
    // Clear the search
    await element(by.id('clear-search')).tap();
  });

  it('should search for currencies by symbol', async () => {
    // Type "ETH" in the search bar
    await element(by.id('search-input')).typeText('ETH');
    
    // Check that Ethereum is visible
    await expect(element(by.text('Ethereum'))).toBeVisible();
    
    // Check that Bitcoin is not visible
    await expect(element(by.text('Bitcoin'))).not.toBeVisible();
    
    // Clear the search
    await element(by.id('clear-search')).tap();
  });

  it('should handle partial name matches with space prefix', async () => {
    // Type "Classic" in the search bar to match "Ethereum Classic"
    await element(by.id('search-input')).typeText('Classic');
    
    // Check that Ethereum Classic is visible
    await expect(element(by.text('Ethereum Classic'))).toBeVisible();
    
    // Clear the search
    await element(by.id('clear-search')).tap();
  });

  it('should combine search and filter', async () => {
    // Tap on the "Crypto" filter
    await element(by.id('crypto-filter')).tap();
    
    // Type "ETH" in the search bar
    await element(by.id('search-input')).typeText('ETH');
    
    // Check that Ethereum is visible
    await expect(element(by.text('Ethereum'))).toBeVisible();
    
    // Check that Bitcoin is not visible
    await expect(element(by.text('Bitcoin'))).not.toBeVisible();
    
    // Check that USD is not visible (it's a fiat)
    await expect(element(by.text('US Dollar'))).not.toBeVisible();
  });
});

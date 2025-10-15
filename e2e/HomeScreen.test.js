describe('Home Screen', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should display the home screen with all components', async () => {
    await expect(element(by.id('search-bar'))).toBeVisible();
    await expect(element(by.id('filter-selector'))).toBeVisible();
    await expect(element(by.id('currency-list'))).toBeVisible();
  });

  it('should filter currencies when filter chips are pressed', async () => {
    // Check that the "All" filter is selected by default
    await expect(element(by.id('all-filter'))).toHaveLabel('selected');
    
    // Tap on the "Fiat" filter
    await element(by.id('fiat-filter')).tap();
    await expect(element(by.id('fiat-filter'))).toHaveLabel('selected');
    await expect(element(by.id('all-filter'))).not.toHaveLabel('selected');
    
    // Tap on the "Crypto" filter
    await element(by.id('crypto-filter')).tap();
    await expect(element(by.id('crypto-filter'))).toHaveLabel('selected');
    await expect(element(by.id('fiat-filter'))).not.toHaveLabel('selected');
    
    // Tap back on the "All" filter
    await element(by.id('all-filter')).tap();
    await expect(element(by.id('all-filter'))).toHaveLabel('selected');
  });

  it('should search for currencies', async () => {
    // Type "Bitcoin" in the search bar
    await element(by.id('search-input')).typeText('Bitcoin');
    await expect(element(by.text('Bitcoin'))).toBeVisible();
    
    // Clear the search
    await element(by.id('clear-search')).tap();
    await expect(element(by.id('search-input'))).toHaveText('');
  });

  it('should open and close the action bottom sheet', async () => {
    // Open the bottom sheet
    await element(by.id('action-button')).tap();
    await expect(element(by.text('Database Actions'))).toBeVisible();
    
    // Close the bottom sheet
    await element(by.id('close-bottom-sheet')).tap();
    await expect(element(by.text('Database Actions'))).not.toBeVisible();
  });

  it('should perform database actions', async () => {
    // Open the bottom sheet
    await element(by.id('action-button')).tap();
    
    // Clear the database
    await element(by.text('Clear Database')).tap();
    await expect(element(by.text('No currencies found'))).toBeVisible();
    
    // Open the bottom sheet again
    await element(by.id('action-button')).tap();
    
    // Insert data
    await element(by.text('Insert All Data')).tap();
    await expect(element(by.text('No currencies found'))).not.toBeVisible();
  });

  it('should handle pull-to-refresh', async () => {
    // Pull to refresh the list
    await element(by.id('currency-list')).swipe('down', 'fast', 0.5);
    
    // Wait for refresh to complete
    await waitFor(element(by.id('currency-list'))).not.toBeVisible().withTimeout(2000);
    await expect(element(by.id('currency-list'))).toBeVisible();
  });
});

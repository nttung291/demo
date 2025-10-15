describe('Action Bottom Sheet', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should open when action button is pressed', async () => {
    // Initially, the bottom sheet should not be visible
    await expect(element(by.text('Database Actions'))).not.toBeVisible();
    
    // Tap the action button
    await element(by.id('action-button')).tap();
    
    // The bottom sheet should now be visible
    await expect(element(by.text('Database Actions'))).toBeVisible();
  });

  it('should close when tapping outside or on close button', async () => {
    // Open the bottom sheet
    await element(by.id('action-button')).tap();
    await expect(element(by.text('Database Actions'))).toBeVisible();
    
    // Tap outside to close
    await element(by.id('bottom-sheet-backdrop')).tap();
    await expect(element(by.text('Database Actions'))).not.toBeVisible();
    
    // Open the bottom sheet again
    await element(by.id('action-button')).tap();
    await expect(element(by.text('Database Actions'))).toBeVisible();
    
    // Tap the close button
    await element(by.id('close-bottom-sheet')).tap();
    await expect(element(by.text('Database Actions'))).not.toBeVisible();
  });

  it('should clear the database when Clear Database button is pressed', async () => {
    // First, make sure we have data
    await element(by.id('action-button')).tap();
    await element(by.text('Insert Data')).tap();
    
    // Check that we have data
    await expect(element(by.id('currency-item'))).toBeVisible();
    
    // Open the bottom sheet again
    await element(by.id('action-button')).tap();
    
    // Clear the database
    await element(by.text('Clear Database')).tap();
    
    // Check that we have no data
    await expect(element(by.text('No currencies found'))).toBeVisible();
  });

  it('should insert data when Insert Data button is pressed', async () => {
    // First, clear the database
    await element(by.id('action-button')).tap();
    await element(by.text('Clear Database')).tap();
    
    // Check that we have no data
    await expect(element(by.text('No currencies found'))).toBeVisible();
    
    // Open the bottom sheet again
    await element(by.id('action-button')).tap();
    
    // Insert data
    await element(by.text('Insert All Data')).tap();
    
    // Check that we have data
    await expect(element(by.id('currency-item'))).toBeVisible();
  });
});

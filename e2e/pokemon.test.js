describe('Pokemon App Flow', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });
  
  // Helper function to wait for the list to load
  async function waitForListToLoad() {
    await waitFor(element(by.id('pokemon-list')))
      .toBeVisible()
      .withTimeout(10000);
  }

  it('should display the Pokemon list screen', async () => {
    // Wait for the Pokemon list to load
    await waitFor(element(by.id('pokemon-list')))
      .toBeVisible()
      .withTimeout(10000);

    // Check if at least one Pokemon item is visible
    await expect(element(by.id('pokemon-item-0'))).toBeVisible();
  });

  it('should navigate to Pokemon detail when tapping on a Pokemon', async () => {
    // Wait for the list to load
    await waitFor(element(by.id('pokemon-list')))
      .toBeVisible()
      .withTimeout(10000);

    // Tap on the first Pokemon
    await element(by.id('pokemon-item-0')).tap();

    // Check if we're on the detail screen
    await waitFor(element(by.id('pokemon-detail-scroll')))
      .toBeVisible()
      .withTimeout(5000);

    // Verify Pokemon details are visible
    await expect(element(by.id('pokemon-name'))).toBeVisible();
    await expect(element(by.id('pokemon-image'))).toBeVisible();
    await expect(element(by.id('stats-container'))).toBeVisible();
    await expect(element(by.id('physical-attributes'))).toBeVisible();
    await expect(element(by.id('abilities-container'))).toBeVisible();
  });

  it('should navigate back from detail to list', async () => {
    // Wait for the list to load
    await waitFor(element(by.id('pokemon-list')))
      .toBeVisible()
      .withTimeout(10000);

    // Tap on the first Pokemon
    await element(by.id('pokemon-item-0')).tap();

    // Wait for detail screen
    await waitFor(element(by.id('pokemon-detail-scroll')))
      .toBeVisible()
      .withTimeout(5000);

    // Go back
    await device.pressBack();

    // Check if we're back on the list screen
    await waitFor(element(by.id('pokemon-list')))
      .toBeVisible()
      .withTimeout(5000);
  });

  it('should load more Pokemon when scrolling to the bottom', async () => {
    // Wait for the list to load
    await waitFor(element(by.id('pokemon-list')))
      .toBeVisible()
      .withTimeout(10000);

    // Get initial number of items
    const initialItems = await element(by.id('pokemon-list')).getAttributes();
    const initialCount = initialItems.elements.length;

    // Scroll to the bottom
    await element(by.id('pokemon-list')).scrollTo('bottom');

    // Wait for more items to load
    await waitFor(element(by.id('pokemon-item-' + initialCount)))
      .toBeVisible()
      .withTimeout(5000);

    // Verify more items loaded
    const updatedItems = await element(by.id('pokemon-list')).getAttributes();
    expect(updatedItems.elements.length).toBeGreaterThan(initialCount);
  });

  it('should show Pokemon type information on detail screen', async () => {
    // Wait for the list to load
    await waitFor(element(by.id('pokemon-list')))
      .toBeVisible()
      .withTimeout(10000);

    // Tap on the first Pokemon
    await element(by.id('pokemon-item-0')).tap();

    // Wait for detail screen
    await waitFor(element(by.id('pokemon-detail-scroll')))
      .toBeVisible()
      .withTimeout(5000);

    // Check if type tags are visible
    await expect(element(by.id('pokemon-type-0'))).toBeVisible();
  });

  it('should display Pokemon stats with stat bars', async () => {
    // Navigate to detail screen
    await waitForListToLoad();
    await element(by.id('pokemon-item-0')).tap();
    
    await waitFor(element(by.id('pokemon-detail-scroll')))
      .toBeVisible()
      .withTimeout(5000);
    
    // Check for stats container and stat bars
    await expect(element(by.id('stats-container'))).toBeVisible();
    await expect(element(by.id('stat-bar-0'))).toBeVisible();
    await expect(element(by.id('stat-row-0'))).toBeVisible();
  });

  it('should handle device rotation', async () => {
    // Start in portrait
    await device.setOrientation('portrait');
    await waitForListToLoad();
    
    // Verify list is visible in portrait
    await expect(element(by.id('pokemon-list'))).toBeVisible();
    
    // Rotate to landscape
    await device.setOrientation('landscape');
    
    // Verify list is still visible after rotation
    await expect(element(by.id('pokemon-list'))).toBeVisible();
    
    // Return to portrait for other tests
    await device.setOrientation('portrait');
  });

  it('should handle app backgrounding and foregrounding', async () => {
    // Start with the app
    await waitForListToLoad();
    
    // Send app to background
    await device.sendToHome();
    
    // Bring app back to foreground
    await device.launchApp({ newInstance: false });
    
    // Verify the app recovers and shows the list
    await waitFor(element(by.id('pokemon-list')))
      .toBeVisible()
      .withTimeout(5000);
  });
});

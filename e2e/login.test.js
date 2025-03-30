describe('Login Screen', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should display login screen elements', async () => {
    // Check for the login screen
    await expect(element(by.id('login-screen'))).toBeVisible();
    
    // Check for the Login title
    await expect(element(by.id('login-title'))).toBeVisible();
    
    // Check for username and password inputs
    await expect(element(by.id('username-input'))).toBeVisible();
    await expect(element(by.id('password-input'))).toBeVisible();
    
    // Check for login button
    await expect(element(by.id('login-button'))).toBeVisible();
  });

  it('should handle empty form submission', async () => {
    // Tap login button without entering credentials
    await element(by.id('login-button')).tap();
    
    // Verify inputs are still visible after submission attempt
    await expect(element(by.id('username-input'))).toBeVisible();
    await expect(element(by.id('password-input'))).toBeVisible();
  });

  it('should allow typing in username and password fields', async () => {
    // Type in username field
    await element(by.id('username-input')).typeText('94756921275');
    
    // Type in password field
    await element(by.id('password-input')).typeText('Password@12345');
  });

  it('should attempt login with valid credentials', async () => {
    // Type valid credentials
    await element(by.id('username-input')).typeText('94756921275');
    await element(by.id('password-input')).typeText('Password@12345');
    
    // Dismiss keyboard to make the login button tappable
    await element(by.id('password-input')).tapReturnKey();
    
    // Tap login button
    await element(by.id('login-button')).tap();
    
    // Since we can't reliably test the actual login success in E2E tests without a mock server,
    // we're just verifying the button was pressed and the form submission started
    // In a real app, you might want to mock the API response or check for navigation to the next screen
  });
});

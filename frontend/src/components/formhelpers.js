export function renderSignInForm(container) {
    container.innerHTML = `
      <div class="modal">
        <div class="modal-content">
          <h2>Sign In</h2>
          <p id="signInError" class="error"></p>
          <form id="signInForm">
            <div class="form-group">
              <label for="email">Email:</label>
              <input type="email" id="email" required>
            </div>
            <div class="form-group">
              <label for="password">Password:</label>
              <input type="password" id="password" required>
            </div>
            <button type="submit">Sign In</button>
          </form>
        </div>
      </div>
    `;
  
    const form = document.getElementById('signInForm');
    const errorElement = document.getElementById('signInError');
  
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
  
      if (!email || !password) {
        errorElement.textContent = 'Please fill in all fields';
      } else {
        console.log('Signing in with', { email, password });
        errorElement.textContent = '';
      }
    });
  }
  
  export function renderSignUpForm(container) {
    container.innerHTML = `
      <div class="modal">
        <div class="modal-content">
          <h2>Sign Up</h2>
          <p id="signUpError" class="error"></p>
          <form id="signUpForm">
            <div class="form-group">
              <label for="username">Username:</label>
              <input type="text" id="username" required>
            </div>
            <div class="form-group">
              <label for="email">Email:</label>
              <input type="email" id="email" required>
            </div>
            <div class="form-group">
              <label for="password">Password:</label>
              <input type="password" id="password" required>
            </div>
            <div class="form-group">
              <label for="confirmPassword">Confirm Password:</label>
              <input type="password" id="confirmPassword" required>
            </div>
            <button type="submit">Sign Up</button>
          </form>
        </div>
      </div>
    `;
  
    const form = document.getElementById('signUpForm');
    const errorElement = document.getElementById('signUpError');
  
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const username = document.getElementById('username').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirmPassword').value;
  
      if (!username || !email || !password || !confirmPassword) {
        errorElement.textContent = 'Please fill in all fields';
      } else if (password !== confirmPassword) {
        errorElement.textContent = 'Passwords do not match';
      } else {
        console.log('Signing up with', { username, email, password });
        errorElement.textContent = '';
      }
    });
  }
  
// Script to update the frontend token in localStorage
const newToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ODQ4YzUzMGEyMmEyY2UwMGNjY2RjNyIsImlhdCI6MTc1NjExNTU2OCwiZXhwIjoxNzU2MjAxOTY4fQ.MvFURZONElGateY9DNAelvfGGlGYkY2HrKhN032-Na8";

console.log("Updating frontend token in localStorage...");

// This script would need to be run in the browser console
console.log(`Run this in your browser console:
localStorage.setItem('token', '${newToken}');

// Also update the user object if it exists
const user = JSON.parse(localStorage.getItem('user') || '{}');
user.token = '${newToken}';
localStorage.setItem('user', JSON.stringify(user));

console.log('Token updated successfully!');
`);

console.log(
  "After updating, refresh the page and try adding a property again."
);

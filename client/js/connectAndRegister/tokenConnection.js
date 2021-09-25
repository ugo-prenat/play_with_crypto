// Search auth token in localStorage
const authToken = localStorage.getItem('authToken')
let redirect = window.location.href

authToken ? window.location.href = 'pages/home.html' : window.location.href = 'pages/login.html'
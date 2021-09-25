searchAuthToken()

async function searchAuthToken() {
    const authToken = localStorage.getItem('authToken')
    const isTokenValid = await searchToken(authToken)
    
    isTokenValid ? window.location.href = 'pages/home.html' : window.location.href = 'pages/login.html'
}
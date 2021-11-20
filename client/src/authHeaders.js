const token = localStorage.getItem('accessToken')

export const AUTH_HEADERS = {
   'authorization': `Bearer ${token ? token : ''}`
}
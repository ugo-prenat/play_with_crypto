async function searchToken(token) {
    let toReturn

    await fetch('/api/users/searchToken', { method: 'POST', body: token })
    .then(response => response.json())
    .then(result => toReturn = result.response)

    return toReturn
}
async function getUserById(userId) {
    let toReturn

    await fetch('/api/users/getById', { method: 'POST', body: userId })
    .then(response => response.json())
    .then(result => toReturn = result)

    return toReturn
}
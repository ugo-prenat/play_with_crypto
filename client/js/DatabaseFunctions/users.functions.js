async function searchToken(token) {
    let toReturn

    await fetch('/api/users/searchToken', { method: 'POST', body: token })
    .then(response => response.json())
    .then(result => toReturn = result.response)

    return toReturn
}
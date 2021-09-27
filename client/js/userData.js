/*
* This file display user's data in the top right-hand corner of the home page
*/

async function displayUserData() {
    const userDataElement = document.querySelector('.user-wallet-amount')
    const user = await getUserById(USER_ID)
    const userBalance = user.wallet.balance
    
    userDataElement.innerHTML = `Wallet amount : ${userBalance.amount + userBalance.currency.symbol}`
}

displayUserData()

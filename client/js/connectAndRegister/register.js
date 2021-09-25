const newUser = {
    username: 'Adm 02',
    email: 'adm@gmail.com',
    password: 'azerty',
    profilImg: 'https://imgr.search.brave.com/VdoCfUGzAfvuZWa3LrYw35Mjl6_YLxLTPAQZCBpUI4c/fit/800/800/ce/1/aHR0cHM6Ly9pbWct/Y2RuLmhsdHYub3Jn/L3BsYXllcmJvZHlz/aG90L0ppN3dQZHRE/TkVFRmhjZEhkMTJ6/TEQucG5nP2JnPTNl/NGM1NCZoPTgwMCZp/eGxpYj1qYXZhLTIu/MS4wJnJlY3Q9MTQ4/JTJDMzUlMkM0MjAl/MkM0MjAmdz04MDAm/cz0wNTQwYTc0Njg0/NWQwZmM3ZWMyYjZl/YjkzYzAzYzgyOA',
    wallet: {
        balance: {
            amount: '500',
            currency: {
                name: 'Euro',
                symbol: '€'
            }
        },
        crypto: []
    }
}
//createUser(newUser)

async function createUser(newUser) {
    fetch('/api/users/create', { method: 'POST', body: JSON.stringify(newUser) })
    .then(response => response.status)
    .then(status => console.log(status))
}
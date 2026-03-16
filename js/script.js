const button = document.querySelector('.button')


button.addEventListener('click', () => {
    const inputUser = document.querySelector('.user').value
    fetchGetGithubUser(inputUser)
})


function fetchGetGithubUser(userName) {
    
    fetch(`https://api.github.com/users/${userName}`)
        .then((response) => {
            if(!response.ok) {
                console.error(error)
            }
            return response.json()
        })
        .then((user) => {
            console.log('user', user)
            createUserCard(user)
        })
        .catch((error) => {
            console.log(error)
            const app = document.getElementById('app')
            app.innerHTML = `<p>Error ${error.message}</p>`
        })
    
}

function createUserCard(user) {
    const app = document.getElementById('app')

    const card = document.createElement('div')
    card.className = 'card'

    const avatar = document.createElement('img')
    avatar.src = user.avatar_url
    avatar.alt = `${user.login}'s avatar`
    avatar.className = 'avatar'

    const name = document.createElement('h2')
    name.textContent = user.name
    name.className = 'name_title'

    const login = document.createElement('p')
    login.textContent = `@${user.login}`

    const bio = document.createElement('p')
    bio.textContent = user.bio

    const followersNumber = document.createElement('p')
    followersNumber.textContent = `Seguidores:  ${user.followers}`

    const followingNumber = document.createElement('p')
    followingNumber.textContent = `Seguindo: ${user.following}`

    const followContainer = document.createElement('div')
    followContainer.className = 'followers'     

    const followList = user.followers_url

    fetch(followList)
        .then((response) => {
            if(!response.ok) {
                console.error(error)
            }
            return response.json()
        })
        .then((datas) => {
            console.log(datas)
            for(let data of datas.slice(0, 4)) {
                const followers = document.createElement('img')
                followers.src = `${data.avatar_url}`
                followContainer.appendChild(followers)
            }
        })

    card.appendChild(avatar)
    card.appendChild(name)
    card.appendChild(login)
    card.appendChild(bio)
    card.appendChild(followersNumber)
    card.appendChild(followingNumber)
    card.appendChild(followContainer)

    app.appendChild(card)
}


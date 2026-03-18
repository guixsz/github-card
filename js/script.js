const button = document.querySelector('.button')


button.addEventListener('click', () => {
    const inputUser = document.querySelector('.user').value
    fetchGetGithubUser(inputUser)
})


function fetchGetGithubUser(userName) {
    
    fetch(`https://api.github.com/users/${userName}`)
        .then((response) => {
            if(!response.ok) {
                throw new Error('Usuário não encontrado')
            }
            return response.json()
        })
        .then((user) => {
            console.log('user', user)
            createUserCard(user)
        })
        .catch((error) => {
            console.log(error)
            createErroCard(error)
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

    const location = document.createElement('p')
    location.textContent = user.location

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
                followers.title = `${data.login}`
                followContainer.appendChild(followers)
            }
        })

    card.appendChild(avatar)
    card.appendChild(name)
    card.appendChild(login)
    card.appendChild(bio)
    card.appendChild(followersNumber)
    card.appendChild(followingNumber)
    card.appendChild(location)
    card.appendChild(followContainer)

    app.appendChild(card)
}

function createErroCard(error) {
    const app = document.getElementById('app')
    const dErro = document.createElement('div')

    dErro.className = 'erro_container'
    dErro.classList.add('card')

    const titleErro = document.createElement('h2')
    titleErro.textContent = `${error.message}`
    titleErro.className = 'title_erro'

    const pErro = document.createElement('p')
    pErro.textContent = 'Digite um nome de usuário válido'
    pErro.className = 'text_erro'
    
    dErro.appendChild(titleErro)
    dErro.appendChild(pErro)

    app.appendChild(dErro)
}

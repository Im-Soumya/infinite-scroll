const filter = document.querySelector('#filter')
const postsContainer = document.querySelector('.posts-container')
const loader = document.querySelector('.loader')

let limit = 7
let page = 1

const fetchPosts = async() => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`)
  const data = await response.json()
  return data
}

const showPosts = async() => {
  const posts = await fetchPosts()
  posts.forEach(item => {
    const post = document.createElement('div')
    post.innerHTML = `
    <div class='post'>
      <div class='number'>${item.id}</div>
      <div class='post-info'>
        <h2 class='post-title'>${item.title}</h2>
        <p class='post-body'>${item.body}</p>
      </div>
    </div>
    `
    postsContainer.append(post)
  })
}

const loading = () => {
  loader.classList.add('show')
  setTimeout(() => {
    loader.classList.remove('show')
    setTimeout(() => {
      page++
      showPosts()
    }, 300)
  }, 1000)
}

const filterPosts = () => {
  const term = filter.value.toUpperCase()
  const posts = document.querySelectorAll('.post')

  posts.forEach(post => {
    const title = post.querySelector('.post-title').innerText.toUpperCase()
    const body = post.querySelector('.post-body').innerText.toUpperCase()

    if(title.indexOf(term) > -1 || body.indexOf(term) > -1) {
      post.style.display = 'flex'
    } else {
      post.style.display = 'none'
    }
  })
}

showPosts()

window.addEventListener('scroll', () => {
  if(document.documentElement.scrollHeight - document.documentElement.scrollTop === document.documentElement.clientHeight) {
    loading()
  }
})
filter.addEventListener('input', filterPosts)
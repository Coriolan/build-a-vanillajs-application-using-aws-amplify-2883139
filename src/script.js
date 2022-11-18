import Amplify, { Auth, DataStore, Storage } from "aws-amplify";
import { Post } from './models';
import config from './aws-exports';

Amplify.configure(config);

document.getElementById('create-post').addEventListener('submit', async e => {
    e.preventDefault();

    try {
        const file = document.getElementById('img').files[0]

        await Storage.put(file.name, file)

        const newPost = await DataStore.save(new Post({
            description: document.getElementById('description').value,
            image: file.name
        }));
        console.log(newPost);
    } catch (error) {
        console.log(error);
    }
});

const pullData = async() => {
    try {
        const posts = await DataStore.query(Post);
        console.log(posts);
        
        const postsWithPics = []
        
        for (const post of posts) {
            try {
                const postPic = await Storage.get(post.image)
                postsWithPics.push({ ...post, pic: postPic})
            } catch (error) {
                console.log(error)
            }
        }
        
        const postsDiv = document.querySelector('.posts')
        postsWithPics.map(post => {
            const postDiv = document.createElement('div')
            postDiv.classList.add('post')

            const img = document.createElement('img')
            const p = document.createElement('p')
            p.innerText = post.description
            img.setAttribute('src', post.pic)
            
            postDiv.appendChild(img)
            postDiv.appendChild(p)
            postsDiv.append(postDiv)
        })
    } catch (error) {
        console.log(error);
    }
    
};

pullData();

let currentUser = null

const toggleNavBar = () => {
  if (currentUser) {
    document.querySelector('.logged-in').classList.add('hidden')
    document.querySelector('.logged-in').classList.add('hidden')
    document.querySelector('#sign-out').classList.remove('hidden')
    document.querySelector('#create-post').classList.remove('hidden')
  } else {
    document.querySelector('.logged-in').classList.remove('hidden')
    document.querySelector('.logged-in').classList.remove('hidden')
    document.querySelector('#sign-out').classList.add('hidden')
    document.querySelector('#create-post').classList.add('hidden')
  }
}

const getCurrentUser = async () => {
    try {
        currentUser = await Auth.currentAuthenticatedUser()
    } catch (error) {
        console.log(error)
        currentUser = null
    }
    toggleNavBar()
}

getCurrentUser()

document.getElementById('sign-out').addEventListener('click', async () => {
    await Auth.signOut()
    window.location.href = '/'
})

// link: https://binaryville.com/images/characters/dolores-disc.png
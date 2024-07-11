const blog = require("../models/blog")

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    let likes = blogs.reduce((sum, blog) => sum + blog.likes,0)

    return likes === 0
        ? 0
        : likes
}

const favoriteBlog = (blogs) => {
    let mostLikedBlog = blogs[0]
    blogs.forEach(blog => {
        if(blog.likes > mostLikedBlog.likes){
            mostLikedBlog = blog
        }
    })
    return mostLikedBlog === undefined
        ? 'zero blogs were given'
        : mostLikedBlog
}
/*
console.log(favoriteBlog([{
    title: "Kaljaa ja makkaraa",
    author: "Sari Kalja",
    url: "kaljaajamakkaraa.fi",
    likes: 2
},
{
    title: "Kaljaa ja makkaraa 2",
    author: "Sari Kalja2",
    url: "kaljaajamakkaraa2.fi",
    likes: 3
},
{
    title: "Kaljaa ja makkaraa 3",
    author: "Sari Kalja3",
    url: "kaljaajamakkaraa3.fi",
    likes: 5
}
]))

console.log(favoriteBlog([]))
*/
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
}
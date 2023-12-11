const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce(
    (sum, item) => sum + item.likes, 0
  )
}

const favoriteBlog = (blogs) => {
  if (blogs.length > 0) {
  const selected = blogs.reduce(
    (previous, current) => {
      return previous.likes > current.likes ? previous : current
    })
  const favorite = {title: selected.title, author: selected.author, likes: selected.likes}
  return favorite
  } else {
    return {}
  }
}

const mostBlogs = (blogs) => {
  if (blogs.length > 0) {
    const counted = _.map(_.countBy(blogs, 'author'), function (val,key) {
      return ({ author: key, blogs: val})
    })
    const most = _.reduce(counted, function(previous, current) {
      return previous.blogs > current.blogs ? previous : current
    })
    return most
  } else {
    return {}
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return {}
  } else if (blogs.length === 1) {
    return { author: blogs[0].author, likes: blogs[0].likes}
  } else {
    const authors = _.groupBy(blogs, 'author')
    const liked = _.map(authors, function (value1, key1){
      const summa = _.sumBy(value1, 'likes')
      return ({ author: key1, likes: summa })
    })
    const mostLiked = _.reduce(liked, function(previous, current) {
      return previous.likes > current.likes ? previous : current
    }, {})
    return mostLiked
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
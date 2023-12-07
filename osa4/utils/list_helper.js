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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
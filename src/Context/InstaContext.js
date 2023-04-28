import React from 'react'

const InstaContext = React.createContext({
  search: '',
  onSearchChange: () => {},
  searchPosts: [],
  onSearchFetching: () => {},
})

export default InstaContext

import React from 'react'

const Home = props => (
  <div className="container">
    <h1>Home</h1>
    <p>{props.history.length}</p>
  </div>
)

export default Home

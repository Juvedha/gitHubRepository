// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {repositoryDetails} = props
  const {
    name,
    starsCount,
    issuesCount,
    forksCount,
    avatarUrl,
  } = repositoryDetails
  return (
    <li className="repository-items">
      <img src={avatarUrl} alt={name} className="avatar-url" />
      <h1 className="name">{name}</h1>
      <div className="cont">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="icons"
        />
        <p>{starsCount} stars</p>
      </div>
      <div className="cont">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="icons"
        />
        <p>{forksCount} forks</p>
      </div>
      <div className="cont">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="icons"
        />
        <p>{issuesCount} open issues</p>
      </div>
    </li>
  )
}
export default RepositoryItem

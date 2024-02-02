/* eslint-disable no-unreachable */
import {Component} from 'react'

import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import RepositoryItem from '../RepositoryItem'
import LanguageFilterItem from '../LanguageFilterItem'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]
const apiStatusConstants = {
  success: 'SUCCESS',
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

class GithubPopularRepos extends Component {
  state = {
    repositoryList: [],
    apiStatus: apiStatusConstants.initial,
    activeLanguageId: languageFiltersData[0].id,
  }

  componentDidMount() {
    this.getRepositoryListItems()
  }

  getRepositoryListItems = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const {activeLanguageId} = this.state
    const options = {
      method: 'GET',
    }
    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${activeLanguageId}`
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    const filteredData = data.popular_repos.map(eachItem => ({
      name: eachItem.name,
      id: eachItem.id,
      issuesCount: eachItem.issues_count,
      forksCount: eachItem.forks_count,
      starsCount: eachItem.stars_count,
      avatarUrl: eachItem.avatar_url,
    }))
    this.setState({
      repositoryList: filteredData,
      apiStatus: apiStatusConstants.success,
    })
    if (response.status === 401) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderRepositoryItems = () => {
    const {repositoryList} = this.state
    return (
      <ul className="popular-repos">
        {repositoryList.map(eachItem => (
          <RepositoryItem repositoryDetails={eachItem} key={eachItem.id} />
        ))}
      </ul>
    )
  }

  updateTabId = languageId => {
    this.setState({activeLanguageId: languageId}, this.getRepositoryListItems)
  }

  renderLanguageFilter = () => {
    const {activeLanguageId} = this.state
    return (
      <ul className="tab-items">
        {languageFiltersData.map(eachItem => (
          <LanguageFilterItem
            languageDetails={eachItem}
            key={eachItem.id}
            isActiveTab={eachItem.id === activeLanguageId}
            updateTabId={this.updateTabId}
          />
        ))}
      </ul>
    )
  }

  renderCommonItems = () => (
    <div className="container">
      <h1 className="heading">Popular</h1>
      {this.renderLanguageFilter()}
    </div>
  )

  renderLoader = () => (
    <div className="background-container">
      {this.renderCommonItems()}
      <div className="loader" data-testid="loader">
        <Loader type="ThreeDots" height={50} width={50} color="#00bfff" />
      </div>
    </div>
  )

  renderSuccessView = () => (
    <div className="background-container">
      {this.renderCommonItems()}
      {this.renderRepositoryItems()}
    </div>
  )

  renderFailureView = () => (
    <div className="background-container">
      {this.renderCommonItems()}
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure-view"
        className="failure-image"
      />
      <h1>Something Went Wrong</h1>
    </div>
  )

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }
}
export default GithubPopularRepos

// Write your code here

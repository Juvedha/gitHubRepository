// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {languageDetails, isActiveTab, updateTabId} = props
  const {id, language} = languageDetails
  const className = isActiveTab ? 'active-tab' : 'tab'

  const onClickTab = () => {
    updateTabId(id)
  }

  return (
    <li className="language-tab-items">
      <button className={className} type="button" onClick={onClickTab}>
        {language}
      </button>
    </li>
  )
}
export default LanguageFilterItem

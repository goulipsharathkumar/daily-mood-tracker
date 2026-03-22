import {Component} from 'react'
import {FaChevronLeft, FaChevronRight} from 'react-icons/fa'
import Header from '../Header'
import {emojisList, daysList} from '../../data'
import './index.css'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentMonthIndex: 0,
      activeEmojiId: emojisList[0].id,
      selectedEmojiName: emojisList[0].emojiName,
      selectedDay: 'Sun',
    }
  }

  getActiveEmoji = () => {
    const {activeEmojiId} = this.state
    return emojisList.find(e => e.id === activeEmojiId)
  }

  onClickEmoji = emojiId => {
    this.setState({activeEmojiId: emojiId})
  }

  onClickDate = dateId => {
    const {monthsData, updateMonthsData} = this.props
    const {currentMonthIndex} = this.state
    const activeEmoji = this.getActiveEmoji()
    const updatedMonths = monthsData.map((month, idx) => {
      if (idx !== currentMonthIndex) return month
      return {
        ...month,
        dates: month.dates.map(d => {
          if (d.id !== dateId) return d
          if (d.emojiName === '')
            return {
              ...d,
              emojiUrl: activeEmoji.emojiUrl,
              emojiName: activeEmoji.emojiName,
            }
          if (d.emojiName !== activeEmoji.emojiName)
            return {
              ...d,
              emojiUrl: activeEmoji.emojiUrl,
              emojiName: activeEmoji.emojiName,
            }
          return {...d, emojiUrl: '', emojiName: ''}
        }),
      }
    })
    updateMonthsData(updatedMonths)
  }

  onClickPrev = () => {
    this.setState(prev => ({
      currentMonthIndex: Math.max(0, prev.currentMonthIndex - 1),
    }))
  }

  onClickNext = () => {
    this.setState(prev => ({
      currentMonthIndex: Math.min(11, prev.currentMonthIndex + 1),
    }))
  }

  onChangeEmojiFilter = e => {
    this.setState({selectedEmojiName: e.target.value})
  }

  onChangeDayFilter = e => {
    this.setState({selectedDay: e.target.value})
  }

  getFilterCount = () => {
    const {monthsData} = this.props
    const {currentMonthIndex, selectedEmojiName, selectedDay} = this.state
    const currentMonth = monthsData[currentMonthIndex]
    // daysList order: Sun(idx0), Mon(idx1), Tue(idx2), Wed(idx3), Thu(idx4), Fri(idx5), Sat(idx6)
    const dayIndex = daysList.findIndex(d => d.day === selectedDay)
    if (dayIndex === -1) return 0
    let count = 0
    currentMonth.dates.forEach((d, idx) => {
      if (idx % 7 === dayIndex && d.emojiName === selectedEmojiName) count += 1
    })
    return count
  }

  renderDates = () => {
    const {monthsData} = this.props
    const {currentMonthIndex} = this.state
    const currentMonth = monthsData[currentMonthIndex]

    return currentMonth.dates.map(dateObj => {
      const hasEmoji = dateObj.emojiName !== ''
      const btnLabel = hasEmoji
        ? `${dateObj.date} ${dateObj.date}`
        : dateObj.date
      return (
        <li key={dateObj.id} className="date-item">
          <button
            type="button"
            className="date-btn"
            onClick={() => this.onClickDate(dateObj.id)}
            aria-label={btnLabel}
          >
            {hasEmoji ? (
              <img
                src={dateObj.emojiUrl}
                alt={dateObj.date}
                className="date-emoji-img"
              />
            ) : (
              <p className="date-number">{dateObj.date}</p>
            )}
          </button>
        </li>
      )
    })
  }

  render() {
    const {monthsData} = this.props
    const {
      currentMonthIndex,
      activeEmojiId,
      selectedEmojiName,
      selectedDay,
    } = this.state
    const currentMonth = monthsData[currentMonthIndex]
    const filterCount = this.getFilterCount()

    return (
      <div className="home-page">
        <Header />
        <div className="home-content">
          <div className="emoji-selector-section">
            <ul className="emoji-list">
              {emojisList.map(emoji => (
                <li key={emoji.id} className="emoji-item">
                  <button
                    type="button"
                    className={`emoji-btn ${
                      activeEmojiId === emoji.id ? 'active-emoji' : ''
                    }`}
                    onClick={() => this.onClickEmoji(emoji.id)}
                    aria-label={`${emoji.emojiName} ${emoji.emojiName}`}
                  >
                    <img
                      src={emoji.emojiUrl}
                      alt={emoji.emojiName}
                      className="emoji-img"
                    />
                  </button>
                  <p className="emoji-label">{emoji.emojiName}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="calendar-filter-row">
            <div className="calendar-section">
              <div className="calendar-header">
                <button
                  type="button"
                  data-testid="previous-button"
                  className="nav-btn"
                  onClick={this.onClickPrev}
                  disabled={currentMonthIndex === 0}
                  aria-label="previous month"
                >
                  <FaChevronLeft />
                </button>
                <h2 className="month-name">{currentMonth.monthName}</h2>
                <button
                  type="button"
                  data-testid="next-button"
                  className="nav-btn"
                  onClick={this.onClickNext}
                  disabled={currentMonthIndex === 11}
                  aria-label="next month"
                >
                  <FaChevronRight />
                </button>
              </div>

              <ul className="days-list">
                {daysList.map(d => (
                  <li key={d.id} className="day-item">
                    <p className="day-label">{d.day}</p>
                  </li>
                ))}
              </ul>

              <ul className="dates-list">{this.renderDates()}</ul>
            </div>

            <div className="filter-section">
              <h3 className="filter-title">Filters</h3>
              <div className="filter-group">
                <label className="filter-label" htmlFor="emojiFilter">
                  Emoji Name
                </label>
                <select
                  id="emojiFilter"
                  className="filter-select"
                  value={selectedEmojiName}
                  onChange={this.onChangeEmojiFilter}
                >
                  {emojisList.map(e => (
                    <option key={e.id} value={e.emojiName}>
                      {e.emojiName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="filter-group">
                <label className="filter-label" htmlFor="dayFilter">
                  Day
                </label>
                <select
                  id="dayFilter"
                  className="filter-select"
                  value={selectedDay}
                  onChange={this.onChangeDayFilter}
                >
                  {daysList.map(d => (
                    <option key={d.id} value={d.day}>
                      {d.day}
                    </option>
                  ))}
                </select>
              </div>
              <div className="filter-count-card">
                <p className="filter-count-label">
                  {selectedEmojiName} on {selectedDay}s
                </p>
                <h2 className="filter-count-value">{filterCount}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Home

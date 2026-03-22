import {Component} from 'react'
import {BarChart, Bar, XAxis, YAxis, Tooltip, Legend, Cell} from 'recharts'
import Header from '../Header'
import {emojisList} from '../../data'
import './index.css'

class Reports extends Component {
  getEmojiCounts = () => {
    const {monthsData} = this.props
    const counts = {}
    emojisList.forEach(e => {
      counts[e.emojiName] = 0
    })
    monthsData.forEach(month =>
      month.dates.forEach(d => {
        if (d.emojiName && counts[d.emojiName] !== undefined)
          counts[d.emojiName] += 1
      }),
    )
    return counts
  }

  render() {
    const counts = this.getEmojiCounts()
    const chartData = emojisList.map(e => ({
      name: e.emojiName,
      count: counts[e.emojiName] || 0,
    }))

    return (
      <div className="reports-page">
        <Header />
        <div className="reports-content">
          <h1 className="reports-title">Overall Emojis Reports</h1>
          <div className="reports-grid">
            {emojisList.map(emoji => (
              <div key={emoji.id} className="report-card">
                <div className="report-emoji-container">
                  <img
                    src={emoji.emojiUrl}
                    alt={emoji.emojiName}
                    className="report-emoji-img"
                  />
                </div>
                <p className="report-emoji-name">{emoji.emojiName}</p>
                <p className="report-count">
                  {counts[emoji.emojiName] !== undefined
                    ? counts[emoji.emojiName]
                    : 0}
                </p>
              </div>
            ))}
          </div>
          <div className="chart-container">
            <BarChart width={600} height={300} data={chartData}>
              <XAxis dataKey="name" stroke="#cbd5e1" tick={false} />
              <YAxis stroke="#cbd5e1" tick={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#ffbe38">
                {chartData.map(entry => (
                  <Cell key={entry.name} fill="#ffbe38" />
                ))}
              </Bar>
            </BarChart>
          </div>
        </div>
      </div>
    )
  }
}

export default Reports

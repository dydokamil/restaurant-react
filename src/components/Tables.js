import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import * as actions from '../constants/actions'

class Tables extends React.Component {
  componentDidMount = () => {
    this.props.onFetchTables()
  }

  render () {
    console.log(this.props)
    if (!this.props.tables) {
      return <div>Loading...</div>
    }

    const tableKeys = Object.keys(this.props.tables)

    return (
      <div className="container">
        <h1>Available reservations</h1>
        {tableKeys.map(tableKey => {
          return (
            <div>
              <h2>Table {tableKey}</h2>
              <ul>
                {this.props.tables[tableKey].map(hour => {
                  return (
                    <li>{moment.utc(hour).format('HH:mm, D MMMM YYYY')}</li>
                  )
                })}
              </ul>
            </div>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    tables: state.tablesReducer
  }
}

const mapDispatchToProps = dispatch => ({
  onFetchTables: () => {
    dispatch({ type: actions.TABLES_REQUEST })
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Tables)

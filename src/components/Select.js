import React, { Component } from 'react'
import { ICONArrowDown } from './Icons'
import './Select.css'

class Select extends Component {
  constructor(props) {
    super(props)

    this.selectRef = React.createRef()

    this.state = {}
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.active !== this.state.active) {
      this.props.handleChange({
        target: {
          name: this.selectRef.current.name,
          value: this.selectRef.current.value
        }
      })
    }
  }


  render() {
    const { name, options, placeholder, handleChange, selectedOption } = this.props
    const { active, activeDropdown = false } = this.state

    return <label className={`EnquiryForm--Label`}>
      <select style={{display: 'none'}} name={name} ref={this.selectRef}>
        {options.map((option, index) => 
          <option key={option} value={option} selected={option === selectedOption ? true : false}>
            {option}
          </option>
        )}
      </select>
      <div className={`select-dropdown ${activeDropdown ? 'active' : ''}`}>
        <p className='EnquiryForm--Input has-arrow' onClick={() => this.setState({ activeDropdown: !activeDropdown })}>
          {active ? active : placeholder} <ICONArrowDown />
        </p>
        <ul>
          {options.map(option => 
            <li 
              key={option}
              onClick={() => this.setState({ active: option, activeDropdown: false })}
              className={option === active ? 'active' : ''}
            >
              {option}
            </li>
          )}
        </ul>
      </div>
    </label>
  }
}

export default Select

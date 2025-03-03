import React from 'react'
import "./style.css"
import { CircularProgress } from '@mui/material'
function ResultCard() {
  
  return (
    <div className='result_card'>
      
      <div className="subcard">
        Passed
        <span>213</span>
      </div>
      <div className="subcard">
        Failed
        <span>28</span>
      </div>
      <div className="subcard">
        In Progress
        <span>23</span>
      </div>
      <div className="subcard">
        Not Started
        <span>171</span>
      </div>
      <div className="subcard">
        Overdue
        <span>18</span>
      </div>
    </div>
  )
}

export default ResultCard
import React, { useState } from 'react';
import "./style.css";
import ResultCard from '../../Components/resultcard';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';

function index() {
  const settings = {
    width: 200,
    height: 200,
    value: 56,
  };

  const lmsUserTypes = [
    "Admin",
    "Instructor/Trainer",
    "Learner/Student",
    "Content Creator",
    "Support/Help Desk",
    "Manager/Supervisor",
    "Guest",
    "Reviewer"
  ];


  const [selectedRole, setSelectedRole] = useState('');


  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  return (
    <div className='result_container'>
      <div className="flex_between">
        <div className="title color">
          Result
        </div>
        <div className="">
          <select
            value={selectedRole}
            onChange={handleRoleChange}
            className="role-dropdown"
          >
            <option value="" disabled>Select a role</option>
            {lmsUserTypes.map((role, index) => (
              <option key={index} value={role}>{role}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="">
        <ResultCard />
      </div>
      <Gauge
        {...settings}
        cornerRadius="50%"
        sx={(theme) => ({
          [`& .${gaugeClasses.valueText}`]: {
            fontSize: 40,
          },
          [`& .${gaugeClasses.valueArc}`]: {
            fill: '#ff4500',
          },
          [`& .${gaugeClasses.referenceArc}`]: {
            fill: theme.palette.text.disabled,
          },
        })}
      />
    </div>
  );
}

export default index;

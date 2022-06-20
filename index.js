// Your code here
function createEmployeeRecord(array){
    const[first,family,myTitle,rate]=array
    return {
        firstName:first,
        familyName:family,
        title:myTitle,
        payPerHour:rate,
        timeInEvents:[],
        timeOutEvents:[]        
        
    }
}

function createEmployeeRecords(array){
    return array.map(createEmployeeRecord)
  }
  const getHour = (dateTime)=>{
    return parseInt(dateTime.match(/\d{4}$/)[0])
  }
  const getDate = (dateTime)=>{
    return dateTime.match(/\d{4}-\d{2}-\d{2}/)[0]
  }
  const createTimeInEvent = (record, timeIn)=>{
    record.timeInEvents.push({
      type: "TimeIn",
      date: getDate(timeIn),
      hour: getHour(timeIn)
    })
    return record
  }
 const createTimeOutEvent = (record, timeOut)=>{
    record.timeOutEvents.push({
      type: 'TimeOut',
      date: getDate(timeOut),
      hour: getHour(timeOut)
    })
    return record
  }
  const hoursWorkedOnDate = (record, date)=>{
    let timeIn = record.timeInEvents.find(event => event.date === date)
    let timeOut = record.timeOutEvents.find(event => event.date === date)
    return (timeOut.hour - timeIn.hour)/100
  }
  const wagesEarnedOnDate = (record, date)=>{
    let hours = hoursWorkedOnDate(record, date)
    return record.payPerHour * hours
  }
  const allWagesFor = (record)=>{
    return record.timeInEvents.reduce((total, event) => {return total + wagesEarnedOnDate(record, event.date)}, 0)
  }
  const calculatePayroll = (employees)=>{
    return employees.reduce((total,employee) => {return total + allWagesFor(employee)}, 0)
  }
  const findEmployeeByFirstName = (employees, name)=>{
    return employees.find(employee => employee.firstName === name)
  }

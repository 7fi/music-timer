const setTimeEl = document.getElementById('setTime')
const stopTimeEl = document.getElementById('stopTime')
const focusTimeEl = document.getElementById('focusTime')
const breakTimeEl = document.getElementById('breakTime')
const timeRemainingEl = document.getElementById('timeRemainingEl')
const timeLabel = document.getElementById('timeLabel')
const statusLabel = document.getElementById('statusLabel')

let focusTime = 25 * 60
let breakTime = 300
let curTime = 0
let curStatus = 'Off'

setTimeEl.addEventListener('click', () => setTime())
stopTimeEl.addEventListener('click', () => setStatus('Off'))

function setTime() {
  focusTime = focusTimeEl.value * 60
  breakTime = breakTimeEl.value * 60
  focusTimeEl.value = ''
  breakTimeEl.value = ''
  curTime = focusTime
  setStatus('Focus')
  next()
  console.log(focusTime, breakTime, curStatus)
}

function reloaded() {
  if (localStorage.getItem('curTime') != null) {
    curTime = JSON.parse(localStorage.getItem('curTime')).time
    breakTime = JSON.parse(localStorage.getItem('curTime')).breakTime
    focusTime = JSON.parse(localStorage.getItem('curTime')).focusTime
    setStatus(JSON.parse(localStorage.getItem('curTime')).curStatus)
  }
}

function setStatus(inputStatus) {
  curStatus = inputStatus
  statusLabel.textContent = inputStatus
  if (inputStatus == 'Off') {
    timeLabel.style.display = 'none'
    curTime = 0
    localStorage.setItem('curTime', JSON.stringify({ time: curTime, curStatus: curStatus, breakTime: breakTime, focusTime, focusTime }))
  } else if (inputStatus == 'Focus') {
    timeLabel.style.display = 'block'
    if (curTime == 0) curTime = focusTime
    localStorage.setItem('curTime', JSON.stringify({ time: curTime, curStatus: curStatus, breakTime: breakTime, focusTime, focusTime }))

    // shuffle()
    resume()
    // next()
  } else if (inputStatus == 'Break') {
    timeLabel.style.display = 'block'
    if (curTime == 0) curTime = breakTime
    localStorage.setItem('curTime', JSON.stringify({ time: curTime, curStatus: curStatus, breakTime: breakTime, focusTime, focusTime }))

    pause()
  }
}

setInterval(() => {
  if (curStatus != 'Off') {
    curTime--
    localStorage.setItem('curTime', JSON.stringify({ time: curTime, curStatus: curStatus, breakTime: breakTime, focusTime, focusTime }))
    let curMin = curTime / 60 > 9 ? Math.floor(curTime / 60) : '0' + Math.floor(curTime / 60)
    let curSec = curTime % 60 > 9 ? curTime % 60 : '0' + (curTime % 60)
    timeRemainingEl.textContent = `${curMin}:${curSec}`
    document.title = `${curMin}:${curSec} ${curStatus}`
    console.log(curTime)
    if (curTime <= 0) {
      if (curStatus == 'Focus') {
        setStatus('Break')
      } else if (curStatus == 'Break') {
        setStatus('Focus')
      }
    }
  }
}, 1000)

let video = document.getElementById('video');
let countrySelector = document.getElementById('country-selector');
let channelSelector = document.getElementById('channel-selector');
let dateSelector = document.getElementById('date-selector');
let timeSelector = document.getElementById('time-selector');
let eventSelector = document.getElementById('event-selector');
let currentTimeDisplay = document.getElementById('current-time-display');
let totalTimeDisplay = document.getElementById('total-time-display');

let channels = {
    usa: Array.from({length: 10}, (_, i) => ({name: `USA Channel ${i+1}`, url: 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4'})),
    uk: Array.from({length: 10}, (_, i) => ({name: `UK Channel ${i+1}`, url: 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4'})),
    india: Array.from({length: 10}, (_, i) => ({name: `India Channel ${i+1}`, url: 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4'}))
};

let historicalEvents = {
    '911': {country: 'usa', date: '2001-09-11', time: 0},
    '2012': {country: 'usa', date: '2012-12-21', time: 0},
    '1947': {country: 'india', date: '1947-08-15', time: 0}
};

countrySelector.addEventListener('change', loadChannels);
channelSelector.addEventListener('change', playChannel);
dateSelector.addEventListener('change', playChannel);
timeSelector.addEventListener('input', seekVideo);
eventSelector.addEventListener('change', selectHistoricalEvent);

video.addEventListener('loadedmetadata', updateTotalTime);
video.addEventListener('timeupdate', updateTimeDisplay);

loadChannels();

function loadChannels() {
    let countryChannels = channels[countrySelector.value];
    channelSelector.innerHTML = countryChannels.map((channel, index) => 
        `<option value="${index}">${channel.name}</option>`
    ).join('');
    playChannel();
}

function playChannel() {
    let countryChannels = channels[countrySelector.value];
    let selectedChannel = countryChannels[channelSelector.value];
    video.src = selectedChannel.url;
    video.play();
}

function seekVideo() {
    video.currentTime = timeSelector.value;
}

function updateTotalTime() {
    let totalMinutes = Math.floor(video.duration / 60);
    let totalSeconds = Math.floor(video.duration - totalMinutes * 60);
    totalTimeDisplay.innerText = ('0' + totalMinutes).slice(-2) + ':' + ('0' + totalSeconds).slice(-2);
    timeSelector.max = video.duration;
}

function updateTimeDisplay() {
    let currentMinutes = Math.floor(video.currentTime / 60);
    let currentSeconds = Math.floor(video.currentTime - currentMinutes * 60);
    currentTimeDisplay.innerText = ('0' + currentMinutes).slice(-2) + ':' + ('0' + currentSeconds).slice(-2);
    timeSelector.value = video.currentTime;
}

function selectHistoricalEvent() {
    let eventKey = eventSelector.value;
    if (historicalEvents[eventKey]) {
        let event = historicalEvents[eventKey];
        countrySelector.value = event.country;
        loadChannels();
        dateSelector.value = event.date;
        timeSelector.value = event.time;
        seekVideo();
    }
}

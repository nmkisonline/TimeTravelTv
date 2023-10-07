let video = document.getElementById('video');
let countrySelector = document.getElementById('country-selector');
let channelSelector = document.getElementById('channel-selector');
let dateSelector = document.getElementById('date-selector');
let timeSelector = document.getElementById('time-selector');
let currentTimeDisplay = document.getElementById('current-time-display');
let totalTimeDisplay = document.getElementById('total-time-display');

let channels = {
    usa: [
        {name: 'Channel 1 USA', url: 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4'},
        {name: 'Channel 2 USA', url: 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4'}
    ],
    uk: [
        {name: 'Channel 1 UK', url: 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4'},
        {name: 'Channel 2 UK', url: 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4'}
    ]
};

countrySelector.addEventListener('change', loadChannels);
channelSelector.addEventListener('change', playChannel);
dateSelector.addEventListener('change', playChannel);
timeSelector.addEventListener('input', seekVideo);

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

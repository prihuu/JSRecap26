const target = document.querySelector('#target');

const userAgent = navigator.userAgent;

let browserName = 'Unknown';
let browserVersion = 'Unknown';

if (userAgent.includes('Edg/')) {
    browserName = 'Microsoft Edge';
    browserVersion = userAgent.split('Edg/')[1].split(' ')[0];
} else if (userAgent.includes('Chrome/')) {
    browserName = 'Google Chrome';
    browserVersion = userAgent.split('Chrome/')[1].split(' ')[0];
} else if (userAgent.includes('Firefox/')) {
    browserName = 'Mozilla Firefox';
    browserVersion = userAgent.split('Firefox/')[1].split(' ')[0];
} else if (userAgent.includes('Safari/')) {
    browserName = 'Safari';
    browserVersion = userAgent.split('Version/')[1].split(' ')[0];
}

let operatingSystem = 'Unknown';

if (userAgent.includes('Windows')) {
    operatingSystem = 'Windows';
} else if (userAgent.includes('Mac OS')) {
    operatingSystem = 'macOS';
} else if (userAgent.includes('Android')) {
    operatingSystem = 'Android';
} else if (userAgent.includes('iPhone') || userAgent.includes('iPad')) {
    operatingSystem = 'iOS';
} else if (userAgent.includes('Linux')) {
    operatingSystem = 'Linux';
}

const screenWidth = screen.width;
const screenHeight = screen.height;

const availableWidth = screen.availWidth;
const availableHeight = screen.availHeight;

const now = new Date();

const date = now.toLocaleDateString('fi-FI', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
});

const time = now.toLocaleTimeString('fi-FI', {
    hour: '2-digit',
    minute: '2-digit'
});

target.innerHTML = `
    <p>Browser: ${browserName}, ${browserVersion}</p>
    <p>Operating system: ${operatingSystem}</p>
    <p>Screen size: ${screenWidth} x ${screenHeight}</p>
    <p>Available screen space: ${availableWidth} x ${availableHeight}</p>
    <p>Current date: ${date}</p>
    <p>Current time: ${time}</p>
`;

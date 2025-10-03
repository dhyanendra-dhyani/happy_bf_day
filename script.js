// Create Floating Love Particles
function createLoveParticle() {
    const particles = document.getElementById('loveParticles');
    const particle = document.createElement('div');
    particle.className = 'particle';
    const emojis = ['❤️', '💕', '💖', '💗', '💝', '💘', '💞', '💓', '💟', '♥️', '🌹', '💐', '🎀', '💑', '💏', '😍', '🥰', '😘', '💋', '🌺'];
    particle.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDuration = (Math.random() * 4 + 5) + 's';
    particle.style.fontSize = (Math.random() * 15 + 20) + 'px';
    particle.style.animationDelay = Math.random() * 2 + 's';
    particles.appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 8000);
}

setInterval(createLoveParticle, 200);

// Sparkle Effect on Click
document.addEventListener('click', (e) => {
    createSparkle(e.pageX, e.pageY);
});

function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.innerHTML = ['✨', '⭐', '💫', '🌟'][Math.floor(Math.random() * 4)];
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    sparkle.style.fontSize = (Math.random() * 20 + 20) + 'px';
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        sparkle.remove();
    }, 1000);
}

// Days Counter with Animation
function updateDaysCounter() {
    const startDate = new Date('2024-01-01'); // CHANGE THIS TO YOUR RELATIONSHIP START DATE
    const today = new Date();
    const diffTime = Math.abs(today - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    let current = 0;
    const increment = diffDays / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= diffDays) {
            current = diffDays;
            clearInterval(timer);
        }
        document.getElementById('daysCounter').textContent = Math.floor(current);
    }, 30);
}
updateDaysCounter();

// Love Language Quiz
const quizData = [
    {
        question: "What makes you feel most loved? 💕",
        options: [
            { text: "💬 When you tell me how much you love me", type: "words" },
            { text: "🤝 When you help me with tasks without being asked", type: "service" },
            { text: "🎁 When you surprise me with thoughtful gifts", type: "gifts" },
            { text: "⏰ When we spend quality time together", type: "time" },
            { text: "🤗 When you hug, kiss, or hold my hand", type: "touch" }
        ]
    },
    {
        question: "How do you prefer to show your love? 💖",
        options: [
            { text: "💭 By expressing my feelings through words", type: "words" },
            { text: "💪 By doing things to make your life easier", type: "service" },
            { text: "🎀 By giving you meaningful presents", type: "gifts" },
            { text: "🎯 By planning special dates and activities", type: "time" },
            { text: "💑 Through physical affection and closeness", type: "touch" }
        ]
    },
    {
        question: "What hurts you the most in a relationship? 💔",
        options: [
            { text: "😢 Harsh or critical words", type: "words" },
            { text: "😞 When my partner doesn't help or support me", type: "service" },
            { text: "😔 Forgotten special occasions or no thoughtful gestures", type: "gifts" },
            { text: "😓 Cancelled plans or not having quality time", type: "time" },
            { text: "😥 Lack of physical affection", type: "touch" }
        ]
    },
    {
        question: "What's your ideal way to spend an evening together? 🌙",
        options: [
            { text: "💬 Deep conversations sharing our feelings", type: "words" },
            { text: "🏠 Working on projects or chores together", type: "service" },
            { text: "🎁 Exchanging small surprises or gifts", type: "gifts" },
            { text: "🎮 Undivided attention doing something fun", type: "time" },
            { text: "🛋️ Cuddling while watching a movie", type: "touch" }
        ]
    },
    {
        question: "What do you value most from your partner? 💝",
        options: [
            { text: "🗣️ Compliments and encouraging words", type: "words" },
            { text: "💼 Actions that show they care", type: "service" },
            { text: "💐 Thoughtful tokens of affection", type: "gifts" },
            { text: "👥 Their full presence and attention", type: "time" },
            { text: "💞 Physical intimacy and tenderness", type: "touch" }
        ]
    }
];

let currentQuestion = 0;
let scores = {
    words: 0,
    service: 0,
    gifts: 0,
    time: 0,
    touch: 0
};

function startQuiz() {
    document.getElementById('quizStart').classList.remove('active');
    document.getElementById('quizQuestions').classList.add('active');
    displayQuestion();
}

function displayQuestion() {
    const container = document.getElementById('questionContainer');
    const question = quizData[currentQuestion];
    
    const progress = ((currentQuestion + 1) / quizData.length) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
    
    let html = `
        <div class="question">
            <h3>Question ${currentQuestion + 1} of ${quizData.length}</h3>
            <h3>${question.question}</h3>
        </div>
    `;
    
    question.options.forEach((option, index) => {
        html += `<div class="quiz-option" onclick="selectAnswer('${option.type}')"><span>${option.text}</span></div>`;
    });
    
    container.innerHTML = html;
}

function selectAnswer(type) {
    scores[type]++;
    currentQuestion++;
    
    if (currentQuestion < quizData.length) {
        displayQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    document.getElementById('quizQuestions').classList.remove('active');
    document.getElementById('quizResults').classList.add('active');
    
    let maxScore = 0;
    let primaryLanguage = '';
    
    for (let type in scores) {
        if (scores[type] > maxScore) {
            maxScore = scores[type];
            primaryLanguage = type;
        }
    }
    
    const results = {
        words: {
            title: "💬 Words of Affirmation 💬",
            description: "Your love language is Words of Affirmation! ✨ You feel most loved when you hear sincere compliments, encouraging words, and verbal expressions of love. 'I love you,' 'I'm proud of you,' and 'You mean everything to me' are music to your ears. You thrive on verbal encouragement and appreciation. Words have the power to fill your heart with joy! 💕"
        },
        service: {
            title: "🤝 Acts of Service 🤝",
            description: "Your love language is Acts of Service! 💪 You feel most loved when someone does things to help you or make your life easier. Actions speak louder than words for you. Whether it's making you coffee, helping with chores, or running errands, these thoughtful gestures make your heart incredibly full. You appreciate when love is shown through helpful deeds! 💝"
        },
        gifts: {
            title: "🎁 Receiving Gifts 🎁",
            description: "Your love language is Receiving Gifts! 🎀 You feel most loved when you receive thoughtful presents and tokens of affection. It's not about materialism—it's about the thought, effort, and care behind the gift. A small, meaningful present can make you feel incredibly special and remembered. Gifts are symbols of love to you! 💖"
        },
        time: {
            title: "⏰ Quality Time ⏰",
            description: "Your love language is Quality Time! 💕 You feel most loved when you have your partner's undivided attention. What matters most to you is being together, sharing experiences, and creating memories. Deep conversations, fun activities, or just being present with each other fills your heart with pure joy. Time together is your ultimate treasure! ✨"
        },
        touch: {
            title: "🤗 Physical Touch 🤗",
            description: "Your love language is Physical Touch! 💞 You feel most loved through physical affection—hugs, kisses, holding hands, cuddling, or any form of touch. Physical intimacy and closeness make you feel secure, loved, and deeply connected to your partner. A simple touch can speak volumes to your heart! 💋"
        }
    };
    
    document.getElementById('resultTitle').textContent = results[primaryLanguage].title;
    document.getElementById('resultDescription').textContent = results[primaryLanguage].description;
    
    triggerEmojiRain();
}

function resetQuiz() {
    currentQuestion = 0;
    scores = { words: 0, service: 0, gifts: 0, time: 0, touch: 0 };
    document.getElementById('quizResults').classList.remove('active');
    document.getElementById('quizStart').classList.add('active');
}

// Heart Catching Game
let gameScore = 0;
let gameTimer = 30;
let gameInterval;
let heartInterval;
let gameActive = false;

function startGame() {
    document.getElementById('gameIntro').classList.remove('active');
    document.getElementById('gamePlay').classList.add('active');
    
    gameScore = 0;
    gameTimer = 30;
    gameActive = true;
    
    document.getElementById('gameScore').textContent = gameScore;
    document.getElementById('gameTimer').textContent = gameTimer;
    
    // Start timer
    gameInterval = setInterval(() => {
        gameTimer--;
        document.getElementById('gameTimer').textContent = gameTimer;
        
        if (gameTimer <= 0) {
            endGame();
        }
    }, 1000);
    
    // Start spawning hearts
    heartInterval = setInterval(spawnHeart, 800);
}

function spawnHeart() {
    if (!gameActive) return;
    
    const canvas = document.getElementById('gameCanvas');
    const heart = document.createElement('div');
    heart.className = 'falling-heart';
    heart.innerHTML = ['❤️', '💕', '💖', '💗', '💝'][Math.floor(Math.random() * 5)];
    heart.style.left = Math.random() * (canvas.offsetWidth - 40) + 'px';
    heart.style.top = '-40px';
    
    const fallDuration = Math.random() * 2 + 2; // 2-4 seconds
    heart.style.animationDuration = fallDuration + 's';
    
    heart.addEventListener('click', () => {
        gameScore++;
        document.getElementById('gameScore').textContent = gameScore;
        heart.remove();
        createSparkle(heart.offsetLeft + canvas.offsetLeft, heart.offsetTop + canvas.offsetTop);
        
        // Check win condition
        if (gameScore >= 30) {
            endGame();
        }
    });
    
    canvas.appendChild(heart);
    
    // Remove heart after animation
    setTimeout(() => {
        if (heart.parentElement) {
            heart.remove();
        }
    }, fallDuration * 1000);
}

function endGame() {
    gameActive = false;
    clearInterval(gameInterval);
    clearInterval(heartInterval);
    
    // Clear remaining hearts
    const canvas = document.getElementById('gameCanvas');
    canvas.innerHTML = '';
    
    // Show results
    document.getElementById('gamePlay').classList.remove('active');
    document.getElementById('gameResult').classList.add('active');
    
    document.getElementById('finalScore').textContent = gameScore;
    document.getElementById('finalTime').textContent = gameTimer;
    
    if (gameScore >= 30) {
        document.getElementById('resultEmoji').textContent = '🎉';
        document.getElementById('resultTitle').textContent = 'Perfect Score!';
        document.getElementById('resultMessage').textContent = 'You caught all my hearts! You\'re amazing! 💕';
        triggerEmojiRain();
    } else if (gameScore >= 20) {
        document.getElementById('resultEmoji').textContent = '😍';
        document.getElementById('resultTitle').textContent = 'Great Job!';
        document.getElementById('resultMessage').textContent = 'You caught most of my hearts! So close! 💖';
    } else {
        document.getElementById('resultEmoji').textContent = '💝';
        document.getElementById('resultTitle').textContent = 'Good Try!';
        document.getElementById('resultMessage').textContent = 'Practice makes perfect! Try again! 💕';
    }
}

function resetGame() {
    document.getElementById('gameResult').classList.remove('active');
    document.getElementById('gameIntro').classList.add('active');
}

// Music Player using a local "audio/" folder playlist
// Contract:
// - Inputs: selection from #songSelect
// - Outputs: plays audio in #audioPlayer and shows title
// - Error modes: missing file -> shows message; unsupported -> no play

const playlist = [
    // Put your audio files into an "audio/" folder next to index.html, and add entries here.
    // Example: {file: 'audio/song1.mp3', title: 'Our Song'}
    { file: 'song2.mp3', title: 'Our Love Song' },
    { file: 'song.mp3', title: 'Sweet Melody' }
];

function populatePlaylistSelect() {
    const select = document.getElementById('songSelect');
    playlist.forEach((item, idx) => {
        const opt = document.createElement('option');
        opt.value = idx;
        opt.textContent = item.title;
        select.appendChild(opt);
    });
}

function playSelectedSong() {
    const select = document.getElementById('songSelect');
    const idx = select.value;
    const audioPlayer = document.getElementById('audioPlayer');
    const audioPlayerContainer = document.getElementById('audioPlayerContainer');
    const audioTitle = document.getElementById('audioTitle');

    if (idx === '') {
        // nothing chosen
        audioPlayerContainer.style.display = 'none';
        audioPlayer.pause();
        audioPlayer.src = '';
        audioTitle.textContent = 'No song selected';
        return;
    }

    const item = playlist[Number(idx)];
    if (!item) {
        audioTitle.textContent = 'Song not found';
        return;
    }

    audioPlayer.src = item.file;
    audioTitle.textContent = item.title;
    audioPlayerContainer.style.display = 'block';
    audioPlayer.play().catch(err => {
        console.warn('Playback failed:', err);
    });

    // Manage visualizer animation state
    audioPlayer.addEventListener('play', () => {
        document.querySelectorAll('.bar').forEach(bar => {
            bar.style.animationPlayState = 'running';
        });
    });

    audioPlayer.addEventListener('pause', () => {
        document.querySelectorAll('.bar').forEach(bar => {
            bar.style.animationPlayState = 'paused';
        });
    });
}

// populate on load
document.addEventListener('DOMContentLoaded', () => {
    populatePlaylistSelect();

    // Add "Share Pic" button next to Add Message button in the message board
    const msgContainer = document.querySelector('.message-input-container');
    if (msgContainer) {
        const shareBtn = document.createElement('button');
        shareBtn.className = 'btn';
        shareBtn.id = 'sharePicBtn';
        shareBtn.style.marginLeft = '8px';
        shareBtn.innerHTML = '<span>📸 Share Pic</span>';
        shareBtn.addEventListener('click', takeAndShareScreenshot);
        msgContainer.appendChild(shareBtn);
    }
});

// Take screenshot of the container (or full page) and open in new tab for sharing/saving
function takeAndShareScreenshot() {
    // Choose element to capture: the main container
    const target = document.querySelector('.container') || document.body;
    if (typeof html2canvas === 'undefined') {
        alert('Screenshot feature is unavailable because html2canvas is not loaded.');
        return;
    }

    html2canvas(target, { useCORS: true, scale: 1 }).then(canvas => {
        // Open the captured image in a new tab
        const dataUrl = canvas.toDataURL('image/png');
        const w = window.open('about:blank', '_blank');
        if (w) {
            const img = w.document.createElement('img');
            img.src = dataUrl;
            img.style.maxWidth = '100%';
            w.document.body.style.margin = '0';
            w.document.body.appendChild(img);
        } else {
            // fallback: prompt to save
            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = 'sweet_memory.png';
            link.click();
        }
    }).catch(err => {
        console.error('Screenshot failed', err);
        alert('Screenshot failed. See console for details.');
    });
}

// Gallery Modal
function openModal(imageNumber) {
    const modal = document.getElementById('galleryModal');
    const content = document.getElementById('modalContent');
    
    const memories = [
        { emoji: '❤️', text: '💑 First Photo Together', desc: 'The moment we started our journey' },
        { emoji: '🌟', text: '✨ Special Moment', desc: 'A memory we\'ll cherish forever' },
        { emoji: '🎉', text: '🎊 Celebration Time', desc: 'Joy and happiness captured' },
        { emoji: '💑', text: '😍 Us Being Us', desc: 'Just being perfectly imperfect together' },
        { emoji: '🌈', text: '🎨 Adventure Time', desc: 'Exploring the world hand in hand' },
        { emoji: '💝', text: '💞 Forever & Always', desc: 'Our promise of eternal love' }
    ];
    
    content.innerHTML = `
        <div style="text-align: center; background: linear-gradient(135deg, #fff5f8, #ffe8f0); padding: 50px 30px; border-radius: 25px; box-shadow: 0 20px 60px rgba(0,0,0,0.3);">
            <div style="font-size: 10em; margin-bottom: 25px; animation: modalEmojiSpin 2s ease-in-out infinite alternate;">${memories[imageNumber - 1].emoji}</div>
            <h3 style="color: #c2185b; font-size: 2em; margin-bottom: 15px; font-family: 'Dancing Script', cursive;">${memories[imageNumber - 1].text}</h3>
            <p style="color: #666; font-size: 1.2em; margin-top: 15px;">${memories[imageNumber - 1].desc}</p>
            <p style="color: #999; margin-top: 20px; font-size: 0.95em;">💡 Replace with your actual photo!</p>
        </div>
    `;
    
    modal.classList.add('active');
}

function closeModal() {
    document.getElementById('galleryModal').classList.remove('active');
}

function closeModalOnOutside(e) {
    if (e.target === document.getElementById('galleryModal')) {
        closeModal();
    }
}

// Love Quotes Generator
const loveQuotes = [
    "In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine. 💕",
    "You are my today and all of my tomorrows. 💖",
    "I love you not only for what you are, but for what I am when I am with you. 💝",
    "You are the finest, loveliest, tenderest person I have ever known. ✨",
    "In your smile, I see something more beautiful than the stars. 🌟",
    "My heart is and always will be yours. Forever and always. 💗",
    "I fell in love with you because of the million things you never knew you were doing. 💕",
    "Being with you is my favorite place to be. 🏡",
    "You are my sunshine, my only sunshine. 🌞",
    "I love you to the moon and back. 🌙✨",
    "You are my greatest adventure. 🗺️💕",
    "Every love story is beautiful, but ours is my favorite. 📖💖"
];

let currentQuoteIndex = 0;

function showNewQuote() {
    currentQuoteIndex = (currentQuoteIndex + 1) % loveQuotes.length;
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.style.opacity = '0';
    quoteDisplay.style.transform = 'scale(0.8)';
    
    setTimeout(() => {
        quoteDisplay.textContent = loveQuotes[currentQuoteIndex];
        quoteDisplay.style.opacity = '1';
        quoteDisplay.style.transform = 'scale(1)';
    }, 300);
}

// Love Calculator
function calculateLove() {
    const display = document.querySelector('.calculator-display');
    display.style.opacity = '0';
    display.style.transform = 'scale(0)';
    
    setTimeout(() => {
        const percentage = Math.floor(Math.random() * 10) + 91; // Always 91-100%
        display.textContent = percentage + '%';
        display.style.opacity = '1';
        display.style.transform = 'scale(1)';
        
        if (percentage === 100) {
            triggerEmojiRain();
        }
    }, 500);
}

// Emoji Rain Effect
function triggerEmojiRain() {
    const emojis = ['❤️', '💕', '💖', '💗', '💝', '💘', '💞', '💓', '💟', '♥️', '🌹', '💐', '😍', '🥰', '😘', '💋', '🎀', '✨', '⭐', '🌟'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const emoji = document.createElement('div');
            emoji.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
            emoji.style.position = 'fixed';
            emoji.style.left = Math.random() * 100 + '%';
            emoji.style.top = '-50px';
            emoji.style.fontSize = (Math.random() * 30 + 20) + 'px';
            emoji.style.zIndex = '9999';
            emoji.style.pointerEvents = 'none';
            emoji.style.animation = 'floatUp 3s ease-out forwards';
            document.body.appendChild(emoji);
            
            setTimeout(() => {
                emoji.remove();
            }, 3000);
        }, i * 100);
    }
}

// Message Board
document.getElementById('messageInput').addEventListener('input', function() {
    document.getElementById('charCount').textContent = this.value.length;
});

function addMessage() {
    const input = document.getElementById('messageInput');
    const text = input.value.trim();
    
    if (text) {
        const messagesContainer = document.getElementById('messagesContainer');
        const messageItem = document.createElement('div');
        messageItem.className = 'message-item';
        
        const emojis = ['💖', '💕', '💝', '💗', '💘', '💞', '🌹', '💐', '✨', '🌟'];
        const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
        
        messageItem.innerHTML = `
            <div class="message-icon">${randomEmoji}</div>
            <div class="message-text">${text}</div>
        `;
        
        messagesContainer.insertBefore(messageItem, messagesContainer.firstChild);
        input.value = '';
        document.getElementById('charCount').textContent = '0';
        
        createSparkle(window.innerWidth / 2, window.innerHeight / 2);
    }
}

// Add CSS animation for modal emoji
const style = document.createElement('style');
style.textContent = `
    @keyframes modalEmojiSpin {
        0% { transform: rotate(-5deg) scale(1); }
        100% { transform: rotate(5deg) scale(1.1); }
    }
`;
document.head.appendChild(style);

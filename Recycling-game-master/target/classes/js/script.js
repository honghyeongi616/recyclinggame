const gameContainer = document.getElementById('game-container');
const fallingItem = document.getElementById('falling-item');
const bins = document.querySelectorAll('.bin');
const startButton = document.getElementById('start-button');
const restartButton = document.getElementById('restart-button');
const scoreDisplay = document.getElementById('score-display');
const scoreSpan = document.getElementById('score');
const timeDisplay = document.getElementById('time-display');
const timeSpan = document.getElementById('time');

let currentLeft = 275; // 초기 좌우 위치
let fallingSpeed = 2; // 떨어지는 속도
let intervalId;
let gameOver = false;
let score = 0;
let timeLeft = 60; // 게임 시간 60초
let timerId;

// 랜덤으로 쓰레기 위치 설정하는 함수
function setRandomPosition() {
    const containerWidth = gameContainer.clientWidth;
    currentLeft = Math.floor(Math.random() * (containerWidth - 50)); // 게임 컨테이너 내에서 랜덤한 x 좌표 설정
    fallingItem.style.left = `${currentLeft}px`;
}

// 쓰레기 아이템 생성 및 떨어짐
function startFalling() {
    fallingItem.style.top = '0px'; // 아이템이 맨 위에서 시작
    setRandomPosition(); // 랜덤 위치에서 떨어지기 시작

    intervalId = setInterval(() => {
        let top = parseInt(fallingItem.style.top);
        fallingItem.style.top = `${top + fallingSpeed}px`;

        // 바닥에 도착하면
        if (top >= gameContainer.clientHeight - 150) {
            checkCollision();
        }

        // 화면 밖으로 쓰레기가 떨어지면
        if (top >= gameContainer.clientHeight - 50) {
            resetFallingWithoutScore(); // 점수를 얻지 못하고 리셋
        }
    }, 20);
}

// 게임 타이머 함수
function startTimer() {
    timerId = setInterval(() => {
        timeLeft--;
        timeSpan.textContent = timeLeft; // 남은 시간 표시
        if (timeLeft <= 0) {
            endGame(); // 시간 끝나면 게임 종료
        }
    }, 1000);
}

// 키보드 이벤트로 좌우 움직이기
document.addEventListener('keydown', (e) => {
    if (gameOver) return; // 게임 오버면 움직이지 않음

    const containerWidth = gameContainer.clientWidth;

    if (e.key === 'ArrowLeft' && currentLeft > 0) {
        currentLeft -= 70;
        fallingItem.style.left = `${currentLeft}px`;
    } else if (e.key === 'ArrowRight' && currentLeft < containerWidth - 50) {
        currentLeft += 70;
        fallingItem.style.left = `${currentLeft}px`;
    }
});

// 충돌 체크 함수
function checkCollision() {
    const itemType = 'plastic'; // 임시로 설정한 쓰레기 종류 (랜덤화 가능)
    const itemLeft = fallingItem.getBoundingClientRect().left;

    bins.forEach(bin => {
        const binLeft = bin.getBoundingClientRect().left;
        const binWidth = bin.getBoundingClientRect().width;

        // 충돌 감지
        if (itemLeft >= binLeft && itemLeft <= binLeft + binWidth) {
            // 점수 추가
            score += 10; // 점수 추가 로직
            scoreSpan.textContent = score; // 점수 업데이트
            resetFalling();
        }
    });
}

// 쓰레기 아이템 리셋
function resetFalling() {
    fallingItem.style.top = '0px'; // 떨어지는 아이템 초기화
    setRandomPosition(); // 랜덤 위치에서 재시작
}

// 리셋할 때 점수 얻지 않기
function resetFallingWithoutScore() {
    fallingItem.style.top = '0px'; // 떨어지는 아이템 초기화
    setRandomPosition(); // 랜덤 위치에서 재시작
}

// 게임 종료 함수
function endGame() {
    clearInterval(intervalId);
    clearInterval(timerId);
    gameOver = true;
    alert('게임 종료! 최종 점수: ' + score);
    restartButton.style.display = 'block';
}

// 게임 시작 및 재시작 버튼 이벤트
startButton.addEventListener('click', () => {
    score = 0;
    timeLeft = 60; // 게임 시간 초기화
    scoreSpan.textContent = score; // 점수 초기화
    timeSpan.textContent = timeLeft; // 시간 초기화
    scoreDisplay.style.display = 'block'; // 점수 디스플레이 보이기
    startFalling(); // 쓰레기 떨어지기 시작
    startTimer(); // 타이머 시작
});

restartButton.addEventListener('click', () => {
    location.reload(); // 페이지 새로 고침하여 게임 재시작
});

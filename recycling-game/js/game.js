class StageSelectScene extends Phaser.Scene {
    constructor() {
        super('StageSelectScene');
    }

    preload() {
        this.load.image('stage_background', 'assets/images/stage_background.png');
        this.load.image('stage1_button', 'assets/images/stage_button1.png');
        this.load.image('stage2_button', 'assets/images/stage_button2.png');
        this.load.image('stage3_button', 'assets/images/stage_button3.png');
        this.load.image('back_button', 'assets/images/menu_button.png'); // 뒤로 가기 버튼 이미지 로드
    }

    create() {
        this.add.image(750, 450, 'stage_background').setDisplaySize(1500, 900);

        this.add.text(750, 100, '스테이지 선택', {
            fontSize: '64px',
            fill: '#ffffff',
            fontFamily: 'Arial',
            fontWeight: 'bold',
            stroke: '#000000',
            strokeThickness: 6
        }).setOrigin(0.5);

        const stage1Button = this.add.image(500, 450, 'stage1_button')
            .setInteractive()
            .setScale(0.5);

        const stage2Button = this.add.image(750, 450, 'stage2_button')
            .setInteractive()
            .setScale(0.5);

        const stage3Button = this.add.image(1000, 480, 'stage3_button')
            .setInteractive()
            .setScale(0.5);

        // 뒤로 가기 버튼 추가
        const backButton = this.add.image(100, 100, 'back_button')
            .setInteractive()
            .setScale(0.5);

            stage1Button.on('pointerdown', () => this.scene.start('GameScene1', { stage: 1 }));
            stage2Button.on('pointerdown', () => this.scene.start('GameScene2', { stage: 2 }));
            stage3Button.on('pointerdown', () => this.scene.start('GameScene3', { stage: 3 }));
        
        // 뒤로 가기 버튼 클릭 이벤트
        backButton.on('pointerdown', () => this.scene.start('StartScene'));

        this.addHoverEffect(stage1Button);
        this.addHoverEffect(stage2Button);
        this.addHoverEffect(stage3Button);
        this.addHoverEffect(backButton);
    }

    addHoverEffect(button) {
        button.on('pointerover', () => button.setScale(0.55));
        button.on('pointerout', () => button.setScale(0.5));
    }
}

class LoginScene extends Phaser.Scene {
    constructor() {
        super('LoginScene');
    }

    preload() {
        this.load.image('login_background', 'assets/images/login_background.png');
        this.load.image('game_title', 'assets/images/game_title.png');
    }

    create() {
        // 배경 이미지 추가
        this.add.image(750, 450, 'login_background').setDisplaySize(1500, 900);
        
        // 게임 제목 이미지 추가
        this.add.image(750, 200, 'game_title').setOrigin(0.5).setScale(0.8);

        this.add.text(750, 650, '사용자 이름을 입력하세요', {
            fontSize: '32px',
            fill: '#ffffff',
            fontFamily: 'Arial',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0.5);

        // 입력 필드 스타일링
        const inputElement = document.createElement('input');
        inputElement.type = 'text';
        inputElement.placeholder = '사용자 이름';
        inputElement.style = `
            position: absolute;
            left: 50%;
            top: 80%;
            transform: translate(-50%, -50%);
            width: 400px;
            padding: 15px;
            font-size: 24px;
            border: none;
            border-radius: 25px;
            text-align: center;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        `;
        document.body.appendChild(inputElement);

        // 로그인 버튼 스타일링
        const loginButton = this.add.text(750, 830, '로그인', { 
            fontSize: '32px',
            fill: '#ffffff',
            backgroundColor: '#4CAF50',
            padding: { x: 30, y: 15 },
            borderRadius: 25
        }).setOrigin(0.5).setInteractive();

        loginButton.on('pointerover', () => loginButton.setStyle({ fill: '#000000' }));
        loginButton.on('pointerout', () => loginButton.setStyle({ fill: '#ffffff' }));

        loginButton.on('pointerdown', () => {
            const username = inputElement.value;
            if (username) {
                localStorage.setItem('username', username);
                document.body.removeChild(inputElement);
                this.scene.start('StartScene');
            } else {
                alert('사용자 이름을 입력해주세요.');
            }
        });

        // 팀명 추가
        this.add.text(1400, 800, 'Green team', {
            fontSize: '28px',
            fill: '#ffffff',
            fontFamily: 'Arial',
            fontStyle: 'italic'
        }).setOrigin(1, 1);

        // 3명의 이름 추가
        const names = ['홍현기', '손태균', '강현진'];
        names.forEach((name, index) => {
            this.add.text(1400, 830 + index * 20, name, {
                fontSize: '20px',
                fill: '#ffffff',
                fontFamily: 'Arial'
            }).setOrigin(1, 1);
        });
    }
}

class StartScene extends Phaser.Scene {
    constructor() {
        super('StartScene');
    }

    preload() {
        this.load.image('start_background', 'assets/images/start_background.png');
        this.load.image('start_button', 'assets/images/start_button.png');
        this.load.image('score_button', 'assets/images/score_button.png');
        this.load.image('game_title', 'assets/images/game_title.png');
    }

    create() {
        // 흰색 배경 추가
        this.add.rectangle(0, 0, 1500, 900, 0xFFFFFF).setOrigin(0);

        // start_background 이미지 추가
        const background = this.add.image(750, 450, 'start_background');
        background.setDisplaySize(1500, 900);

        this.add.image(750, 300, 'game_title').setOrigin(0.5).setScale(0.8);

        // 반투명한 오버레이 추가
        const userName = localStorage.getItem('username');
        this.add.text(750, 100, `환영합니다, ${userName}님!`, { 
            fontSize: '48px',
            fill: '#9ACD32',
            fontFamily: 'Poppy Spoor',
            fontWeight: 'bold',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0.5);


        const startButton = this.add.image(630, 710, 'start_button')
            .setInteractive()
            .setScale(0.5);

        let scoreButton = this.add.image(870, 700, 'score_button')
            .setOrigin(0.5)
            .setInteractive()
            .setScale(0.5);

        this.addHoverEffect(startButton);
        this.addHoverEffect(scoreButton);

        startButton.on('pointerdown', () => this.scene.start('StageSelectScene')); // 여기를 수정
        scoreButton.on('pointerdown', () => this.scene.start('ScoreScene'));
    
    }

    addHoverEffect(button) {
        button.on('pointerover', () => button.setScale(0.55));
        button.on('pointerout', () => button.setScale(0.5));
    }
}
class ScoreScene extends Phaser.Scene {
    constructor() {
        super('ScoreScene');
    }

    preload() {
        this.load.image('score_background', 'assets/images/score_background.png');
        this.load.image('menu_button', 'assets/images/menu_button.png');
        this.load.image('first_place_icon', 'assets/images/first_place_icon.png');
    }

    create() {
        this.add.rectangle(0, 0, 1500, 900, 0xFFFFFF).setOrigin(0);
        this.add.image(750, 450, 'score_background').setDisplaySize(1500, 900);
        
        console.log("ScoreScene created");
    
        const scores = this.getScoresFromCookies();
    
         const stageKeys = ['GameScene1', 'GameScene2', 'GameScene3'];
         const stageNames = ['Stage 1', 'Stage 2', 'Stage 3'];
        
        stageKeys.forEach((key, index) => {
            // 스테이지 이름 추가
            this.add.text(250 + index * 500, 100, stageNames[index], { 
                fontSize: '48px', 
                fill: '#ffffff',
                fontFamily: 'Arial',
                fontWeight: 'bold',
                stroke: '#000000',
                strokeThickness: 4
            }).setOrigin(0.5);
            
            // 해당 스테이지의 점수 배열 불러오기
            const stageScores = scores[key] || [];
        
            for (let i = 0; i < 5 && i < stageScores.length; i++) {
                let scoreText = this.add.text(250 + index * 500, 200 + i * 60, 
                    `${i + 1}. ${stageScores[i].name}: ${stageScores[i].score}점`, { 
                    fontSize: '24px', 
                    fill: '#ffffff',
                    fontFamily: 'Arial',
                    stroke: '#000000',
                    strokeThickness: 2
                }).setOrigin(0.5);
    
                if (i === 0) {
                    let icon = this.add.image(scoreText.x - scoreText.width / 2 - 30, scoreText.y, 'first_place_icon');
                    icon.setScale(0.4);
                }
            }
        });
        
    
        // 메뉴 버튼 추가
        let menuButton = this.add.image(750, 800, 'menu_button')
            .setInteractive()
            .setScale(0.5);
        
        menuButton.on('pointerdown', () => this.scene.start('StartScene'));
        this.addHoverEffect(menuButton);
        
    }
    getScoresFromCookies() {
        const cookies = document.cookie.split(';');
        const scores = {};
    
        cookies.forEach(cookie => {
            const [key, value] = cookie.trim().split('=');
            if (key.startsWith('GameScene')) {
                const [name, score] = value.split(':');
                if (!scores[key]) {
                    scores[key] = [];
                }
                scores[key].push({ name, score: parseInt(score) });
            }
        });
    
        // 각 스테이지의 점수를 정렬
        Object.keys(scores).forEach(key => {
            scores[key].sort((a, b) => b.score - a.score);
        });
    
        return scores;
    }
    addHoverEffect(button) {
        button.on('pointerover', () => button.setScale(0.55));
        button.on('pointerout', () => button.setScale(0.5));
    }
    
}    

class GameScene1 extends Phaser.Scene {
    constructor() {
        super('GameScene1');
        this.trashGenerationEvent = null;
    }

    init() {
        this.score = 0;
        this.gameTime = 60;
        this.gameOver = false;
        this.timer = null;
    }


    preload() {
        this.load.image('background', 'assets/images/background.png');
        this.load.image('bin_paper', 'assets/images/bin_paper.png', { frameWidth: 100, frameHeight: 100 });
        this.load.image('bin_plastic', 'assets/images/bin_plastic.png', { frameWidth: 100, frameHeight: 100 });
        this.load.image('bin_glass', 'assets/images/bin_glass.png', { frameWidth: 100, frameHeight: 100 });
        this.load.image('bin_can', 'assets/images/bin_can.png', { frameWidth: 100, frameHeight: 100 });
        this.load.image('trash_paper', 'assets/images/trash_paper.png', { frameWidth: 50, frameHeight: 50 });
        this.load.image('trash_plastic', 'assets/images/trash_plastic.png', { frameWidth: 50, frameHeight: 50 });
        this.load.image('trash_glass', 'assets/images/trash_glass.png', { frameWidth: 50, frameHeight: 50 });
        this.load.image('trash_can', 'assets/images/trash_can.png', { frameWidth: 50, frameHeight: 50 });
        this.load.image('trash_paper2', 'assets/images/trash_paper2.png', { frameWidth: 50, frameHeight: 50 });
        this.load.image('trash_plastic2', 'assets/images/trash_plastic2.png', { frameWidth: 50, frameHeight: 50 });
        this.load.image('trash_glass2', 'assets/images/trash_glass2.png', { frameWidth: 50, frameHeight: 50 });
        this.load.image('trash_can2', 'assets/images/trash_can2.png', { frameWidth: 50, frameHeight: 50 });
        this.load.image('background1', 'assets/images/background1.png');
        this.load.image('background2', 'assets/images/background2.png');
        this.load.image('background3', 'assets/images/background3.png');
        
    }

    create() {
        if (this.timer) {
            this.timer.remove();
        }
        const background = this.add.image(750, 450, `background1`);
        background.setDisplaySize(1500, 900);
        const scale = 1.2; // 이 값을 조절하여 축소 정도를 변경할 수 있습니다 (0.9는 10% 축소)
        background.setDisplaySize(1500, 900);
    
        this.binPaper = this.add.image(200, 800, 'bin_paper').setDisplaySize(220, 220);
        this.binPlastic = this.add.image(550, 800, 'bin_plastic').setDisplaySize(220, 220);
        this.binGlass = this.add.image(930, 800, 'bin_glass').setDisplaySize(220, 220);
        this.binCan = this.add.image(1330, 800, 'bin_can').setDisplaySize(220, 220);

         // ESC 키를 눌렀을 때 일시정지 기능 설정
         this.input.keyboard.on('keydown-ESC', this.togglePause, this);
        
 
         // 쓰레기 생성과 타이머 이벤트 초기화 코드 추가
        this.scoreText = this.add.text(16, 16, 'Score: 0', { 
            fontSize: '40px', 
            fill: '#ffffff',
            fontFamily: 'Arial',
            stroke: '#000000',
            strokeThickness: 4
        });

        this.timerText = this.add.text(16, 50, 'Time: 60', { 
            fontSize: '40px', 
            fill: '#ffffff',
            fontFamily: 'Arial',
            stroke: '#000000',
            strokeThickness: 4
        });
        
        this.trashGenerationEvent = this.time.addEvent({
            delay: 2000,
            callback: this.createTrash,
            callbackScope: this,
            loop: true
        });

        this.timer = this.time.addEvent({
            delay: 1000,
            callback: this.updateTimer,
            callbackScope: this,
            loop: true
        });

        this.input.on('dragstart', (pointer, gameObject) => {
            gameObject.setTint(0xff0000);
        });

        this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });

        this.input.on('dragend', (pointer, gameObject) => {
            gameObject.clearTint();
            if (this.handleCollision(gameObject, this.binCan)) return;
            if (this.handleCollision(gameObject, this.binPaper)) return;
            if (this.handleCollision(gameObject, this.binPlastic)) return;
            if (this.handleCollision(gameObject, this.binGlass)) return;
            
            // 어떤 쓰레기통과도 충돌하지 않았다면 원래 위치로 돌아가거나 다른 처리를 할 수 있습니다.
            gameObject.x = gameObject.input.dragStartX;
            gameObject.y = gameObject.input.dragStartY;
        });
    }
    togglePause() {
        if (this.gameOver) return;

        this.isPaused = !this.isPaused; // 일시정지 상태를 반전시킴
        this.physics.world.isPaused = this.isPaused; // 물리 엔진 일시정지
        this.trashGenerationEvent && (this.trashGenerationEvent.paused = this.isPaused);
        if (this.timer) this.timer.paused = this.isPaused; // 타이머는 초기화하지 않고 일시정지만 함

        if (this.isPaused) {
            this.showPauseMenu(); // 일시정지 메뉴를 보여줌
        } else {
            this.closePauseMenu(); // 일시정지 메뉴를 닫음
        }
    }

    showPauseMenu() {
        // 반투명 오버레이 추가
        this.pauseOverlay = this.add.rectangle(750, 450, 1500, 900, 0x000000, 0.5);

        // 일시정지 팝업 박스 추가
        this.pauseBox = this.add.rectangle(750, 450, 500, 300, 0xffffff).setOrigin(0.5);
        
        // "게임 일시 정지" 텍스트 추가
        this.pauseText = this.add.text(750, 350, '게임 일시 정지', {
            fontSize: '40px',
            fill: '#000',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // "계속하기" 버튼 추가
        this.continueButton = this.add.text(750, 450, '계속하기', {
            fontSize: '32px',
            fill: '#000',
            backgroundColor: '#00FF00',
            padding: { x: 20, y: 10 }
        }).setOrigin(0.5).setInteractive();

        this.continueButton.on('pointerdown', () => {
            this.togglePause(); // 일시정지 해제
            this.removePauseMenu(); // 메뉴 삭제
        });

        // "게임 종료" 버튼 추가
        this.quitButton = this.add.text(750, 550, '게임 종료', {
            fontSize: '32px',
            fill: '#000',
            backgroundColor: '#FF0000',
            padding: { x: 20, y: 10 }
        }).setOrigin(0.5).setInteractive();

        this.quitButton.on('pointerdown', () => {
            this.removePauseMenu(); // 메뉴 삭제
            this.scene.start('StartScene'); // 시작 화면으로 이동
        });
    }

    removePauseMenu() {
        // 일시정지 메뉴의 요소들을 제거
        if (this.pauseOverlay) this.pauseOverlay.destroy();
        if (this.pauseBox) this.pauseBox.destroy();
        if (this.pauseText) this.pauseText.destroy();
        if (this.continueButton) this.continueButton.destroy();
        if (this.quitButton) this.quitButton.destroy();
    }

    closePauseMenu() {
        // 일시정지 상태 해제 시 오버레이와 메뉴 제거
        this.removePauseMenu();
    }



    update() {
        if (this.gameOver) {
            return;
        }
        // 여기에 추가 게임 로직을 구현할 수 있습니다.
    }

    createTrash() {
        if (this.gameOver) return;
        const trashTypes = ['trash_paper', 'trash_plastic', 'trash_glass', 'trash_can','trash_paper2', 'trash_plastic2', 'trash_glass2', 'trash_can2'];
        const randomType = Phaser.Math.RND.pick(trashTypes);
        const x = Phaser.Math.Between(100, 1400);
        const trash = this.physics.add.image(x, 0, randomType);
        
        if (randomType === 'trash_paper') {
            trash.setScale(1.2);  // 종이 쓰레기의 크기를 조정
        }
        if (randomType === 'trash_paper2') {
            trash.setScale(1.2);  // 종이 쓰레기의 크기를 조정
        }
        trash.setInteractive();
        this.input.setDraggable(trash);
    
        // 중력 효과 추가
        trash.body.setGravityY(100);
    
        // 바닥에 닿으면 제거
        trash.body.onWorldBounds = true;
        this.physics.world.on('worldbounds', (body) => {
            if (body.gameObject === trash) {
                trash.destroy();
            }
        });
    
        return trash;
    }

    checkCollision(trash, bin) {
        const bounds1 = trash.getBounds();
        const bounds2 = bin.getBounds();
        return Phaser.Geom.Intersects.RectangleToRectangle(bounds1, bounds2);
    }

    handleCollision(trash, bin) {
        if (this.checkCollision(trash, bin)) {
            let scored = false;
            if ((trash.texture.key === 'trash_paper' && bin === this.binPaper) ||
                (trash.texture.key === 'trash_plastic' && bin === this.binPlastic) ||
                (trash.texture.key === 'trash_glass' && bin === this.binGlass)||
                (trash.texture.key === 'trash_can' && bin === this.binCan)||
                (trash.texture.key === 'trash_paper2' && bin === this.binPaper) ||
                (trash.texture.key === 'trash_plastic2' && bin === this.binPlastic) ||
                (trash.texture.key === 'trash_glass2' && bin === this.binGlass)||
                (trash.texture.key === 'trash_can2' && bin === this.binCan)) {
                this.score += 10;
                this.addScoreText('+10', trash.x, trash.y, '#00FF00');
                scored = true;
            }
            
            if (!scored) {
                this.score -= 5;
                this.addScoreText('-5', trash.x, trash.y, '#FF0000');
            }
            
            this.scoreText.setText('Score: ' + this.score);
            trash.destroy();
            return true; // 충돌이 처리되었음을 나타냄
        }
        return false; // 충돌이 없었음을 나타냄
    }
    
    addScoreText(text, x, y, color) {
        const scoreText = this.add.text(x, y, text, { 
            fontSize: '36px', 
            fontWeight: 'bold',
            fill: color,
            stroke: '#000000',
            strokeThickness: 4
        });
        scoreText.setOrigin(0.5);
        
        this.tweens.add({
            targets: scoreText,
            y: y - 100,
            alpha: 0,
            duration: 1500,
            ease: 'Cubic.out',
            onComplete: () => scoreText.destroy()
        });
    }

    updateTimer() {
        if (this.gameOver) return;
    
        this.gameTime--;
        this.timerText.setText('Time: ' + this.gameTime);
    
        if (this.gameTime <= 0) {
            this.gameTime = 0;
            this.timerText.setText('Time: 0');
            this.endGame();
        }
    }

    endGame() {
        if (this.gameOver) return;
        this.gameOver = true;
    
        if (this.timer) {
            this.timer.remove();
            this.timer = null;
        }
        if (this.trashGenerationEvent) {
            this.trashGenerationEvent.remove();
            this.trashGenerationEvent = null;
        }
    
        const userName = localStorage.getItem('username');  // 'username'으로 수정
        this.saveScore(this.score);
        
        //게임오버 화면
        const overlay = this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0x000000, 0.7);
        overlay.setOrigin(0);
    
        const popup = this.add.rectangle(750, 450, 750, 450, 0xffffff);
        popup.setOrigin(0.5);
    
        this.add.text(750, 250, 'Game Over!', { 
            fontSize: '48px', 
            fill: '#000',
            fontStyle: 'bold'
        }).setOrigin(0.5);
    
        this.add.text(750, 350, `${userName}님의 최종 점수`, {  // 이름 추가
            fontSize: '40px', 
            fill: '#000' ,
            padding: { x: 5, y: 5 } 
        }).setOrigin(0.5);

        this.add.text(750, 420, `${this.score}점`, {  // 점수 별도 표시
            fontSize: '48px', 
            fill: '#000',
            fontStyle: 'bold'
        }).setOrigin(0.5);
    
        const restartButton = this.add.text(750, 480, 'Restart', { 
            fontSize: '24px', 
            fill: '#000' 
        }).setOrigin(0.5).setInteractive();
    
        restartButton.on('pointerdown', () => {
            this.scene.restart();
        });
    
        const menuButton = this.add.text(750, 550, 'Main Menu', { 
            fontSize: '24px', 
            fill: '#000' 
        }).setOrigin(0.5).setInteractive();
    
        menuButton.on('pointerdown', () => {
            this.scene.start('StartScene');
        });
        console.log("Saved scores:", JSON.parse(localStorage.getItem('scores')));
    }
    
    saveScore(score) {
        const userName = localStorage.getItem('username');
        const scoreData = `${this.scene.key}=${userName}:${score}`;
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 30); // 30일 후 만료
    
        document.cookie = `${scoreData}; expires=${expirationDate.toUTCString()}; path=/`;
    }
}
class Gamescene2 extends Phaser.Scene {
    constructor() {
        super('GameScene2');
        this.trashGenerationEvent = null;
    }

    init() {
        this.score = 0;
        this.gameTime = 60;
        this.gameOver = false;
        this.timer = null;
    }


    preload() {
        this.load.image('background', 'assets/images/background.png');
        this.load.image('bin_paper', 'assets/images/bin_paper.png', { frameWidth: 100, frameHeight: 100 });
        this.load.image('bin_plastic', 'assets/images/bin_plastic.png', { frameWidth: 100, frameHeight: 100 });
        this.load.image('bin_glass', 'assets/images/bin_glass.png', { frameWidth: 100, frameHeight: 100 });
        this.load.image('bin_can', 'assets/images/bin_can.png', { frameWidth: 100, frameHeight: 100 });
        this.load.image('bin_food', 'assets/images/bin_food.png', { frameWidth: 100, frameHeight: 100 });

        this.load.image('trash_paper', 'assets/images/trash_paper.png', { frameWidth: 50, frameHeight: 50 });
        this.load.image('trash_plastic', 'assets/images/trash_plastic.png', { frameWidth: 50, frameHeight: 50 });
        this.load.image('trash_glass', 'assets/images/trash_glass.png', { frameWidth: 50, frameHeight: 50 });
        this.load.image('trash_can', 'assets/images/trash_can.png', { frameWidth: 50, frameHeight: 50 });
        this.load.image('trash_food', 'assets/images/trash_food.png', { frameWidth: 50, frameHeight: 50 });

        this.load.image('trash_paper2', 'assets/images/trash_paper2.png', { frameWidth: 50, frameHeight: 50 });
        this.load.image('trash_plastic2', 'assets/images/trash_plastic2.png', { frameWidth: 50, frameHeight: 50 });
        this.load.image('trash_glass2', 'assets/images/trash_glass2.png', { frameWidth: 50, frameHeight: 50 });
        this.load.image('trash_can2', 'assets/images/trash_can2.png', { frameWidth: 50, frameHeight: 50 });
        this.load.image('trash_food2', 'assets/images/trash_food2.png', { frameWidth: 50, frameHeight: 50 });
        
        this.load.image('background1', 'assets/images/background1.png');
        this.load.image('background2', 'assets/images/background2.png');
        this.load.image('background3', 'assets/images/background3.png');
        
    }

    create() {
        if (this.timer) {
            this.timer.remove();
        }
        const background = this.add.image(750, 450, `background2`);
        background.setDisplaySize(1500, 900);
        const scale = 1.2; // 이 값을 조절하여 축소 정도를 변경할 수 있습니다 (0.9는 10% 축소)
        background.setDisplaySize(1500, 900);
    
        this.binPaper = this.add.image(200, 800, 'bin_paper').setDisplaySize(220, 220);
        this.binPlastic = this.add.image(480, 800, 'bin_plastic').setDisplaySize(220, 220);
        this.binGlass = this.add.image(760, 800, 'bin_glass').setDisplaySize(220, 220);
        this.binCan = this.add.image(1030, 800, 'bin_can').setDisplaySize(220, 220);
        this.binFood = this.add.image(1330, 800, 'bin_food').setDisplaySize(250, 250);


         // ESC 키를 눌렀을 때 일시정지 기능 설정
         this.input.keyboard.on('keydown-ESC', this.togglePause, this);
        
 
         // 쓰레기 생성과 타이머 이벤트 초기화 코드 추가
        this.scoreText = this.add.text(16, 16, 'Score: 0', { 
            fontSize: '40px', 
            fill: '#ffffff',
            fontFamily: 'Arial',
            stroke: '#000000',
            strokeThickness: 4
        });

        this.timerText = this.add.text(16, 50, 'Time: 60', { 
            fontSize: '40px', 
            fill: '#ffffff',
            fontFamily: 'Arial',
            stroke: '#000000',
            strokeThickness: 4
        });
        
        this.trashGenerationEvent = this.time.addEvent({
            delay: 1800,
            callback: this.createTrash,
            callbackScope: this,
            loop: true
        });

        this.timer = this.time.addEvent({
            delay: 1000,
            callback: this.updateTimer,
            callbackScope: this,
            loop: true
        });

        this.input.on('dragstart', (pointer, gameObject) => {
            gameObject.setTint(0xff0000);
        });

        this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });

        this.input.on('dragend', (pointer, gameObject) => {
            gameObject.clearTint();
            if (this.handleCollision(gameObject, this.binCan)) return;
            if (this.handleCollision(gameObject, this.binPaper)) return;
            if (this.handleCollision(gameObject, this.binPlastic)) return;
            if (this.handleCollision(gameObject, this.binGlass)) return;
            if (this.handleCollision(gameObject, this.binFood)) return;
            
            // 어떤 쓰레기통과도 충돌하지 않았다면 원래 위치로 돌아가거나 다른 처리를 할 수 있습니다.
            gameObject.x = gameObject.input.dragStartX;
            gameObject.y = gameObject.input.dragStartY;
        });
    }
    togglePause() {
        if (this.gameOver) return;

        this.isPaused = !this.isPaused; // 일시정지 상태를 반전시킴
        this.physics.world.isPaused = this.isPaused; // 물리 엔진 일시정지
        this.trashGenerationEvent && (this.trashGenerationEvent.paused = this.isPaused);
        if (this.timer) this.timer.paused = this.isPaused; // 타이머는 초기화하지 않고 일시정지만 함

        if (this.isPaused) {
            this.showPauseMenu(); // 일시정지 메뉴를 보여줌
        } else {
            this.closePauseMenu(); // 일시정지 메뉴를 닫음
        }
    }

    showPauseMenu() {
        // 반투명 오버레이 추가
        this.pauseOverlay = this.add.rectangle(750, 450, 1500, 900, 0x000000, 0.5);

        // 일시정지 팝업 박스 추가
        this.pauseBox = this.add.rectangle(750, 450, 500, 300, 0xffffff).setOrigin(0.5);
        
        // "게임 일시 정지" 텍스트 추가
        this.pauseText = this.add.text(750, 350, '게임 일시 정지', {
            fontSize: '40px',
            fill: '#000',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // "계속하기" 버튼 추가
        this.continueButton = this.add.text(750, 450, '계속하기', {
            fontSize: '32px',
            fill: '#000',
            backgroundColor: '#00FF00',
            padding: { x: 20, y: 10 }
        }).setOrigin(0.5).setInteractive();

        this.continueButton.on('pointerdown', () => {
            this.togglePause(); // 일시정지 해제
            this.removePauseMenu(); // 메뉴 삭제
        });

        // "게임 종료" 버튼 추가
        this.quitButton = this.add.text(750, 550, '게임 종료', {
            fontSize: '32px',
            fill: '#000',
            backgroundColor: '#FF0000',
            padding: { x: 20, y: 10 }
        }).setOrigin(0.5).setInteractive();

        this.quitButton.on('pointerdown', () => {
            this.removePauseMenu(); // 메뉴 삭제
            this.scene.start('StartScene'); // 시작 화면으로 이동
        });
    }

    removePauseMenu() {
        // 일시정지 메뉴의 요소들을 제거
        if (this.pauseOverlay) this.pauseOverlay.destroy();
        if (this.pauseBox) this.pauseBox.destroy();
        if (this.pauseText) this.pauseText.destroy();
        if (this.continueButton) this.continueButton.destroy();
        if (this.quitButton) this.quitButton.destroy();
    }

    closePauseMenu() {
        // 일시정지 상태 해제 시 오버레이와 메뉴 제거
        this.removePauseMenu();
    }



    update() {
        if (this.gameOver) {
            return;
        }
        // 여기에 추가 게임 로직을 구현할 수 있습니다.
    }

    createTrash() {
        if (this.gameOver) return;
        const trashTypes = ['trash_paper', 'trash_plastic', 'trash_glass', 'trash_can','trash_food','trash_paper2', 'trash_plastic2', 'trash_glass2', 'trash_can2','trash_food2'];
        const randomType = Phaser.Math.RND.pick(trashTypes);
        const x = Phaser.Math.Between(100, 1400);
        const trash = this.physics.add.image(x, 0, randomType);

        if (randomType === 'trash_food') {
            trash.setScale(0.6);  // trash_food의 크기를 0.8배로 줄임
        } 
        if (randomType === 'trash_paper') {
            trash.setScale(1.2);  // 종이 쓰레기의 크기를 더 작게 조정
        }
        
        trash.setInteractive();
        this.input.setDraggable(trash);
    
        // 중력 효과 추가
        trash.body.setGravityY(100);
    
        // 바닥에 닿으면 제거
        trash.body.onWorldBounds = true;
        this.physics.world.on('worldbounds', (body) => {
            if (body.gameObject === trash) {
                trash.destroy();
            }
        });
    
        return trash;
    }

    checkCollision(trash, bin) {
        const bounds1 = trash.getBounds();
        const bounds2 = bin.getBounds();
        return Phaser.Geom.Intersects.RectangleToRectangle(bounds1, bounds2);
    }

    handleCollision(trash, bin) {
        if (this.checkCollision(trash, bin)) {
            let scored = false;
            if ((trash.texture.key === 'trash_paper' && bin === this.binPaper) ||
                (trash.texture.key === 'trash_plastic' && bin === this.binPlastic) ||
                (trash.texture.key === 'trash_glass' && bin === this.binGlass)||
                (trash.texture.key === 'trash_can' && bin === this.binCan)||
                (trash.texture.key === 'trash_paper2' && bin === this.binPaper) ||
                (trash.texture.key === 'trash_plastic2' && bin === this.binPlastic) ||
                (trash.texture.key === 'trash_glass2' && bin === this.binGlass)||
                (trash.texture.key === 'trash_can2' && bin === this.binCan)||
                (trash.texture.key === 'trash_food' && bin === this.binFood)||
                (trash.texture.key === 'trash_food2' && bin === this.binFood)) {
                this.score += 10;
                this.addScoreText('+10', trash.x, trash.y, '#00FF00');
                scored = true;
            }
            
            if (!scored) {
                this.score -= 5;
                this.addScoreText('-5', trash.x, trash.y, '#FF0000');
            }
            
            this.scoreText.setText('Score: ' + this.score);
            trash.destroy();
            return true; // 충돌이 처리되었음을 나타냄
        }
        return false; // 충돌이 없었음을 나타냄
    }
    
    addScoreText(text, x, y, color) {
        const scoreText = this.add.text(x, y, text, { 
            fontSize: '36px', 
            fontWeight: 'bold',
            fill: color,
            stroke: '#000000',
            strokeThickness: 4
        });
        scoreText.setOrigin(0.5);
        
        this.tweens.add({
            targets: scoreText,
            y: y - 100,
            alpha: 0,
            duration: 1500,
            ease: 'Cubic.out',
            onComplete: () => scoreText.destroy()
        });
    }

    updateTimer() {
        if (this.gameOver) return;
    
        this.gameTime--;
        this.timerText.setText('Time: ' + this.gameTime);
    
        if (this.gameTime <= 0) {
            this.gameTime = 0;
            this.timerText.setText('Time: 0');
            this.endGame();
        }
    }

    endGame() {
        if (this.gameOver) return;
        this.gameOver = true;
    
        if (this.timer) {
            this.timer.remove();
            this.timer = null;
        }
        if (this.trashGenerationEvent) {
            this.trashGenerationEvent.remove();
            this.trashGenerationEvent = null;
        }
    
        const userName = localStorage.getItem('username');  // 'username'으로 수정
        this.saveScore(this.score);
        
        //게임오버 화면
        const overlay = this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0x000000, 0.7);
        overlay.setOrigin(0);
    
        const popup = this.add.rectangle(750, 450, 750, 450, 0xffffff);
        popup.setOrigin(0.5);
    
        this.add.text(750, 250, 'Game Over!', { 
            fontSize: '48px', 
            fill: '#000',
            fontStyle: 'bold'
        }).setOrigin(0.5);
    
        this.add.text(750, 350, `${userName}님의 최종 점수`, {  // 이름 추가
            fontSize: '40px', 
            fill: '#000' ,
            padding: { x: 5, y: 5 } 
        }).setOrigin(0.5);

        this.add.text(750, 420, `${this.score}점`, {  // 점수 별도 표시
            fontSize: '48px', 
            fill: '#000',
            fontStyle: 'bold'
        }).setOrigin(0.5);
    
        const restartButton = this.add.text(750, 480, 'Restart', { 
            fontSize: '24px', 
            fill: '#000' 
        }).setOrigin(0.5).setInteractive();
    
        restartButton.on('pointerdown', () => {
            this.scene.restart();
        });
    
        const menuButton = this.add.text(750, 550, 'Main Menu', { 
            fontSize: '24px', 
            fill: '#000' 
        }).setOrigin(0.5).setInteractive();
    
        menuButton.on('pointerdown', () => {
            this.scene.start('StartScene');
        });
    }
    
    saveScore(score) {
        const userName = localStorage.getItem('username');
        const scoreData = `${this.scene.key}=${userName}:${score}`;
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 30); // 30일 후 만료
    
        document.cookie = `${scoreData}; expires=${expirationDate.toUTCString()}; path=/`;
    }
}

class Gamescene3 extends Phaser.Scene {
    constructor() {
        super('GameScene3');
        this.trashGenerationEvent = null;
    }

    init() {
        this.score = 0;
        this.gameTime = 60;
        this.gameOver = false;
        this.timer = null;
    }


    preload() {
        this.load.image('background', 'assets/images/background.png');
        this.load.image('bin_paper', 'assets/images/bin_paper.png', { frameWidth: 100, frameHeight: 100 });
        this.load.image('bin_plastic', 'assets/images/bin_plastic.png', { frameWidth: 100, frameHeight: 100 });
        this.load.image('bin_glass', 'assets/images/bin_glass.png', { frameWidth: 100, frameHeight: 100 });
        this.load.image('bin_can', 'assets/images/bin_can.png', { frameWidth: 100, frameHeight: 100 });
        this.load.image('bin_food', 'assets/images/bin_food.png', { frameWidth: 100, frameHeight: 100 });
        this.load.image('bin_caper', 'assets/images/bin_caper.png', { frameWidth: 100, frameHeight: 100 });

        this.load.image('trash_paper', 'assets/images/trash_paper.png', { frameWidth: 50, frameHeight: 50 });
        this.load.image('trash_plastic', 'assets/images/trash_plastic.png', { frameWidth: 50, frameHeight: 50 });
        this.load.image('trash_glass', 'assets/images/trash_glass.png', { frameWidth: 50, frameHeight: 50 });
        this.load.image('trash_can', 'assets/images/trash_can.png', { frameWidth: 50, frameHeight: 50 });
        this.load.image('trash_food', 'assets/images/trash_food.png', { frameWidth: 50, frameHeight: 50 });
        this.load.image('trash_caper', 'assets/images/trash_caper.png', { frameWidth: 50, frameHeight: 50 });

        this.load.image('trash_paper2', 'assets/images/trash_paper2.png', { frameWidth: 50, frameHeight: 50 });
        this.load.image('trash_plastic2', 'assets/images/trash_plastic2.png', { frameWidth: 50, frameHeight: 50 });
        this.load.image('trash_glass2', 'assets/images/trash_glass2.png', { frameWidth: 50, frameHeight: 50 });
        this.load.image('trash_can2', 'assets/images/trash_can2.png', { frameWidth: 50, frameHeight: 50 });
        this.load.image('trash_food2', 'assets/images/trash_food2.png', { frameWidth: 50, frameHeight: 50 });
        this.load.image('trash_caper2', 'assets/images/trash_caper2.png', { frameWidth: 50, frameHeight: 50 });
        
        this.load.image('background1', 'assets/images/background1.png');
        this.load.image('background2', 'assets/images/background2.png');
        this.load.image('background3', 'assets/images/background3.png');
        
    }

    create() {
        if (this.timer) {
            this.timer.remove();
        }
        const background = this.add.image(750, 450, `background2`);
        background.setDisplaySize(1500, 900);
        const scale = 1.2; // 이 값을 조절하여 축소 정도를 변경할 수 있습니다 (0.9는 10% 축소)
        background.setDisplaySize(1500, 900);
    
        this.binPaper = this.add.image(100, 800, 'bin_paper').setDisplaySize(220, 220);
        this.binPlastic = this.add.image(350, 800, 'bin_plastic').setDisplaySize(220, 220);
        this.binGlass = this.add.image(600, 800, 'bin_glass').setDisplaySize(220, 220);
        this.binCan = this.add.image(850, 800, 'bin_can').setDisplaySize(220, 220);
        this.binFood = this.add.image(1100, 800, 'bin_food').setDisplaySize(250, 250);
        this.binCaper = this.add.image(1350, 800, 'bin_caper').setDisplaySize(350, 350);


         // ESC 키를 눌렀을 때 일시정지 기능 설정
         this.input.keyboard.on('keydown-ESC', this.togglePause, this);
        
 
         // 쓰레기 생성과 타이머 이벤트 초기화 코드 추가
        this.scoreText = this.add.text(16, 16, 'Score: 0', { 
            fontSize: '40px', 
            fill: '#ffffff',
            fontFamily: 'Arial',
            stroke: '#000000',
            strokeThickness: 4
        });

        this.timerText = this.add.text(16, 50, 'Time: 60', { 
            fontSize: '40px', 
            fill: '#ffffff',
            fontFamily: 'Arial',
            stroke: '#000000',
            strokeThickness: 4
        });
        
        this.trashGenerationEvent = this.time.addEvent({
            delay: 1500,
            callback: this.createTrash,
            callbackScope: this,
            loop: true
        });

        this.timer = this.time.addEvent({
            delay: 1000,
            callback: this.updateTimer,
            callbackScope: this,
            loop: true
        });

        this.input.on('dragstart', (pointer, gameObject) => {
            gameObject.setTint(0xff0000);
        });

        this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });

        this.input.on('dragend', (pointer, gameObject) => {
            gameObject.clearTint();
            if (this.handleCollision(gameObject, this.binCan)) return;
            if (this.handleCollision(gameObject, this.binPaper)) return;
            if (this.handleCollision(gameObject, this.binPlastic)) return;
            if (this.handleCollision(gameObject, this.binGlass)) return;
            if (this.handleCollision(gameObject, this.binFood)) return;
            if (this.handleCollision(gameObject, this.binCaper)) return;
            
            // 어떤 쓰레기통과도 충돌하지 않았다면 원래 위치로 돌아가거나 다른 처리를 할 수 있습니다.
            gameObject.x = gameObject.input.dragStartX;
            gameObject.y = gameObject.input.dragStartY;
        });
    }
    togglePause() {
        if (this.gameOver) return;

        this.isPaused = !this.isPaused; // 일시정지 상태를 반전시킴
        this.physics.world.isPaused = this.isPaused; // 물리 엔진 일시정지
        this.trashGenerationEvent && (this.trashGenerationEvent.paused = this.isPaused);
        if (this.timer) this.timer.paused = this.isPaused; // 타이머는 초기화하지 않고 일시정지만 함

        if (this.isPaused) {
            this.showPauseMenu(); // 일시정지 메뉴를 보여줌
        } else {
            this.closePauseMenu(); // 일시정지 메뉴를 닫음
        }
    }

    showPauseMenu() {
        // 반투명 오버레이 추가
        this.pauseOverlay = this.add.rectangle(750, 450, 1500, 900, 0x000000, 0.5);

        // 일시정지 팝업 박스 추가
        this.pauseBox = this.add.rectangle(750, 450, 500, 300, 0xffffff).setOrigin(0.5);
        
        // "게임 일시 정지" 텍스트 추가
        this.pauseText = this.add.text(750, 350, '게임 일시 정지', {
            fontSize: '40px',
            fill: '#000',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // "계속하기" 버튼 추가
        this.continueButton = this.add.text(750, 450, '계속하기', {
            fontSize: '32px',
            fill: '#000',
            backgroundColor: '#00FF00',
            padding: { x: 20, y: 10 }
        }).setOrigin(0.5).setInteractive();

        this.continueButton.on('pointerdown', () => {
            this.togglePause(); // 일시정지 해제
            this.removePauseMenu(); // 메뉴 삭제
        });

        // "게임 종료" 버튼 추가
        this.quitButton = this.add.text(750, 550, '게임 종료', {
            fontSize: '32px',
            fill: '#000',
            backgroundColor: '#FF0000',
            padding: { x: 20, y: 10 }
        }).setOrigin(0.5).setInteractive();

        this.quitButton.on('pointerdown', () => {
            this.removePauseMenu(); // 메뉴 삭제
            this.scene.start('StartScene'); // 시작 화면으로 이동
        });
    }

    removePauseMenu() {
        // 일시정지 메뉴의 요소들을 제거
        if (this.pauseOverlay) this.pauseOverlay.destroy();
        if (this.pauseBox) this.pauseBox.destroy();
        if (this.pauseText) this.pauseText.destroy();
        if (this.continueButton) this.continueButton.destroy();
        if (this.quitButton) this.quitButton.destroy();
    }

    closePauseMenu() {
        // 일시정지 상태 해제 시 오버레이와 메뉴 제거
        this.removePauseMenu();
    }



    update() {
        if (this.gameOver) {
            return;
        }
        // 여기에 추가 게임 로직을 구현할 수 있습니다.
    }

    createTrash() {
        if (this.gameOver) return;
        const trashTypes = ['trash_paper', 'trash_plastic', 'trash_glass', 'trash_can','trash_food','trash_caper',
            'trash_paper2', 'trash_plastic2', 'trash_glass2', 'trash_can2','trash_food2','trash_caper2'];
        const randomType = Phaser.Math.RND.pick(trashTypes);
        const x = Phaser.Math.Between(100, 1400);
        const trash = this.physics.add.image(x, 0, randomType);

        if (randomType === 'trash_food') {
            trash.setScale(0.6);  // trash_food의 크기를 0.6배로 줄임
        } 
        if (randomType === 'trash_paper') {
            trash.setScale(1.2);  // 종이 쓰레기의 크기를 더 작게 조정
        }
        if (randomType === 'trash_caper') {
            trash.setScale(0.8);  // 종이 쓰레기의 크기를 더 작게 조정
        }
        
        trash.setInteractive();
        this.input.setDraggable(trash);
    
        // 중력 효과 추가
        trash.body.setGravityY(100);
    
        // 바닥에 닿으면 제거
        trash.body.onWorldBounds = true;
        this.physics.world.on('worldbounds', (body) => {
            if (body.gameObject === trash) {
                trash.destroy();
            }
        });
    
        return trash;
    }

    checkCollision(trash, bin) {
        const bounds1 = trash.getBounds();
        const bounds2 = bin.getBounds();
        return Phaser.Geom.Intersects.RectangleToRectangle(bounds1, bounds2);
    }

    handleCollision(trash, bin) {
        if (this.checkCollision(trash, bin)) {
            let scored = false;
            if ((trash.texture.key === 'trash_paper' && bin === this.binPaper) ||
                (trash.texture.key === 'trash_plastic' && bin === this.binPlastic) ||
                (trash.texture.key === 'trash_glass' && bin === this.binGlass)||
                (trash.texture.key === 'trash_can' && bin === this.binCan)||
                (trash.texture.key === 'trash_paper2' && bin === this.binPaper) ||
                (trash.texture.key === 'trash_plastic2' && bin === this.binPlastic) ||
                (trash.texture.key === 'trash_glass2' && bin === this.binGlass)||
                (trash.texture.key === 'trash_can2' && bin === this.binCan)||
                (trash.texture.key === 'trash_food' && bin === this.binFood)||
                (trash.texture.key === 'trash_food2' && bin === this.binFood)||
                (trash.texture.key === 'trash_caper' && bin === this.binCaper)||
                (trash.texture.key === 'trash_caper2' && bin === this.binCaper)) {
                this.score += 10;
                this.addScoreText('+10', trash.x, trash.y, '#00FF00');
                scored = true;
            }
            
            if (!scored) {
                this.score -= 5;
                this.addScoreText('-5', trash.x, trash.y, '#FF0000');
            }
            
            this.scoreText.setText('Score: ' + this.score);
            trash.destroy();
            return true; // 충돌이 처리되었음을 나타냄
        }
        return false; // 충돌이 없었음을 나타냄
    }
    
    addScoreText(text, x, y, color) {
        const scoreText = this.add.text(x, y, text, { 
            fontSize: '36px', 
            fontWeight: 'bold',
            fill: color,
            stroke: '#000000',
            strokeThickness: 4
        });
        scoreText.setOrigin(0.5);
        
        this.tweens.add({
            targets: scoreText,
            y: y - 100,
            alpha: 0,
            duration: 1500,
            ease: 'Cubic.out',
            onComplete: () => scoreText.destroy()
        });
    }

    updateTimer() {
        if (this.gameOver) return;
    
        this.gameTime--;
        this.timerText.setText('Time: ' + this.gameTime);
    
        if (this.gameTime <= 0) {
            this.gameTime = 0;
            this.timerText.setText('Time: 0');
            this.endGame();
        }
    }

    endGame() {
        if (this.gameOver) return;
        this.gameOver = true;
    
        if (this.timer) {
            this.timer.remove();
            this.timer = null;
        }
        if (this.trashGenerationEvent) {
            this.trashGenerationEvent.remove();
            this.trashGenerationEvent = null;
        }
    
        const userName = localStorage.getItem('username');  // 'username'으로 수정
        this.saveScore(this.score);
        
        //게임오버 화면
        const overlay = this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0x000000, 0.7);
        overlay.setOrigin(0);
    
        const popup = this.add.rectangle(750, 450, 750, 450, 0xffffff);
        popup.setOrigin(0.5);
    
        this.add.text(750, 250, 'Game Over!', { 
            fontSize: '48px', 
            fill: '#000',
            fontStyle: 'bold'
        }).setOrigin(0.5);
    
        this.add.text(750, 350, `${userName}님의 최종 점수`, {  // 이름 추가
            fontSize: '40px', 
            fill: '#000' ,
            padding: { x: 5, y: 5 } 
        }).setOrigin(0.5);

        this.add.text(750, 420, `${this.score}점`, {  // 점수 별도 표시
            fontSize: '48px', 
            fill: '#000',
            fontStyle: 'bold'
        }).setOrigin(0.5);
    
        const restartButton = this.add.text(750, 480, 'Restart', { 
            fontSize: '24px', 
            fill: '#000' 
        }).setOrigin(0.5).setInteractive();
    
        restartButton.on('pointerdown', () => {
            this.scene.restart();
        });
    
        const menuButton = this.add.text(750, 550, 'Main Menu', { 
            fontSize: '24px', 
            fill: '#000' 
        }).setOrigin(0.5).setInteractive();
    
        menuButton.on('pointerdown', () => {
            this.scene.start('StartScene');
        });
    }
    
    saveScore(score) {
        const userName = localStorage.getItem('username');
        const scoreData = `${this.scene.key}=${userName}:${score}`;
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 30); // 30일 후 만료
    
        document.cookie = `${scoreData}; expires=${expirationDate.toUTCString()}; path=/`;
    }
}


const config = {
    type: Phaser.AUTO,
    width: 1500,
    height: 900,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: [LoginScene, StartScene, StageSelectScene, GameScene1, Gamescene2, Gamescene3, ScoreScene],
    dom: {
        createContainer: true
    }
};


const game = new Phaser.Game(config);
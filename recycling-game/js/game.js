class LoginScene extends Phaser.Scene {
    constructor() {
        super('LoginScene');
    }

    create() {
        this.add.rectangle(0, 0, 1500, 900, 0xFFFFFF).setOrigin(0);
    
        this.add.text(750, 200, '분리수거 게임 로그인', { 
            fontSize: '32px',
            fill: '#000',
            fontFamily: 'Arial',
            fontWeight: 'bold'
        }).setOrigin(0.5);
    
        this.add.text(750, 300, '사용자 이름을 입력하세요', {
            fontSize: '24px',
            fill: '#000',
            fontFamily: 'Arial'
        }).setOrigin(0.5);
    
        const inputElement = document.createElement('input');
        inputElement.type = 'text';
        inputElement.placeholder = '사용자 이름';
        inputElement.style = 'position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); width: 300px; padding: 10px; font-size: 24px;';
        document.body.appendChild(inputElement);

        const loginButton = this.add.text(750, 550, '로그인', { 
            fontSize: '24px',
            fill: '#fff',
            backgroundColor: '#4CAF50',
            padding: { x: 20, y: 10 }
        }).setOrigin(0.5).setInteractive();

        loginButton.on('pointerdown', () => {
            const username = inputElement.value;
            if (username) {
                localStorage.setItem('username', username);  // 여기서 username을 localStorage에 저장
                document.body.removeChild(inputElement);
                this.scene.start('StartScene');
            } else {
                alert('사용자 이름을 입력해주세요.');
            }
        });
    }
}

class StartScene extends Phaser.Scene {
    constructor() {
        super('StartScene');
    }

    preload() {
        this.load.image('start_button', 'assets/images/start_button.png');
        this.load.image('score_button', 'assets/images/score_button.png');
    }

    create() {
        this.add.rectangle(0, 0, 1500, 900, 0xFFFFFF).setOrigin(0);

        const userName = localStorage.getItem('username');  // 'userName'을 'username'으로 수정
        this.add.text(750, 100, `환영합니다, ${userName}님!`, { 
            fontSize: '48px',
            fill: '#000',
            fontFamily: 'Arial',
            fontWeight: 'bold'
        }).setOrigin(0.5);

        this.add.text(750, 300, '분리수거 게임', { 
            fontSize: '64px',
            fill: '#000',
            fontFamily: 'Arial',
            fontWeight: 'bold',
            stroke: '#ffffff',
            strokeThickness: 6
        }).setOrigin(0.5);

        const startButton = this.add.image(750, 500, 'start_button')
            .setInteractive()
            .setScale(0.7);

        startButton.on('pointerdown', () => {
            this.scene.start('GameScene');  // 게임 시작 버튼 클릭 시 GameScene으로 전환
        });

        let scoreButton = this.add.image(750, 700, 'score_button')
            .setOrigin(0.5)
            .setInteractive()
            .setScale(0.7);

        scoreButton.on('pointerdown', () => {
            this.scene.start('ScoreScene');
        });

        this.addHoverEffect(startButton);
        this.addHoverEffect(scoreButton);
    }

    addHoverEffect(button) {
        button.on('pointerover', () => {
            button.setScale(0.75);  // 호버 시 약간 크기 증가
        });

        button.on('pointerout', () => {
            button.setScale(0.7);  // 원래 크기로 복귀
        });
    }
}

class ScoreScene extends Phaser.Scene {
    constructor() {
        super('ScoreScene');
    }

    preload() {
        this.load.image('menu_button', 'assets/images/menu_button.png');
    }

    create() {
        this.add.rectangle(0, 0, 1500, 900, 0xFFFFFF).setOrigin(0);
    
        this.add.text(750, 100, 'High Scores', { fontSize: '64px', fill: '#000000' }).setOrigin(0.5);
    
        let scores = JSON.parse(localStorage.getItem('scores')) || [];
        
        for (let i = 0; i < 10; i++) {
            if (scores[i]) {
                this.add.text(750, 200 + i * 60, `${i + 1}. ${scores[i].name}: ${scores[i].score}점`, { fontSize: '36px', fill: '#000000' }).setOrigin(0.5);
            }
        }
    
        let menuButton = this.add.image(750, 800, 'menu_button')
            .setInteractive()
            .setDisplaySize(150, 75);
    
        menuButton.on('pointerdown', () => {
            this.scene.start('StartScene');
        });
    
        this.addHoverEffect(menuButton);
    }

    addHoverEffect(button) {
        button.on('pointerover', () => {
            button.setScale(0.55);
        });

        button.on('pointerout', () => {
            button.setScale(0.5);
        });
    }
}

class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
        this.trashGenerationEvent = null;
    }

    init() {
        this.score = 0;
        this.gameTime = 60;
        this.gameOver = false;
        this.timer = null;
    }

    preload() {
        this.load.image('background', 'assets/images/background.jpg');
        this.load.image('bin_paper', 'assets/images/bin_paper.png', { frameWidth: 100, frameHeight: 100 });
        this.load.image('bin_plastic', 'assets/images/bin_plastic.png', { frameWidth: 100, frameHeight: 100 });
        this.load.image('bin_glass', 'assets/images/bin_glass.png', { frameWidth: 100, frameHeight: 100 });
        this.load.image('trash_paper', 'assets/images/trash_paper.png', { frameWidth: 50, frameHeight: 50 });
        this.load.image('trash_plastic', 'assets/images/trash_plastic.png', { frameWidth: 50, frameHeight: 50 });
        this.load.image('trash_glass', 'assets/images/trash_glass.png', { frameWidth: 50, frameHeight: 50 });
        this.load.image('trash_can', 'assets/images/trash_can.png', { frameWidth: 50, frameHeight: 50 });
        this.load.image('trash_paper2', 'assets/images/trash_paper2.png', { frameWidth: 50, frameHeight: 50 });
        this.load.image('trash_plastic2', 'assets/images/trash_plastic2.png', { frameWidth: 50, frameHeight: 50 });
        this.load.image('trash_glass2', 'assets/images/trash_glass2.png', { frameWidth: 50, frameHeight: 50 });
        this.load.image('trash_can2', 'assets/images/trash_can2.png', { frameWidth: 50, frameHeight: 50 });
        
    }

    create() {
        if (this.timer) {
            this.timer.remove();
        }
        this.add.image(750, 450, 'background').setDisplaySize(1500, 900);
    
        this.binPaper = this.add.image(150, 800, 'bin_paper').setDisplaySize(220, 220);
        this.binPlastic = this.add.image(400, 800, 'bin_plastic').setDisplaySize(220, 220);
        this.binGlass = this.add.image(650, 800, 'bin_glass').setDisplaySize(220, 220);

        this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });
        this.timerText = this.add.text(16, 50, 'Time: 60', { fontSize: '32px', fill: '#000' });
        
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
            if (this.handleCollision(gameObject, this.binPaper)) return;
            if (this.handleCollision(gameObject, this.binPlastic)) return;
            if (this.handleCollision(gameObject, this.binGlass)) return;
            
            // 어떤 쓰레기통과도 충돌하지 않았다면 원래 위치로 돌아가거나 다른 처리를 할 수 있습니다.
            gameObject.x = gameObject.input.dragStartX;
            gameObject.y = gameObject.input.dragStartY;
        });
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
            trash.setScale(1.2);  // 종이 쓰레기의 크기를 더 작게 조정
        } else {
            trash.setScale(1.2);  // 다른 쓰레기는 기존 크기 유지
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
                (trash.texture.key === 'trash_can' && bin === this.bincan)||
                (trash.texture.key === 'trash_paper2' && bin === this.binPaper) ||
                (trash.texture.key === 'trash_plastic2' && bin === this.binPlastic) ||
                (trash.texture.key === 'trash_glass2' && bin === this.binGlass)||
                (trash.texture.key === 'trash_can2' && bin === this.bincan)) {
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
    
        this.add.text(750, 320, `${userName}님의 최종 점수`, {  // 이름 추가
            fontSize: '32px', 
            fill: '#000' 
        }).setOrigin(0.5);

        this.add.text(750, 380, `${this.score}점`, {  // 점수 별도 표시
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
        const userName = localStorage.getItem('username');  // 'username'으로 수정
        let scores = JSON.parse(localStorage.getItem('scores')) || [];
        scores.push({ name: userName, score: score });
        scores.sort((a, b) => b.score - a.score);
        scores = scores.slice(0, 10);
        localStorage.setItem('scores', JSON.stringify(scores));
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
    scene: [LoginScene, StartScene, GameScene, ScoreScene],
    dom: {
        createContainer: true // DOM 컨테이너 활성화
    }
};


const game = new Phaser.Game(config);
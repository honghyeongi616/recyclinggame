class StartScene extends Phaser.Scene {
    constructor() {
        super('StartScene');
    }

    preload() {
        this.load.image('start_button', 'assets/images/start_button.png');
        this.load.image('score_button', 'assets/images/score_button.png');
        // 필요한 경우 시작 화면 배경 이미지도 로드할 수 있습니다.
    }

    create() {
        // 시작 화면 배경 (선택사항)
        this.add.rectangle(0, 0, 800, 600, 0xFFFFFF).setOrigin(0);

        // 게임 제목
        this.add.text(400, 200, '분리수거 게임', { 
            fontSize: '52px',
            fill: '#000',
            fontFamily: 'Arial',
            fontWeight: 'bold',
            stroke: '#ffffff',
            strokeThickness: 6
        }).setOrigin(0.5);
        // 시작 버튼
        const startButton = this.add.image(400, 300, 'start_button')
            .setInteractive()
            .setScale(0.5);  // 버튼 크기 조절

        startButton.on('pointerdown', () => {
            this.scene.start('GameScene');  // 게임 씬으로 전환
            
        }); 
        let scoreButton = this.add.image(400, 500, 'score_button', { fontSize: '48px', fill: '#fff' })
        .setOrigin(0.5)
        .setInteractive();

        scoreButton.on('pointerdown', () => {
        this.scene.start('ScoreScene');
        });
        this.addHoverEffect(startButton);
        this.addHoverEffect(scoreButton);
    }

        addHoverEffect(button) {
        button.on('pointerover', () => {
        button.setScale(0.55);  // 호버 시 약간 크기 증가
        });

        button.on('pointerout', () => {
        button.setScale(0.5);  // 원래 크기로 복귀
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
        this.add.rectangle(0, 0, 800, 600, 0xFFFFFF).setOrigin(0);
    
        this.add.text(400, 100, 'High Scores', { fontSize: '48px', fill: '#000000' }).setOrigin(0.5);
    
        let scores = JSON.parse(localStorage.getItem('scores')) || [];
        
        for (let i = 0; i < 8; i++) {
            if (scores[i]) {
                this.add.text(400, 200 + i * 50, `${i + 1}. ${scores[i]}`, { fontSize: '32px', fill: '#000000' }).setOrigin(0.5);
            }
        }
    
        let menuButton = this.add.image(100, 500, 'menu_button')
            .setInteractive()
            .setScale(0.5); 
    
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
        this.gameTime = 10;
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
    }

    create() {
        if (this.timer) {
            this.timer.remove();
        }
        this.add.image(400, 300, 'background').setDisplaySize(800, 600);
    
        this.binPaper = this.add.image(150, 550, 'bin_paper').setDisplaySize(220, 220);
        this.binPlastic = this.add.image(400, 550, 'bin_plastic').setDisplaySize(220, 220);
        this.binGlass = this.add.image(650, 550, 'bin_glass').setDisplaySize(220, 220);

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
        const trashTypes = ['trash_paper', 'trash_plastic', 'trash_glass'];
        const randomType = Phaser.Math.RND.pick(trashTypes);
        const x = Phaser.Math.Between(100, 700);
        const trash = this.physics.add.image(x, 0, randomType);
        
        if (randomType === 'trash_paper') {
            trash.setScale(0.3);  // 종이 쓰레기의 크기를 더 작게 조정
        } else {
            trash.setScale(0.5);  // 다른 쓰레기는 기존 크기 유지
        }
        
        trash.setInteractive();
        this.input.setDraggable(trash);
    
        // 중력 효과 추가
        trash.body.setGravityY(300);
    
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
                (trash.texture.key === 'trash_glass' && bin === this.binGlass)) {
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
    
        // 점수 저장
        this.saveScore(this.score);
    
        // 게임 오버 화면 표시
        const overlay = this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0x000000, 0.7);
        overlay.setOrigin(0);
    
        const popup = this.add.rectangle(400, 300, 400, 300, 0xffffff);
        popup.setOrigin(0.5);
    
        this.add.text(400, 200, 'Game Over!', { 
            fontSize: '48px', 
            fill: '#000',
            fontStyle: 'bold'
        }).setOrigin(0.5);
    
        this.add.text(400, 260, `Final Score: ${this.score}`, { 
            fontSize: '32px', 
            fill: '#000' 
        }).setOrigin(0.5);
    
        const restartButton = this.add.text(400, 350, 'Restart', { 
            fontSize: '24px', 
            fill: '#000' 
        }).setOrigin(0.5).setInteractive();
    
        restartButton.on('pointerdown', () => {
            this.scene.restart();
        });
    
        const menuButton = this.add.text(400, 400, 'Main Menu', { 
            fontSize: '24px', 
            fill: '#000' 
        }).setOrigin(0.5).setInteractive();
    
        menuButton.on('pointerdown', () => {
            this.scene.start('StartScene');
        });
    }
    
    saveScore(score) {
        let scores = JSON.parse(localStorage.getItem('scores')) || [];
        scores.push(score);
        scores.sort((a, b) => b - a);
        scores = scores.slice(0, 10);
        localStorage.setItem('scores', JSON.stringify(scores));
    }
}   

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: [StartScene, GameScene, ScoreScene]
};
const game = new Phaser.Game(config);
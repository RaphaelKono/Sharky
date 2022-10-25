class World {
    ctx;
    canvas;
    keyboard;
    camera_x = 0;
    character = new Character();
    level = level1;
    statusBar = new StatusBar();
    bubbles = [];


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    draw() {
        this.clearPriorFrame();
        this.ctx.translate(this.camera_x, 0);
        this.addToMap();
        this.drawNewFrame();
        this.ctx.translate(-this.camera_x, 0);
    }

    setWorld() {
        this.character.world = this;
    }

    clearPriorFrame() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    addToMap() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.lights);
        this.addObjectToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.bubbles);
        this.ctx.translate(-this.camera_x, 0);
        // Space for fixed Objects:
        this.addObjectToMap(this.statusBar);
        // space end
        this.ctx.translate(this.camera_x, 0);
    }

    addObjectsToMap(obj) {
        obj.forEach(o => {
            this.addObjectToMap(o);
        });
    }

    addObjectToMap(mo) {
        if (mo.leftDirection) {
            this.flipImage(mo);
        }
        // if (mo.upDirection) {
        //     this.ctx.save();
        //     this.ctx.translate(mo.x + (mo.width / 2), mo.y + (mo.height / 2));
        //     mo.x = -mo.width / 2;
        //     mo.y = -mo.height / 2;
        //     this.ctx.rotate(270 * Math.PI / 180);
        // }
        mo.draw(this.ctx);
        mo.drawRect(this.ctx);
        if (mo.leftDirection) {
            this.restoreContext(mo);
        }
        // if (mo.upDirection) {
        //     mo.x = -(mo.x + mo.height / 2);
        //     mo.y = -(mo.y + mo.width / 2);
        //     this.ctx.restore();
        // }
    }

    drawNewFrame() {
        self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = -mo.x;
    }

    restoreContext(mo) {
        mo.x = -mo.x;
        this.ctx.restore();
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkBubbleAttack();
        }, 1000 / 30);
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy, i) => {
            if (this.character.isColliding(enemy) && !this.character.isHurt() && !this.character.hasNoHealth() && enemy.isAlive) {
                this.addDamageToCharacter(enemy);
            }
            if (enemy.y + enemy.height * 3 / 4 <= 0) {
                this.level.enemies.splice(i, 1);
            }
            this.bubbles.forEach((bubble, j) => {
                if (enemy.isColliding(bubble)) {
                    this.addDamageToEnemy(enemy);
                    this.bubbles.splice(j, 1);
                }
            });
        });
        this.bubbles.forEach((bubble, k) => {
            if (bubble.y + bubble.height * 3 / 4 <= 0) {
                this.bubbles.splice(k, 1);
            }
        });


        this.statusBar.setPercentage(this.character.health);
    }

    checkBubbleAttack() {
        if (this.keyboard.SPACE) {
            this.character.isCreatingBubbleBool = true;
        }
    }

    addDamageToCharacter(enemy) {
        switch (true) {
            case enemy instanceof Jellyfish:
                this.character.electro_zap_sound.currentTime = 0;
                this.character.hit(enemy.attack);
                this.character.isShocked = true;
                if (this.character.health <= 0) {
                    this.character.hadDied = true;
                }
                break;
            case enemy instanceof Endboss:
                this.character.hit(40);
                break;
        }
    }

    addDamageToEnemy(enemy) {
        switch (true) {
            case enemy instanceof Jellyfish:
                enemy.isAlive = false;
                break;

            default:
                break;
        }
    }
}
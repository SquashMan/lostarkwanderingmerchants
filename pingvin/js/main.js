class PenguinGame {
    constructor() {
        this.penguinTemplate = document.querySelector('#template #penguin');
        this.heartTemplate = document.querySelector('#template #heart');
        this.game = document.querySelector('#main');
        this.penguin = null;
        this.penguinBody = null;
        this.heart = null;
        this.moving = { up: false, left: false, down: false, right: false };
        this.colors = ['black', 'black', 'black', 'black', 'black','black','black','black','black','black','black','black','black','black', 'emma', 'spooky']
        this.speed = 3;
        this.tempo = 10;
        this.start();
        this.cheats =  ['emma','black','spooky','big', 'small', 'normal', 'victoria', 'ghost', 'mor'];
        this.cheatWord = '';
        this.jumping = false;
        this.score = 0;
        this.hats = ['nisse', 'bowler'];
    }
    start() {
        this.spawnPenguin()
        for(let i = 0; i < 1; i++) {
            this.spawnNPC();
        }
        this.spawnHeart();
        
        this.bindKeys();
        setInterval(() => this.movement(), this.tempo);
    }

    spawnPenguin() {
        const penguin = this.penguinTemplate.cloneNode(true);
        const top = Math.random()*75;
        const left = Math.random()*75;
        penguin.style.top = `${top}%`;
        penguin.style.left = `${left}%`;
        penguin.classList.add(this.colors[Math.floor(Math.random()*16)]);
        this.game.append(penguin);
        this.penguin = document.querySelector('#main #penguin');
        this.penguinBody = this.penguin.querySelector('.body');
    }

    spawnNPC() {
        const penguin = this.penguinTemplate.cloneNode(true);
        const top = Math.random()*75;
        const left = Math.random()*75;
        penguin.style.top = `${top}%`;
        penguin.style.left = `${left}%`;
        penguin.classList.add(this.colors[Math.floor(Math.random()*16)]);
        this.game.append(penguin);
    }

    spawnHeart() {
        const heart = this.heartTemplate.cloneNode(true);
        const top = Math.random()*75;
        const left = Math.random()*75;
        heart.style.top = `${top}%`;
        heart.style.left = `${left}%`;
        this.game.append(heart);
        this.heart = document.querySelector('#main #heart');
    }

    spawnHat() {
        const hat = this.penguin.querySelector('.hat');
        hat.className = 'hat';
        hat.classList.add(this.hats[Math.floor(Math.random()*this.hats.length)]);
    }

    movement() {
        if (this.moving.up) {
            this.penguin.style.top = `${this.penguin.offsetTop-this.speed}px`;
            if (this.penguin.offsetTop < 0) {
                this.penguin.style.top = '0px';
            }
            this.penguin.querySelector('.face').style.display = 'none';
            this.penguin.querySelector('.torso').style.display = 'none';
        } else {
            this.penguin.querySelector('.face').style.display = 'block';
            this.penguin.querySelector('.torso').style.display = 'block';
        }
        if (this.moving.down) {
            this.penguin.style.top = `${this.penguin.offsetTop+this.speed}px`;
            if (this.penguin.offsetTop+this.penguin.offsetHeight > document.querySelector('body').offsetHeight) {
                this.penguin.style.top = `${document.querySelector('body').offsetHeight-this.penguin.offsetHeight}px`;
            }
        }
        if (this.moving.left) {
            this.penguin.style.left = `${this.penguin.offsetLeft-this.speed}px`;
            if (this.penguin.offsetLeft < 0) {
                this.penguin.style.left = '0px';
            }
        }
        if (this.moving.right) {
            this.penguin.style.left = `${this.penguin.offsetLeft+this.speed}px`;
            if (this.penguin.offsetLeft+this.penguin.offsetWidth > document.querySelector('body').offsetWidth) {
                this.penguin.style.left = `${document.querySelector('body').offsetWidth-this.penguin.offsetWidth}px`;
            }
        }
        if (this.moving.up || this.moving.down || this.moving.left || this.moving.right) {
            this.penguin.classList.add('moving');
            this.touchingHeart();
        } else {
            this.penguin.classList.remove('moving');
        }
    }
    
    touchingHeart() {
        if (this.collision(this.penguin, this.heart)) {
            this.heart.remove();
            this.score++;
            this.speed = this.speed + this.score/100;
            document.querySelector('#score #count').innerHTML = this.score;
            this.spawnHeart();
            if (this.score%10==0) {
                this.spawnHat();
            }
        }
    }

    collision(elm1, elm2) {
        var x1 = elm1.offsetLeft;
        var y1 = elm1.offsetTop;
        var h1 = elm1.clientHeight;
        var w1 = elm1.clientWidth;
        var b1 = y1 + h1;
        var r1 = x1 + w1;
        var x2 = elm2.offsetLeft;
        var y2 = elm2.offsetTop;
        var h2 = elm2.clientHeight;
        var w2 = elm2.clientWidth;
        var b2 = y2 + h2;
        var r2 = x2 + w2;

        if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
        return true;
    }

    setDirection(direction) {
        switch(direction) {
            case "Down": // IE/Edge specific value
            case "ArrowDown":
                this.moving.down = true;
                break;
            case "Up": // IE/Edge specific value
            case "ArrowUp":
                this.moving.up = true;
                break;
            case "Left": // IE/Edge specific value
            case "ArrowLeft":
                this.moving.left = true;
                break;
            case "Right": // IE/Edge specific value
            case "ArrowRight":
                this.moving.right = true;
                break;
            case " ":
                if (!this.penguin.classList.contains('jumping')) {
                    this.penguin.classList.add('crouching');
                }
                break;
            default: return; // exit this handler for other keys
            }
    }

    unsetDirection(direction) {
        switch(direction) {
            case "Down": // IE/Edge specific value
            case "ArrowDown":
                this.moving.down = false;
                break;
            case "Up": // IE/Edge specific value
            case "ArrowUp":
                this.moving.up = false;
                break;
            case "Left": // IE/Edge specific value
            case "ArrowLeft":
                this.moving.left = false;
                break;
            case "Right": // IE/Edge specific value
            case "ArrowRight":
                this.moving.right = false;
                break;
            case " ":
                if (!this.jumping) {
                    this.penguin.classList.remove('crouching');
                    this.penguin.classList.add('jumping');
                    this.jumping = true;
                    setTimeout(() => {
                        this.penguin.classList.remove('jumping');
                    }, 200);
                    setTimeout(() => {this.jumping = false;}, 450);
                }

                break;
            default: return; // exit this handler for other keys
            }
    }

    resetColors() {
        this.penguin.classList.remove('black');
        this.penguin.classList.remove('emma');
        this.penguin.classList.remove('spooky');
        this.penguin.classList.remove('victoria');
        this.penguin.classList.remove('ghost');
        this.penguin.classList.remove('mor');
    }

    resetMods() {
        this.penguin.classList.remove('big');
        this.penguin.classList.remove('small');
        this.penguin.classList.remove('normal');
    }

    resetHat() {

    }
    
    activateCheat(cheat) {
        switch(cheat) {
            case "big":
            case "small":
            case "normal":
                this.resetMods();
                this.penguin.classList.add(cheat);
                break;
            case "emma":
            case "black":
            case "spooky":
            case "victoria":
            case "ghost":
            case "mor":
                this.resetColors();
                this.penguin.classList.add(cheat);
                break;
            default:
                this.penguin.classList.add(cheat);
                break;
        }
    }

    resetCheat() {
        this.cheatWord = '';
    }

    checkForCheats(key) {
        this.cheatWord += key;
        let hit = false;
        this.cheats.map(cheat => {
            if (this.cheatWord === cheat.substr(0, this.cheatWord.length)) {
                hit = true;
                if (this.cheatWord === cheat) {
                    console.log(`${cheat} cheat activated`);
                    this.activateCheat(cheat);
                    this.resetCheat();
                }
            }
        })
        if (!hit) {
            this.resetCheat();
        }
    }
    
    bindKeys() {
        document.addEventListener('keydown', (e) => {
            this.checkForCheats(e.key);
            this.setDirection(e.key);
        });
        document.addEventListener('keyup', (e) => {
            this.unsetDirection(e.key);
        });
        // Touch events
        document.querySelector('#up').addEventListener('touchstart', (e) => {
            this.setDirection("Up");
        });
        document.querySelector('#up').addEventListener('touchend', (e) => {
            this.unsetDirection("Up");
        });
        document.querySelector('#down').addEventListener('touchstart', (e) => {
            this.setDirection("Down");
        });
        document.querySelector('#down').addEventListener('touchend', (e) => {
            this.unsetDirection("Down");
        });
        document.querySelector('#left').addEventListener('touchstart', (e) => {
            this.setDirection("Left");
        });
        document.querySelector('#left').addEventListener('touchend', (e) => {
            this.unsetDirection("Left");
        });
        document.querySelector('#right').addEventListener('touchstart', (e) => {
            this.setDirection("Right");
        });
        document.querySelector('#right').addEventListener('touchend', (e) => {
            this.unsetDirection("Right");
        });
    }
}
class Keyboard {
    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    SPACE = false;
    SHIFT = false;
    touchstartX = 0;
    touchendX = 0;

    constructor() {
        this.bindKeyPressEvents();
        this.bindBtnPressEvents();
        this.swipeEvents();
    }

    bindKeyPressEvents() {
        window.addEventListener('keydown', (event) => {
            this.keyEvents(true, event.keyCode);
        });

        window.addEventListener('keyup', (event) => {
            this.keyEvents(false, event.keyCode);
        });
    }

    keyEvents(bool, key) {
        this.eventRight(bool, key);
        this.eventLeft(bool, key);
        this.eventUp(bool, key);
        this.eventDown(bool, key);
        this.eventSpace(bool, key);
        this.eventSHIFT(bool, key)
    }

    eventRight(bool, key) {
        if (this.eventIsRight(key))
            this.RIGHT = bool;
    }

    eventLeft(bool, key) {
        if (this.eventIsLeft(key))
            this.LEFT = bool;
    }

    eventUp(bool, key) {
        if (this.eventIsUp(key))
            this.UP = bool;
    }

    eventDown(bool, key) {
        if (this.eventIsDown(key))
            this.DOWN = bool;
    }

    eventSpace(bool, key) {
        if (this.eventIsSpace(key))
            this.SPACE = bool;
    }

    eventSHIFT(bool, key) {
        if (this.eventIsSHIFT(key)) {
            this.SHIFT = bool;
        }
    }


    eventDown(bool, key) {
        if (this.eventIsDown(key))
            this.DOWN = bool;
    }

    eventIsRight(key) {
        return this.keyCodeIsArrowRight(key) || this.keyCodeIsD(key);
    }

    keyCodeIsArrowRight(key) {
        return key == 39;
    }

    keyCodeIsD(key) {
        return key == 68;
    }


    eventIsLeft(key) {
        return this.keyCodeIsArrowLeft(key) || this.keyCodeIsA(key);
    }

    keyCodeIsArrowLeft(key) {
        return key == 37;
    }

    keyCodeIsA(key) {
        return key == 65;
    }


    eventIsUp(key) {
        return this.keyCodeIsArrowUp(key) || this.keyCodeIsW(key);
    }

    keyCodeIsArrowUp(key) {
        return key == 38;
    }

    keyCodeIsW(key) {
        return key == 87;
    }


    eventIsDown(key) {
        return this.keyCodeIsArrowDown(key) || this.keyCodeIsS(key);
    }

    keyCodeIsArrowDown(key) {
        return key == 40;
    }

    keyCodeIsS(key) {
        return key == 83;
    }


    eventIsSpace(key) {
        return this.keyCodeIsSpace(key);
    }

    keyCodeIsSpace(key) {
        return key == 32;
    }

    eventIsSHIFT(key) {
        return key == 16;
    }

    bindBtnPressEvents() {
        this.btnLeft();
        this.btnRight();
        this.btnUp();
        this.btnDown();
        // this.btnFullscreen();
        // this.btnSpeaker();
        // document.getElementById('bubble').addEventListener('touchstart', (e) => {
        //     e.preventDefault();
        //     this.SPACE = true;
        // });
        // document.getElementById('bubble').addEventListener('touchend', (e) => {
        //     e.preventDefault();
        //     this.SPACE = false;
        // });
    }

    btnLeft() {
        document.getElementById('arrowLeft').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.LEFT = true;
        });
        document.getElementById('arrowLeft').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.LEFT = false;
        });
    }

    btnRight() {
        document.getElementById('arrowRight').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.RIGHT = true;
        });
        document.getElementById('arrowRight').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.RIGHT = false;
        });
    }

    btnUp() {
        document.getElementById('arrowUp').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.UP = true;
        });
        document.getElementById('arrowUp').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.UP = false;
        });
    }

    btnDown() {
        document.getElementById('arrowDown').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.DOWN = true;
        });
        document.getElementById('arrowDown').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.DOWN = false;
        });
    }

    // btnFullscreen() {
    //     document.getElementById('fullscreen').addEventListener('mousedown', (e) => {
    //         e.preventDefault();
    //         this.toggleFullScreen();
    //     });
    //     document.getElementById('fullscreen').addEventListener('touchend', (e) => {
    //         e.preventDefault();
    //         this.toggleFullScreen();
    //     });
    // }

    // btnSpeaker() {
    //     document.getElementById('speaker').addEventListener('mousedown', (e) => {
    //         e.preventDefault();
    //         this.toggleSound()
    //     });
    //     document.getElementById('speaker').addEventListener('touchend', (e) => {
    //         e.preventDefault();
    //         this.toggleSound();
    //     });
    // }


    swipeEvents() {
        document.getElementById('swipe').addEventListener('touchstart', e => {
            this.touchstartX = e.changedTouches[0].screenX;
        });
        document.getElementById('swipe').addEventListener('touchend', e => {
            this.touchendX = e.changedTouches[0].screenX;
            this.checkDirection();
        });
        document.getElementById('swipe').addEventListener('touchstart', e => {
            this.touchstartX = e.changedTouches[0].screenX;
        });
        document.getElementById('swipe').addEventListener('touchend', e => {
            this.touchendX = e.changedTouches[0].screenX;
            this.checkDirection();
        });
    }

    checkDirection() {
        if (this.touchendX < this.touchstartX) {
            this.SHIFT = true;
        }
        if (this.touchendX > this.touchstartX) {
            this.SPACE = true;
        }
        setTimeout(() => this.SPACE = false, 500);
    }




    // toggleFullScreen() {
    //     let element = document.getElementById('canvasFrameID');
    //     if (this.isNotOnFullscreen(element)) { // current working methods
    //         this.openFullscreen(element);
    //     } else {
    //         this.closeFullscreen();
    //     }
    // }

    // openFullscreen(element) {
    //     if (element.requestFullscreen) {
    //         element.requestFullscreen();
    //     } else if (element.mozRequestFullScreen) {
    //         element.mozRequestFullScreen();
    //     } else if (element.webkitRequestFullscreen) {
    //         element.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    //     }
    // }

    // closeFullscreen() {
    //     if (document.cancelFullScreen) {
    //         document.cancelFullScreen();
    //     } else if (document.mozCancelFullScreen) {
    //         document.mozCancelFullScreen();
    //     } else if (document.webkitCancelFullScreen) {
    //         document.webkitCancelFullScreen();
    //     }
    // }

    // isNotOnFullscreen(element) {
    //     return !document.fullscreenElement && !element.mozFullScreenElement && !element.webkitFullscreenElement;
    // }


    // btnSpeaker() {
    //     document.getElementById('speaker').addEventListener('mousedown', (e) => {
    //         e.preventDefault();
    //         this.toggleSound()
    //     });
    //     document.getElementById('speaker').addEventListener('touchend', (e) => {
    //         e.preventDefault();
    //         this.toggleSound();
    //     });
    // }

    // toggleSound() {
    //     soundIsOn = !soundIsOn;
    //     if (soundIsOn) {
    //         this.playBackground();
    //     } else {
    //         world.level_music.pause();
    //         world.ambience_audio.pause();
    //     }
    //     document.getElementById('speaker').classList.toggle('toggleSpeaker');
    // }

    // /**
    //  * I need to double check since otherwise it is toggling wrong.
    //  */
    // playBackground() {
    //     world.ambience_audio.loop = true;
    //     world.ambience_audio.volume = 0.4;
    //     world.level_music.loop = true;
    //     world.level_music.volume = 0.25;
    //     if (soundIsOn) {
    //         world.ambience_audio.play();
    //         world.level_music.play();
    //     } else {
    //         world.level_music.pause();
    //         world.ambience_audio.pause();
    //     }
    // }
}
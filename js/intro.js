'use strict';

var intro = {
    preload: function() {
    },
    create: function() {
        
        this.subSceneIndex = 0;

        // Background
        this.backgroundSprite = this.add.sprite(0, 0, "background_1");

        // Clouds
        this.cloudSprites = createCloudSprites(this);

        // Characters
        this.professorSprite1 = this.add.sprite(0.42 * WIDTH, 0.39 * HEIGHT, "professor_2");

        this.professorSprite2 = this.add.sprite(0.4 * WIDTH, 0.39 * HEIGHT, "professor_3");
        this.professorSprite2.visible = false;

        this.professorSprite3 = this.add.sprite(0.42 * WIDTH, 0.39 * HEIGHT, "professor_4");
        this.professorSprite3.visible = false;

        this.professorSprite4 = this.add.sprite(0.42 * WIDTH, 0.4 * HEIGHT, "professor_5");
        this.professorSprite4.visible = false;

        this.professorSprite5 = this.add.sprite(0.4 * WIDTH, 0.39 * HEIGHT, "professor_6");
        this.professorSprite5.visible = false;

        // Speech Boxes
        this.speechBox1 = this.add.sprite(0.2 * WIDTH, 0.42 * HEIGHT, "speechbox_1");
        this.speechBox1.anchor.setTo(0.44, 0.5);

        this.speechBox2 = this.add.sprite(0.2 * WIDTH, 0.48 * HEIGHT, "speechbox_2");
        this.speechBox2.anchor.setTo(0.44, 0.5);
        this.speechBox2.visible = false;

        // Info Boxes
        this.infoBox1 = this.add.sprite(0.8 * WIDTH, 0.18 * HEIGHT, "infobox_intro3");
        this.infoBox1.anchor.setTo(0.5, 0.0);
        this.infoBox1.visible = false;

        this.infoBox2 = this.add.sprite(0.8 * WIDTH, 0.23 * HEIGHT, "infobox_intro4");
        this.infoBox2.anchor.setTo(0.5, 0.0);
        this.infoBox2.visible = false;

        // Speech Text
        this.speechText1 = this.add.text(0.2 * WIDTH + 0.5, 0.42 * HEIGHT + 0.5, Strings.Intro1, TextStyle.Centered);
        this.speechText1.anchor.setTo(0.5, 0.5);
        this.speechText1.lineSpacing = TextStyle.lineSpacing;
        
        this.speechText2 = this.add.text(0.2 * WIDTH + 0.5, 0.42 * HEIGHT + 0.5, Strings.Intro2, TextStyle.Centered);
        this.speechText2.anchor.setTo(0.5, 0.5);
        this.speechText2.lineSpacing = TextStyle.lineSpacing;
        this.speechText2.addFontWeight('bold', 0);
        this.speechText2.addFontWeight('normal', 10);
        this.speechText2.visible = false;

        this.speechText3_1 = this.add.text(0.2 * WIDTH + 0.5, 0.48 * HEIGHT + 0.5, Strings.Intro3_1, TextStyle.Centered);
        this.speechText3_1.anchor.setTo(0.5, 0.5);
        this.speechText3_1.lineSpacing = TextStyle.lineSpacing;
        this.speechText3_1.addFontWeight('bold', 0);
        this.speechText3_1.addFontWeight('normal', 17);
        this.speechText3_1.addFontWeight('bold', 28);
        this.speechText3_1.addFontWeight('normal', 39);
        this.speechText3_1.visible = false;

        this.speechText3_2 = this.add.text(0.8 * WIDTH + 0.5, 0.2 * HEIGHT + 0.5, Strings.Intro3_2, TextStyle.Centered);
        this.speechText3_2.anchor.setTo(0.5, 0.0);
        this.speechText3_2.lineSpacing = TextStyle.lineSpacing;
        this.speechText3_2.addFontWeight('bold', 0);
        this.speechText3_2.addFontWeight('normal', 10);
        this.speechText3_2.addFontWeight('bold', 37);
        this.speechText3_2.addFontWeight('normal', 42);
        this.speechText3_2.visible = false;
        
        this.speechText4_1 = this.add.text(0.2 * WIDTH + 0.5, 0.48 * HEIGHT + 0.5, Strings.Intro4_1, TextStyle.Centered);
        this.speechText4_1.anchor.setTo(0.5, 0.5);
        this.speechText4_1.lineSpacing = TextStyle.lineSpacing;
        this.speechText4_1.visible = false;

        this.speechText4_2 = this.add.text(0.8 * WIDTH + 0.5, 0.27 * HEIGHT + 0.5, Strings.Intro4_2, TextStyle.Centered);
        this.speechText4_2.anchor.setTo(0.5, 0.0);
        this.speechText4_2.lineSpacing = TextStyle.lineSpacing;
        this.speechText4_2.visible = false;
        
        this.speechText5 = this.add.text(0.2 * WIDTH + 0.5, 0.48 * HEIGHT + 0.5, Strings.Intro5, TextStyle.Centered);
        this.speechText5.anchor.setTo(0.5, 0.5);
        this.speechText5.lineSpacing = TextStyle.lineSpacing;
        this.speechText5.visible = false;

        // Buttons
        this.nextButton = this.add.button(0.5 * WIDTH, 0.2 * HEIGHT, "button_play", this.nextButtonActions.onClick, this, 0, 0, 1);
        this.nextButton.anchor.setTo(0.5, 0.5);

        this.add.tween(this.nextButton.scale).to({ x: 1.1, y: 1.1 }, 600, "Linear", true).yoyo(true, 0).loop(true);

    },
    update: function() {
        updateCloudSprites(this);
    },
    nextSubScene: function() {

        // This probably isn't the most efficient way of doing this

        // Before changing subscene
        switch(this.subSceneIndex) {
            case 0:
                this.professorSprite1.visible = false;
                this.speechText1.visible = false;
                break;
            case 1:
                this.professorSprite2.visible = false;
                this.speechBox1.visible = false;
                this.speechText2.visible = false;
                break;
            case 2:
                this.professorSprite3.visible = false;
                this.infoBox1.visible = false;
                this.speechText3_1.visible = false;
                this.speechText3_2.visible = false;
                break;
            case 3:
                this.professorSprite4.visible = false;
                this.infoBox2.visible = false;
                this.speechText4_1.visible = false;
                this.speechText4_2.visible = false;
                break;
        }

        // Increment subscene
        this.subSceneIndex++;

        // After changing subscene
        switch(this.subSceneIndex) {
            case 1:
                this.professorSprite2.visible = true;
                this.speechText2.visible = true;
                break;
            case 2:
                this.professorSprite3.visible = true;
                this.speechBox2.visible = true;
                this.infoBox1.visible = true;
                this.speechText3_1.visible = true;
                this.speechText3_2.visible = true;
                break;
            case 3:
                this.professorSprite4.visible = true;
                this.infoBox2.visible = true;
                this.speechText4_1.visible = true;
                this.speechText4_2.visible = true;
                break;
            case 4:
                this.professorSprite5.visible = true;
                this.speechText5.visible = true;
                break;
            case 5:
                this.state.start("choose");
                break;
        }

    },
    nextButtonActions: {
        onClick: function() {
            this.nextSubScene();
        }
    }
};
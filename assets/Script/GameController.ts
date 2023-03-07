

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    player:cc.Node = null;

    @property(cc.Node)
    changeLevel = null;

    @property(cc.Node)
    Score:cc.Node = null;

    Time:number = 0;
    auxTime:number = 0;

     onLoad () {
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        this.loadLevel();
        this.player = cc.find("Player");
        this.Score = cc.find("Score");
     }

    start () {
        
    }

    controlLevel(){
        let playerState = this.player.getComponent('PlayerScript').isDead;
        let changeLevel = this.player.getComponent('PlayerScript').finishLevel;
        let numLevel = this.changeLevel.getComponent('ControlLevel').numberLevel;
        if(playerState){
            
            if(numLevel == 1){
                playerState = false;
                this.restarScene("Level_1");
            }else{
                if(numLevel == 2){
                    this.restarScene("Level_2");
                }else{
                    if(numLevel == 3){
                        this.restarScene("Level_3");
                    }else{
                        if(numLevel == 4){
                            this.restarScene("Level_4");
                        }
                    }
                }
            }
        }

        if(changeLevel){
            if(numLevel == 1){
                cc.director.loadScene("Level_2");
            }else{
                if(numLevel == 2){
                    cc.director.loadScene("Level_3");
                }else{
                    if(numLevel == 3){
                        cc.director.loadScene("Level_4");
                    }else{
                        if(numLevel == 4){
                            cc.director.loadScene("Game_Over");
                        }
                    }
                }
            }
        }
        
    }

    loadLevel(){
        let aux = this.changeLevel.getComponent('ControlLevel').numberLevel;
        if(aux == 1){
            cc.director.preloadScene("Level_1");
            cc.director.preloadScene("Level_2");
        }else{
            if(aux == 2){
                cc.director.preloadScene("Level_2");
                cc.director.preloadScene("Level_3");
            }else{
                if(aux == 3){
                    cc.director.preloadScene("Level_3");
                    cc.director.preloadScene("Level_4");
                }else{
                    if(aux == 4){
                        cc.director.preloadScene("Level_4");
                        cc.director.preloadScene("Game_Over");
                    }
                }
            }
        }
    }

    viewScore(dt:number){
        this.auxTime += dt;
        if(this.changeLevel.getComponent('ControlLevel').numberLevel > 1)
        if(this.auxTime >=1){
            this.Score.getComponent('Score').scoreNumber ++;
            this.auxTime = 0;
        }
        this.Score.getComponent(cc.Label).string = ""+ this.Score.getComponent('Score').scoreNumber;
        this.Score.setPosition(this.player.position.x + 450, this.player.position.y + 300);
    }

    restarScene(name:string){
        cc.director.loadScene(name);
    }

     update (dt) {
        this.controlLevel();
        this.viewScore(dt);
     }
}

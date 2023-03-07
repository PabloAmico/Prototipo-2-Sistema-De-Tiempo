// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Boolean)
    night:boolean =  true;

    @property(cc.Boolean)
    day:boolean =  true;

    @property(cc.Boolean)
    door_night:boolean = true;

    currentHour:number = 0;

    dataClock:Date = new Date;

    @property(cc.Node)
    door:cc.Node = null;

    openDoor:boolean = false;
    
    
    onCollisionEnter(other,self){
        if(other.node.group == "player"){
            this.controlTime();
            this.showMessage();
            }

        }

    onCollisionExit(other, self){
        if(other.node.group == "player"){
            this.hideMessage();
        }
    }

    showMessage(){
        if(this.night){
            this.getComponent(cc.Label).node.active =  true;
            if(this.openDoor){
                this.getComponent(cc.Label).string = "La puerta se abrio, es la hora correcta.";
                this.door.destroy();
            }else{
                this.getComponent(cc.Label).string = "Esta puerta se abre a la hora adecuada. Déja de molestar y vuelve mas tarde.";
            }
        }else{
            if(this.day){
                this.getComponent(cc.Label).node.active = true;
                if(this.openDoor){
                    this.getComponent(cc.Label).string = "La puerta se abrio, es la hora correcta.";
                    this.door.destroy();
                }else{
                    this.getComponent(cc.Label).string = "Esta puerta se abre a la hora adecuada. La proxima vez madruga";
                }
            }
        }
    }

    hideMessage(){
        this.getComponent(cc.Label).string = "";
        }

    controlTime(){
        let dataHour = this.dataClock.getHours();
        console.log(dataHour);
        if(this.door_night){
            this.night =  true;
            if(dataHour >= 18 || dataHour < 6){
                console.log("Entre");
                this.openDoor = true;
            }
        }else{
            this.day = true;
            if(dataHour >= 6 && dataHour < 18){
                this.openDoor = true;
            }
        }
    }
    
    // LIFE-CYCLE CALLBACKS:

     onLoad () {


     }

    start () {

    }

     update (dt) {}
}

// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Integer)
    numberLevel:Number = 0;

    @property(cc.Node)
    handHours:cc.Node = null;

    @property(cc.Node)
    handMinutes:cc.Node = null;

    dataClock:Date = new Date;

    currentHour:number = 0;

    currentMinute:number = 0;

    // LIFE-CYCLE CALLBACKS:

     onLoad () {}

    start () {
    }

    controlTime(){
        let dataHour = this.dataClock.getHours();
        let dataMinutes = this.dataClock.getMinutes();
        this.controlHours(dataHour);
        this.controlMinutes(dataMinutes);
        //console.log(dataHour);
    }

    controlHours(hour:number){
        if(hour != this.currentHour){
            this.currentHour = hour;
            if(hour > 12){
                hour = hour - 12;
            }
            this.handHours.rotation = (hour *30);
        }
        
    }

    controlMinutes(minutes:number){
        if(minutes != this.currentMinute){
            this.currentMinute = minutes;
            this.handMinutes.rotation = (minutes * 6);
        }
    }

     update (dt) {
        this.controlTime();
     }
}

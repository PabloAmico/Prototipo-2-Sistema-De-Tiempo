// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    timeTotal:number = 0;

    timeMoveHand:number = 1;

    @property(cc.Integer)
    angle:number = 0;

    angle180:boolean = false;

    // LIFE-CYCLE CALLBACKS:

     onLoad () {
         let action = cc.rotateTo(30,180.0);
         this.node.runAction(action);
     }

    start () {

    }

    secondMove(){
        let action = cc.rotateTo(30, 360);
        this.node.runAction(action);
    }

     update (dt) {
        this.angle = this.node.angle;
        //console.log(this.angle);

        if(this.angle <= -180 && !this.angle180){
            this.secondMove();
            this.angle180 = true;
            console.log("entre");
        }
     }
}

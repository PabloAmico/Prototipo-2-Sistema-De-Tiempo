// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    door:cc.Node = null;

    @property(cc.SpriteFrame)
    open:cc.SpriteFrame = null;

    is_destroy:boolean = false;

    // LIFE-CYCLE CALLBACKS:

    onCollisionEnter(other,self){
        if(other.node.group == "player"){
            if(!this.is_destroy){
                this.destroyDoor();
                this.is_destroy = true;
                this.getComponent(cc.Sprite).spriteFrame = this.open;
            }

        }
    }

     onLoad () {

     }

    start () {

    }

    destroyDoor(){
        this.door.destroy();
    }

    // update (dt) {}
}

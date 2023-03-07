
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    player:cc.Node = null;

    @property(cc.Integer)
    scoreNumber:number = 0;

    // LIFE-CYCLE CALLBACKS:

     onLoad () {
         cc.game.addPersistRootNode(this.node);
         //this.player = cc.find("Player");
     }
    start () {

    }

     update (dt) {
         //this.getComponent(cc.Label).node.setPosition(this.player.position.x + 250, this.player.position.y + 250);
     }
}

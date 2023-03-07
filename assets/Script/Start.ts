const {ccclass, property} = cc._decorator;

@ccclass
export default class Helloworld extends cc.Component {

    onLoad () {
        cc.director.preloadScene("Level_1");
        this.node.on("touchstart", function(event){
            cc.director.loadScene("Level_1");
        },this)
    }

    start () {

    }
}

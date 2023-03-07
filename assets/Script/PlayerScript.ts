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
    jumpForce:number = 0;

    @property(cc.Integer)
    velocityX:number = 0;

    @property(cc.Integer)
    gravity:number = 0;

    moveLeft:number = 0;
    moveRight:number = 0;
    forceInY:number = 0;

    CollisionFloor:boolean = false;

    @property(cc.Boolean)
    isDead:boolean = false;

    auxPosition:number = 0;

    stopAnim:boolean = true;
    is_playing:boolean = false;

    finishLevel:boolean = false;


    //colisiones.

    onCollisionEnter(other, self){
        if(other.node.group == "floor_up"){
            this.forceInY = 0;
            this.CollisionFloor = true;
            
        }

        if(other.node.group == "floor_down"){
            this.forceInY = 0;
            this.CollisionFloor = false;
        }

        if(other.node.group == "clockhands"){
            this.isDead = true;
            console.log(this.isDead);
        }

        if(other.node.group == "walls"){
            this.auxPosition = this.node.position.x;

        }

        if (other.node.group == "door"){
            this.auxPosition = this.node.position.x;
        }

        if(other.node.group == "exit"){
            this.finishLevel = true;
        }

        if(other.node.group == "hatch"){
            this.forceInY = 0;
            this.CollisionFloor = true;
        }
    }


    onCollisionStay(other,self){
        if(other.node.group == "floor_up"){
            this.forceInY = 0;
            this.CollisionFloor = true;
           
        }

        if(other.node.group == "walls"){
            this.node.setPosition(this.auxPosition, this.node.position.y);
        }

        if (other.node.group == "door"){
            this.node.setPosition(this.auxPosition, this.node.position.y);
        }

        if(other.node.group == "hatch"){
            this.forceInY = 0;
            this.CollisionFloor = true;
        
        }

    }

    onCollisionExit(other,self){
        if(other.node.group == "floor_up"){
            this.CollisionFloor = false;
        }
    }

    addGravity(){
        if(!this.CollisionFloor){
            this.forceInY -= this.gravity;
        }
    }

    jumpControl(){
        if(this.CollisionFloor){
            this.forceInY = this.jumpForce;
        }
    }
    // LIFE-CYCLE CALLBACKS:

    MovePlayer(event){
        switch(event.keyCode){
            case cc.macro.KEY.space:
                this.forceInY = 0;
                this.jumpControl();
                break;
            
            case cc.macro.KEY.d:
                this.moveRight = 1;
                this.spriteRotate();
                this.is_playing = true;
                break;

            case cc.macro.KEY.a:
                this.moveLeft = 1;
                this.spriteRotate();
                this.is_playing = true;
                break;
        }
    }

    StopPlayer(event){
        switch(event.keyCode){
            case cc.macro.KEY.d:
                this.moveRight = 0;
                break;

            case cc.macro.KEY.a:
                this.moveLeft = 0;
                break;
        }
    }

    spriteRotate(){
        if(this.moveRight == 1){
            this.getComponent(cc.Sprite).node.scaleX = 1;
        }
        if(this.moveLeft == 1){
            this.getComponent(cc.Sprite).node.scaleX = -1;
        }
    }

    animationManager(){
        let anim = this.getComponent(cc.Animation);
        let animState = anim.getAnimationState('Player_Move');
        if(this.moveLeft == 1 || this.moveRight == 1){
            if(!animState.isPlaying){
                //console.log("entre");
                this.getComponent(cc.Animation).stop("Player_Idle");
                this.getComponent(cc.Animation).play("Player_Move");
            }
        }else{
            this.getComponent(cc.Animation).stop("Player_Move");
            this.getComponent(cc.Animation).play("Player_Idle");
        }
    }

    onLoad () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.MovePlayer, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.StopPlayer, this);
    }

    start () {
        this.getComponent(cc.Animation).play("Player_Idle");
    }

     update (dt) {
        this.animationManager();
        this.addGravity();

        this.node.setPosition(this.node.position.x, this.node.position.y += this.forceInY * dt);

        if (this.moveLeft == 1){
            this.node.setPosition(this.node.position.x -= this.velocityX * dt, this.node.position.y);
        }
        if(this.moveRight == 1){
            this.node.setPosition(this.node.position.x += this.velocityX * dt, this.node.position.y);
        }

     }
}

/*
 * @Author: caizhijun
 * @Date: 2020-04-21 21:14:53
 */

const {ccclass, property} = cc._decorator;

@ccclass
export default class Display extends cc.Component {

    @property(cc.Label)
    txtName: cc.Label = null;

    @property(cc.Label)
    txtMsg:cc.Label = null;

    @property(cc.Layout)
    layout:cc.Layout = null;

    @property(cc.Node)
    nodeRoot:cc.Node = null;

    private _minX:number = -(cc.winSize.width >> 1);

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        this.nodeRoot.active = false;
    }

    // update (dt) {}

    onClick(event:any, data:string){
        switch(data){
            case 'show':{
                this.show();
                break;
            }
        }
    }

    show(){
        this._minX = -(cc.winSize.width >> 1);
        let name:string = '  一枚小工';
        let msg:string = '微信公众号，扫描以下二维码，关注公众号，获取更多技术资料和游戏源码！';
        this.nodeRoot.active = true;
        
        this.txtName.string = name;
        this.txtMsg.string = msg;
        this.txtName._forceUpdateRenderData();
        this.txtMsg._forceUpdateRenderData();
        this.layout.updateLayout();
        this.layout.node.x = this._minX;
        
        cc.log(this.layout.node.getContentSize());

        if(this.layout.node.getContentSize().width < cc.winSize.width){
            this.nodeRoot.runAction(cc.sequence(
                cc.delayTime(2),
                cc.callFunc( () => {
                    this.nodeRoot.active =false;
                })
            ));
        }else{
            this._minX -= (this.layout.node.getContentSize().width - cc.winSize.width);
            this.schedule(this.updatePosition, 0.02);
        }
    }

    updatePosition(){
        if(this.layout.node.x <= this._minX){
            this.unschedule(this.updatePosition);
            this.nodeRoot.active = false;
        }else{
            this.layout.node.x = this.layout.node.x - 2;
        }
    }
}

// env.js
/* jshint esversion: 6 */
// const env = "DEBUG";
const env = "PRODUCTION";

pc.app.env = env;

pc.extend(pc,function(){var t=function(t){this._app=t,this._tweens=[],this._add=[]};t.prototype={add:function(t){return this._add.push(t),t},update:function(t){for(var i=0,e=this._tweens.length;i<e;)this._tweens[i].update(t)?i++:(this._tweens.splice(i,1),e--);this._add.length&&(this._tweens=this._tweens.concat(this._add),this._add.length=0)}};var i=function(t,i,e){pc.events.attach(this),this.manager=i,e&&(this.entity=null),this.time=0,this.complete=!1,this.playing=!1,this.stopped=!0,this.pending=!1,this.target=t,this.duration=0,this._currentDelay=0,this.timeScale=1,this._reverse=!1,this._delay=0,this._yoyo=!1,this._count=0,this._numRepeats=0,this._repeatDelay=0,this._from=!1,this._slerp=!1,this._fromQuat=new pc.Quat,this._toQuat=new pc.Quat,this._quat=new pc.Quat,this.easing=pc.EASE_LINEAR,this._sv={},this._ev={}},e=function(t){var i;return t instanceof pc.Vec2?i={x:t.x,y:t.y}:t instanceof pc.Vec3?i={x:t.x,y:t.y,z:t.z}:t instanceof pc.Vec4?i={x:t.x,y:t.y,z:t.z,w:t.w}:t instanceof pc.Quat?i={x:t.x,y:t.y,z:t.z,w:t.w}:t instanceof pc.Color?(i={r:t.r,g:t.g,b:t.b},void 0!==t.a&&(i.a=t.a)):i=t,i};i.prototype={to:function(t,i,n,s,r,h){return this._properties=e(t),this.duration=i,n&&(this.easing=n),s&&this.delay(s),r&&this.repeat(r),h&&this.yoyo(h),this},from:function(t,i,n,s,r,h){return this._properties=e(t),this.duration=i,n&&(this.easing=n),s&&this.delay(s),r&&this.repeat(r),h&&this.yoyo(h),this._from=!0,this},rotate:function(t,i,n,s,r,h){return this._properties=e(t),this.duration=i,n&&(this.easing=n),s&&this.delay(s),r&&this.repeat(r),h&&this.yoyo(h),this._slerp=!0,this},start:function(){var t,i,e,n;if(this.playing=!0,this.complete=!1,this.stopped=!1,this._count=0,this.pending=this._delay>0,this._reverse&&!this.pending?this.time=this.duration:this.time=0,this._from){for(t in this._properties)this._properties.hasOwnProperty(t)&&(this._sv[t]=this._properties[t],this._ev[t]=this.target[t]);this._slerp&&(this._toQuat.setFromEulerAngles(this.target.x,this.target.y,this.target.z),i=void 0!==this._properties.x?this._properties.x:this.target.x,e=void 0!==this._properties.y?this._properties.y:this.target.y,n=void 0!==this._properties.z?this._properties.z:this.target.z,this._fromQuat.setFromEulerAngles(i,e,n))}else{for(t in this._properties)this._properties.hasOwnProperty(t)&&(this._sv[t]=this.target[t],this._ev[t]=this._properties[t]);this._slerp&&(this._fromQuat.setFromEulerAngles(this.target.x,this.target.y,this.target.z),i=void 0!==this._properties.x?this._properties.x:this.target.x,e=void 0!==this._properties.y?this._properties.y:this.target.y,n=void 0!==this._properties.z?this._properties.z:this.target.z,this._toQuat.setFromEulerAngles(i,e,n))}return this._currentDelay=this._delay,this.manager.add(this),this},pause:function(){this.playing=!1},resume:function(){this.playing=!0},stop:function(){this.playing=!1,this.stopped=!0},delay:function(t){return this._delay=t,this.pending=!0,this},repeat:function(t,i){return this._count=0,this._numRepeats=t,this._repeatDelay=i||0,this},loop:function(t){return t?(this._count=0,this._numRepeats=1/0):this._numRepeats=0,this},yoyo:function(t){return this._yoyo=t,this},reverse:function(){return this._reverse=!this._reverse,this},chain:function(){for(var t=arguments.length;t--;)t>0?arguments[t-1]._chained=arguments[t]:this._chained=arguments[t];return this},update:function(t){if(this.stopped)return!1;if(!this.playing)return!0;if(!this._reverse||this.pending?this.time+=t*this.timeScale:this.time-=t*this.timeScale,this.pending){if(!(this.time>this._currentDelay))return!0;this._reverse?this.time=this.duration-(this.time-this._currentDelay):this.time=this.time-this._currentDelay,this.pending=!1}var i=0;(!this._reverse&&this.time>this.duration||this._reverse&&this.time<0)&&(this._count++,this.complete=!0,this.playing=!1,this._reverse?(i=this.duration-this.time,this.time=0):(i=this.time-this.duration,this.time=this.duration));var e,n,s=this.time/this.duration,r=this.easing(s);for(var h in this._properties)this._properties.hasOwnProperty(h)&&(e=this._sv[h],n=this._ev[h],this.target[h]=e+(n-e)*r);if(this._slerp&&this._quat.slerp(this._fromQuat,this._toQuat,r),this.entity&&(this.entity._dirtifyLocal(),this.element&&this.entity.element&&(this.entity.element[this.element]=this.target),this._slerp&&this.entity.setLocalRotation(this._quat)),this.fire("update",t),this.complete){var a=this._repeat(i);return a?this.fire("loop"):(this.fire("complete",i),this._chained&&this._chained.start()),a}return!0},_repeat:function(t){if(this._count<this._numRepeats){if(this._reverse?this.time=this.duration-t:this.time=t,this.complete=!1,this.playing=!0,this._currentDelay=this._repeatDelay,this.pending=!0,this._yoyo){for(var i in this._properties)tmp=this._sv[i],this._sv[i]=this._ev[i],this._ev[i]=tmp;this._slerp&&(this._quat.copy(this._fromQuat),this._fromQuat.copy(this._toQuat),this._toQuat.copy(this._quat))}return!0}return!1}};var n=function(t){return 1-s(1-t)},s=function(t){return t<1/2.75?7.5625*t*t:t<2/2.75?7.5625*(t-=1.5/2.75)*t+.75:t<2.5/2.75?7.5625*(t-=2.25/2.75)*t+.9375:7.5625*(t-=2.625/2.75)*t+.984375};return{TweenManager:t,Tween:i,Linear:function(t){return t},QuadraticIn:function(t){return t*t},QuadraticOut:function(t){return t*(2-t)},QuadraticInOut:function(t){return(t*=2)<1?.5*t*t:-.5*(--t*(t-2)-1)},CubicIn:function(t){return t*t*t},CubicOut:function(t){return--t*t*t+1},CubicInOut:function(t){return(t*=2)<1?.5*t*t*t:.5*((t-=2)*t*t+2)},QuarticIn:function(t){return t*t*t*t},QuarticOut:function(t){return 1- --t*t*t*t},QuarticInOut:function(t){return(t*=2)<1?.5*t*t*t*t:-.5*((t-=2)*t*t*t-2)},QuinticIn:function(t){return t*t*t*t*t},QuinticOut:function(t){return--t*t*t*t*t+1},QuinticInOut:function(t){return(t*=2)<1?.5*t*t*t*t*t:.5*((t-=2)*t*t*t*t+2)},SineIn:function(t){return 0===t?0:1===t?1:1-Math.cos(t*Math.PI/2)},SineOut:function(t){return 0===t?0:1===t?1:Math.sin(t*Math.PI/2)},SineInOut:function(t){return 0===t?0:1===t?1:.5*(1-Math.cos(Math.PI*t))},ExponentialIn:function(t){return 0===t?0:Math.pow(1024,t-1)},ExponentialOut:function(t){return 1===t?1:1-Math.pow(2,-10*t)},ExponentialInOut:function(t){return 0===t?0:1===t?1:(t*=2)<1?.5*Math.pow(1024,t-1):.5*(2-Math.pow(2,-10*(t-1)))},CircularIn:function(t){return 1-Math.sqrt(1-t*t)},CircularOut:function(t){return Math.sqrt(1- --t*t)},CircularInOut:function(t){return(t*=2)<1?-.5*(Math.sqrt(1-t*t)-1):.5*(Math.sqrt(1-(t-=2)*t)+1)},BackIn:function(t){return t*t*(2.70158*t-1.70158)},BackOut:function(t){return--t*t*(2.70158*t+1.70158)+1},BackInOut:function(t){var i=2.5949095;return(t*=2)<1?t*t*((i+1)*t-i)*.5:.5*((t-=2)*t*((i+1)*t+i)+2)},BounceIn:n,BounceOut:s,BounceInOut:function(t){return t<.5?.5*n(2*t):.5*s(2*t-1)+.5},ElasticIn:function(t){var i,e=.1;return 0===t?0:1===t?1:(!e||e<1?(e=1,i=.1):i=.4*Math.asin(1/e)/(2*Math.PI),-e*Math.pow(2,10*(t-=1))*Math.sin((t-i)*(2*Math.PI)/.4))},ElasticOut:function(t){var i,e=.1;return 0===t?0:1===t?1:(!e||e<1?(e=1,i=.1):i=.4*Math.asin(1/e)/(2*Math.PI),e*Math.pow(2,-10*t)*Math.sin((t-i)*(2*Math.PI)/.4)+1)},ElasticInOut:function(t){var i,e=.1;return 0===t?0:1===t?1:(!e||e<1?(e=1,i=.1):i=.4*Math.asin(1/e)/(2*Math.PI),(t*=2)<1?e*Math.pow(2,10*(t-=1))*Math.sin((t-i)*(2*Math.PI)/.4)*-.5:e*Math.pow(2,-10*(t-=1))*Math.sin((t-i)*(2*Math.PI)/.4)*.5+1)}}}()),function(){pc.Application.prototype.addTweenManager=function(){this._tweenManager=new pc.TweenManager(this),this.on("update",function(t){this._tweenManager.update(t)})},pc.Application.prototype.tween=function(t){return new pc.Tween(t,this._tweenManager)},pc.Entity.prototype.tween=function(t,i){var e=this._app.tween(t);return e.entity=this,this.on("destroy",function(){e.stop()}),i&&i.element&&(e.element=i.element),e};var t=pc.Application.getApplication();t&&t.addTweenManager()}();var Compound=pc.createScript("compound");Compound.prototype.postInitialize=function(){var t=new Ammo.btCompoundShape;this.entity.findByTag("compound-shape").forEach(function(i){var o=i.getLocalPosition(),n=i.getLocalRotation(),e=i.collision.data.halfExtents,r=new Ammo.btBoxShape(new Ammo.btVector3(e.x,e.y,e.z)),d=new Ammo.btQuaternion(n.x,n.y,n.z,1),a=new Ammo.btVector3(o.x,o.y,o.z);t.addChildShape(new Ammo.btTransform(d,a),r),i.destroy()});var i=this.entity.getPosition(),o=new Ammo.btVector3(i.x,i.y,i.z),n=new Ammo.btDefaultMotionState(new Ammo.btTransform(new Ammo.btQuaternion(0,0,0,1),o)),e=new Ammo.btVector3(0,0,0);t.calculateLocalInertia(this.entity.rigidbody.mass,e);var r=new Ammo.btRigidBodyConstructionInfo(this.entity.rigidbody.mass,n,t,e);this.rigidbody=new Ammo.btRigidBody(r),this.rigidbody.setRestitution(this.entity.rigidbody.restitution),this.rigidbody.setFriction(this.entity.rigidbody.friction),this.rigidbody.setDamping(this.entity.rigidbody.linearDamping,this.entity.rigidbody.angularDamping);var d=this.entity.rigidbody.linearFactor,a=this.entity.rigidbody.angularFactor,s=this.entity.rigidbody.group,y=this.entity.rigidbody.mask;this.rigidbody.setLinearFactor(new Ammo.btVector3(d.x,d.y,d.z)),this.rigidbody.setAngularFactor(new Ammo.btVector3(a.x,a.y,a.z)),this.rigidbody.entity=this.entity,this.app.systems.rigidbody.dynamicsWorld.addRigidBody(this.rigidbody,s,y),this.entity.rigidbody.body=this.rigidbody},Compound.prototype.update=function(t){var i=new Ammo.btTransform;this.rigidbody.getMotionState().getWorldTransform(i);var o=i.getOrigin(),n=i.getRotation();this.entity.setRotation(new pc.Quat(n.x(),n.y(),n.z(),n.w())),this.entity.setPosition(o.x(),o.y(),o.z())};var PhysicsLayer=pc.createScript("physicsLayer");PhysicsLayer.attributes.add("groupA",{type:"boolean",default:!1,title:"Group A"}),PhysicsLayer.attributes.add("groupB",{type:"boolean",default:!1,title:"Group B"}),PhysicsLayer.attributes.add("groupC",{type:"boolean",default:!1,title:"Group C"}),PhysicsLayer.attributes.add("groupD",{type:"boolean",default:!1,title:"Group D"}),PhysicsLayer.attributes.add("maskAll",{type:"boolean",default:!0,title:"Mask All"}),PhysicsLayer.attributes.add("maskA",{type:"boolean",default:!1,title:"Mask A"}),PhysicsLayer.attributes.add("maskB",{type:"boolean",default:!1,title:"Mask B"}),PhysicsLayer.attributes.add("maskC",{type:"boolean",default:!1,title:"Mask C"}),PhysicsLayer.attributes.add("maskD",{type:"boolean",default:!1,title:"Mask D"}),PhysicsLayer.prototype.initialize=function(){var t=this.entity.rigidbody;t.group=pc.BODYGROUP_NONE,this.groupA&&(t.group|=pc.BODYGROUP_USER_1),this.groupB&&(t.group|=pc.BODYGROUP_USER_2),this.groupC&&(t.group|=pc.BODYGROUP_USER_3),this.groupD&&(t.group|=pc.BODYGROUP_USER_4),t.mask=pc.BODYMASK_NONE,this.maskAll&&(t.mask|=pc.BODYMASK_ALL),this.maskA&&(t.mask|=pc.BODYGROUP_USER_1),this.maskB&&(t.mask|=pc.BODYGROUP_USER_2),this.maskC&&(t.mask|=pc.BODYGROUP_USER_3),this.maskD&&(t.mask|=pc.BODYGROUP_USER_4)};pc.Entity.prototype.destroyOld=pc.Entity.prototype.destroy,pc.Entity.prototype.destroy=function(){this.fire("beforedestroy",this),pc.Entity.prototype.destroyOld.apply(this)};window.mobileCheck=function(){var i,a=!1;return i=navigator.userAgent||navigator.vendor||window.opera,(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(i)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(i.substr(0,4)))&&(a=!0),a};pc.util={},pc.util.abbreviateBigNumber=function abbreviateNumber(e){decPlaces=Math.pow(10,2);for(var a=["k","m","b","t","P","E","Z","Y"],t=a.length-1;t>=0;t--){var r=Math.pow(10,3*(t+1));if(r<=e){1e3==(e=Math.round(e*decPlaces/r)/decPlaces)&&t<a.length-1&&(e=1,t++),e+=a[t];break}}return e};var Translation=pc.createScript("translation");Translation.attributes.add("TranslationAssests",{type:"asset",title:"Translation Data Asset",assetType:"json"}),Translation.prototype.initialize=function(){pc.util.translation=this.TranslationAssests.resource,this.app.language="en-us"};pc.dataPersistence={},null!==localStorage.getItem("Tricks:Gems")?pc.dataPersistence.Gems=Number(localStorage.getItem("Tricks:Gems")):pc.dataPersistence.Gems=0,pc.dataPersistence.AddGems=function(e){pc.dataPersistence.Gems+=e,localStorage.setItem("Tricks:Gems",pc.dataPersistence.Gems),pc.app.fire("CurrencyChange")},null!==localStorage.getItem("Tricks:Cash")?pc.dataPersistence.Cash=Number(localStorage.getItem("Tricks:Cash")):pc.dataPersistence.Cash=0,pc.dataPersistence.AddCash=function(e){pc.dataPersistence.Cash+=e,localStorage.setItem("Tricks:Cash",pc.dataPersistence.Cash),pc.app.fire("CurrencyChange")},localStorage.getItem("Tricks:HighScore")<1?(pc.dataPersistence.HighScore=0,localStorage.setItem("Tricks:HighScore",pc.dataPersistence.HighScore)):pc.dataPersistence.HighScore=Number(localStorage.getItem("Tricks:HighScore")),pc.dataPersistence.SaveHighscore=function(e){pc.dataPersistence.HighScore=e,localStorage.setItem("Tricks:HighScore",pc.dataPersistence.HighScore)},null!==localStorage.getItem("Tricks:Store")?pc.dataPersistence.Store=JSON.parse(localStorage.getItem("Tricks:Store")):pc.dataPersistence.Store={Riders:["RiderGreen"],Bikes:["SR_Veh_DirtBike_Green"]},null!==localStorage.getItem("Tricks:SelectedRider")?pc.dataPersistence.SelectedRider=localStorage.getItem("Tricks:SelectedRider"):pc.dataPersistence.SelectedRider="RiderGreen",null!==localStorage.getItem("Tricks:SelectedBike")?pc.dataPersistence.SelectedBike=localStorage.getItem("Tricks:SelectedBike"):pc.dataPersistence.SelectedBike="SR_Veh_DirtBike_Green",pc.dataPersistence.AddRider=function(e){pc.dataPersistence.Store.Riders.push(e),localStorage.setItem("Tricks:Store",JSON.stringify(pc.dataPersistence.Store))},pc.dataPersistence.AddBike=function(e){pc.dataPersistence.Store.Bikes.push(e),localStorage.setItem("Tricks:Store",JSON.stringify(pc.dataPersistence.Store))},pc.dataPersistence.SelectRider=function(e){pc.dataPersistence.SelectedRider=e,localStorage.setItem("Tricks:SelectedRider",pc.dataPersistence.SelectedRider)},pc.dataPersistence.SelectBike=function(e){pc.dataPersistence.SelectedBike=e,localStorage.setItem("Tricks:SelectedBike",pc.dataPersistence.SelectedBike)},null!==localStorage.getItem("Tricks:Data")?pc.dataPersistence.data=JSON.parse(localStorage.getItem("Tricks:Data")):pc.dataPersistence.data={},pc.dataPersistence.AddData=function(e,t){pc.dataPersistence.data[e]=t,localStorage.setItem("Tricks:Data",JSON.stringify(pc.dataPersistence.data))};var SaveManager=pc.createScript("saveManager");SaveManager.prototype.initialize=function(){this.app.on("Challenges:Won",this.AddWin,this)},SaveManager.prototype.AddWin=function(){this.wins=Number(localStorage.getItem("TotalWins")),this.wins+=1,localStorage.setItem("TotalWins",this.wins),this.app.fire("TopBar:Update")};var StoreItemController=pc.createScript("storeItemController");StoreItemController.attributes.add("lockedImage",{type:"entity",title:"Locked Image"}),StoreItemController.attributes.add("itemImage",{type:"entity",title:"Item Image"}),StoreItemController.attributes.add("actionButton",{type:"entity",title:"Action Button"}),StoreItemController.attributes.add("actionText",{type:"entity",title:"Action Text"}),StoreItemController.attributes.add("useButton",{type:"asset",title:"Use Button Image",assetType:"texture"}),StoreItemController.attributes.add("selectedButton",{type:"asset",title:"Selected Button Image",assetType:"texture"}),StoreItemController.attributes.add("normalItemButton",{type:"asset",title:"Normal Item Button Image",assetType:"texture"}),StoreItemController.attributes.add("legendaryItemButton",{type:"asset",title:"Legendary Item Button Image",assetType:"texture"}),StoreItemController.prototype.Configure=function(t,e){this.item=t,this.type=e;var i=this.app.assets.find(this.item.image,"texture");this.itemImage.element.texture=i.resource,this.SetupAction();var s="Riders"==this.type?"Store:ChangeRider":"Store:ChangeBike";pc.app.on(s,this.SetupAction,this)},StoreItemController.prototype.SetupAction=function(){if(this.entity.element.off("mousedown",this.onPress,this),this.entity.element.off("touchstart",this.onPress,this),pc.dataPersistence.Store[this.type].includes(this.item.id)){var t=!1;this.lockedImage.enabled=!1,"Riders"==this.type?pc.dataPersistence.SelectedRider==this.item.id&&(t=!0,pc.dataPersistence.SelectedRiderItem=this.item):pc.dataPersistence.SelectedBike==this.item.id&&(t=!0,pc.dataPersistence.SelectedBikeItem=this.item),t?(this.actionText.element.text=pc.util.translation[pc.app.language].id28,this.actionButton.element.texture=this.selectedButton.resource,this.onPress=function(){console.log("STORE: Already selected")}):(this.actionText.element.text=pc.util.translation[pc.app.language].id28,this.actionButton.element.texture=this.useButton.resource,this.onPress=function(){this.Select()})}else{this.actionText.element.text=this.item.price;var e="normal"==this.item.type?this.normalItemButton:this.legendaryItemButton;this.actionButton.element.texture=e.resource,this.onPress=function(){this.Unlock()}}this.entity.element.on("mousedown",this.onPress,this),this.entity.element.on("touchstart",this.onPress,this)},StoreItemController.prototype.Unlock=function(){console.log("STORE: Trying to unlock"),pc.dataPersistence.Gems<this.item.price||(pc.dataPersistence.AddGems(-this.item.price),"Riders"==this.type?(pc.dataPersistence.AddRider(this.item.id),this.app.fire("event:riderUnlock","Store Rider Unlock "+this.item.id)):(pc.dataPersistence.AddBike(this.item.id),this.app.fire("event:bikeUnlock","Store Bike Unlock "+this.item.id)),pc.app.fire("STORE:Unlock"),this.app.fire("Sound:Button"),this.Select())},StoreItemController.prototype.Select=function(){console.log("STORE: Selecting"),"Riders"==this.type?(pc.dataPersistence.SelectRider(this.item.id),pc.app.fire("Store:ChangeRider",this.item)):(pc.dataPersistence.SelectBike(this.item.id),pc.app.fire("Store:ChangeBike",this.item)),this.actionButton.element.texture=this.selectedButton.resource};var StoreGenerator=pc.createScript("storeGenerator");StoreGenerator.attributes.add("storeItemsAsset",{type:"asset",title:"Store Item Data Asset",assetType:"json"}),StoreGenerator.attributes.add("prefabsContainer",{type:"entity",title:"Prefab Root Folder"}),StoreGenerator.attributes.add("bikeItemsParent",{title:"Bike Items Parent",type:"entity"}),StoreGenerator.attributes.add("riderItemsParent",{title:"Rider Items Parent",type:"entity"}),StoreGenerator.attributes.add("storeItemPrefab",{title:"Store Item Prefab",type:"entity"}),StoreGenerator.prototype.initialize=function(){this.storeItems=this.storeItemsAsset.resource,this.CreateItems(this.storeItems.Bikes,this.bikeItemsParent,"Bikes"),this.CreateItems(this.storeItems.Riders,this.riderItemsParent,"Riders")},StoreGenerator.prototype.CreateItems=function(e,t,r){for(var s=0;s<e.length;s++){var a=this.storeItemPrefab.clone();t.addChild(a),a.enabled=!0,a.script.storeItemController.Configure(e[s],r)}};var UpgradeManager=pc.createScript("upgradeManager");UpgradeManager.attributes.add("SpeedStatText",{title:"Speed Stat Text",type:"entity"}),UpgradeManager.attributes.add("SpeedPriceText",{title:"Speed price Text",type:"entity"}),UpgradeManager.attributes.add("TricksStatText",{title:"Tricks Stat Text",type:"entity"}),UpgradeManager.attributes.add("TricksPriceText",{title:"Tricks Price Text",type:"entity"}),UpgradeManager.attributes.add("OfflineStatText",{title:"Offline Stat Text",type:"entity"}),UpgradeManager.attributes.add("OfflinePriceText",{title:"Offline Price Text",type:"entity"}),UpgradeManager.attributes.add("OfflineButton",{title:"Offline Button",type:"entity"}),UpgradeManager.attributes.add("BoostButton",{title:"Boost Button",type:"entity"}),UpgradeManager.attributes.add("TricksButton",{title:"Tricks Button",type:"entity"}),UpgradeManager.attributes.add("EnabledButton",{type:"asset",title:"Use Button Image",assetType:"texture"}),UpgradeManager.attributes.add("DisabledButton",{type:"asset",title:"Cant Use Button Image",assetType:"texture"}),UpgradeManager.prototype.initialize=function(){this.SpeedPurchaseCount=localStorage.getItem("Speed"),this.TricksPurchaseCount=localStorage.getItem("Tricks"),this.OfflinePurchaseCount=localStorage.getItem("Offline"),this.UpdateStats(),this.app.on("UpgradeManager:Speed",function(){pc.dataPersistence.Cash>=this.CurrBoostCost&&(pc.dataPersistence.AddCash(-this.CurrBoostCost),this.SpeedPurchaseCount++,localStorage.setItem("Speed",this.SpeedPurchaseCount),this.UpdateStats(),this.CanBuyCheck())},this),this.app.on("UpgradeManager:Tricks",function(){pc.dataPersistence.Cash>=this.CurrTricksCost&&(pc.dataPersistence.AddCash(-this.CurrTricksCost),this.TricksPurchaseCount++,localStorage.setItem("Tricks",this.TricksPurchaseCount),this.UpdateStats(),this.CanBuyCheck())},this),this.app.on("UpgradeManager:Offline",function(){pc.dataPersistence.Cash>=this.CurrOfflinesCost&&(pc.dataPersistence.AddCash(-this.CurrOfflinesCost),this.OfflinePurchaseCount++,localStorage.setItem("Offline",this.OfflinePurchaseCount),this.UpdateStats(),this.CanBuyCheck())},this),this.CanBuyCheck(),this.app.on("CheckUpgrades",this.CanBuyCheck,this)},UpgradeManager.prototype.UpdateStats=function(){this.CurrBoostCost=Math.round(this.CheckPrice(this.SpeedPurchaseCount)),this.CurrTricksCost=Math.round(this.CheckPrice(this.TricksPurchaseCount)),this.CurrOfflinesCost=Math.round(this.CheckPrice(this.OfflinePurchaseCount)),this.SpeedStat=Math.round(100*this.CheckUpgrade(this.SpeedPurchaseCount,0))/100,this.TricksStat=Math.round(this.CheckUpgrade(this.TricksPurchaseCount,1)),this.OfflineStat=Math.round(this.CheckUpgrade(this.OfflinePurchaseCount,2)),this.app.fire("OfflineEarnings:Update"),this.UpdateStatsText()},UpgradeManager.prototype.CheckPrice=function(t){if(t>0){for(var e=50,r=0;r<t;)e=Math.round(3*e/10+e),r++;return e}return 50},UpgradeManager.prototype.CheckUpgrade=function(t,e){if(1==e){if(t>0){for(var r=10,a=0;a<t;)r=Math.round(.3*r+r),a++;return Math.round(r/4)}return 2}if(2==e){if(t>0){for(var s=50,i=0;i<t;)s=Math.round(3*s/10)+s,i++;return s}return 50}return t>0?.005*t+.1:.1},UpgradeManager.prototype.UpdateStatsText=function(){this.SpeedStatText.element.text=String(this.SpeedStat),this.SpeedPriceText.element.text=String(this.CurrBoostCost),this.TricksStatText.element.text=String(this.TricksStat),this.TricksPriceText.element.text=String(this.CurrTricksCost),this.OfflineStatText.element.text=String(this.OfflineStat),this.OfflinePriceText.element.text=String(this.CurrOfflinesCost)},UpgradeManager.prototype.CanBuyCheck=function(){pc.dataPersistence.Cash>=this.CurrBoostCost?this.BoostButton.element.texture=this.EnabledButton.resource:this.BoostButton.element.texture=this.DisabledButton.resource,pc.dataPersistence.Cash>=this.CurrTricksCost?this.TricksButton.element.texture=this.EnabledButton.resource:this.TricksButton.element.texture=this.DisabledButton.resource,pc.dataPersistence.Cash>=this.CurrOfflinesCost?this.OfflineButton.element.texture=this.EnabledButton.resource:this.OfflineButton.element.texture=this.DisabledButton.resource};var Uicontroller=pc.createScript("uicontroller");Uicontroller.attributes.add("MainMenuScreen",{title:"Main Menu",type:"entity"}),Uicontroller.attributes.add("GameplayUIScreen",{title:"Gameplay UI",type:"entity"}),Uicontroller.attributes.add("RaceEndScreen",{title:"Race End Screen",type:"entity"}),Uicontroller.attributes.add("ChallengesScreen",{title:"Challenges",type:"entity"}),Uicontroller.attributes.add("ChallengesScreen2",{title:"Challenges2",type:"entity"}),Uicontroller.attributes.add("FreeGemsScreen",{title:"Free Gems",type:"entity"}),Uicontroller.attributes.add("GemStoreScreen",{title:"Gem Store",type:"entity"}),Uicontroller.attributes.add("BikeStoreScreen",{title:"Bike Store",type:"entity"}),Uicontroller.attributes.add("OfflineScreen",{title:"Offline Menu",type:"entity"}),Uicontroller.attributes.add("CurrencyBoxes",{title:"Currency UI",type:"entity"}),Uicontroller.attributes.add("TutorialScreen",{title:"Tutorial",type:"entity"}),Uicontroller.attributes.add("MainMenuStartRaceButton",{title:"Main Menu Button",type:"entity"}),Uicontroller.prototype.initialize=function(){this.app.on("Gameplay:Finish",this.OnFinishRace,this),this.app.on("UI:MainMenu",this.ShowMainMenuScreen,this),this.app.on("UI:BikeStore",this.ShowBikeStoreScreen,this),this.app.on("UI:GemStore",this.ShowGemStoreScreen,this),this.app.on("UI:Challenges",this.ShowChallengeScreen,this),this.app.on("UI:PlayGame",this.ShowGameplayScreen,this),this.app.on("UI:FreeGems",this.ShowFreeGemScreen,this),this.app.on("UI:TutorialHide",this.HideTutorialScreen,this),this.app.on("UI:TutorialShow",this.ShowTutorialScreen,this),this.app.on("UI:GameOver",this.ShowRaceEndScreen,this),this.app.on("RaceEnd:Collect",function(){this.PreviousScreen.enabled=!1,this.MainMenuScreen.enabled=!0,this.PreviousScreen=this.MainMenuScreen},this),1!==Number(localStorage.getItem("FirstTime"))?(pc.dataPersistence.AddCash(Number(50)),this.app.fire("CurrencyChange"),localStorage.setItem("FirstTime",1),this.currentTime=new Date,this.FreeTimer=Date(this.currentTime.getTime()),localStorage.setItem("OfflineDate",Date(this.FreeTimer)),this.GameplayUIScreen.enabled=!0,this.PreviousScreen=this.GameplayUIScreen,this.app.fire("UI:PlayGame")):(this.OfflineScreen.enabled=!0,this.PreviousScreen=this.OfflineScreen)},Uicontroller.prototype.OnFinishRace=function(){this.entity.delayedExecute(this.app.raceFinishDelay,this.ShowChallengeScreen2,this)},Uicontroller.prototype.ShowMainMenuScreen=function(){this.PreviousScreen.enabled=!1,this.MainMenuScreen.enabled=!0,this.PreviousScreen=this.MainMenuScreen,this.app.fire("CheckUpgrades"),this.TutorialValue=Number(localStorage.getItem("Tricks:TutorialCounter")),3==this.TutorialValue&&this.app.fire("UI:TutorialShow")},Uicontroller.prototype.ShowGameplayScreen=function(){this.PreviousScreen.enabled=!1,this.GameplayUIScreen.enabled=!0,this.PreviousScreen=this.GameplayUIScreen,this.CurrencyBoxes.enabled=!1,this.TutorialValue=Number(localStorage.getItem("Tricks:TutorialCounter")),this.TutorialValue<1&&this.app.fire("UI:TutorialShow")},Uicontroller.prototype.ShowGemStoreScreen=function(){this.PreviousScreen.enabled=!1,this.GemStoreScreen.enabled=!0,this.PreviousScreen=this.GemStoreScreen},Uicontroller.prototype.ShowFreeGemScreen=function(){this.PreviousScreen.enabled=!1,this.FreeGemsScreen.enabled=!0,this.PreviousScreen=this.FreeGemsScreen},Uicontroller.prototype.ShowBikeStoreScreen=function(){this.PreviousScreen.enabled=!1,this.BikeStoreScreen.enabled=!0,this.PreviousScreen=this.BikeStoreScreen},Uicontroller.prototype.ShowChallengeScreen=function(){this.PreviousScreen.enabled=!1,this.ChallengesScreen.enabled=!0,this.PreviousScreen=this.ChallengesScreen,this.app.fire("Challenges:Open")},Uicontroller.prototype.ShowChallengeScreen2=function(){this.PreviousScreen.enabled=!1,this.ChallengesScreen2.enabled=!0,this.PreviousScreen=this.ChallengesScreen2,this.app.fire("Challenges:Open"),this.CurrencyBoxes.enabled=!0},Uicontroller.prototype.ShowRaceEndScreen=function(){this.PreviousScreen.enabled=!1,this.RaceEndScreen.enabled=!0,this.PreviousScreen=this.RaceEndScreen,this.app.fire("RaceEnd:PageOpen")},Uicontroller.prototype.HideTutorialScreen=function(){this.MainMenuStartRaceButton.enabled=!0,this.TutorialScreen.enabled=!1,this.togglePaused()},Uicontroller.prototype.ShowTutorialScreen=function(){this.MainMenuStartRaceButton.enabled=!1,this.TutorialScreen.enabled=!0,this.togglePaused()},Uicontroller.prototype.togglePaused=function(){this.paused?this.app.timeScale=1:this.app.timeScale=0,this.paused=!this.paused};var PlayerController=pc.createScript("playerController");PlayerController.attributes.add("maxSpeed",{type:"number",title:"Max Speed"}),PlayerController.attributes.add("maxBoostSpeed",{type:"number",title:"Max Boost Speed"}),PlayerController.attributes.add("acceleration",{type:"number",title:"Acceleration"}),PlayerController.attributes.add("rotationSpeed",{type:"number",title:"Rotation Speed"}),PlayerController.attributes.add("perfectLandingParticles",{type:"entity"}),PlayerController.attributes.add("perfectLandingParticlesDirt",{type:"entity"}),PlayerController.attributes.add("SpeedLines",{type:"entity"}),PlayerController.attributes.add("Dirt",{type:"entity"}),PlayerController.attributes.add("landingParticle",{type:"entity"}),PlayerController.prototype.initialize=function(){this.originalPosition=this.entity.getPosition().clone(),this.doingWheelie=!1,this.canHold=!0,this.deltaRotation=0,this.lastPos=0,this.held=!1,this.inAir=!1,this.playing=!1,this.app.mouse.on(pc.EVENT_MOUSEDOWN,this.onMouseDown,this),this.app.mouse.on(pc.EVENT_MOUSEUP,this.onMouseUp,this),this.app.keyboard.on(pc.EVENT_KEYDOWN,this.onKeyDown,this),this.app.keyboard.on(pc.EVENT_KEYUP,this.onKeyUp,this),this.spaceKeyDown=!1,this.app.on("Store:ChangeRider",this.changeRider,this),this.app.on("Store:ChangeBike",this.changeBike,this),this.app.on("Pause",this.togglePaused,this),this.app.on("Gameplay:Start",function(){this.playing=!0},this),this.app.on("Gameplay:Finish",this.OnFinishRace,this),this.entity.collision.on("collisionstart",this.onCollisionStart,this),this.entity.collision.on("collisionend",this.onCollisionEnd,this),this.app.touch&&(this.app.touch.on(pc.EVENT_TOUCHSTART,this.onTouchStart,this),this.app.touch.on(pc.EVENT_TOUCHEND,this.onTouchEnd,this)),this.changeRider(pc.dataPersistence.SelectedRiderItem),this.changeBike(pc.dataPersistence.SelectedBikeItem),this.MovingSound=!1},PlayerController.prototype.ProcessLandingDown=function(){this.landing=!0;var t=this.entity.getEulerAngles(),i=pc.app.tween(t).rotate(pc.Vec3.ZERO,.15,pc.Linear),e=this.entity;e.rigidbody.angularVelocity=pc.Vec3.ZERO,i.on("update",function(i){e.setEulerAngles(t.x,0,0)}),i.on("complete",function(){var t=e.getPosition();e.rigidbody.teleport(t.x,t.y,t.z,0,0,0)}),i.start()},PlayerController.prototype.update=function(t){if(!this.playing||this.crashed)return this.entity.sound.stop("Moving"),void(this.MovingSound=!1);if(!1!==this.canHold||3!=this.TutorialValue){if(this.inAir&&(!0===this.MovingSound&&(this.entity.sound.stop("Moving"),this.MovingSound=!1,this.Dirt.particlesystem.stop()),this.processDynamicGravity(),this.TutorialValue=Number(localStorage.getItem("Tricks:TutorialCounter")),1==this.TutorialValue&&this.app.fire("UI:TutorialShow"),2==this.TutorialValue&&(this.entity.getPosition().y<this.lastPos?(this.app.fire("UI:TutorialShow"),this.canHold=!1,this.ProcessLandingDown()):this.lastPos=this.entity.getPosition().y),this.held||(!0===this.MovingSound&&this.Dirt.particlesystem.stop(),0!==this.entity.rigidbody.angularVelocity.x&&(this.entity.rigidbody.angularVelocity=new pc.Vec3(this.rotationSpeed/5,0,0)))),!this.held)return this.entity.sound.stop("Moving"),this.MovingSound=!1,void this.Dirt.particlesystem.stop();if(this.inAir){!0===this.MovingSound&&(this.entity.sound.stop("Moving"),this.MovingSound=!1,this.Dirt.particlesystem.stop()),this.entity.rigidbody.angularVelocity=new pc.Vec3(this.rotationSpeed,0,0);var i=this.entity.getEulerAngles().x;this.deltaRotation+=Math.abs(i-this.previousRotation),this.deltaRotation>=360&&(this.app.fire("GamePlay:AddTricks"),this.deltaRotation=0),this.previousRotation=this.entity.getEulerAngles().x}else{!1===this.MovingSound&&(this.entity.sound.play("Moving"),this.MovingSound=!0,this.Dirt.particlesystem.reset(),this.Dirt.particlesystem.play()),this.entity.rigidbody.linearVelocity.z<this.maxSpeed&&this.entity.rigidbody.applyForce(0,0,this.acceleration)}}else this.ProcessLandingDown()},PlayerController.prototype.postUpdate=function(){if(this.doingWheelie){this.entity.setLocalEulerAngles(-35,0,0);var t=this.entity.getPosition();t.y=.45,this.entity.setPosition(t)}var i=this.entity.rigidbody;i.linearVelocity.length()>this.maxBoostSpeed&&(i.linearVelocity=i.linearVelocity.normalize().scale(this.maxBoostSpeed))},PlayerController.prototype.processDynamicGravity=function(){var t=pc.math.clamp(9.8*(1+.1*this.entity.getPosition().y),9.8,50),i=new pc.Vec3(0,-t,0);pc.app.systems.rigidbody.gravity=i},PlayerController.prototype.onTouchStart=function(t){this.onMouseDown(t.touches[0])},PlayerController.prototype.onTouchEnd=function(t){this.onMouseUp(t.touches[0])},PlayerController.prototype.onKeyDown=function(t){this.spaceKeyDown||t.key===pc.KEY_SPACE&&(this.spaceKeyDown=!0,this.onMouseDown(),t.event.preventDefault())},PlayerController.prototype.onKeyUp=function(t){t.key===pc.KEY_SPACE&&(this.spaceKeyDown=!1,this.onMouseUp())},PlayerController.prototype.onMouseDown=function(t){this.held=!0},PlayerController.prototype.onMouseUp=function(t){this.held=!1},PlayerController.prototype.onCollisionStart=function(t){if(this.inAir&&t.other.rigidbody){this.inAir=!1,this.app.fire("GamePlay:ResetTricks");var i=this.entity.getEulerAngles().x;if(i<-90||i>90)return void this.onCrash();var e=t.contacts[0].normal,o=this.entity.forward,n=e.dot(o),s=Math.acos(n)*pc.math.RAD_TO_DEG;s>=70&&s<=110&&this.onPerfectLanding(),t.other.tags.has("Floor")&&(this.canHold=!0),s>0&&t.other.tags.has("Floor")&&this.ProcessLanding()}},PlayerController.prototype.onCollisionEnd=function(t){t.tags.has("Ramp")&&(this.inAir=!0,this.entity.sound.play("OffRamp"),this.previousRotation=this.entity.getEulerAngles().x)},PlayerController.prototype.onCrash=function(){this.crashed=!0,this.entity.sound.play("Crash"),this.entity.rigidbody.linearVelocity=pc.Vec3.ZERO,this.entity.rigidbody.angularVelocity=pc.Vec3.ZERO;var t=this.entity.getEulerAngles(),i=pc.app.tween(t).rotate(pc.Vec3.ZERO,.7,pc.Linear),e=this.entity;i.on("update",function(i){e.setEulerAngles(t.x,0,0)}),i.on("complete",function(){var t=e.getPosition();e.rigidbody.teleport(t.x,t.y,t.z,0,0,0),e.script.playerController.crashed=!1}),i.start()},PlayerController.prototype.onPerfectLanding=function(){if(!(this.entity.rigidbody.linearVelocity.z>this.maxBoostSpeed)){this.entity.sound.play("PerfectLanding"),this.perfectLandingParticlesDirt.particlesystem.reset(),this.perfectLandingParticlesDirt.particlesystem.play(),this.perfectLandingParticles.particlesystem.reset(),this.perfectLandingParticles.particlesystem.play(),this.SpeedLines.particlesystem.reset(),this.SpeedLines.particlesystem.play(),this.app.fire("GamePlay:Perfect"),this.app.fire("Challenges:Perfect");var t=new pc.Vec3(0,0,3e3);this.entity.rigidbody.applyImpulse(t)}},PlayerController.prototype.ProcessLanding=function(){var t=this.entity.getEulerAngles();this.entity.sound.play("Landing"),this.landingParticle.particlesystem.reset(),this.landingParticle.particlesystem.play();var i=pc.app.tween(t).rotate(pc.Vec3.ZERO,.3,pc.Linear),e=this.entity;e.rigidbody.angularVelocity=pc.Vec3.ZERO,i.on("update",function(i){e.setEulerAngles(t.x,0,0)}),i.on("complete",function(){var t=e.getPosition();e.rigidbody.teleport(t.x,t.y,t.z,0,0,0)}),i.start()},PlayerController.prototype.OnFinishRace=function(){this.entity.delayedExecute(this.app.raceFinishDelay,this.Reset,this);var t=this.entity.tween(this.entity.getLocalEulerAngles()).rotate({x:-35,y:0,z:0},.3,pc.Linear),i=this,e=0;t.on("update",function(t){e+=t;var o=i.entity.getPosition();o.y=pc.math.lerp(0,.45,e/.3),i.entity.setPosition(o)}),t.on("complete",function(){i.doingWheelie=!0}),t.start(),i.doingWheelie=!0},PlayerController.prototype.Reset=function(){this.playing=!1,this.entity.rigidbody.linearVelocity=pc.Vec3.ZERO,this.entity.rigidbody.angularVelocity=pc.Vec3.ZERO,this.doingWheelie=!1,this.entity.rigidbody.teleport(this.originalPosition.x,this.originalPosition.y,this.originalPosition.z,0,0,0)},PlayerController.prototype.changeRider=function(t){var i=t.id,e=this.entity.findByTag("Rider")[0],o=e.getLocalPosition().clone();e&&e.destroy();var n=this.app.root.findByName(i).clone();this.entity.addChild(n),n.setLocalPosition(o),n.tags.add("Rider"),n.enabled=!0},PlayerController.prototype.changeBike=function(t){var i=t.id,e=this.entity.findByTag("Bike")[0],o=e.getLocalPosition().clone();e&&e.destroy();var n=this.app.root.findByName(i).clone();this.entity.addChild(n),n.setLocalPosition(o),n.tags.add("Bike"),n.enabled=!0},PlayerController.prototype.togglePaused=function(){};var CameraController=pc.createScript("cameraController");CameraController.attributes.add("targetEntity",{title:"Target Entity",type:"entity"}),CameraController.attributes.add("offset",{title:"Position Offset",type:"vec3"}),CameraController.attributes.add("keepOffset",{title:"Keep Editor Offset",type:"boolean"}),CameraController.attributes.add("raceFinishTransform",{title:"Race Finish Transform",type:"entity"}),CameraController.prototype.initialize=function(){this.app.on("Gameplay:Finish",this.OnFinishRace,this),this.originalRotation=this.entity.getEulerAngles(),this.originalParent=this.entity.parent,this.tracking=!0},CameraController.prototype.postInitialize=function(){this.keepOffset&&(this.offset=this.targetEntity.getPosition(),this.offset.sub(this.entity.getPosition()))},CameraController.prototype.postUpdate=function(){this.tracking&&this.entity.setPosition(this.targetEntity.getPosition().sub(this.offset))},CameraController.prototype.OnFinishRace=function(){this.entity.delayedExecute(this.app.raceFinishDelay,this.Reset,this),this.tracking=!1;var t=this.entity.getPosition().clone(),i=this.entity.getRotation().clone();this.entity.reparent(this.targetEntity),this.entity.setPosition(t),this.entity.setRotation(i),i=this.raceFinishTransform.getLocalEulerAngles(),t=this.raceFinishTransform.getLocalPosition();var e=this,n=this.targetEntity,o=this.entity.tween(this.entity.getLocalPosition()).to({x:t.x,y:t.y,z:t.z},.5,pc.QuadraticIn);o.on("update",function(t){e.entity.lookAt(n.getPosition())}),o.start()},CameraController.prototype.Reset=function(){this.tracking=!0,this.entity.reparent(this.originalParent),this.entity.setEulerAngles(this.originalRotation)};var Trigger=pc.createScript("trigger");Trigger.attributes.add("eventName",{type:"string",title:"Event Name To Fire On Trigger"}),Trigger.attributes.add("tags",{type:"string",title:"Tags To Fire Trigger",array:!0}),Trigger.prototype.initialize=function(){this.entity.collision.on("triggerenter",this.onTriggerEnter,this)},Trigger.prototype.onTriggerEnter=function(t){for(var r=!1,e=0;e<this.tags.length;e++)if(t.tags.has(this.tags[e])){r=!0;break}r&&this.app.fire(this.eventName)};// TrackController.js
/* jshint esversion: 6 */

var TrackController = pc.createScript('trackController');

TrackController.attributes.add ('trackRoot', {type: 'entity', title: 'Track Root'});

TrackController.attributes.add ('level1Segs', {type: 'entity', title: 'Level 1 Segments', array: true});
TrackController.attributes.add ('level2Segs', {type: 'entity', title: 'Level 2 Segments', array: true});
TrackController.attributes.add ('level3Segs', {type: 'entity', title: 'Level 3 Segments', array: true});
TrackController.attributes.add ('trackLength', {type: 'number', title: 'Track Length'});

// initialize code called once per entity

TrackController.prototype.initialize = function() {
    this.pool = {};
    this.shouldRebuildPool = false;

    // Number of segments we need to spawn from the get go.
    // Fog will hide everything that's beyond that point
    this.segmentsQtyToSpawnAtStart = 4;
    //this.segmentsQtyToSpawnAtStart = this.trackLength; // Spawn the full track so that it's a fair race. If AI goes too far ahead we'd have no jumps to slow them down.

    this.spawnedTrackSegments = [];
    this.spawnedTrackCounter = 0;

    this.selectedSegments = [];

    this.app.on('Gameplay:Finish', this.OnFinishRace, this);
    this.app.on('Challenges:Won', this.SwitchTrack, this);

    this.levelChoice = Number(localStorage.getItem('TotalWins')) % 3;

    this.assignCurrentTrackPieces();

    // Scott's lovely variable naming
    this.segSpaceCount = 0;

    this.kickstartPool();

    this.newTrack();
};

TrackController.prototype.assignCurrentTrackPieces = function() {
    // Visual Settings for different levels
    switch(this.levelChoice) {
        // Track
        case 0:
            this.selectedSegments = this.level1Segs;
            break;

        // Desert
        case 1:
            this.selectedSegments = this.level2Segs;
            break;

        // Grand
        case 2:
            this.selectedSegments = this.level3Segs;
            break;
    }

    this.selectedSegments[0].enabled = true;
    this.entity.delayedExecute(0.5, () => this.selectedSegments[0].enabled = false, this);
};

// Cleanup and Create new track
TrackController.prototype.newTrack = function() {
    this.spawnedTrackSegments = [];
    this.spawnedTrackCounter = 0;

    // Spawn the track
    this.createTrack();
};

// Spawn the beginning of the track. The rest is going to be
// created while the other pieces get cleaned up
TrackController.prototype.createTrack = function() {
    for(var i = this.segmentsQtyToSpawnAtStart; i >= 0; i--) {
        this.spawnTrack();
    }
};

// Spawn track pieces
TrackController.prototype.spawnTrack = function () {
    if(this.spawnedTrackCounter === 0) {
        // Spawn the first bit of the track
        this.spawnTrackPiece(this.selectedSegments[0]);
    }
    else {
        var currentSegment = this.spawnedTrackSegments[this.spawnedTrackSegments.length - 1];
        var spawnPosition = currentSegment.findByName('End').getPosition();
        var trackPiece;

        if(this.spawnedTrackCounter < this.trackLength) {
            if(this.spawnedTrackCounter >= (this.trackLength - 5)) {
                trackPiece = this.selectedSegments[6];
            }
            else if(this.segSpaceCount > 2) {
                trackPiece = this.selectedSegments[Math.floor(pc.math.random(3, this.selectedSegments.length))];
                this.segSpaceCount = 0;
            }
            else {
                trackPiece = this.selectedSegments[6];
                this.segSpaceCount++;
            }
        }
        else {
            if(this.spawnedTrackCounter == this.trackLength) {
                trackPiece = this.selectedSegments[1];
            }
            else {
                trackPiece = this.selectedSegments[2];
            }
        }

        this.spawnTrackPiece(trackPiece, spawnPosition);
    }
};

// Spawn a track piece
TrackController.prototype.spawnTrackPiece = function(trackPiece, position) {
    if(position === undefined) {
        position = new pc.Vec3(0, 0, 0);
    }

    // var newSegment = trackPiece.clone();
    var newSegment = this.create(trackPiece);

    this.spawnedTrackSegments.push(newSegment);
    this.spawnedTrackCounter++;
    this.trackRoot.addChild(newSegment);

    newSegment.setPosition(position);

    newSegment.enabled = true;
};

TrackController.prototype.onTrackPieceCleanup = function(trackPiece) {
    this.remove(trackPiece);

    // Track piece cleaned up. We'll spawn a new one.
    this.spawnTrack();
};

TrackController.prototype.SwitchTrack = function() {
    this.levelChoice = (this.levelChoice + 1) % 3;

    this.shouldRebuildPool = true;
};

TrackController.prototype.OnFinishRace = function() {
    this.entity.delayedExecute(this.app.raceFinishDelay, this.Reset, this);
};

TrackController.prototype.Reset = function() {
    // Move all remaining track pieces into the pool
    while(this.spawnedTrackSegments.length > 0) {
        this.remove(this.spawnedTrackSegments[0]);
    }

    if(this.shouldRebuildPool) {
        // Need to erase the already pooled track bits
        Object.keys(this.pool).forEach(key => {
            // Track cleanup
            for(var i = 0; i < this.pool[key].length; i++) {
                var item = this.pool[key][i];

                if(item.parent !== null) item.parent.removeChild(item);

                item.destroy();
            }
        });

        this.pool = {};

        this.assignCurrentTrackPieces();

        this.kickstartPool();

        this.shouldRebuildPool = false;
    }

    this.newTrack();
};

TrackController.prototype.create = function(item) {
    var poolItem;

    var poolArray = this.pool[item.name];

    if(poolArray === undefined) {
        this.pool[item.name] = [];
        poolArray = this.pool[item.name];
    }

    if(poolArray.length) {
        poolItem = poolArray.shift();
    }
    else {
        poolItem = item.clone();

        if(this.app.env == "DEBUG") console.log("CLONING PIECE " + item.name);

        // Subscribe to events
        poolItem.script.trackPieceCleanup.on('cleanup', this.onTrackPieceCleanup, this);

        // remove player move event listeners when script destroyed
        poolItem.script.trackPieceCleanup.on('beforedestroy', function() {
            poolItem.script.trackPieceCleanup.off('cleanup', this.onTrackPieceCleanup, this);
        });
    }

    // if(this.app.env == "DEBUG") this.debugPool();
    return poolItem;
};

TrackController.prototype.remove = function(item) {
    // Remove track piece from currently "spawned" (in track) list
    var index = this.spawnedTrackSegments.indexOf(item);
    if(index > -1) this.spawnedTrackSegments.splice(index, 1);

    // This is blocking execution on the first time it runs... wtf
    item.enabled = false;
    // item.setPosition(new pc.Vec3(0, 0, -1000));

    if(item.parent !== null) item.parent.removeChild(item);

    if(this.pool[item.name] === undefined) {
        console.error("TRACK GENERATION: Pool remove. Object " + item.name + " without a place in the pool. This should not be happening");
        item.destroy();
        return;
    }

    this.pool[item.name].push(item);
};

TrackController.prototype.debugPool = function() {
    console.log("Pool Debug BEGIN");
    Object.keys(this.pool).forEach(key => {
        console.log(key + ": " + (this.pool[key].length));
    });
    console.log("Pool Debug END");
};

TrackController.prototype.kickstartPool = function() {
    // Track1.0: 1
    // Track1.0 End: 2
    // Track1.0 After_End: 1
    // Track1.1: 2
    // Track1.2: 2
    // Track1.3: 3
    // Track1.4: 6

    var piecesToSpawn = [1, 1, 5, 2, 2, 3, 6];

    if(piecesToSpawn.length != this.selectedSegments.length) {
        console.error("TRACK GENERATION: Error Kickstarting pool, number of track pieces available doesn't match piecesToSpawn array");
    }

    for(var i = 0; i < this.selectedSegments.length; i++) {
        var item = this.selectedSegments[i];

        this.pool[item.name] = [];
        for(var j = 0; j < piecesToSpawn[i]; j++) {
            var poolItem = item.clone();

            poolItem.enabled = false;
            // poolItem.enabled = true;
            // poolItem.setPosition(new pc.Vec3(0, 0, -1000));

            // Subscribe to events
            poolItem.script.trackPieceCleanup.on('cleanup', this.onTrackPieceCleanup, this);

            // remove player move event listeners when script destroyed
            poolItem.script.trackPieceCleanup.on('beforedestroy', function() {
                poolItem.script.trackPieceCleanup.off('cleanup', this.onTrackPieceCleanup, this);
            });

            this.pool[item.name].push(poolItem);
        }
    }
    // this.debugPool();
};


// swap method called for script hot-reloading
// inherit your script state here
// TrackManager.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// https://developer.playcanvas.com/en/user-manual/scripting/

var TrackPieceCleanup=pc.createScript("trackPieceCleanup");TrackPieceCleanup.attributes.add("player",{type:"entity",title:"Player"}),TrackPieceCleanup.prototype.initialize=function(){this.inTrack=!1},TrackPieceCleanup.prototype.update=function(t){var i=this.player.getPosition().z;!this.inTrack&&this.entity.getPosition().z+40>=i&&(this.inTrack=!0),this.inTrack&&this.entity.getPosition().z+40<i&&(this.inTrack=!1,this.fire("cleanup",this.entity))};var ButtonScript=pc.createScript("buttonScript");ButtonScript.attributes.add("EventName",{title:"Event Name",type:"string"}),ButtonScript.prototype.initialize=function(){this.originalTexture=this.entity.element.textureAsset,this.entity.element.on("mouseenter",this.onEnter,this),this.entity.element.on("mousedown",this.onPress,this),this.entity.element.on("mouseup",this.onRelease,this),this.entity.element.on("mouseleave",this.onLeave,this),this.entity.element.on("touchstart",this.onPress,this),this.entity.element.on("touchend",this.onRelease,this)},ButtonScript.prototype.onPress=function(t){this.app.fire(this.EventName),this.app.fire("Sound:Button")};var RaceEndScreenManager=pc.createScript("raceEndScreenManager");RaceEndScreenManager.attributes.add("RewardText",{title:"REWARD Text",type:"entity"}),RaceEndScreenManager.attributes.add("Rewardx2Text",{title:"REWARDx2 Text",type:"entity"}),RaceEndScreenManager.attributes.add("Position",{title:"Position Text",type:"entity"}),RaceEndScreenManager.attributes.add("x2Cash",{title:"x2 Cash",type:"entity"}),RaceEndScreenManager.attributes.add("FreeGems",{title:"Free Gems",type:"entity"}),RaceEndScreenManager.attributes.add("Noads",{title:"No ads",type:"entity"}),RaceEndScreenManager.attributes.add("RaceInfo",{title:"Race Info Reference",type:"entity"}),RaceEndScreenManager.prototype.initialize=function(){this.app.on("RaceEnd:Collect",function(){this.Collect()},this),this.app.on("RaceEnd:Collectx2",function(){this.ShowAd(1)},this),this.app.on("RaceEnd:Gems",function(){this.ShowAd(2)},this),this.app.on("RaceEnd:NoAds",function(){this.NoAds()},this),this.app.on("RaceEnd:PageOpen",function(){this.PageReset()},this),this.app.on("AD:RewardUser",this.Reward,this),this.on("enable",function(){this.app.on("AD:RewardUser",this.Reward,this)},this),this.on("disable",function(){this.app.off("AD:RewardUser",this.Reward,this)},this)},RaceEndScreenManager.prototype.PageReset=function(){this.RaceInfoReference=this.RaceInfo.script.raceInfo,this.Earnings=Number(this.RaceInfoReference.Earnings);var e=this.random(1,3);this.RewardText.element.text=pc.util.abbreviateBigNumber(this.Earnings),this.Rewardx2Text.element.text=pc.util.abbreviateBigNumber(2*this.Earnings),this.x2Cash.enabled=!1,this.FreeGems.enabled=!1,this.NoAds.enabled=!1,void 0!==this.app.adBlock&&this.app.adBlock||(1==e?this.x2Cash.enabled=!0:2==e?this.FreeGems.enabled=!0:3==e&&(this.Noads.enabled=!0))},RaceEndScreenManager.prototype.random=function(e,t){var a=t-e;return a=Math.random()*a+e,Math.floor(a)},RaceEndScreenManager.prototype.NoAds=function(){this.app.fire("UI:MainMenu"),pc.dataPersistence.AddCash(Number(this.Earnings))},RaceEndScreenManager.prototype.Collect=function(){pc.dataPersistence.AddCash(Number(this.Earnings)),this.app.fire("UI:MainMenu"),pc.app.fire("AD:Interstitial")},RaceEndScreenManager.prototype.ShowAd=function(e){this.rewardType=e,this.app.fire("AD:RewardedAd")},RaceEndScreenManager.prototype.Reward=function(){1==this.rewardType?(this.NewEarnings=2*this.Earnings,pc.dataPersistence.AddCash(Number(this.NewEarnings)),this.app.fire("UI:MainMenu"),this.app.fire("event:rvWatched","Game Over Cash Doubler")):(pc.dataPersistence.AddCash(Number(this.Earnings)),pc.dataPersistence.AddGems(Number(20)),this.app.fire("UI:MainMenu"),this.app.fire("event:rvWatched","Game Over Free Gems"))};var UicurrencyManager=pc.createScript("uicurrencyManager");UicurrencyManager.attributes.add("CashText",{title:"Cash Text",type:"entity"}),UicurrencyManager.attributes.add("GemsText",{title:"Gems Text",type:"entity"}),UicurrencyManager.prototype.initialize=function(){this.UpdateStatsText(),this.app.on("CurrencyChange",this.UpdateStatsText,this)},UicurrencyManager.prototype.UpdateStatsText=function(){this.CashText.element.text=String(pc.util.abbreviateBigNumber(pc.dataPersistence.Cash)),this.GemsText.element.text=String(pc.util.abbreviateBigNumber(pc.dataPersistence.Gems))};var DistanceBar=pc.createScript("distanceBar");DistanceBar.attributes.add("progressImage",{type:"entity"}),DistanceBar.attributes.add("progressImageMaxWidth",{type:"number"}),DistanceBar.attributes.add("TrackGenerationReference",{title:"Track Generation Script",type:"entity"}),DistanceBar.attributes.add("Player",{title:"Player",type:"entity"}),DistanceBar.attributes.add("CurrentLevelText",{title:"Current Level Text",type:"entity"}),DistanceBar.attributes.add("NextLevelText",{title:"Next Level Text",type:"entity"}),DistanceBar.prototype.initialize=function(){this.TrackScript=this.TrackGenerationReference.script.trackController,this.TrackLength=30*this.TrackScript.trackLength,this.app.on("TopBar:Update",this.AddWin,this),this.AddWin()},DistanceBar.prototype.AddWin=function(t){this.CurrentLevel=Number(localStorage.getItem("TotalWins")),this.CurrentLevelText.element.text=String(this.CurrentLevel),this.NextLevel=Number(this.CurrentLevel+1),this.NextLevelText.element.text=String(this.NextLevel)},DistanceBar.prototype.setProgress=function(t){t=pc.math.clamp(t,0,this.TrackLength),this.progress=t;var e=pc.math.lerp(0,this.progressImageMaxWidth,t);this.progressImage.element.width=e,this.progressImage.element.rect.z=t},DistanceBar.prototype.update=function(t){this.setProgress(this.Player.position.z/this.TrackLength)};// FreeGemsManager.js
/* jshint esversion: 6 */

Date.prototype.addHours = function(h) {
    this.setTime(this.getTime() + (h * 60 * 60 * 1000));
    return this;
};

var FreeGemsManager = pc.createScript('freeGemsManager');

FreeGemsManager.attributes.add('FreeGemsTimeText', {title: 'Free Gems Timer Text',type: 'entity' });
FreeGemsManager.attributes.add('RewardGemsTimeText', {title: 'Reward Gems Timer Text',type: 'entity' });
FreeGemsManager.attributes.add("Button0Collect", {type: "entity", title: "Free Collect"});
FreeGemsManager.attributes.add("Button0Collected", {type: "entity", title: "Free Collected"});
FreeGemsManager.attributes.add("Button1Collect", {type: "entity", title: "Free Collect1"});
FreeGemsManager.attributes.add("Button1Collected", {type: "entity", title: "Free Collected1"});
FreeGemsManager.attributes.add("Button2Collect", {type: "entity", title: "Free Collect2"});
FreeGemsManager.attributes.add("Button2Collected", {type: "entity", title: "Free Collected2"});
FreeGemsManager.attributes.add("Button3Collect", {type: "entity", title: "Free Collect3"});
FreeGemsManager.attributes.add("Button3Collected", {type: "entity", title: "Free Collected3"});
FreeGemsManager.attributes.add("Button4Collect", {type: "entity", title: "Free Collect4"});
FreeGemsManager.attributes.add("Button4Collected", {type: "entity", title: "Free Collected4"});

// initialize code called once per entity
FreeGemsManager.prototype.initialize = function() {

    this.CheckAdButtons();
    this.CheckFreeButtons();

    this.app.on('FreeGems:0', () => this.AddFreeReward(5), this);
    this.app.on('FreeGems:1', () => this.ShowAd(20) ,this);
    this.app.on('FreeGems:2', () => this.ShowAd(50), this);
    this.app.on('FreeGems:3', () => this.ShowAd(100), this);
    this.app.on('FreeGems:4', () => this.ShowAd(150), this);

    this.on('destroy', function() {
        this.app.off('FreeGems:0', () => this.AddFreeReward(5), this);
        this.app.off('FreeGems:1', () => this.ShowAd(20) ,this);
        this.app.off('FreeGems:2', () => this.ShowAd(50), this);
        this.app.off('FreeGems:3', () => this.ShowAd(100), this);
        this.app.off('FreeGems:4', () => this.ShowAd(150), this);
    });

    // Rewarded videos
    this.app.on('AD:RewardUser', this.AddReward, this);
    this.on("enable", function () {
        this.app.on('AD:RewardUser', this.AddReward, this);
    }, this);
    this.on("disable", function () {
        this.app.off('AD:RewardUser', this.AddReward, this);
    }, this);

};

FreeGemsManager.prototype.SecondsToHHMMSS = function(s) {
    var hours   = Math.floor(s / 3600);
    var minutes = Math.floor((s - (hours * 3600)) / 60);
    var seconds = s - (hours * 3600) - (minutes * 60);

    if(hours < 10) hours = "0" + hours;
    if(minutes < 10) minutes = "0" + minutes;
    if(seconds < 10) seconds = "0" + seconds;

    return `${hours}:${minutes}:${seconds}`;
};

// update code called every frame
FreeGemsManager.prototype.update = function(dt) {
    //current time
    var currentTime = new Date();

    if(this.TotalFreeViewed > 0) {
        if(currentTime < this.FreeTimer) {
            var differenceInSeconds = Math.round((this.FreeTimer - currentTime) / 1000);
            this.FreeGemsTimeText.element.text = pc.util.translation[pc.app.language]['id27'] + ": " + this.SecondsToHHMMSS(differenceInSeconds);
        }
        else {
            localStorage.setItem('FreeViewed', 0);
            this.CheckFreeButtons();
            this.FreeGemsTimeText.element.text = pc.util.translation[pc.app.language]['id4'];
        }
    }
    else {
        this.FreeGemsTimeText.element.text = pc.util.translation[pc.app.language]['id4'];
    }

    if(this.TotalAdsViewed > 0) {
        if(currentTime < this.AdTimer) {
            var differenceInADSeconds = Math.round((this.AdTimer - currentTime) / 1000);
            this.RewardGemsTimeText.element.text = pc.util.translation[pc.app.language]['id27'] + ": " + this.SecondsToHHMMSS(differenceInADSeconds);
        }
        else{
            localStorage.setItem('AdsViewed', 0);
            this.CheckAdButtons();
            this.RewardGemsTimeText.element.text =  pc.util.translation[pc.app.language]['id24'] ;
        }
    }
    else {
             localStorage.setItem('AdsViewed', 0);
    }

};

FreeGemsManager.prototype.CheckAdButtons = function() {

    this.TotalAdsViewed = Number(localStorage.getItem('AdsViewed'));

    var storedTime = localStorage.getItem('AdTimer');

    if(storedTime !== undefined) {
        this.AdTimer = new Date(storedTime);
    }


    this.TotalAdsViewed = Number(localStorage.getItem('AdsViewed'));

    this.Button1Collect.enabled = false;
    this.Button2Collect.enabled = false;
    this.Button3Collect.enabled = false;
    this.Button4Collect.enabled = false;

    this.Button1Collected.enabled = true;
    this.Button2Collected.enabled = true;
    this.Button3Collected.enabled = true;
    this.Button4Collected.enabled = true;

    if(this.TotalAdsViewed<1){
        this.Button1Collect.enabled = true;
    }
    else if(this.TotalAdsViewed == 1){
        this.Button2Collect.enabled = true;
        this.Button1Collect.enabled = false;
    }
    else if(this.TotalAdsViewed == 2){
        this.Button3Collect.enabled = true;
        this.Button2Collect.enabled = false;
    }
    else if(this.TotalAdsViewed == 3){
        this.Button4Collect.enabled = true;
        this.Button3Collect.enabled = false;
    }
    else if(this.TotalAdsViewed>=4){
        this.Button1Collect.enabled = false;
        this.Button2Collect.enabled = false;
        this.Button3Collect.enabled = false;
        this.Button4Collect.enabled = false;
    }
};


FreeGemsManager.prototype.ShowAd = function(Reward){
    this.reward = Reward;

    //play ad
    this.app.fire('AD:RewardedAd');
};

FreeGemsManager.prototype.AddReward = function() {
    pc.dataPersistence.AddGems(this.reward);


    if(this.TotalAdsViewed<1){
        this.AdTimer = new Date().addHours(12); // 12 hour * 60 secs
        localStorage.setItem('AdTimer',this.AdTimer.toString());
    }

    this.TotalAdsViewed++;
    localStorage.setItem('AdsViewed',this.TotalAdsViewed);
    this.CheckAdButtons();
};



FreeGemsManager.prototype.CheckFreeButtons = function() {

      this.TotalFreeViewed = Number(localStorage.getItem('FreeViewed'));

    var storedTime = localStorage.getItem('FreeTimer');

    if(storedTime !== undefined) {
        this.FreeTimer = new Date(storedTime);
    }

    if(this.TotalFreeViewed<1){
        this.Button0Collect.enabled = true;
        this.Button0Collected.enabled = false
        ;
    }
    else{
        this.Button0Collect.enabled = false;
        this.Button0Collected.enabled = true;
    }

};


FreeGemsManager.prototype.AddFreeReward = function(Reward) {

    pc.dataPersistence.AddGems(Number(Reward));

    this.FreeTimer = new Date().addHours(4);

    localStorage.setItem('FreeTimer', this.FreeTimer.toString());

    localStorage.setItem('FreeViewed',Number(1));

    this.CheckFreeButtons();

    this.app.fire('event:rvWatched', 'Free Gems ' + Reward);
};



var ChallengeScreenManager=pc.createScript("challengeScreenManager");ChallengeScreenManager.attributes.add("TimerText",{title:"Time Left Text",type:"entity"}),ChallengeScreenManager.prototype.initialize=function(){this.EasyValue=Number(localStorage.getItem("EasyChallengeValue")),this.MediumValue=Number(localStorage.getItem("MediumChallengeValue")),this.HardValue=Number(localStorage.getItem("HardChallengeValue")),this.ChooseChallenges(),this.app.on("Challenges:Open",this.ChooseChallenges,this),this.app.on("Challenges:Won",this.AddRaceWon,this),this.app.on("Challenges:Ended",this.AddRaceFinished,this),this.app.on("Challenges:Double",this.AddDoubleFlip,this),this.app.on("Challenges:Triple",this.AddTripleFlip,this),this.app.on("Challenges:Perfect",this.AddPerfect,this),this.on("destroy",function(){this.app.off("Challenges:Open",this.ChooseChallenges,this),this.app.off("Challenges:Won",this.AddRaceWon,this),this.app.off("Challenges:Ended",this.AddRaceFinished,this),this.app.off("Challenges:Double",this.AddDoubleFlip,this),this.app.off("Challenges:Triple",this.AddTripleFlip,this),this.app.off("Challenges:Perfect",this.AddPerfect,this)})},ChallengeScreenManager.prototype.random=function(e,l){var a=l-e;return a=Math.random()*a+e,Math.floor(a)},ChallengeScreenManager.prototype.ChooseChallenges=function(){this.currentTime=new Date,this.oldDate=new Date(localStorage.getItem("ChallengeDate")),this.oldDate.getDay()!==this.currentTime.getDay()?(this.EasyChallenge=this.random(1,6),localStorage.setItem("EasyChallenge",this.EasyChallenge),this.MediumChallenge=this.random(1,6),localStorage.setItem("MediumChallenge",this.MediumChallenge),this.HardChallenge=this.random(1,6),localStorage.setItem("HardChallenge",this.HardChallenge),this.TodaysDate=Date(this.currentTime.getTime()),localStorage.setItem("ChallengeDate",this.TodaysDate),localStorage.setItem("EasyChallengeValue",0),localStorage.setItem("MediumChallengeValue",0),localStorage.setItem("HardChallengeValue",0),localStorage.setItem("OldEasyCallengeValue",0),localStorage.setItem("OldMediumCallengeValue",0),localStorage.setItem("OldHardCallengeValue",0),localStorage.setItem("Challenge1Complete",0),localStorage.setItem("Challenge2Complete",0),localStorage.setItem("Challenge3Complete",0)):null!==localStorage.getItem("EasyChallenge")?(this.EasyChallenge=Number(localStorage.getItem("EasyChallenge")),this.MediumChallenge=Number(localStorage.getItem("MediumChallenge")),this.HardChallenge=Number(localStorage.getItem("HardChallenge"))):(this.EasyChallenge=this.random(1,6),localStorage.setItem("EasyChallenge",this.EasyChallenge),this.MediumChallenge=this.random(1,6),localStorage.setItem("MediumChallenge",this.MediumChallenge),this.HardChallenge=this.random(1,6),localStorage.setItem("HardChallenge",this.HardChallenge),this.TodaysDate=Date(this.currentTime.getTime()),localStorage.setItem("ChallengeDate",this.TodaysDate),localStorage.setItem("EasyChallengeValue",0),localStorage.setItem("MediumChallengeValue",0),localStorage.setItem("HardChallengeValue",0),localStorage.setItem("OldEasyCallengeValue",0),localStorage.setItem("OldMediumCallengeValue",0),localStorage.setItem("OldHardCallengeValue",0),localStorage.setItem("Challenge1Complete",0),localStorage.setItem("Challenge2Complete",0),localStorage.setItem("Challenge3Complete",0))},ChallengeScreenManager.prototype.AddRaceFinished=function(){1==this.EasyChallenge&&this.Add(1),1==this.MediumChallenge&&this.Add(2),1==this.HardChallenge&&this.Add(3)},ChallengeScreenManager.prototype.AddRaceWon=function(){2==this.EasyChallenge&&this.Add(1),2==this.MediumChallenge&&this.Add(2),2==this.HardChallenge&&this.Add(3)},ChallengeScreenManager.prototype.AddDoubleFlip=function(){3==this.EasyChallenge&&this.Add(1),3==this.MediumChallenge&&this.Add(2),3==this.HardChallenge&&this.Add(3)},ChallengeScreenManager.prototype.AddTripleFlip=function(){4==this.EasyChallenge&&this.Add(1),4==this.MediumChallenge&&this.Add(2),4==this.HardChallenge&&this.Add(3)},ChallengeScreenManager.prototype.AddPerfect=function(){5==this.EasyChallenge&&this.Add(1),5==this.MediumChallenge&&this.Add(2),5==this.HardChallenge&&this.Add(3)},ChallengeScreenManager.prototype.Add=function(e){1==e?(this.EasyValue++,this.EasyValue>=5?Number(localStorage.setItem("EasyChallengeValue",5)):Number(localStorage.setItem("EasyChallengeValue",this.EasyValue))):2==e?(this.MediumValue++,this.MediumValue>=10?Number(localStorage.setItem("MediumChallengeValue",10)):Number(localStorage.setItem("MediumChallengeValue",this.MediumValue))):3==e&&(this.HardValue++,this.HardValue>=20?Number(localStorage.setItem("HardChallengeValue",20)):Number(localStorage.setItem("HardChallengeValue",this.HardValue)))};var TextTranslator=pc.createScript("textTranslator");TextTranslator.attributes.add("textID",{title:"Text ID",type:"string"}),TextTranslator.attributes.add("ChiFont",{type:"asset",assetType:"font"}),TextTranslator.attributes.add("ThaiFont",{type:"asset",assetType:"font"}),TextTranslator.attributes.add("ViFont",{type:"asset",assetType:"font"}),TextTranslator.attributes.add("HindiFont",{type:"asset",assetType:"font"}),TextTranslator.attributes.add("PorBrFont",{type:"asset",assetType:"font"}),TextTranslator.attributes.add("EngFont",{type:"asset",assetType:"font"}),TextTranslator.prototype.initialize=function(){this.entity.element.text=String(pc.util.translation[pc.app.language][this.textID]),this.app.on("language:update",this.UpdateText,this),this.on("enable",this.UpdateText,this),this.UpdateText()},TextTranslator.prototype.UpdateText=function(){"th"==pc.app.language&&(this.entity.element.font=this.ThaiFont.resource),"zh"==pc.app.language&&(this.entity.element.font=this.ChiFont.resource),"vi"==pc.app.language&&(this.entity.element.font=this.ViFont.resource),"pt-br"==pc.app.language&&(this.entity.element.font=this.PorBrFont.resource),"hi"==pc.app.language&&(this.entity.element.font=this.HindiFont.resource),"en"==pc.app.language&&(this.entity.element.font=this.EngFont.resource),"en_us"==pc.app.language&&(this.entity.element.font=this.EngFont.resource),"id"==pc.app.language&&(this.entity.element.font=this.EngFont.resource),""!==this.textID&&(this.entity.element.text=String(pc.util.translation[pc.app.language][this.textID]))};var GemStoreManager=pc.createScript("gemStoreManager");GemStoreManager.prototype.initialize=function(){this.app.on("GemStore:0",function(){this.AddReward(Number(1600))},this),this.app.on("GemStore:1",function(){this.AddReward(Number(3350))},this),this.app.on("GemStore:2",function(){this.AddReward(Number(7600))},this),this.app.on("GemStore:NoAds",function(){this.NoAds()},this),this.on("destroy",function(){this.app.off("GemStore:0",function(){this.AddReward(Number(1600))},this),this.app.off("GemStore:1",function(){this.AddReward(Number(3350))},this),this.app.off("GemStore:2",function(){this.AddReward(Number(7600))},this),this.app.off("GemStore:NoAds",function(){this.NoAds()},this)})},GemStoreManager.prototype.AddReward=function(t){pc.dataPersistence.AddGems(Number(t))},GemStoreManager.prototype.NoAds=function(){};var AiController=pc.createScript("aiController");AiController.attributes.add("maxSpeed",{type:"number",title:"Max Speed"}),AiController.attributes.add("acceleration",{type:"number",title:"Acceleration"}),AiController.attributes.add("rotationSpeed",{type:"number",title:"Rotation Speed"}),AiController.attributes.add("bikes",{type:"entity",title:"Bikes",array:!0}),AiController.attributes.add("riders",{type:"entity",title:"Riders",array:!0}),AiController.attributes.add("Dirt",{type:"entity"}),AiController.prototype.initialize=function(){this.originalPosition=this.entity.getPosition().clone(),this.inAir=!1,this.playing=!1,this.app.on("Gameplay:Start",function(){this.playing=!0,this.Dirt.particlesystem.reset(),this.Dirt.particlesystem.play()},this),this.app.on("Gameplay:Finish",this.OnFinishRace,this),this.entity.collision.on("collisionstart",this.onCollisionStart,this),this.entity.collision.on("collisionend",this.onCollisionEnd,this),this.ChangeAILooks(),this.ChangeAISkill()},AiController.prototype.update=function(t){if(this.playing&&!this.crashed){if(this.inAir)this.entity.rigidbody.linearVelocity.y>0?this.entity.rigidbody.angularVelocity=new pc.Vec3(this.rotationSpeed,0,0):this.landing||this.ProcessLanding(),this.Dirt.particlesystem.stop();else this.entity.rigidbody.applyForce(0,0,this.acceleration),this.Dirt.particlesystem.play();var i=this.entity.rigidbody.linearVelocity;i.z>this.maxSpeed&&(this.entity.rigidbody.linearVelocity=new pc.Vec3(0,i.y,this.maxSpeed))}else this.Dirt.particlesystem.stop()},AiController.prototype.onCollisionStart=function(t){if(this.inAir&&t.other.rigidbody){this.inAir=!1;var i=this.entity.getEulerAngles().x;if(i<-90||i>90)return void this.onCrash();var e=t.contacts[0].normal,o=this.entity.forward,n=e.dot(o);Math.acos(n)*pc.math.RAD_TO_DEG>0&&t.other.tags.has("Floor")&&this.ProcessLanding()}},AiController.prototype.onCollisionEnd=function(t){t.tags.has("Ramp")&&(this.inAir=!0)},AiController.prototype.onCrash=function(){this.crashed=!0,this.entity.rigidbody.linearVelocity=pc.Vec3.ZERO,this.entity.rigidbody.angularVelocity=pc.Vec3.ZERO;var t=this.entity.getEulerAngles(),i=pc.app.tween(t).rotate(pc.Vec3.ZERO,.7,pc.Linear),e=this.entity;i.on("update",function(i){e.setEulerAngles(t.x,0,0)}),i.on("complete",function(){var t=e.getPosition();e.rigidbody.teleport(t.x,t.y,t.z,0,0,0),e.script.aiController.crashed=!1}),i.start()},AiController.prototype.ProcessLanding=function(){this.landing=!0;var t=this.entity.getEulerAngles(),i=pc.app.tween(t).rotate(pc.Vec3.ZERO,.3,pc.Linear),e=this.entity;e.rigidbody.angularVelocity=pc.Vec3.ZERO,i.on("update",function(i){e.setEulerAngles(t.x,0,0)}),i.on("complete",function(){var t=e.getPosition();e.rigidbody.teleport(t.x,t.y,t.z,0,0,0),e.script.aiController.landing=!1}),i.start()},AiController.prototype.ChangeAILooks=function(){var t=this.bikes[Math.floor(pc.math.random(0,this.bikes.length))];this.spawnedBike=t.clone(),this.entity.addChild(this.spawnedBike),this.spawnedBike.setLocalPosition(pc.Vec3.ZERO),this.spawnedBike.enabled=!0;var i=this.riders[Math.floor(pc.math.random(0,this.riders.length))];this.spawnedRider=i.clone(),this.entity.addChild(this.spawnedRider),this.spawnedRider.setLocalPosition(pc.Vec3.ZERO),this.spawnedRider.enabled=!0},AiController.prototype.ChangeAISkill=function(){this.acceleration*=pc.math.random(.95,1.05),this.maxSpeed*=pc.math.random(.9,1.05)},AiController.prototype.OnFinishRace=function(){this.entity.delayedExecute(this.app.raceFinishDelay,this.Reset,this)},AiController.prototype.Reset=function(){this.playing=!1,this.entity.rigidbody.linearVelocity=pc.Vec3.ZERO,this.entity.rigidbody.angularVelocity=pc.Vec3.ZERO,this.entity.rigidbody.teleport(this.originalPosition.x,this.originalPosition.y,this.originalPosition.z,0,0,0),this.spawnedBike.destroy(),this.spawnedRider.destroy(),this.ChangeAILooks(),this.ChangeAISkill()};var BikeStoreManager=pc.createScript("bikeStoreManager");BikeStoreManager.attributes.add("BikeList",{title:"Bike list",type:"entity"}),BikeStoreManager.attributes.add("RiderList",{title:"Rider list",type:"entity"}),BikeStoreManager.prototype.initialize=function(){this.app.on("BikeStore:FreeGems",function(){this.ShowAd(Number(20))},this),this.app.on("BikeStore:Riders",function(){this.ShowRiders()},this),this.app.on("BikeStore:Bikes",function(){this.ShowBikes()},this),this.on("destroy",function(){this.app.off("FreeGems:0",function(){this.ShowAd(Number(20))},this),this.app.off("BikeStore:Riders",function(){this.ShowRiders()},this),this.app.off("BikeStore:Bikes",function(){this.ShowBikes()},this)}),this.app.on("AD:RewardUser",this.AddReward,this),this.on("enable",function(){this.app.on("AD:RewardUser",this.AddReward,this)},this),this.on("disable",function(){this.app.off("AD:RewardUser",this.AddReward,this)},this)},BikeStoreManager.prototype.ShowAd=function(e){this.reward=e,this.app.fire("AD:RewardedAd")},BikeStoreManager.prototype.AddReward=function(){pc.dataPersistence.AddGems(this.reward),this.app.fire("event:rvWatched","Store Free Gems")},BikeStoreManager.prototype.ShowBikes=function(e){this.BikeList.enabled=!0,this.RiderList.enabled=!1},BikeStoreManager.prototype.ShowRiders=function(e){this.BikeList.enabled=!1,this.RiderList.enabled=!0};var PositionTracker=pc.createScript("positionTracker");PositionTracker.attributes.add("positionLabel",{type:"entity",title:"Position Label"}),PositionTracker.attributes.add("racers",{type:"entity",title:"Racers",array:!0}),PositionTracker.attributes.add("player",{type:"entity",title:"Player"}),PositionTracker.prototype.initialize=function(){this.playing=!1,this.app.on("Gameplay:Start",function(){this.playing=!0},this),this.app.on("Gameplay:Finish",this.FinalPosition,this)},PositionTracker.prototype.update=function(i){if(this.playing){var t=this.racers.sort(function(i,t){return t.getPosition().z-i.getPosition().z}),e=this.player,n=t.findIndex(function(i){return i===e})+1;this.FinishLinePlyaerPosition=n,n=1==n?"1st":2==n?"2nd":3==n?"3rd":String(n)+"th",this.positionLabel.element.text=n}},PositionTracker.prototype.FinalPosition=function(){this.app.fire("Challenges:Ended"),1==this.FinishLinePlyaerPosition&&this.app.fire("Challenges:Won")};var GameController=pc.createScript("gameController");GameController.attributes.add("raceFinishDelay",{title:"Race Finish Delay",type:"number"}),GameController.prototype.initialize=function(){this.app.on("UI:PlayGame",this.StartGame,this),this.app.on("Trigger:FinishLine",this.OnFinishLine,this),this.app.raceFinishDelay=this.raceFinishDelay},GameController.prototype.StartGame=function(){this.app.fire("Gameplay:Start"),this.app.playing=!0,this.app.fire("event:gameStart")},GameController.prototype.OnFinishLine=function(){this.app.fire("Gameplay:Finish"),this.entity.delayedExecute(this.app.raceFinishDelay,this.Reset,this)},GameController.prototype.Reset=function(){this.app.fire("Gameplay:Reset"),this.app.playing=!1};pc.Entity.prototype.delayedExecute=function(e,t,i){for(var n=0;this["delayedExecuteTween"+n];)n++;var c="delayedExecuteTween"+n;return this[c]=this.tween(void 0).to(1,e,pc.Linear),this[c].start(),this[c].once("complete",function(){t.call(i),this[c]=null},this),this[c]};var ProgressBar=pc.createScript("progressBar");ProgressBar.attributes.add("progressImage",{type:"entity"}),ProgressBar.attributes.add("progressImageMaxWidth",{type:"number"}),ProgressBar.attributes.add("MaxValue",{type:"number"}),ProgressBar.attributes.add("Difficulty",{type:"number"}),ProgressBar.attributes.add("MissionText",{title:"Mission Text",type:"entity"}),ProgressBar.prototype.initialize=function(){this.Check(),this.on("enable",this.Check,this)},ProgressBar.prototype.Check=function(){1==this.Difficulty?(this.CurrentValue=Number(localStorage.getItem("EasyChallengeValue")),this.OldValue=Number(localStorage.getItem("OldEasyCallengeValue")),localStorage.setItem("OldEasyCallengeValue",this.CurrentValue),this.CreateChallenges(this.Difficulty,Number(localStorage.getItem("EasyChallenge")))):2==this.Difficulty?(this.CurrentValue=Number(localStorage.getItem("MediumChallengeValue")),this.OldValue=Number(localStorage.getItem("OldMediumCallengeValue")),localStorage.setItem("OldMediumCallengeValue",this.CurrentValue),this.CreateChallenges(this.Difficulty,Number(localStorage.getItem("MediumChallenge")))):3==this.Difficulty&&(this.CurrentValue=Number(localStorage.getItem("HardChallengeValue")),this.OldValue=Number(localStorage.getItem("OldHardCallengeValue")),localStorage.setItem("OldHardCallengeValue",this.CurrentValue),this.CreateChallenges(this.Difficulty,Number(localStorage.getItem("HardChallenge")))),this.CurrentValue<1?(this.setProgress(0),this.increase=!1):(this.CurrentValue,this.OldValue,this.setProgress(this.OldValue/this.MaxValue),this.increase=!0)},ProgressBar.prototype.setProgress=function(e){e=pc.math.clamp(e,0,this.MaxValue),this.progress=e;var t=pc.math.lerp(0,this.progressImageMaxWidth,e);this.progressImage.element.width=t,this.progressImage.element.rect.z=e},ProgressBar.prototype.update=function(e){var t=this.increase*e;this.setProgress(this.progress+t),this.progress>=this.CurrentValue/this.MaxValue&&(this.increase=!1)},ProgressBar.prototype.CreateChallenges=function(e,t){var a;1==e?(1==t?a="id14":2==t?a="id13":3==t?a="id11":4==t?a="id12":5==t&&(a="id10"),this.MissionText.element.text=this.CurrentValue+"/5 "+String(pc.util.translation[pc.app.language][a]),this.CurrentValue==Number(this.MaxValue)&&1!=localStorage.getItem("Challenge1Complete")&&(localStorage.setItem("Challenge1Complete",1),pc.dataPersistence.AddGems(Number(10)))):2==e?(1==t?this.MissionText.element.text=this.CurrentValue+"/10 "+String(pc.util.translation[pc.app.language].id14):2==t?this.MissionText.element.text=this.CurrentValue+"/10 "+String(pc.util.translation[pc.app.language].id13):3==t?this.MissionText.element.text=this.CurrentValue+"/10 "+String(pc.util.translation[pc.app.language].id11):4==t?this.MissionText.element.text=this.CurrentValue+"/10 "+String(pc.util.translation[pc.app.language].id12):5==t&&(this.MissionText.element.text=this.CurrentValue+"/10 "+String(pc.util.translation[pc.app.language].id10)),this.CurrentValue==Number(this.MaxValue)&&1!=localStorage.getItem("Challenge2Complete")&&(localStorage.setItem("Challenge2Complete",1),pc.dataPersistence.AddGems(Number(40)))):3==e&&(1==t?this.MissionText.element.text=this.CurrentValue+"/20 "+String(pc.util.translation[pc.app.language].id14):2==t?this.MissionText.element.text=this.CurrentValue+"/20 "+String(pc.util.translation[pc.app.language].id13):3==t?this.MissionText.element.text=this.CurrentValue+"/20 "+String(pc.util.translation[pc.app.language].id11):4==t?this.MissionText.element.text=this.CurrentValue+"/20 "+String(pc.util.translation[pc.app.language].id12):5==t&&(this.MissionText.element.text=this.CurrentValue+"/20 "+String(pc.util.translation[pc.app.language].id10)),this.CurrentValue==Number(this.MaxValue)&&1!=localStorage.getItem("Challenge3Complete")&&(localStorage.setItem("Challenge3Complete",1),pc.dataPersistence.AddGems(Number(100))))};var OfflineEarnings=pc.createScript("offlineEarnings");OfflineEarnings.attributes.add("RewardText",{title:"REWARD Text",type:"entity"}),OfflineEarnings.attributes.add("Rewardx2Text",{title:"REWARDx2 Text",type:"entity"}),OfflineEarnings.attributes.add("UpgradeManagerReference",{title:"Upgrade Controller",type:"entity"}),OfflineEarnings.prototype.initialize=function(){this.app.on("OfflineEarnings:Update",function(){this.GetEarnings()},this),this.app.on("OfflineEarnings:Single",function(){this.Collect()},this),this.app.on("OfflineEarnings:Double",function(){this.ShowAd()},this),this.app.on("AD:RewardUser",this.DoubleEarnings,this),this.on("enable",function(){this.app.on("AD:RewardUser",this.DoubleEarnings,this)}),this.on("disable",function(){this.app.off("AD:RewardUser",this.DoubleEarnings,this)}),this.on("destroy",function(){this.app.off("OfflineEarnings:Update",function(){this.GetEarnings()},this),this.app.off("OfflineEarnings:Single",function(){this.Collect()},this),this.app.off("OfflineEarnings:Double",function(){this.ShowAd()},this)})},OfflineEarnings.prototype.GetEarnings=function(){this.LastDate=new Date(localStorage.getItem("OfflineDate")),this.CurrentTime=new Date,this.difference=Math.floor(Math.abs(this.LastDate-this.CurrentTime)/36e5),this.difference>=1?(this.Upgrade=this.UpgradeManagerReference.script.upgradeManager,this.NewAmount=this.difference*this.Upgrade.OfflineStat):this.app.fire("UI:MainMenu"),this.RewardText.element.text=this.NewAmount,this.Rewardx2Text.element.text=2*this.NewAmount},OfflineEarnings.prototype.Collect=function(){pc.dataPersistence.AddCash(this.NewAmount),this.app.fire("UI:MainMenu"),this.currentTime=new Date,this.FreeTimer=Date(this.currentTime.getTime()),localStorage.setItem("OfflineDate",Date(this.FreeTimer))},OfflineEarnings.prototype.ShowAd=function(){this.app.fire("AD:RewardedAd")},OfflineEarnings.prototype.DoubleEarnings=function(){this.DoubleAmount=2*this.NewAmount,pc.dataPersistence.AddCash(this.DoubleAmount),this.app.fire("UI:MainMenu"),this.currentTime=new Date,this.FreeTimer=Date(this.currentTime.getTime()),localStorage.setItem("OfflineDate",Date(this.FreeTimer)),this.app.fire("event:rvWatched","Offline Earnings Doubler")};var GamePlayUi=pc.createScript("gamePlayUi");GamePlayUi.attributes.add("EarningsText",{title:"Earnings Text",type:"entity"}),GamePlayUi.attributes.add("TricksText",{title:"Tricks Text",type:"entity"}),GamePlayUi.attributes.add("PerfectLanding",{title:"Perfect landing Text",type:"entity"}),GamePlayUi.attributes.add("UpgradeManagerReference",{title:"Upgrade Controller",type:"entity"}),GamePlayUi.prototype.initialize=function(){this.EarningsText.element.text="0",this.app.on("GamePlay:Perfect",this.ShowPerfectLanding,this),this.app.on("GamePlay:ResetTricks",this.ResetRotation,this),this.app.on("GamePlay:AddTricks",this.AddRotation,this),this.app.on("Gameplay:Start",this.ResetAmount,this),this.ResetAmount()},GamePlayUi.prototype.ShowPerfectLanding=function(){this.PerfectLanding.enabled=!0,this.entity.delayedExecute(this.app.raceFinishDelay,this.EndPerfectLanding,this)},GamePlayUi.prototype.ResetAmount=function(){this.rotations=Number(0),this.NewCoins=Number(0),this.NewCoinsTotal=Number(0),this.TricksText.element.text="",this.EarningsText.element.text="0"},GamePlayUi.prototype.EndPerfectLanding=function(){this.PerfectLanding.enabled=!1},GamePlayUi.prototype.AddRotation=function(){this.rotations++,2==this.rotations&&this.app.fire("Challenges:Double"),3==this.rotations&&this.app.fire("Challenges:Triple"),this.Upgrade=this.UpgradeManagerReference.script.upgradeManager,this.CurrTricks=Number(this.Upgrade.TricksStat),this.NewCoins+=this.CurrTricks,this.NewCoinsTotal+=this.CurrTricks,this.app.fire("GameplayUI:NewCoins"),this.EarningsText.element.text=pc.util.abbreviateBigNumber(Number(this.NewCoinsTotal)),this.TricksText.enabled=!0,this.TricksText.element.text=Number(this.rotations)+"x "+String(pc.util.translation[pc.app.language].id1)+"\n"+pc.util.abbreviateBigNumber(this.NewCoins)},GamePlayUi.prototype.ResetRotation=function(){null!==this.TricksText&&(this.TricksText.enabled=!1),this.rotations=Number(0),this.NewCoins=Number(0)};var RaceInfo=pc.createScript("raceInfo");RaceInfo.attributes.add("GamePlayUIReference",{title:"Gameplay UI Controller",type:"entity"}),RaceInfo.prototype.initialize=function(){this.GameplayUI=this.GamePlayUIReference.script.gamePlayUi,this.app.on("GameplayUI:NewCoins",function(){this.EndRace()},this)},RaceInfo.prototype.EndRace=function(){this.Earnings=Number(this.GameplayUI.NewCoinsTotal)};var ButtonSound=pc.createScript("buttonSound");ButtonSound.prototype.initialize=function(){this.app.on("Sound:Button",this.Button,this)},ButtonSound.prototype.Button=function(){this.entity.sound.play("button")};var ScaleText=pc.createScript("scaleText");ScaleText.prototype.initialize=function(){this.entity.tween(this.entity.getLocalScale()).to(new pc.Vec3(1.05,1.05,1.05),.2,pc.SineOut).loop(!0).yoyo(!0).start()};var FpsController=pc.createScript("fpsController");FpsController.attributes.add("fps",{type:"number",title:"FPS",default:60}),FpsController.prototype.initialize=function(){this.app.autoRender=!1,this.timer=0,this.frameTimeInterval=1/this.fps,this.previousFrameTime=pc.app._time},FpsController.prototype.update=function(e){var t=(pc.app._time-this.previousFrameTime)/1e3;this.previousFrameTime=pc.app._time,this.timer+=t,this.timer>this.frameTimeInterval&&(this.timer=0,this.app.renderNextFrame=!0)};var ShadowFollow=pc.createScript("shadowFollow");ShadowFollow.attributes.add("shadowCaster",{type:"entity",title:"Shadow Caster"}),ShadowFollow.prototype.initialize=function(){this.originalScale=this.entity.getLocalScale().clone()},ShadowFollow.prototype.postUpdate=function(t){var o=this.shadowCaster.getPosition();this.entity.setPosition(o.x,.01,o.z);var a=pc.math.lerp(1,.3,o.y/10),e=this.originalScale.clone();this.entity.setLocalScale(e.scale(a))};// poki.js
/* jshint esversion: 6 */

// Add

// to index.html

if(typeof(PokiSDK) !== "undefined") {
    if(pc.app.env == "DEBUG") {
        PokiSDK.setDebug(true);
    }

    var interstitialAd = () => {
        pc.app.systems.sound.volume = 0;
        PokiSDK.commercialBreak().then(
            () => {
                pc.app.fire("AD:InterstitialEnd");
                console.log('End of commercial break');
                pc.app.systems.sound.volume = 1;
            },
            (reason) => { pc.app.systems.sound.volume = 1; }
        );
    };

    var rewardedAd = () => {
        pc.app.systems.sound.volume = 0;
        PokiSDK.rewardedBreak().then(
            (withReward) => {
                console.log(`Should the user get a reward? ${withReward}`);

                if(withReward) {
                    pc.app.fire("AD:RewardUser");
                }

                pc.app.systems.sound.volume = 1;
            },
            (reason) => { pc.app.systems.sound.volume = 1; }
        );
    };

    var gameplayStart = () => {
        PokiSDK.gameplayStart();
    };

    var gameplayStop = () => {
        PokiSDK.gameplayStop();
    };

    var happyTime = () => {
        PokiSDK.happyTime(0.5);
    };

    pc.app.on("Gameplay:Start", gameplayStart);
    pc.app.on("Gameplay:Finish", gameplayStop);

    pc.app.on("AD:Interstitial", interstitialAd);
    pc.app.on("AD:RewardedAd", rewardedAd);

    pc.app.on("Challenges:Won", happyTime);
}

var TutorialController=pc.createScript("tutorialController");TutorialController.attributes.add("TutorialText",{title:"Tutorial Text",type:"entity"}),TutorialController.attributes.add("Background1",{title:"Background with button",type:"entity"}),TutorialController.attributes.add("Background2",{title:"Background no button",type:"entity"}),TutorialController.attributes.add("Finger",{title:"Finger",type:"entity"}),TutorialController.attributes.add("BoostImage",{title:"Boost Image",type:"entity"}),TutorialController.attributes.add("NextButton",{title:"Next Button",type:"entity"}),TutorialController.prototype.initialize=function(){this.on("enable",this.UpdateText,this),this.UpdateText()},TutorialController.prototype.UpdateText=function(){this.wait=!1,this.NextButton.enabled=!1,this.Time=0,this.TutorialText.enabled=!1,this.TutorialText.enabled=!0,this.TutorialTotal=Number(localStorage.getItem("Tricks:TutorialCounter")),this.TutorialTotal++,localStorage.setItem("Tricks:TutorialCounter",this.TutorialTotal),1==this.TutorialTotal?(window.mobileCheck()?this.TutorialText.element.text=String(pc.util.translation[pc.app.language].id21):this.TutorialText.element.text="Hold spacebar to move",window.mobileCheck()?this.Finger.enabled=!0:this.Finger.enabled=!1,this.BoostImage.enabled=!1,this.wait=!0):2==this.TutorialTotal?(window.mobileCheck()?this.TutorialText.element.text=String(pc.util.translation[pc.app.language].id22):this.TutorialText.element.text="Hold spacebar to flip",this.Background1.script.circularCutoutShader.setupUniforms(),window.mobileCheck()?this.Finger.enabled=!0:this.Finger.enabled=!1,this.BoostImage.enabled=!1,this.wait=!0):3==this.TutorialTotal?(this.TutorialText.element.text=String(pc.util.translation[pc.app.language].id2),this.Finger.enabled=!1,this.BoostImage.enabled=!0,this.Background2.enabled=!1,this.Background1.enabled=!1,this.wait=!0):4==this.TutorialTotal&&(this.TutorialText.element.text=String(pc.util.translation[pc.app.language].id23),this.Background2.enabled=!0,this.Background1.enabled=!1,this.BoostImage.enabled=!1)},TutorialController.prototype.update=function(t){this.Time+=.1,this.wait&&this.Time>6&&(this.NextButton.enabled=!0)};var TutorialBoostButton=pc.createScript("tutorialBoostButton");TutorialBoostButton.prototype.initialize=function(){this.originalTexture=this.entity.element.textureAsset,this.entity.element.on("mouseenter",this.onEnter,this),this.entity.element.on("mousedown",this.onPress,this),this.entity.element.on("mouseup",this.onRelease,this),this.entity.element.on("mouseleave",this.onLeave,this),this.entity.element.on("touchstart",this.onPress,this),this.entity.element.on("touchend",this.onRelease,this)},TutorialBoostButton.prototype.onPress=function(t){this.app.fire("UpgradeManager:Speed"),this.app.fire("UI:TutorialHide"),this.app.fire("Sound:Button")};var TutorialBarAnimation=pc.createScript("tutorialBarAnimation");TutorialBarAnimation.attributes.add("Bar2",{type:"entity",title:"Pos2"}),TutorialBarAnimation.prototype.initialize=function(){this.entity.tween(this.entity.getPosition()).to(this.Bar2.getPosition(),3,pc.SineOut).loop(!0).yoyo(!0).start()};var AnimatedFinger=pc.createScript("animatedFinger");AnimatedFinger.attributes.add("Image",{title:"Finger Image",type:"entity"}),AnimatedFinger.attributes.add("FingerUp",{type:"asset",title:"Finger up Image",assetType:"texture"}),AnimatedFinger.attributes.add("FingerDown",{type:"asset",title:"Finger down Image",assetType:"texture"}),AnimatedFinger.prototype.initialize=function(){this.timer=0,this.first=!1},AnimatedFinger.prototype.update=function(e){this.timer+=.1,this.timer>4&&(!0===this.first?(this.Image.element.texture=this.FingerUp.resource,this.first=!1):(this.Image.element.texture=this.FingerDown.resource,this.first=!0),this.timer=0)};var CircularCutoutShader=pc.createScript("circularCutoutShader");CircularCutoutShader.attributes.add("vs",{type:"asset",assetType:"shader",title:"Vertex Shader"}),CircularCutoutShader.attributes.add("fs",{type:"asset",assetType:"shader",title:"Fragment Shader"}),CircularCutoutShader.attributes.add("focusPosition",{type:"entity",title:"Focus Position"}),CircularCutoutShader.prototype.initialize=function(){this.SetupShader(),this.setupUniforms()},CircularCutoutShader.prototype.setupUniforms=function(){this.time=0;var t=[this.entity.element.color.r,this.entity.element.color.g,this.entity.element.color.b,this.entity.element.color.a];this.material.setParameter("uColor",t);var e=this.focusPosition.getPosition();this.material.setParameter("uWorldCoord",[e.x,e.y,e.z]),this.previousFrameTime=0,this.delayStartTime=.1,this.delayStart=!0,this.animationTime=.3,this.timeCounter=0,this.material.setParameter("uProgression",1)},CircularCutoutShader.prototype.update=function(t){var e=(pc.app._time-this.previousFrameTime)/1e3;if(this.previousFrameTime=pc.app._time,this.delayStart&&e<1)this.timeCounter>this.delayStartTime?(this.delayStart=!1,this.timeCounter=0):this.timeCounter+=e;else if(this.timeCounter<=this.animationTime&&e<1){var i=pc.math.lerp(1,0,this.timeCounter/this.animationTime);this.material.setParameter("uProgression",i),this.timeCounter+=e}else this.timeCounter>this.animationTime&&this.material.setParameter("uProgression",0);var r=this.focusPosition.getPosition();this.material.setParameter("uWorldCoord",[r.x,r.y,r.z]);var a=[this.app.graphicsDevice.width,this.app.graphicsDevice.height];this.material.setParameter("uResolution",a)},CircularCutoutShader.prototype.SetupShader=function(){var t=this.app.graphicsDevice,e=this.vs.resource,i="precision "+t.precision+" float;\n";i+=this.fs.resource;var r={attributes:{aPosition:pc.SEMANTIC_POSITION,aUv0:pc.SEMANTIC_TEXCOORD0},vshader:e,fshader:i};this.shader=new pc.Shader(t,r),this.material=new pc.Material,this.material.blendType=pc.BLEND_NORMAL,this.entity.element.material=this.material,this.material.shader=this.shader};// googleAnalytics.js
/* jshint esversion: 6 */

if(typeof(ga) !== 'undefined' || typeof(gtag) !== 'undefined') {
    var googleAnalytics = {
        sendEvent: function(options) {
            if(typeof(options.category) === 'undefined' || typeof(options.action) === 'undefined') return;

            var payload;

            if(typeof(gtag) != 'undefined') {
                payload = {
                    'event_category': options.category,
                };

                if(typeof(options.label) !== 'undefined') payload.event_label = options.label;
                if(typeof(options.value) !== 'undefined') payload.value = options.value;

                gtag('event', options.action, payload);
            }
            else {
                payload = {
                    hitType: 'event',
                    eventCategory: options.category,
                    eventAction: options.action,
                };

                if(typeof(options.label) !== 'undefined') payload.eventLabel = options.label;
                if(typeof(options.value) !== 'undefined') payload.eventValue = options.value;

                ga('send', payload);
            }

            if(pc.app.env == "DEBUG") {
                console.log('GA Event Log: ' + options.action);
                console.log(payload);
            }
        },

        riderUnlockEvent: function(name) { this.sendEvent({ category: 'User Action', action: 'Rider Unlock', label: name }); },
        bikeUnlockEvent: function(name) { this.sendEvent({ category: 'User Action', action: 'Bike Unlock', label: name }); },
        rvWatchedEvent: function(rv) { this.sendEvent({ category: 'User Action', action: 'RV Watched', label: rv }); },
        gameStartEvent: function() { this.sendEvent({ category: 'User Action', action: 'Game Start' }); },
        gameOverCoinsEvent: function(coins) { this.sendEvent({ category: 'Game Event', action: 'Game Over Coins', value: coins }); },
    };

    pc.app.on('event:riderUnlock', (x) => { googleAnalytics.riderUnlockEvent(x); });
    pc.app.on('event:bikeUnlock', (x) => { googleAnalytics.bikeUnlockEvent(x); });
    pc.app.on('event:rvWatched', (x) => { googleAnalytics.rvWatchedEvent(x); });
    pc.app.on('event:gameStart', () => { googleAnalytics.gameStartEvent(); });
    pc.app.on('event:gameOverCoins', (x) => { googleAnalytics.gameOverCoinsEvent(x); });
}

window.mobileCheck=function(){var i,a=!1;return i=navigator.userAgent||navigator.vendor||window.opera,(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(i)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(i.substr(0,4)))&&(a=!0),a};// keyboardEvent.js
/* jshint esversion: 6 */

var KeyboardEvent = pc.createScript('keyboardEvent');

KeyboardEvent.attributes.add ('EventName', {title: 'Event Name', type: 'string'});

// initialize code called once per entity
KeyboardEvent.prototype.initialize = function() {
    this.app.keyboard.on(pc.EVENT_KEYDOWN, this.onKeyDown, this);

    this.app.keyboard.on(pc.EVENT_KEYUP, this.onKeyUp, this);

    this.spaceKeyDown = false;

    this.on('disable', () => this.app.keyboard.off(pc.EVENT_KEYDOWN, this.onKeyDown, this), this);
    this.on('enable', () => this.app.keyboard.on(pc.EVENT_KEYDOWN, this.onKeyDown, this), this);
};

KeyboardEvent.prototype.onKeyDown = function (event) {
    if(this.spaceKeyDown) return;

    if(event.key === pc.KEY_SPACE) {
        this.spaceKeyDown = true;
        this.app.fire(this.EventName);
        event.event.preventDefault();
    }

    // When the space bar is pressed this scrolls the window.
    // Calling preventDefault() on the original browser event stops this.
    // event.event.preventDefault();
};

KeyboardEvent.prototype.onKeyUp = function (event) {
    if(event.key === pc.KEY_SPACE) {
        this.spaceKeyDown = false;
    }

};


var TextChange=pc.createScript("textChange");TextChange.attributes.add("Text",{title:"Text",type:"entity"}),TextChange.attributes.add("MobileID",{title:"Mobile ID",type:"string"}),TextChange.attributes.add("PCID",{title:"PC ID",type:"string"}),TextChange.prototype.initialize=function(){this.on("enable",this.UpdateText,this),this.UpdateText()},TextChange.prototype.UpdateText=function(){window.mobileCheck()?this.Text.element.text=String(pc.util.translation[pc.app.language][this.MobileID]):this.Text.element.text=String(pc.util.translation[pc.app.language][this.PCID])};var InterstitialAdManager=pc.createScript("interstitialAdManager");InterstitialAdManager.attributes.add("secondsToInterstitial",{title:"Gameplay Seconds To Interstitial",type:"number"}),InterstitialAdManager.prototype.initialize=function(){this.playing=!1,this.gameplaySeconds=0,this.app.on("Gameplay:Finish",this.gameStop,this),this.app.on("Gameplay:Start",this.gameStart,this),this.app.on("Gameplay:Reset",this.gameReset,this),this.app.on("AD:InterstitialEnd",this.timerReset,this)},InterstitialAdManager.prototype.update=function(t){this.playing&&(this.gameplaySeconds+=t)},InterstitialAdManager.prototype.gameStop=function(){this.playing=!1},InterstitialAdManager.prototype.gameStop=function(){this.playing=!0},InterstitialAdManager.prototype.gameReset=function(){"DEBUG"==pc.app.env&&console.log("ADS: Gameplay time "+this.gameplaySeconds),pc.app.fire("AD:Interstitial")},InterstitialAdManager.prototype.timerReset=function(){this.gameplaySeconds=0};var AdBlockCheck=pc.createScript("adBlockCheck");AdBlockCheck.attributes.add("AdEntity",{title:"Ad",type:"entity"}),AdBlockCheck.prototype.initialize=function(){this.app.adBlock&&(this.AdEntity.enabled=!1)};

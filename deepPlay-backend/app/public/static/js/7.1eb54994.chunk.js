(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{249:function(e,t,a){e.exports=a.p+"static/media/picture.a5124fb3.svg"},250:function(e,t,a){e.exports=a.p+"static/media/boy.efe01b90.svg"},269:function(e,t,a){"use strict";a.r(t);var n=a(19),l=a(33),r=a(51),o=a(50),c=a(52),i=a(0),s=a.n(i),m=a(16),u=a(263),p=a(257),d=a(245),h=a(246),f=a(258),b=a(267),E=a(261),g=a(227),v=a(124),N=a.n(v),y=a(229),O=a(7),C=a.n(O),D=a(11),x=a(113),I=a(270),j=a(252),w=a(253),k=a(266),S=a(251),T=a(108),P=function(e){function t(e){var a;return Object(n.a)(this,t),(a=Object(r.a)(this,Object(o.a)(t).call(this,e))).onSelectFile=function(){var e=Object(D.a)(C.a.mark(function e(t,n){var l;return C.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:l=0;case 1:if(!(l<t.length)){e.next=9;break}if(!(t[l].size>1e7)){e.next=6;break}return e.next=5,Object(T.a)({text:"",title:"Maximum allowed size for image is 10mb",showCancelButton:!1,confirmButtonText:"Ok"});case 5:return e.abrupt("return");case 6:l++,e.next=1;break;case 9:t.map(function(){var e=Object(D.a)(C.a.mark(function e(t,n){var l,r;return C.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return l=new FileReader,r=Object(x.a)(a),t.type,e.next=5,l.addEventListener("load",function(){var e=Object(D.a)(C.a.mark(function e(t){var a;return C.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:(a=new Image).src=t.target.result,a.onload=Object(D.a)(C.a.mark(function e(){var t,a;return C.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t=l.result,"",a=t,r.setState({imageData:a});case 4:case"end":return e.stop()}},e)}));case 3:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}());case 5:return e.next=7,l.readAsDataURL(t);case 7:case"end":return e.stop()}},e)}));return function(t,a){return e.apply(this,arguments)}}());case 10:case"end":return e.stop()}},e)}));return function(t,a){return e.apply(this,arguments)}}(),a.handleCancel=function(){a.setState({imageData:""}),a.props.handleOpen()},a.state={imageData:""},a}return Object(c.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this;return s.a.createElement("div",{className:"modal-text-center"},s.a.createElement(I.a,{className:"modal-dialog-centered",size:"lg",isOpen:this.props.modal,toggle:this.props.handleOpen,backdrop:"static"},s.a.createElement(j.a,null,s.a.createElement("h4",null,"Upload profile image"),s.a.createElement("button",{"aria-label":"Close",className:"close","data-dismiss":"modal",type:"button",onClick:this.props.handleOpen},s.a.createElement("span",{"aria-hidden":!0},"\xd7"))),s.a.createElement(w.a,{className:"modal-text-center"},this.state.imageData?s.a.createElement("img",{alt:"...",src:this.state.imageData,width:"350px",height:"250px"}):s.a.createElement(s.a.Fragment,null,s.a.createElement("img",{alt:"...",src:a(249),width:"50px",height:"50px"}),s.a.createElement(S.a,{onDrop:this.onSelectFile,accept:"image/*",multiple:!0},function(e){var t=e.getRootProps,a=e.getInputProps;return s.a.createElement("div",t(),s.a.createElement("input",a()),s.a.createElement("div",{className:"add-more-img-wrap"},s.a.createElement("div",{className:"add-more-text"},s.a.createElement("h3",null,"Drag a profile photo here "),s.a.createElement("br",null),s.a.createElement(u.a,{color:"default",type:"button",size:"sm",className:"btn-btn-right"},"Select a photo from your computer"))))}))),s.a.createElement(k.a,null,s.a.createElement(u.a,{color:"primary",onClick:function(){return e.props.handleImage(e.state.imageData)}},"Set profile picture")," ",s.a.createElement(u.a,{color:"secondary",onClick:this.handleCancel},"Cancel"))))}}]),t}(i.Component),R=function(e){function t(e){var a;return Object(n.a)(this,t),(a=Object(r.a)(this,Object(o.a)(t).call(this,e))).onHandleEdit=function(){a.setState({isDisabled:!a.state.isDisabled})},a.handleChange=function(e){var t=e.target,n=t.name,l=t.value;a.setState(Object(m.a)({},n,l)),"teacher"===n||"student"===n?a.setState({roleType:n}):a.setState({roleType:"unClassified"})},a.onSaveData=function(){var e=a.state,t={firstName:e.firstName,lastName:e.lastName,roleType:e.roleType},n=Object(g.b)(t,y.c,y.d),l=n.isValid,r=n.errors;l?(a.props.handleData(t),a.setState({isDisabled:!a.state.isDisabled})):a.setState({errors:r,isLoading:!1})},a.handleDelete=function(){N.a.fire({title:"Are you sure?",text:"You want to delete this account permanently!",type:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, delete it!"}).then(function(e){e.value&&a.props.onDelete()})},a.handleOpen=function(){a.setState({modal:!a.state.modal})},a.handleImage=function(e){a.props.uploadImage(e)},a.state={isDisabled:!0,firstName:"",lastName:"",profileImage:"",roleType:!1,imgError:"",file:"",modal:!1,errors:{}},a}return Object(c.a)(t,e),Object(l.a)(t,[{key:"componentDidUpdate",value:function(e){if(e.profileInfoReducer!==this.props.profileInfoReducer){var t=this.props.profileInfoReducer,a=t.firstName,n=t.lastName,l=t.profileImage,r=t.roleType;this.setState({firstName:a,lastName:n,file:l,roleType:r})}e.profileImageThumb!==this.props.profileImageThumb&&this.setState({file:this.props.profileImageThumb,modal:!1})}},{key:"render",value:function(){var e=this.props.profileInfoReducer,t=this.state,n=t.isDisabled,l=t.firstName,r=t.lastName,o=t.roleType,c=t.file,i=t.errors,m=t.imgError;return console.log("file",this.state.file),s.a.createElement("div",{className:"col-md-12 col-sm-12"},s.a.createElement("h1",null,"Settings"),s.a.createElement("div",{className:"dashboard-right-profile"},s.a.createElement("h6",null,"PROFILE "),s.a.createElement(u.a,{color:"default",outline:!0,type:"button",size:"sm",className:"btn-btn-right",onClick:this.onHandleEdit},"Edit Profile")),s.a.createElement("div",{className:"user-profile"},s.a.createElement("div",{className:"profileAvtar"},c?s.a.createElement("img",{alt:"...",src:this.state.file}):s.a.createElement("img",{alt:"...",src:a(250)}),n?"":s.a.createElement("span",{className:"changeProfile",onClick:this.handleOpen},"Change Profile")),m?s.a.createElement("div",{className:"text-danger"}," ",m," "):null),s.a.createElement("div",{className:"settingForm"},s.a.createElement(p.a,null,s.a.createElement(d.a,{className:"m-0"},s.a.createElement(h.a,{md:"6"},s.a.createElement(f.a,null,s.a.createElement(b.a,{for:"firstName"},"First Name"),s.a.createElement(E.a,{id:"exampleFormControlInput1",className:"capitalize",placeholder:"firstName",type:"text",name:"firstName",disabled:n,onChange:this.handleChange,value:l}),i.firstName&&!l?s.a.createElement("p",{style:{color:"red"}}," ",i.firstName," "):null)),s.a.createElement(h.a,{md:"6"},s.a.createElement(f.a,null,s.a.createElement(b.a,{for:"lastName"},"Last Name"),s.a.createElement(E.a,{id:"exampleFormControlInput1",className:"capitalize",placeholder:"lastName",type:"text",name:"lastName",disabled:n,onChange:this.handleChange,value:r}),i.lastName&&!r?s.a.createElement("p",{style:{color:"red"}}," ",i.lastName," "):null))),s.a.createElement(d.a,null,s.a.createElement(h.a,{md:"6"},s.a.createElement(f.a,null,s.a.createElement(b.a,{for:"email"},"Email"),s.a.createElement(E.a,{id:"exampleFormControlInput1",placeholder:"name@example.com",type:"email",value:e?e.email:""})))))),s.a.createElement("div",{className:"setting-account-type"},s.a.createElement("h6",null,"ACCOUNT TYPE")),s.a.createElement("h4",null,s.a.createElement("b",null,"Teacher or Student account ")),s.a.createElement("div",{className:"custom-control custom-radio mb-3 control"},s.a.createElement("input",{className:"custom-control-input",id:"customRadio5",name:"teacher",disabled:n,onChange:this.handleChange,checked:"teacher"===o,type:"radio"}),s.a.createElement("label",{className:"custom-control-label",htmlFor:"customRadio5"},"Teacher")),s.a.createElement("div",{className:"custom-control custom-radio mb-3 control "},s.a.createElement("input",{className:"custom-control-input",id:"customRadio6",name:"student",disabled:n,onChange:this.handleChange,checked:"student"===o,type:"radio",value:""}),s.a.createElement("label",{className:"custom-control-label",htmlFor:"customRadio6"},"Student")),s.a.createElement(u.a,{color:"default",type:"button",className:"btn-btn-save",onClick:this.onSaveData},"Save"),s.a.createElement("div",{className:"setting-account-type"},s.a.createElement("h6",null,"DELETE ACCOUNT")),s.a.createElement("h4",null,s.a.createElement("b",null,"Permanently delete this account "),s.a.createElement("p",null,"Be careful- this will delete your data and cannot be undone.")),s.a.createElement(u.a,{color:"danger",type:"button",className:"btn-btn-save",onClick:this.handleDelete},"Delete Account"),s.a.createElement(P,{handleImage:this.handleImage,handleOpen:this.handleOpen,modal:this.state.modal}))}}]),t}(i.Component),F=a(5),A=a(75),z=function(e){function t(){var e,a;Object(n.a)(this,t);for(var l=arguments.length,c=new Array(l),i=0;i<l;i++)c[i]=arguments[i];return(a=Object(r.a)(this,(e=Object(o.a)(t)).call.apply(e,[this].concat(c)))).componentDidMount=function(){a.props.getProfile()},a.handleData=function(e){console.log("data",e),a.props.updateProfile(e)},a.onDelete=function(){a.props.onDeleteUserAccount()},a}return Object(c.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this;return s.a.createElement(s.a.Fragment,null,s.a.createElement(R,{profileInfoReducer:this.props.userData,handleData:this.handleData,onDelete:this.onDelete,profileImageThumb:this.props.profileImage,uploadImage:function(t){return e.props.uploadProfileImage({imageData:t})}}))}}]),t}(s.a.Component);t.default=Object(A.b)(function(e){return{userData:e.profileInfoReducer.profileInfo,profileImage:e.profileImage.profileImage.profileThumbnail}},function(e){return{getProfile:function(){e(Object(F.j)())},updateProfile:function(t){e(Object(F.q)(t))},onDeleteUserAccount:function(){e(Object(F.b)())},uploadProfileImage:function(t){e(Object(F.r)(t))}}})(z)}}]);
//# sourceMappingURL=7.1eb54994.chunk.js.map
(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{386:function(e,t,a){"use strict";var r=a(1),n=a.n(r),s=a(463);t.a=function(e){return n.a.createElement("div",{className:"no-data-found"},e.noResult?n.a.createElement(n.a.Fragment,null,n.a.createElement("div",null,n.a.createElement("i",{className:"icons icon-magnifier"})),n.a.createElement("h5",null,e.message||"No records available"),n.a.createElement("ul",{className:"no-found-list"},n.a.createElement("li",null,"Try to simplify your search"),n.a.createElement("li",null,"Use different keywords"),n.a.createElement("li",null,"Make sure words are spelled correctly"))):n.a.createElement("div",null,n.a.createElement("div",null,n.a.createElement("i",{className:"icons cui-ban"})),n.a.createElement("h5",null,e.message||"No records available"),e.showAddButton||void 0===typeof e.showAddButton?n.a.createElement("p",null,"Please click below button to add new."):null,n.a.createElement("div",{className:"pt-3"},e.showAddButton||void 0===typeof e.showAddButton?n.a.createElement(s.a,{className:"btn-theme-line",onClick:e.onAddClick},n.a.createElement("i",{className:"fa fa-plus"})," Add New"):null)))}},570:function(e,t){},787:function(e,t,a){"use strict";a.r(t);var r=a(34),n=a(69),s=a(97),c=a(70),l=a(96),o=a(1),u=a.n(o),i=a(775),d=a(776),p=a(457),h=a(458),f=a(387),m=a(99),D=(a(436),a(0)),b=a(545),E=a(358),R=a(608),y=a(780),g=a(378),v=a(166);function w(e){return function(){var t,a=Object(c.a)(e);if(function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}()){var r=Object(c.a)(this).constructor;t=Reflect.construct(a,arguments,r)}else t=a.apply(this,arguments);return Object(s.a)(this,t)}}var O=function(e){Object(l.a)(a,e);var t=w(a);function a(){return Object(r.a)(this,a),t.apply(this,arguments)}return Object(n.a)(a,[{key:"render",value:function(){var e=this.props.usersReducer,t=e.totalUsers,a=e.users;return u.a.createElement(p.a,null,u.a.createElement(R.a,null,u.a.createElement("div",{className:"font-weight-bold"},"Users Details")),u.a.createElement(h.a,null,u.a.createElement(y.a,{responsive:!0,borderless:!0},e&&a?u.a.createElement("tbody",null,u.a.createElement("tr",null,u.a.createElement("td",{width:"250px"},"Total Active Users"),u.a.createElement("td",{style:{maxWidth:"200px"},className:"font-weight-bold"},u.a.createElement("span",{className:"mr-2"},":"),u.a.createElement(b.a,{to:"".concat(v.a.USERS.url,"?page=1&status=1")},a?a.filter(function(e){return!0===e.status}).length:0))),u.a.createElement("tr",null,u.a.createElement("td",{width:"250px"},"Total Inactive Users"),u.a.createElement("td",{style:{maxWidth:"200px"},className:"font-weight-bold"},u.a.createElement("span",{className:"mr-2"},":"),u.a.createElement(b.a,{to:"".concat(v.a.USERS.url,"?page=1&status=0")},a?a.filter(function(e){return!1===e.status}).length:0))),u.a.createElement("tr",null,u.a.createElement("td",{width:"250px"},"Total Users"),u.a.createElement("td",{style:{maxWidth:"200px"},className:"font-weight-bold"},u.a.createElement("span",{className:"mr-2"},":"),u.a.createElement(b.a,{to:"".concat(v.a.USERS.url)},t||0)))):null),e.isLoading?u.a.createElement(g.a,null):null))}}]),a}(o.Component),j=Object(E.a)(O);function N(e){return function(){var t,a=Object(c.a)(e);if(function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}()){var r=Object(c.a)(this).constructor;t=Reflect.construct(a,arguments,r)}else t=a.apply(this,arguments);return Object(s.a)(this,t)}}var x=function(e){Object(l.a)(a,e);var t=N(a);function a(){return Object(r.a)(this,a),t.apply(this,arguments)}return Object(n.a)(a,[{key:"render",value:function(){var e=this.props.setsReducer,t=e.totalSets,a=e.sets;return u.a.createElement(p.a,null,u.a.createElement(R.a,null,u.a.createElement("div",{className:"font-weight-bold"},"Sets Details")),u.a.createElement(h.a,null,u.a.createElement(y.a,{responsive:!0,borderless:!0},e&&a?u.a.createElement("tbody",null,u.a.createElement("tr",null,u.a.createElement("td",{width:"250px"},"Total Active Sets"),u.a.createElement("td",{style:{maxWidth:"200px"},className:"font-weight-bold"},u.a.createElement("span",{className:"mr-2"},":"),u.a.createElement(b.a,{to:"".concat(v.a.SETS.url,"?page=1&status=1")},a?a.filter(function(e){return!0===e.status}).length:0))),u.a.createElement("tr",null,u.a.createElement("td",{width:"250px"},"Total Inactive Sets"),u.a.createElement("td",{style:{maxWidth:"200px"},className:"font-weight-bold"},u.a.createElement("span",{className:"mr-2"},":"),u.a.createElement(b.a,{to:"".concat(v.a.SETS.url,"?page=1&status=0")},a?a.filter(function(e){return!1===e.status}).length:0))),u.a.createElement("tr",null,u.a.createElement("td",{width:"250px"},"Total Sets"),u.a.createElement("td",{style:{maxWidth:"200px"},className:"font-weight-bold"},u.a.createElement("span",{className:"mr-2"},":"),u.a.createElement(b.a,{to:"".concat(v.a.SETS.url)},t||0)))):null),e.isLoading?u.a.createElement(g.a,null):null))}}]),a}(o.Component),S=Object(E.a)(x);function T(e){return function(){var t,a=Object(c.a)(e);if(function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}()){var r=Object(c.a)(this).constructor;t=Reflect.construct(a,arguments,r)}else t=a.apply(this,arguments);return Object(s.a)(this,t)}}var C=function(e){Object(l.a)(a,e);var t=T(a);function a(){return Object(r.a)(this,a),t.apply(this,arguments)}return Object(n.a)(a,[{key:"render",value:function(){var e=this.props.foldersReducer,t=e.totalFolders,a=e.folders;return u.a.createElement(p.a,null,u.a.createElement(R.a,null,u.a.createElement("div",{className:"font-weight-bold"},"Folders Details")),u.a.createElement(h.a,null,u.a.createElement(y.a,{responsive:!0,borderless:!0},e&&a?u.a.createElement("tbody",null,u.a.createElement("tr",null,u.a.createElement("td",{width:"250px"},"Total Active Folders"),u.a.createElement("td",{style:{maxWidth:"200px"},className:"font-weight-bold"},u.a.createElement("span",{className:"mr-2"},":"),u.a.createElement(b.a,{to:"".concat(v.a.FOLDERS.url,"?page=1&status=1")},a?a.filter(function(e){return!0===e.status}).length:0))),u.a.createElement("tr",null,u.a.createElement("td",{width:"250px"},"Total Inactive Folders"),u.a.createElement("td",{style:{maxWidth:"200px"},className:"font-weight-bold"},u.a.createElement("span",{className:"mr-2"},":"),u.a.createElement(b.a,{to:"".concat(v.a.FOLDERS.url,"?page=1&status=0")},a?a.filter(function(e){return!1===e.status}).length:0))),u.a.createElement("tr",null,u.a.createElement("td",{width:"250px"},"Total Folders"),u.a.createElement("td",{style:{maxWidth:"200px"},className:"font-weight-bold"},u.a.createElement("span",{className:"mr-2"},":"),u.a.createElement(b.a,{to:"".concat(v.a.FOLDERS.url)},t||0)))):null),e.isLoading?u.a.createElement(g.a,null):null))}}]),a}(o.Component),U=Object(E.a)(C),k=a(609),A=a(50),I=a(480),_=a(363),M=a.n(_),F=(a(702),a(497)),P=(a(538),a(386));function Y(e){return function(){var t,a=Object(c.a)(e);if(function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}()){var r=Object(c.a)(this).constructor;t=Reflect.construct(a,arguments,r)}else t=a.apply(this,arguments);return Object(s.a)(this,t)}}var q=function(e){Object(l.a)(a,e);var t=Y(a);function a(e){var n;return Object(r.a)(this,a),(n=t.call(this,e)).onDatesChange=function(e){n.props.registeredUserNo({startDate:n.state.startDate?new Date(n.state.startDate):new Date,endDate:n.state.endDate?new Date(n.state.endDate):new Date});var t=n.state.startDate?new Date(n.state.startDate):new Date,a=n.state.endDate?new Date(n.state.endDate):new Date,r=Math.abs(a.getTime()-t.getTime()),s=Math.ceil(r/864e5);n.setState({dayDiff:s||0});for(var c=M.a.twix(new Date(n.state.startDate),new Date(n.state.endDate)).iterate("days"),l=[];c.hasNext();)l.push({day:c.next().format(),count:0});n.setState({Dates:l})},n.state={data:{},startDate:M()().subtract(30,"d"),endDate:M()(),focusedInput:null,dayDiff:0,openDatePicker:!1,Dates:[]},n}return Object(n.a)(a,[{key:"componentDidMount",value:function(){this.onDatesChange()}},{key:"componentDidUpdate",value:function(e){var t=e.DashboardReducer;if(this.props.DashboardReducer&&this.props.DashboardReducer!==t&&this.props.DashboardReducer&&this.props.DashboardReducer.userData&&this.props.DashboardReducer.userData!==t.userData&&this.props.DashboardReducer.userData.length){for(var a=this.props.DashboardReducer.userData.sort(function(e,t){return Object(k.a)(Date,Object(A.a)(e.day.split("/").reverse()))-Object(k.a)(Date,Object(A.a)(t.day.split("/").reverse()))}),r=[],n={},s=0;s<this.state.Dates.length;s++){for(var c=0;c<a.length;c++)M()(this.state.Dates[s].day).format("DD-MM-YYYY")===M()(a[c].day).format("DD-MM-YYYY")&&(n=a[c]);n&&n.day&&n.count?r.push(n):r.push(this.state.Dates[s]),n={}}for(var l=parseInt(this.state.Dates.length/7)>=1?1===parseInt(this.state.Dates.length/7)?2:parseInt(this.state.Dates.length/7):1,o=0,u=[],i=0;i<r.length;i+=l){for(var d=i;d<i+l;d++)o+=r[d]&&r[d].count?r[d].count:0;u.push({day:r[i].day,count:o}),o=0}this.setState({data:{labels:this.props.DashboardReducer.userData&&a&&r&&u?u.map(function(e){return M()(e.day).format("DD-MM-YYYY")}):null,datasets:[{label:"No. of Registered User",backgroundColor:"#000",borderColor:"#000",borderWidth:1,hoverBackgroundColor:"#000",hoverBorderColor:"#000",data:this.props.DashboardReducer.userData&&a&&r&&u?u.map(function(e){return e.count}):null}]}})}}},{key:"render",value:function(){var e=this,t=this.state.data,a=this.props.DashboardReducer.isLoadingUser;return u.a.createElement(p.a,null,u.a.createElement(R.a,null,u.a.createElement("div",{className:"d-flex justify-content-between w-100"},u.a.createElement("div",{className:"mt-3 font-weight-bold"},"Registered User"),u.a.createElement("div",null,u.a.createElement(F.DateRangePicker,{startDate:this.state.startDate,startDateId:"your_unique_start_date_id",endDate:this.state.endDate,endDateId:"your_unique_end_date_id",onDatesChange:function(t){var a=t.startDate,r=t.endDate;return e.setState({startDate:a,endDate:r},function(){e.onDatesChange()})},focusedInput:this.state.focusedInput,onFocusChange:function(t){return e.setState({focusedInput:t})},isOutsideRange:function(){return!1},numberOfMonths:1,hideKeyboardShortcutsPanel:!0})))),u.a.createElement(h.a,{className:"graph_height"},this.props.DashboardReducer&&this.props.DashboardReducer.userData&&this.props.DashboardReducer.userData.length?u.a.createElement(I.a,{data:t,height:250,options:{responsive:!0,maintainAspectRatio:!1,layout:{padding:{left:0,right:0,top:0,bottom:0}},scales:{xAxes:[{barThickness:30,minBarLength:2,ticks:{fontSize:15,fontStyle:"bold",interval:7}}],yAxes:[{ticks:{beginAtZero:!0,min:0,stepSize:1,fontStyle:"bold"},stacked:!0}]}}}):u.a.createElement("div",{className:"text-center"},u.a.createElement(P.a,{message:"Currently there are no registered users found between this dates."})),a?u.a.createElement(g.a,null):null))}}]),a}(o.Component),L=Object(E.a)(q);function W(e){return function(){var t,a=Object(c.a)(e);if(function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}()){var r=Object(c.a)(this).constructor;t=Reflect.construct(a,arguments,r)}else t=a.apply(this,arguments);return Object(s.a)(this,t)}}var B=function(e){Object(l.a)(a,e);var t=W(a);function a(e){var n;return Object(r.a)(this,a),(n=t.call(this,e)).onDatesChangeRoleTypeUser=function(e){n.props.getRoleTypeUserNo({startDate:n.state.startDate?new Date(n.state.startDate):new Date,endDate:n.state.endDate?new Date(n.state.endDate):new Date})},n.state={data:{},startDate:M()().subtract(30,"d"),endDate:M()(),focusedInput:null},n}return Object(n.a)(a,[{key:"componentDidMount",value:function(){this.onDatesChangeRoleTypeUser()}},{key:"componentDidUpdate",value:function(e){var t=e.DashboardReducer;this.props.DashboardReducer&&this.props.DashboardReducer!==t&&this.props.DashboardReducer&&this.props.DashboardReducer.userRoleTypeData&&this.props.DashboardReducer.userRoleTypeData!==t.userRoleTypeData&&this.props.DashboardReducer.userRoleTypeData.length&&this.setState({data:{labels:this.props.DashboardReducer.userRoleTypeData?this.props.DashboardReducer.userRoleTypeData.map(function(e){return e.roleType}):null,datasets:[{data:this.props.DashboardReducer.userRoleTypeData?this.props.DashboardReducer.userRoleTypeData.map(function(e){return e.totalCount}):null,backgroundColor:["#000","#2f353a","#615b5b5f","#415b5b54"],hoverBackgroundColor:["#000","#2f353a","#615b5b5f","#415b5b54"]}]}})}},{key:"render",value:function(){var e=this,t=this.state.data,a=this.props.DashboardReducer.isLoadingUserRoleType;return u.a.createElement(p.a,null,u.a.createElement(R.a,null,u.a.createElement("div",{className:"d-flex justify-content-between w-100"},u.a.createElement("div",{className:"mt-3 font-weight-bold"},"User RoleType"),u.a.createElement("div",null,u.a.createElement(F.DateRangePicker,{startDate:this.state.startDate,startDateId:"your_unique_start_date_id1",endDate:this.state.endDate,endDateId:"your_unique_end_date_id1",onDatesChange:function(t){var a=t.startDate,r=t.endDate;return e.setState({startDate:a,endDate:r},function(){e.onDatesChangeRoleTypeUser()})},focusedInput:this.state.focusedInput,onFocusChange:function(t){return e.setState({focusedInput:t})},isOutsideRange:function(){return!1},numberOfMonths:1,hideKeyboardShortcutsPanel:!0})))),u.a.createElement(h.a,{className:"graph_height"},this.props.DashboardReducer&&this.props.DashboardReducer.userRoleTypeData&&this.props.DashboardReducer.userRoleTypeData.length?u.a.createElement(I.b,{data:t,height:250,options:{responsive:!0,maintainAspectRatio:!1}}):u.a.createElement("div",{className:"text-center"},u.a.createElement(P.a,{message:"Currently there are no users found between this dates."})),a?u.a.createElement(g.a,null):null))}}]),a}(o.Component),K=Object(E.a)(B);function z(e){return function(){var t,a=Object(c.a)(e);if(function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}()){var r=Object(c.a)(this).constructor;t=Reflect.construct(a,arguments,r)}else t=a.apply(this,arguments);return Object(s.a)(this,t)}}var J=function(e){Object(l.a)(a,e);var t=z(a);function a(){var e;Object(r.a)(this,a);for(var n=arguments.length,s=new Array(n),c=0;c<n;c++)s[c]=arguments[c];return(e=t.call.apply(t,[this].concat(s))).onDatesChangeRoleTypeUser=function(t){e.props.getRoleTypeUserNoReq(t)},e.onDatesChange=function(t){e.props.registeredUserNo(t)},e}return Object(n.a)(a,[{key:"componentDidMount",value:function(){this.props.getUsersList({page:1,limit:500}),this.props.getAllSetRequest({page:1,limit:500}),this.props.getAllFolderRequest({page:1,limit:500})}},{key:"render",value:function(){var e=this.props,t=e.DashboardReducer,a=e.usersReducer,r=e.setsReducer,n=e.foldersReducer;return u.a.createElement("div",{className:"animated fadeIn"},u.a.createElement(f.Helmet,null,u.a.createElement("title",null,"Superadmin/Dashboard")),u.a.createElement(i.a,null,u.a.createElement(d.a,{xs:"12",sm:"12",lg:"12",md:"12"},u.a.createElement(p.a,{className:"white-card card_align"},u.a.createElement(h.a,{className:"custom-card-body position-relative"},u.a.createElement(i.a,null,u.a.createElement(d.a,{lg:"4"},u.a.createElement(j,{usersReducer:a})),u.a.createElement(d.a,{lg:"4"},u.a.createElement(S,{setsReducer:r})),u.a.createElement(d.a,{lg:"4"},u.a.createElement(U,{foldersReducer:n}))),u.a.createElement(i.a,null,u.a.createElement(d.a,{lg:"6"},u.a.createElement(L,{DashboardReducer:t,registeredUserNo:this.onDatesChange})),u.a.createElement(d.a,{lg:"6"},u.a.createElement(K,{DashboardReducer:t,getRoleTypeUserNo:this.onDatesChangeRoleTypeUser}))))))))}}]),a}(o.Component);t.default=Object(m.b)(function(e){return{DashboardReducer:e.DashboardReducer,usersReducer:e.usersReducer,setsReducer:e.setsReducer,foldersReducer:e.foldersReducer}},function(e){return{registeredUserNo:function(t){e(Object(D.K)(t))},getUsersList:function(t){e(Object(D.q)(t))},getAllSetRequest:function(t){e(Object(D.m)(t))},getAllFolderRequest:function(t){e(Object(D.j)(t))},getRoleTypeUserNoReq:function(t){e(Object(D.o)(t))}}})(J)}}]);
//# sourceMappingURL=16.118dcd47.chunk.js.map
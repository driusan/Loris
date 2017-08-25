!function(modules){function __webpack_require__(moduleId){if(installedModules[moduleId])return installedModules[moduleId].exports;var module=installedModules[moduleId]={exports:{},id:moduleId,loaded:!1};return modules[moduleId].call(module.exports,module,module.exports,__webpack_require__),module.loaded=!0,module.exports}var installedModules={};return __webpack_require__.m=modules,__webpack_require__.c=installedModules,__webpack_require__.p="",__webpack_require__(0)}([function(module,exports,__webpack_require__){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(self,call){if(!self)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!call||"object"!=typeof call&&"function"!=typeof call?self:call}function _inherits(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:!1,writable:!0,configurable:!0}}),superClass&&(Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass)}var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),_AccessProfilePanel=__webpack_require__(1),_AccessProfilePanel2=_interopRequireDefault(_AccessProfilePanel),_CandidateListFilter=__webpack_require__(3),_CandidateListFilter2=_interopRequireDefault(_CandidateListFilter),CandidateListPage=function(_React$Component){function CandidateListPage(props){_classCallCheck(this,CandidateListPage);var _this=_possibleConstructorReturn(this,(CandidateListPage.__proto__||Object.getPrototypeOf(CandidateListPage)).call(this,props));return _this.state={filters:{}},_this.updateFilter=_this.updateFilter.bind(_this),_this}return _inherits(CandidateListPage,_React$Component),_createClass(CandidateListPage,[{key:"updateFilter",value:function(filter){var f={};for(var filt in filter)filter.hasOwnProperty(filt)&&(f[this.toCamelCase(filt)]=filter[filt]);this.setState({filters:f})}},{key:"toCamelCase",value:function(str){return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g,function(match,index){return 0===Number(match)?"":0===index?match.toLowerCase():match.toUpperCase()})}},{key:"render",value:function(){return React.createElement("div",null,React.createElement("div",{className:"row"},React.createElement(_AccessProfilePanel2.default,null),","),React.createElement("div",{className:"row"},React.createElement("div",{className:"col-sm-9"},React.createElement(_CandidateListFilter2.default,{onFilterUpdated:this.updateFilter}),",")),React.createElement(DynamicDataTable,{DataURL:loris.BaseURL+"/candidate_list/?format=json",getFormattedCell:formatColumn,Filter:this.state.filters,freezeColumn:"PSCID"}))}}]),CandidateListPage}(React.Component);$(function(){ReactDOM.render(React.createElement(CandidateListPage,null),document.getElementById("lorisworkspace"))})},function(module,exports,__webpack_require__){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(self,call){if(!self)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!call||"object"!=typeof call&&"function"!=typeof call?self:call}function _inherits(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:!1,writable:!0,configurable:!0}}),superClass&&(Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass)}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),_Panel=__webpack_require__(2),_Panel2=_interopRequireDefault(_Panel),AccessProfilePanel=function(_React$Component){function AccessProfilePanel(props){_classCallCheck(this,AccessProfilePanel);var _this=_possibleConstructorReturn(this,(AccessProfilePanel.__proto__||Object.getPrototypeOf(AccessProfilePanel)).call(this,props));return loris.hiddenHeaders=["Visits"],_this.state={error:{message:"",className:"alert alert-danger text-center"},PSCID:"",CandID:""},_this.updateFormElement=_this.updateFormElement.bind(_this),_this.validateAndSubmit=_this.validateAndSubmit.bind(_this),_this}return _inherits(AccessProfilePanel,_React$Component),_createClass(AccessProfilePanel,[{key:"updateFormElement",value:function(formElement,value){var state=this.state;state[formElement]=value,this.setState(state)}},{key:"validateAndSubmit",value:function(){var state=this.state;return""===this.state.CandID?(state.error={message:"You must enter a DCCID!",className:"alert alert-danger text-center"},void this.setState(state)):""===this.state.PSCID?(state.error={message:"You must enter a PSCID!",className:"alert alert-danger text-center"},void this.setState(state)):(state.error={message:"Validating...",className:"alert alert-info text-center"},this.setState(state),void $.get(loris.BaseURL+"/candidate_list/ajax/validateProfileIDs.php",{CandID:state.CandID,PSCID:state.PSCID},function(data){"1"===data?(state.error={message:"Opening profile...",className:"alert alert-info text-center"},window.location.href=loris.BaseURL+"/"+state.CandID):state.error={message:"DCCID or PSCID is not valid",className:"alert alert-danger text-center"},this.setState(state)}.bind(this)))}},{key:"render",value:function(){var warning;return loris.userHasPermission("access_all_profiles")?React.createElement("div",null):(""!==this.state.error.message&&(warning=React.createElement("div",{className:this.state.error.className},this.state.error.message)),React.createElement("div",{className:"col-sm-3"},React.createElement(_Panel2.default,{title:"Open Profile"},React.createElement(FormElement,{name:"openprofile",onSubmit:this.validateAndSubmit,onUserInput:this.validateAndSubmit},React.createElement(TextboxElement,{name:"CandID",label:"CandID",value:this.state.CandID,onUserInput:this.updateFormElement}),React.createElement(TextboxElement,{name:"PSCID",label:"PSCID",value:this.state.PSCID,onUserInput:this.updateFormElement}),warning,React.createElement(ButtonElement,{name:"Open Profile",label:"Open Profile",onUserInput:this.validateAndSubmit})))))}}]),AccessProfilePanel}(React.Component);exports.default=AccessProfilePanel},function(module,exports){"use strict";function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(self,call){if(!self)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!call||"object"!=typeof call&&"function"!=typeof call?self:call}function _inherits(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:!1,writable:!0,configurable:!0}}),superClass&&(Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass)}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),Panel=function(_React$Component){function Panel(props){_classCallCheck(this,Panel);var _this=_possibleConstructorReturn(this,(Panel.__proto__||Object.getPrototypeOf(Panel)).call(this,props));return _this.state={collapsed:_this.props.initCollapsed},_this.panelClass=_this.props.initCollapsed?"panel-collapse collapse":"panel-collapse collapse in",_this.toggleCollapsed=_this.toggleCollapsed.bind(_this),_this}return _inherits(Panel,_React$Component),_createClass(Panel,[{key:"toggleCollapsed",value:function(){this.setState({collapsed:!this.state.collapsed})}},{key:"render",value:function(){var glyphClass=this.state.collapsed?"glyphicon pull-right glyphicon-chevron-down":"glyphicon pull-right glyphicon-chevron-up",panelHeading=this.props.title?React.createElement("div",{className:"panel-heading",onClick:this.toggleCollapsed,"data-toggle":"collapse","data-target":"#"+this.props.id,style:{cursor:"pointer"}},this.props.title,React.createElement("span",{className:glyphClass})):"";return React.createElement("div",{className:"panel panel-primary"},panelHeading,React.createElement("div",{id:this.props.id,className:this.panelClass,role:"tabpanel"},React.createElement("div",{className:"panel-body",style:{height:this.props.height}},this.props.children)))}}]),Panel}(React.Component);Panel.propTypes={id:React.PropTypes.string,height:React.PropTypes.string,title:React.PropTypes.string},Panel.defaultProps={initCollapsed:!1,id:"default-panel",height:"100%"},exports.default=Panel},function(module,exports,__webpack_require__){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(self,call){if(!self)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!call||"object"!=typeof call&&"function"!=typeof call?self:call}function _inherits(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:!1,writable:!0,configurable:!0}}),superClass&&(Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass)}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),_Panel=__webpack_require__(2),_FilterForm=(_interopRequireDefault(_Panel),__webpack_require__(4)),_FilterForm2=_interopRequireDefault(_FilterForm),CandidateListFilter=function(_React$Component){function CandidateListFilter(props){_classCallCheck(this,CandidateListFilter);var _this=_possibleConstructorReturn(this,(CandidateListFilter.__proto__||Object.getPrototypeOf(CandidateListFilter)).call(this,props));return _this.getBasicOpts=_this.getBasicOpts.bind(_this),_this.getAdvancedOpts=_this.getAdvancedOpts.bind(_this),_this.updateFilter=_this.updateFilter.bind(_this),_this.resetFilters=_this.resetFilters.bind(_this),_this.toggleAdvanced=_this.toggleAdvanced.bind(_this),_this.getDisplayedFormElements=_this.getDisplayedFormElements.bind(_this),_this.resetFilters=_this.resetFilters.bind(_this),_this.componentDidMount=_this.componentDidMount.bind(_this),_this.state={showadvanced:!1,dynamicfilters:{projects:{"":"All",placeholder:"Loading valid projects.."},subprojects:{"":"All",placeholder:"Loading valid subprojects.."},visits:{"":"All",placeholder:"Loading valid visits..."},sites:{"":"All",placeholder:"Loading valid sites..."},participantstatus:{"":"All",placeholder:"Loading participant status options..."}},filter:{}},_this}return _inherits(CandidateListFilter,_React$Component),_createClass(CandidateListFilter,[{key:"updateFilter",value:function(filter){filter.ParticipantStatus&&(filter.ParticipantStatus.exactMatch=!0),this.setState({filter:filter}),this.props.onFilterUpdated&&this.props.onFilterUpdated(filter)}},{key:"getBasicOpts",value:function(){var basicopts={PSCID:{label:"PSCID",name:"PSCID",type:"text",class:"form-control input-sm"},DCCID:{label:"DCCID",name:"DCCID",type:"text",class:"form-control input-sm"},Visits:{label:"Visit Label",name:"Visits",type:"select",class:"form-control input-sm",emptyOption:!1,options:this.state.dynamicfilters.visits},Site:{label:"Site",name:"Site",type:"select",class:"form-control input-sm",emptyOption:!1,options:this.state.dynamicfilters.sites},Subproject:{label:"Subproject",name:"Subproject",type:"select",class:"form-control input-sm",emptyOption:!1,options:this.state.dynamicfilters.subprojects},Project:{label:"Project",name:"Project",type:"select",class:"form-control input-sm",emptyOption:!1,options:this.state.dynamicfilters.projects},EntityType:{label:"Entity Type",name:"EntityType",type:"select",emptyOption:!1,class:"form-control input-sm",options:{"":"All",Human:"Human",Scanner:"Scanner"}},Placeholder:{},Placeholder2:{}};return basicopts}},{key:"componentDidMount",value:function(){$.get(loris.BaseURL+"/api/v0.0.2/projects/",function(data){var projects={"":"All"};if(data.Projects)for(var proj in data.Projects)data.Projects.hasOwnProperty(proj)&&(projects[proj]=proj);var state=this.state;state.dynamicfilters.projects=projects,this.setState(state)}.bind(this),"json"),$.get(loris.BaseURL+"/candidate_list/ajax/dynamicfilters.php",function(data){var st=this.state,sites={"":"All"};if(data.sites)for(var site in data.sites)data.sites.hasOwnProperty(site)&&(sites[data.sites[site]]=data.sites[site]);var subprojects={"":"All"};if(data.subprojects)for(var sp in data.subprojects)data.subprojects.hasOwnProperty(sp)&&(subprojects[data.subprojects[sp]]=data.subprojects[sp]);var visits={"":"All"};if(data.visits)for(var v in data.visits)data.visits.hasOwnProperty(v)&&(visits[data.visits[v]]=data.visits[v]);var participantstatus={"":"All"};if(data.participantstatus)for(var ps in data.participantstatus)data.participantstatus.hasOwnProperty(ps)&&(participantstatus[data.participantstatus[ps]]=data.participantstatus[ps]);st.dynamicfilters.sites=sites,st.dynamicfilters.subprojects=subprojects,st.dynamicfilters.visits=visits,st.dynamicfilters.participantstatus=participantstatus,this.setState(st)}.bind(this),"json")}},{key:"getAdvancedOpts",value:function(){return{ScanDone:{label:"Scan Done",name:"ScanDone",type:"select",class:"form-control input-sm",emptyOption:!1,options:{"":"All",Yes:"Yes",No:"No"}},ParticipantStatus:{label:"Participant Status",name:"ParticipantStatus",type:"select",class:"form-control input-sm",emptyOption:!1,options:this.state.dynamicfilters.participantstatus},DoB:{label:"Date Of Birth",name:"DoB",type:"text",class:"form-control input-sm"},Gender:{label:"Gender",name:"Gender",type:"select",class:"form-control input-sm",emptyOption:!1,options:{"":"All",Male:"Male",Female:"Female"}},VisitCount:{label:"Number of visits",name:"VisitCount",type:"numeric",class:"form-control input-sm"},Feedback:{label:"Feedback",name:"Feedback",type:"select",class:"form-control input-sm",emptyOptions:!1,options:{"":"All",0:"None",1:"opened",2:"answered",3:"closed",4:"comment"}},LatestVisitStatus:{label:"Latest Visit Status",name:"LatestVisitStatus",type:"select",class:"form-control input-sm",emptyOptions:!1,options:{"":"All","Not Started":"Not Started",Screening:"Screening",Visit:"Visit",Approval:"Approval","Recycling Bin":"Recycling Bin"}}}}},{key:"toggleAdvanced",value:function(filter){var st=this.state;this.state.showadvanced=!this.state.showadvanced,this.setState(st)}},{key:"resetFilters",value:function(){this.refs.candidateList.clearFilter()}},{key:"getDisplayedFormElements",value:function(){var advanced,filters=this.getBasicOpts();if(this.state.showadvanced){var advanced=this.getAdvancedOpts();for(var el in advanced)advanced.hasOwnProperty(el)&&(filters[el]=advanced[el])}return filters}},{key:"render",value:function(){return React.createElement(_FilterForm2.default,{Module:"candidate_list",name:"candidate_list_filter",id:"candidate_list_filter_form",ref:"candidateList",columns:3,onUpdate:this.updateFilter,formElements:this.getDisplayedFormElements(),filter:this.state.filter},React.createElement("div",{className:"row"},React.createElement("div",{className:"col-sm-4 col-md-3 col-xs-12 pull-right"},React.createElement(ButtonElement,{label:"Advanced",type:"button",onUserInput:this.toggleAdvanced,className:"col-sm-4"})),React.createElement("div",{className:"col-sm-4 col-md-3 col-xs-12 pull-right"},React.createElement(ButtonElement,{label:"Clear Filters",type:"reset",onUserInput:this.resetFilters,className:"col-sm-4"}))))}}]),CandidateListFilter}(React.Component);exports.default=CandidateListFilter},function(module,exports,__webpack_require__){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(self,call){if(!self)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!call||"object"!=typeof call&&"function"!=typeof call?self:call}function _inherits(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:!1,writable:!0,configurable:!0}}),superClass&&(Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass)}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),_Panel=__webpack_require__(2),_Panel2=_interopRequireDefault(_Panel),FilterForm=function(_React$Component){function FilterForm(props){_classCallCheck(this,FilterForm);var _this=_possibleConstructorReturn(this,(FilterForm.__proto__||Object.getPrototypeOf(FilterForm)).call(this,props));return _this.clearFilter=_this.clearFilter.bind(_this),_this.getFormChildren=_this.getFormChildren.bind(_this),_this.setFilter=_this.setFilter.bind(_this),_this.onElementUpdate=_this.onElementUpdate.bind(_this),_this.queryString=QueryString.get(),_this}return _inherits(FilterForm,_React$Component),_createClass(FilterForm,[{key:"componentDidMount",value:function(){var filter={},queryString=this.queryString;Object.keys(queryString).forEach(function(key){var filterKey="candidateID"===key?"candID":key;filter[filterKey]={value:queryString[key],exactMatch:!1}}),this.props.onUpdate(filter)}},{key:"clearFilter",value:function(){this.queryString=QueryString.clear(this.props.Module),this.props.onUpdate({})}},{key:"getFormChildren",value:function(){var formChildren=[];return React.Children.forEach(this.props.children,function(child,key){if(React.isValidElement(child)&&"function"==typeof child.type&&child.props.onUserInput){var callbackFunc=child.props.onUserInput,callbackName=callbackFunc.name,elementName=child.type.displayName,queryFieldName="candID"===child.props.name?"candidateID":child.props.name,filterValue=this.queryString[queryFieldName];"onUserInput"===callbackName&&(callbackFunc="ButtonElement"===elementName&&"reset"===child.props.type?this.clearFilter:this.onElementUpdate.bind(null,elementName)),formChildren.push(React.cloneElement(child,{onUserInput:callbackFunc,value:filterValue?filterValue:"",key:key})),this.setFilter(elementName,child.props.name,filterValue)}else formChildren.push(React.cloneElement(child,{key:key}))}.bind(this)),formChildren}},{key:"setFilter",value:function(type,key,value){var filter={};return this.props.filter&&(filter=JSON.parse(JSON.stringify(this.props.filter))),key&&value?(filter[key]={},filter[key].value=value,filter[key].exactMatch="SelectElement"===type):filter&&key&&""===value&&delete filter[key],filter}},{key:"onElementUpdate",value:function(type,fieldName,fieldValue){if("string"==typeof fieldName&&"string"==typeof fieldValue){var queryFieldName="candID"===fieldName?"candidateID":fieldName;this.queryString=QueryString.set(this.queryString,queryFieldName,fieldValue);var filter=this.setFilter(type,fieldName,fieldValue);this.props.onUpdate(filter)}}},{key:"render",value:function(){var formChildren=this.getFormChildren(),formElements=this.props.formElements;return formElements&&Object.keys(formElements).forEach(function(fieldName){var queryFieldName="candID"===fieldName?"candidateID":fieldName;formElements[fieldName].onUserInput=this.onElementUpdate.bind(null,fieldName),formElements[fieldName].value=this.queryString[queryFieldName]}.bind(this)),React.createElement(_Panel2.default,{id:this.props.id,height:this.props.height,title:this.props.title},React.createElement(FormElement,this.props,formChildren))}}]),FilterForm}(React.Component);FilterForm.defaultProps={id:"selection-filter",height:"100%",title:"Selection Filter",onUpdate:function(){console.warn("onUpdate() callback is not set!")}},FilterForm.propTypes={Module:React.PropTypes.string.isRequired,filter:React.PropTypes.object.isRequired,id:React.PropTypes.string,height:React.PropTypes.string,title:React.PropTypes.string,onUpdate:React.PropTypes.func},exports.default=FilterForm}]);
//# sourceMappingURL=onLoad.js.map
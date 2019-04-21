(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{105:function(e,t,a){"use strict";var n=a(0),r=a.n(n),i=a(106),l=a.n(i);t.a=function(e){var t=null,a=[l.a.InputElement];switch(e.invalid&&e.shouldValidate&&e.touched&&a.push(l.a.Invalid),e.elementType){case"input":t=r.a.createElement("input",Object.assign({className:a.join(" ")},e.elementConfig,{value:e.value,onChange:e.changed}));break;case"textarea":t=r.a.createElement("textarea",Object.assign({className:a.join(" ")},e.elementConfig,{value:e.value,onChange:e.changed}));break;case"select":t=r.a.createElement("select",{className:a.join(" "),value:e.value,onChange:e.changed},e.elementConfig.options.map(function(e){return r.a.createElement("option",{key:e.value,value:e.value},e.displayValue)}));break;default:t=r.a.createElement("input",Object.assign({className:a.join(" ")},e.elementConfig,{value:e.value,onChange:e.changed}))}return r.a.createElement("div",{className:l.a.Input},r.a.createElement("label",{className:l.a.Label},e.label),t)}},106:function(e,t,a){e.exports={Input:"Input_Input__1pk7x",Label:"Input_Label__16Dqb",InputElement:"Input_InputElement__QK3zC",Invalid:"Input_Invalid__Cw3VV"}},107:function(e,t,a){e.exports={CheckoutSummary:"CheckoutSummary_CheckoutSummary__1z9OT"}},108:function(e,t,a){e.exports={ContactData:"ContactData_ContactData__tKgqZ"}},113:function(e,t,a){"use strict";a.r(t);var n=a(2),r=a(3),i=a(5),l=a(4),o=a(6),c=a(0),u=a.n(c),s=a(16),d=a(51),p=a(32),m=a(107),h=a.n(m),v=function(e){return u.a.createElement("div",{className:h.a.CheckoutSummary},u.a.createElement("h1",null,"We hope it tastes well!"),u.a.createElement("div",{style:{width:"100%",margin:"auto"}},u.a.createElement(d.a,{ingredients:e.ingredients})),u.a.createElement(p.a,{btnType:"Danger",clicked:e.checkoutCancelled},"CANCEL"),u.a.createElement(p.a,{btnType:"Success",clicked:e.checkoutContinued},"CONTINUE"))},g=a(15),f=a(33),C=a(108),y=a.n(C),b=a(25),k=a(105),E=a(14),j=a(30),I=function(e){function t(){var e,a;Object(n.a)(this,t);for(var r=arguments.length,o=new Array(r),c=0;c<r;c++)o[c]=arguments[c];return(a=Object(i.a)(this,(e=Object(l.a)(t)).call.apply(e,[this].concat(o)))).state={orderForm:{name:{elementType:"input",elementConfig:{type:"text",name:"name",placeholder:"Your Name",autoComplete:"name"},value:"",validation:{required:!0},valid:!1,touched:!1},street:{elementType:"input",elementConfig:{type:"text",name:"address",autoComplete:"street-address",placeholder:"Street"},value:"",validation:{required:!0},valid:!1,touched:!1},zipCode:{elementType:"input",elementConfig:{type:"text",name:"postal",placeholder:"ZIP Code",autoComplete:"postal-code"},value:"",validation:{required:!0,minLength:5,maxLength:5,isNumeric:!0},valid:!1,touched:!1},country:{elementType:"input",elementConfig:{type:"text",name:"country",autoComplete:"country",placeholder:"Country"},value:"",validation:{required:!0},valid:!1,touched:!1},email:{elementType:"input",elementConfig:{type:"email",name:"email",autoComplete:"email",placeholder:"Your E-Mail"},value:"",validation:{required:!0,isEmail:!0},valid:!1,touched:!1},deliveryMethod:{elementType:"select",elementConfig:{options:[{value:"fastest",displayValue:"Fastest"},{value:"cheapest",displayValue:"Cheapest"}]},value:"",validation:{},valid:!0}},formIsValid:!1,loading:!1},a.orderHandler=function(e){e.preventDefault(),a.setState({loading:!0});var t={};for(var n in a.state.orderForm)t[n]=a.state.orderForm[n].value;var r={ingredients:a.props.ingredients,price:a.props.price,orderData:t,userId:a.props.userId};b.a.post("/orders.json?auth="+a.props.token,r).then(function(e){a.setState({loading:!1}),a.props.onFetchIngredients(),a.props.history.push("/")}).catch(function(e){a.setState({loading:!1})})},a.inputChangedHandler=function(e,t){var n=Object(g.a)({},a.state.orderForm),r=Object(g.a)({},n[t]);r.value=e.target.value,r.valid=a.checkValidity(r.value,r.validation),r.touched=!0,n[t]=r;var i=!0;for(var l in n)i=n[l].valid&&i;a.setState({orderForm:n,formIsValid:i})},a}return Object(o.a)(t,e),Object(r.a)(t,[{key:"checkValidity",value:function(e,t){var a=!0;if(!t)return!0;if(t.required&&(a=""!==e.trim()&&a),t.minLength&&(a=e.length>=t.minLength&&a),t.maxLength&&(a=e.length<=t.maxLength&&a),t.isEmail){a=/[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(e)&&a}if(t.isNumeric){a=/^\d+$/.test(e)&&a}return a}},{key:"render",value:function(){var e=this,t=[];for(var a in this.state.orderForm)t.push({id:a,config:this.state.orderForm[a]});var n=u.a.createElement("form",{onSubmit:this.orderHandler},t.map(function(t){return u.a.createElement(k.a,{key:t.id,elementType:t.config.elementType,elementConfig:t.config.elementConfig,value:t.config.value,invalid:!t.config.valid,shouldValidate:t.config.validation,touched:t.config.touched,changed:function(a){return e.inputChangedHandler(a,t.id)}})}),u.a.createElement(p.a,{btnType:"Success",disabled:!this.state.formIsValid},"ORDER"));return this.state.loading&&(n=u.a.createElement(f.a,null)),u.a.createElement("div",{className:y.a.ContactData},u.a.createElement("h4",null,"Enter your Contact Data"),n)}}]),t}(c.Component),O=Object(E.b)(function(e){return{token:e.auth.token,userId:e.auth.userId}},function(e){return{onFetchIngredients:function(){return e(Object(j.b)())}}})(I),_=function(e){function t(){var e,a;Object(n.a)(this,t);for(var r=arguments.length,o=new Array(r),c=0;c<r;c++)o[c]=arguments[c];return(a=Object(i.a)(this,(e=Object(l.a)(t)).call.apply(e,[this].concat(o)))).checkoutCancelledHandler=function(){a.props.history.goBack()},a.checkoutContinuedHandler=function(){a.props.history.replace("/checkout/contact-data")},a}return Object(o.a)(t,e),Object(r.a)(t,[{key:"componentWillMount",value:function(){}},{key:"render",value:function(){var e=this;return u.a.createElement("div",null,u.a.createElement(v,{ingredients:this.props.ingredients,checkoutCancelled:this.checkoutCancelledHandler,checkoutContinued:this.checkoutContinuedHandler}),u.a.createElement(s.b,{path:this.props.match.path+"/contact-data",render:function(t){return u.a.createElement(O,Object.assign({ingredients:e.props.ingredients,price:e.props.totalPrice},t))}}))}}]),t}(c.Component);t.default=Object(E.b)(function(e){return{ingredients:e.ingredients.ingredients,totalPrice:e.totalPrice.totalPrice}})(_)}}]);
//# sourceMappingURL=3.1bfc8003.chunk.js.map
(this.webpackJsonpmyerningnx=this.webpackJsonpmyerningnx||[]).push([[0],{39:function(e,t,a){e.exports=a(67)},66:function(e,t,a){},67:function(e,t,a){"use strict";a.r(t);var n=a(0),i=a.n(n),r=a(16),u=a.n(r),o=a(4),l=a(2),c=a(3),s=function(){return i.a.createElement("div",null,i.a.createElement("h2",null,"PAGINA AL HOME"),i.a.createElement("p",null,"Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti at maiores dolor commodi doloremque eum suscipit vero animi, veniam dignissimos ipsam laborum quibusdam. Tenetur ipsa magnam iure fugiat expedita beatae."),i.a.createElement("p",null,"Dolorum deleniti, incidunt fuga magni assumenda autem tenetur perferendis, illo, vero eligendi facere cumque esse omnis voluptate nesciunt fugit consectetur dolor enim laboriosam praesentium a quis odio sapiente eum. Quis!"),i.a.createElement("p",null,"Obcaecati architecto impedit sunt totam vitae. Dolores sapiente cum ratione, sit ducimus praesentium cupiditate dolor rerum enim recusandae magnam illum iste! Fugit possimus nesciunt necessitatibus architecto rerum suscipit nostrum autem!"),i.a.createElement("p",null,"Sapiente, nulla. Voluptatum dolorem ut odio aspernatur, quae molestias vitae rem consequuntur tempore officiis optio culpa omnis eos, harum necessitatibus voluptatibus quod ipsam accusantium minima aut accusamus neque velit? Eveniet."),i.a.createElement("p",null,"Totam provident delectus repellat nulla! Minima quasi vero id repellat dicta officiis ea hic quaerat et quam autem expedita pariatur obcaecati ab omnis qui illum impedit rerum a, in repellendus."),i.a.createElement("p",null,"Sit pariatur consequatur fuga dolorem numquam, corrupti ratione distinctio ullam. Cupiditate repellendus quia adipisci? Maiores, cum soluta expedita eius quos repellendus repellat alias quia ullam debitis fugit non deserunt veritatis!"),i.a.createElement("p",null,"Aliquid velit consequatur, adipisci quaerat praesentium fugit, odio perspiciatis nulla laborum reprehenderit unde iusto molestiae. Consequatur aut porro suscipit sequi at harum esse. Quidem labore officia quaerat iure odit eum."),i.a.createElement("p",null,"Voluptatibus, enim explicabo praesentium natus sequi nesciunt eos reprehenderit dolor laudantium! Ut voluptates dolor, fugiat velit tenetur, dolores asperiores earum, culpa tempore voluptatem fugit nobis molestias adipisci dolorum nam non."),i.a.createElement("p",null,"Consectetur mollitia ipsa error ea culpa voluptatibus minima ipsum, sunt sit quos. Recusandae saepe a rem eveniet dolore? Veniam recusandae in nemo! Voluptatum, temporibus animi veniam quibusdam assumenda ad perspiciatis?"),i.a.createElement("p",null,"Maiores omnis, praesentium sapiente aliquam amet possimus? Nesciunt nobis at iusto aspernatur vitae ipsa reiciendis soluta ipsam animi ut nostrum temporibus, debitis veritatis voluptatem perferendis sunt? Numquam placeat distinctio alias."))},m=a(11),p=a.n(m),d=function(e){e.preventDefault();var t="".concat("/api/gnvco/v1","/login");console.log("URL",t);var a={user:e.target.user.value,pass:e.target.pass.value};p.a.post(t,a).then((function(e){console.log(e),e.data.token?(localStorage.removeItem("tokenPublic"),localStorage.setItem("token",e.data.token),window.location="/certignv/".concat(e.data.user)):document.getElementById("msgError").innerHTML=e.data.message,console.log(e.data)})).catch((function(e){return console.log(e)}))},E=function(){return i.a.createElement(i.a.Fragment,null,i.a.createElement("h1",null,"Login Certificadores"),i.a.createElement("form",{id:"formulario",onSubmit:d.bind()},i.a.createElement("label",{htmlFor:"user"},"Usuario",i.a.createElement("input",{type:"text",name:"user",id:"user",placeholder:"Ingrese su usuario"})),i.a.createElement("label",{htmlFor:"pass"},"Contrase\xf1a",i.a.createElement("input",{type:"password",name:"pass",id:"pass",placeholder:"Ingrese su Contrase\xf1a"})),i.a.createElement("input",{type:"submit",value:"Enviar"})),i.a.createElement("div",{id:"msgError"}))},b=function(e){e.preventDefault();var t="".concat("/api/gnvco/v1","/loginpublic"),a={consumer:e.target.consumer.value,code:e.target.code.value};p.a.post(t,a).then((function(e){console.log("data",e.data),e.data.token?(localStorage.removeItem("token"),localStorage.setItem("tokenPublic",e.data.token),window.location.href="/info/".concat(e.data.consumer)):document.getElementById("msgError").innerHTML=e.data.message})).catch((function(e){return console.log("error axios",e)}))},g=function(){return i.a.createElement("div",null,i.a.createElement("h2",null,"Login Info Publica"),i.a.createElement("img",{src:"/images/favicon.png",alt:"enable"}),i.a.createElement("p",null,"Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere veniam ipsa fugiat sunt pariatur nam dolorum assumenda, illum explicabo culpa quam dicta placeat tempora ducimus, molestiae minus sit libero doloribus."),i.a.createElement("p",null,"Debitis ea quibusdam unde dolorum quia, dolor sunt! Earum, assumenda laboriosam? Odio iste unde mollitia vitae amet illum perferendis! Doloribus animi assumenda quia quod iusto laborum, odit est consectetur officiis?"),i.a.createElement("p",null,"Consequatur aliquam eaque mollitia consectetur impedit maiores? Corrupti eligendi perspiciatis, ducimus explicabo animi harum fugit libero quia. Excepturi iusto, vitae sint nobis autem, ullam animi ex ratione amet veniam tempore."),i.a.createElement("form",{id:"formulario",onSubmit:b.bind()},i.a.createElement("label",{htmlFor:"user"},"Identificaci\xf3n",i.a.createElement("input",{type:"text",name:"consumer",id:"consumer",placeholder:"Ingrese su Identificacion"})),i.a.createElement("label",{htmlFor:"pass"},"Clave",i.a.createElement("input",{type:"password",name:"code",id:"code",placeholder:"Ingrese su Clave"})),i.a.createElement("input",{type:"submit",value:"Enviar"})),i.a.createElement("div",{id:"msgError"}))},f=a(33),v=a(34),q=a(38),h=a(37),O=function(e){Object(q.a)(a,e);var t=Object(h.a)(a);function a(e){var n;return Object(f.a)(this,a),(n=t.call(this,e)).state={name:[]},n}return Object(v.a)(a,[{key:"getUser",value:function(){var e="".concat("/api/gnvco/v1","/users");console.log("URL ",e),fetch(e).then((function(e){return e.json()})).then((function(e){console.log(e)})).catch((function(e){return console.log(e)}))}},{key:"componentDidMount",value:function(){this.getUser()}},{key:"render",value:function(){return i.a.createElement("div",null,"aca se renderiza")}}]),a}(n.Component),I=function(){return i.a.createElement("div",null,i.a.createElement("img",{src:"/images/react.png",alt:"react"}),i.a.createElement("p",null,"React"))},S=function(){return i.a.createElement("div",{className:"banner"},i.a.createElement(I,null),i.a.createElement("p",null,"Banner desde un template y un atomo"))},j=Object(o.b)((function(e){return{user:e.profileReducer.user}}),(function(){return{}}))((function(e){var t=e.user;return console.log("usuario menu",t),i.a.createElement(i.a.Fragment,null,i.a.createElement("li",null,i.a.createElement(l.b,{to:"/certignv/".concat(t)},"Certificadores")))})),x=Object(o.b)((function(e){return{consumer:e.publicReducer.consumer}}),(function(){return{}}))((function(e){var t=e.consumer;return i.a.createElement(i.a.Fragment,null,i.a.createElement("li",null,i.a.createElement(l.b,{to:"/info/".concat(t)},"Info Publica")))})),C=function(){return i.a.createElement(i.a.Fragment,null,i.a.createElement("li",null,i.a.createElement(l.b,{to:"/login"},"Certificadores")))},P=function(){return i.a.createElement(i.a.Fragment,null,i.a.createElement("li",null,i.a.createElement(l.b,{to:"/loginpublic"},"Info Publica")))},L=Object(n.createRef)(),k=function(){localStorage.getItem("token")||localStorage.getItem("tokenPublic")||(window.location="/"),L.current.classList.toggle("profile_hidden")},R=Object(o.b)((function(e){return{user:e.profileReducer.user,consumer:e.publicReducer.consumer}}),(function(){return{}}))((function(e){var t=e.user,a=e.consumer;return i.a.createElement("div",null,i.a.createElement("div",{className:"user_Profile"},i.a.createElement("img",{src:"/images/profile.svg",alt:"",height:"50px",width:"50px",onClick:function(){return k()}})),i.a.createElement("div",{ref:L,className:"profile_hidden"},i.a.createElement("div",{className:"profile_div",onMouseOut:function(){return k()}},i.a.createElement("p",null,localStorage.getItem("token")?t:a),i.a.createElement("p",null,localStorage.getItem("token")?i.a.createElement(l.b,{to:"/ConfigUser"},i.a.createElement("span",null,"Configuraci\xf3n")):i.a.createElement(l.b,{to:"/ConfigPublic"},i.a.createElement("span",null,"Configuraci\xf3n"))),i.a.createElement("p",null,i.a.createElement("span",{onClick:function(){localStorage.getItem("token")?(localStorage.removeItem("token"),window.location="/login"):(localStorage.removeItem("tokenPublic"),window.location="/loginPublic")}},"Cerrar Sesion")))))})),y=function(){return i.a.createElement(i.a.Fragment,null,i.a.createElement("div",{className:"container"},i.a.createElement("nav",null,i.a.createElement("ul",null,i.a.createElement("li",null,i.a.createElement(l.b,{to:"/",exact:!0},"Home")),i.a.createElement("li",null,i.a.createElement(l.b,{to:"/proyecto"},"Proyecto")),i.a.createElement("li",null,i.a.createElement(l.b,{to:"/contacto"},"Contactenos")),localStorage.getItem("token")?i.a.createElement(j,null):i.a.createElement(C,null),localStorage.getItem("tokenPublic")?i.a.createElement(x,null):i.a.createElement(P,null),i.a.createElement("li",null,i.a.createElement(l.b,{to:"/users"},"Test")))),localStorage.getItem("token")||localStorage.getItem("tokenPublic")?i.a.createElement(R,null):i.a.createElement("div",{className:"user_Profile"},i.a.createElement("img",{src:"/images/favicon.png",alt:"",height:"48px",width:"48px"}))))},_=function(){return i.a.createElement(i.a.Fragment,null,i.a.createElement("div",null,i.a.createElement(y,null)),i.a.createElement("div",null,i.a.createElement(S,null)))},T=function(){return i.a.createElement(i.a.Fragment,null,i.a.createElement("h1",null,"Contactenos"))},F=function(){return i.a.createElement(i.a.Fragment,null,i.a.createElement("h1",null,"Historia de CertiGNV"),i.a.createElement("p",null,"Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, necessitatibus. Ad delectus labore autem eum, dolorem error? Fugit aut laudantium blanditiis, distinctio sint, praesentium ad repudiandae ipsam placeat sapiente deleniti."),i.a.createElement("p",null,"Ipsum ipsam ducimus dolorem obcaecati perspiciatis necessitatibus architecto corrupti, reiciendis harum fuga quisquam totam. Sed animi sapiente, laboriosam libero aliquam ullam beatae rerum iusto ex, earum neque, sunt necessitatibus dicta."),i.a.createElement("p",null,"Ratione aut totam ducimus, omnis sit fugit, reprehenderit placeat, ullam provident id quas itaque nostrum ut dolores nulla nisi laboriosam aliquam optio necessitatibus voluptate dolorem corrupti voluptatem voluptates suscipit? Pariatur?"),i.a.createElement("p",null,"Modi vel laborum laudantium voluptas perspiciatis sapiente corporis sint culpa vitae doloremque optio blanditiis quibusdam cumque ullam, sed magnam natus? Molestias inventore ipsum doloribus vel ut deleniti veniam harum nisi!"),i.a.createElement("p",null,"Eius assumenda corrupti in. Non, odit perspiciatis corrupti reprehenderit dolor id velit vitae nostrum aut quas quo libero tempore totam inventore quis architecto placeat dolore iusto ratione! Quia, a obcaecati!"),i.a.createElement("p",null,"Distinctio iusto, quasi quibusdam nisi rerum dolore eos velit corporis tempora sunt nesciunt et labore ab suscipit! Est sapiente ea temporibus doloribus voluptatum esse aliquid, necessitatibus facere, consectetur sunt doloremque?"),i.a.createElement("p",null,"Distinctio quo iusto non consectetur quas aperiam illum quis unde, quidem ea commodi ut animi totam tempore accusamus nemo voluptates provident officiis quos ducimus amet omnis perferendis sequi neque! Labore!"),i.a.createElement("p",null,"Aperiam esse magnam doloremque maxime aspernatur nulla quaerat, fugit, rem totam consequatur sed, odit a nisi eius quis minima sint reiciendis amet cum cupiditate facere ducimus! Perferendis vero quisquam ea!"),i.a.createElement("p",null,"Quo, reiciendis! Sapiente, odit esse dignissimos quaerat dicta quibusdam tenetur dolor quasi unde cumque reprehenderit incidunt harum iure nobis nesciunt, asperiores quia quae quis tempore! Placeat molestias dolores hic beatae?"),i.a.createElement("p",null,"Molestiae illo commodi soluta laboriosam delectus consectetur sed ipsam error sit quaerat harum aspernatur deserunt earum, vero quibusdam repudiandae alias necessitatibus. Odit doloribus quia asperiores, maxime quae assumenda aliquid sapiente."),i.a.createElement("p",null,"Accusamus, repudiandae doloribus omnis fugiat possimus laborum ipsa aliquam laboriosam numquam vel illo enim cumque reiciendis corporis rem, voluptates ratione. Quod provident voluptate a beatae non voluptatum unde saepe. Doloribus?"),i.a.createElement("p",null,"Quasi commodi officia deleniti repellat alias consectetur amet eum beatae animi perspiciatis aut quia porro rerum, ipsam magnam architecto expedita illo consequatur? Voluptatem dolore aliquam consequuntur? Qui cupiditate soluta sed."),i.a.createElement("p",null,"Impedit obcaecati explicabo necessitatibus autem unde ex! Modi tenetur, distinctio ducimus sed aliquid sit reiciendis id magnam accusamus minima molestiae. Saepe perferendis neque, doloremque optio magni tenetur repellat. Iure, fugit."),i.a.createElement("p",null,"Nam doloribus sunt alias, voluptas nisi ducimus, ex nesciunt doloremque officiis consequatur delectus, laborum tempore ratione facilis ipsum rem similique asperiores. Iure aliquid voluptate quia a consectetur veritatis. Quae, quasi?"),i.a.createElement("p",null,"Labore sed expedita porro nesciunt itaque voluptatem veniam culpa libero fugiat voluptate, pariatur beatae nihil nostrum aspernatur iure qui blanditiis dolorem eius adipisci quisquam exercitationem ut asperiores. Dicta, eaque aperiam."))},N=function(){return i.a.createElement("div",null,i.a.createElement("h1",null,"Talleres GNV"),i.a.createElement("h3",null,"Info Talleres"),i.a.createElement("p",null,"Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus aliquam aperiam fugit commodi. Dolorum amet temporibus corporis debitis doloremque deleniti quas excepturi error, alias accusantium fugit. Nam voluptatum laborum nobis."),i.a.createElement("p",null,"Voluptatibus assumenda quos nobis architecto iure? Sapiente reprehenderit, fugiat, omnis est neque maiores mollitia, error voluptatum nam nesciunt unde dolore nihil ratione voluptatem dignissimos quisquam possimus modi! Impedit, tempore modi."))},D=function(e){return function(t){p.a.get("".concat("/api/gnvco/v1","/info/").concat(e)).then((function(a){return console.log("data dispatch",a.data),t({type:"GET_PUBLIC",info:a.data,consumer:e})}))}},w=a(13),U=a(35),A=a(36),M=a(9),G=Object(w.createStore)(Object(w.combineReducers)({profileReducer:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1?arguments[1]:void 0;return"GET_ALL_PROFILES"===t.type?Object(M.a)(Object(M.a)({},e),{},{profiles:t.profiles}):"GET_PROFILE"===t.type?Object(M.a)(Object(M.a)({},e),{},{profile:t.profile,user:t.user}):e},userReducer:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1?arguments[1]:void 0;return"GET_ALL_USERS"===t.type?Object(M.a)(Object(M.a)({},e),{},{users:t.users}):"GET_USER"===t.type?Object(M.a)(Object(M.a)({},e),{},{user:t.user}):e},workshopReducer:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return e},publicReducer:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1?arguments[1]:void 0;return"GET_ALL_PUBLICS"===t.type?Object(M.a)(Object(M.a)({},e),{},{infos:t.infos}):"GET_PUBLIC"===t.type?Object(M.a)(Object(M.a)({},e),{},{info:t.info,consumer:t.consumer}):e}}),Object(U.composeWithDevTools)(Object(w.applyMiddleware)(A.a))),V=Object(o.b)((function(e){return{profile:e.profileReducer.profile,user:e.profileReducer.user}}),{})((function(e){var t=e.match,a=e.profile,r=e.user;return console.log("usuario Login",r),Object(n.useEffect)((function(){var e=t.params.user;G.dispatch(function(e){return function(t){p.a.get("".concat("/api/gnvco/v1","/certignv/").concat(e)).then((function(a){return console.log("data dispatch",a.data),t({type:"GET_PROFILE",profile:a.data,user:e})}))}}(e))}),[t]),i.a.createElement("div",null,i.a.createElement("h1",null,"Pagina Contents de CertiGNV"),i.a.createElement("aside",null,i.a.createElement("div",null,"Lateral"),i.a.createElement("ul",null,i.a.createElement("li",null,"a"),i.a.createElement("li",null,"b"),i.a.createElement("li",null,"c"))),i.a.createElement("main",null,"Renderizacion de contenido dinamico"),i.a.createElement("div",null,"primero ",r+" despues "+JSON.stringify(a)))})),B=a(12),Q=Object(o.b)((function(e){return{user:e.profileReducer.user}}),(function(e){return{}}))((function(e){var t=e.component,a=e.user,n=Object(B.a)(e,["component","user"]),r="/certignv/".concat(a);return console.log("path ",r),localStorage.getItem("token")?i.a.createElement(c.a,{to:r}):i.a.createElement(c.b,Object.assign({},n,{component:t}))})),H=function(e){var t=e.component,a=Object(B.a)(e,["component"]);return localStorage.getItem("tokenPublic")?i.a.createElement(c.a,{to:"/"}):i.a.createElement(c.b,Object.assign({},a,{component:t}))},J=function(e){var t=e.component,a=Object(B.a)(e,["component"]);return localStorage.getItem("token")?i.a.createElement(c.b,Object.assign({},a,{component:t})):i.a.createElement(c.a,{to:"/login"})},W=function(e){var t=e.component,a=Object(B.a)(e,["component"]);return localStorage.getItem("tokenPublic")?i.a.createElement(c.b,Object.assign({},a,{component:t})):i.a.createElement(c.a,{to:"/loginpublic"})},K=Object(o.b)((function(e){return{info:e.publicReducer.info,consumer:e.publicReducer.consumer}}),(function(e){return{}}))((function(e){var t=e.match,a=e.info,r=e.consumer;return Object(n.useEffect)((function(){var e=t.params.consumer;G.dispatch(D(e))}),[t]),i.a.createElement("div",null,i.a.createElement("h1",null,"Informacion de Descarga publica"),i.a.createElement("p",null,"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Expedita amet quam fugit consectetur ad eum pariatur suscipit sunt cumque, temporibus ullam quae nulla magnam quis corrupti illum maxime quaerat. Id?"),i.a.createElement("p",null,"Sapiente illo tenetur accusantium a corporis praesentium voluptatem quibusdam eos voluptatum quae, minima repellat maxime dolorum dignissimos. Modi ducimus dolor, sint dolorem culpa pariatur alias nulla aliquid repudiandae officia sit."),i.a.createElement("p",null,r," datos ",JSON.stringify(a)," "))})),z=function(){return i.a.createElement("div",null,i.a.createElement(_,null),i.a.createElement(c.d,null,i.a.createElement(c.b,{path:"/",exact:!0,component:s}),i.a.createElement(c.b,{path:"/proyecto",exact:!0,component:F}),i.a.createElement(c.b,{path:"/contacto",exact:!0,component:T}),i.a.createElement(c.b,{path:"/users",exact:!0,component:O}),i.a.createElement(H,{path:"/loginpublic",exact:!0,component:g}),i.a.createElement(Q,{path:"/login",exact:!0,component:E}),i.a.createElement(W,{path:"/info/:consumer",component:K}),i.a.createElement(J,{path:"/certignv/:user",component:V}),i.a.createElement(J,{path:"/tallergnv",component:N}),i.a.createElement(c.b,{component:function(){return i.a.createElement("div",null,i.a.createElement("h3",null,"Error 404 NOT FOUND"))}})))},X=function(){return i.a.createElement(i.a.Fragment,null,i.a.createElement(l.a,null,i.a.createElement(z,null)))};a(66);console.log("env",Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,REACT_APP_API_URL:"/api/gnvco/v1"})),G.dispatch(D("79744894")),u.a.render(i.a.createElement(o.a,{store:G},i.a.createElement(X,null)),document.getElementById("root"))}},[[39,1,2]]]);
//# sourceMappingURL=main.cfbd0be8.chunk.js.map
"use strict";function AppRun(e,t,n,r){n.isAuthenticated()||"/signUp"===r.path()||r.path("/signIn");var o=btoa("clientapp:123456");e.$on("oauth:error",function(e,a){"invalid_grant"!==a.data.error&&("invalid_token"===a.data.error&&n.getRefreshToken({},{headers:{Authorization:"Basic "+o,"Content-Type":"application/x-www-form-urlencoded;charset=utf-8"}}).then(function(){t.reload()},function(){t.go("authorization")}),r.path("/signIn"))}),e.$on("$locationChangeStart",function(){n.isAuthenticated()||"/signUp"===r.path()||r.path("/signIn")})}function appConfig(e,t,n,r){n.configure({baseUrl:GOOGLE_IP,clientId:"clientapp",clientSecret:"123456",grantPath:"/oauth/token",revokePath:"/oauth/token"}),r.configure({name:"token",options:{secure:!1}}),e.state("authorization",{url:"/signIn",templateUrl:"views/signin.html",controller:"SignInController",controllerAs:"user"}).state("registration",{url:"/signUp",templateUrl:"views/signup.html",controller:"SignUpController",controllerAs:"visitor"}).state("app",{url:"/",views:{"":{templateUrl:"views/app.html",controller:"AppController",controllerAs:"app"},"content@app":{templateUrl:"views/map.html",controller:"MapCreateController",controllerAs:"mapVm"}}}).state("app.profile",{url:"profile",views:{"content@app":{templateUrl:"views/userProfile.html",controller:"SignedUserProfileController",controllerAs:"userVm"}}}).state("app.users",{url:"users",views:{"content@app":{templateUrl:"views/users.html",controller:"UsersController",controllerAs:"userVm"}}}).state("app.users.id",{url:"/{id:int}",views:{"content@app":{templateUrl:"views/userProfile.html",controller:"UserProfileController",controllerAs:"userVm"}}}).state("app.events",{url:"events",views:{"content@app":{templateUrl:"views/events.html",controller:"EventsController",controllerAs:"eventVm"}}}).state("app.eventCreate",{url:"createevent",views:{"content@app":{templateUrl:"views/createEvent.html",controller:"CreateEventController",controllerAs:"eventVm"}}}).state("app.eventEdit",{url:"{{id:int}/eventedit}",views:{"content@app":{templateUrl:"views/createEvent.html",controller:"CreateEventController",controllerAs:"eventVm"}}}).state("app.events.id",{url:"/{id:int}",views:{"content@app":{templateUrl:"views/eventProfile.html",controller:"EventProfileController",controllerAs:"eventVm"}}}).state("app.meetings",{url:"meetings",views:{"content@app":{templateUrl:"views/meetings.html",controller:"MeetingsController",controllerAs:"meetingVm"}}}).state("app.meetingCreate",{url:"create-meeting",views:{"content@app":{templateUrl:"views/createMeeting.html",controller:"CreateMeetingController",controllerAs:"meetingVm"}}}).state("app.meetingEdit",{url:"{{id:int}/meeting-edit}",views:{"content@app":{templateUrl:"views/createMeeting.html",controller:"CreateMeetingController",controllerAs:"meetingVm"}}}).state("app.meetings.id",{url:"/{id:int}",views:{"content@app":{templateUrl:"views/meetingProfile.html",controller:"MeetingProfileController",controllerAs:"meetingVm"}}}).state("app.chat",{url:"chat",views:{"content@app":{templateUrl:"views/chatList.html",controller:"ChatListController",controllerAs:"chatListVm"}}}).state("app.chat.id",{url:"/{id:int}",views:{"chat@app.chat":{templateUrl:"views/chat.html",controller:"ChatController",controllerAs:"chatVm"}}}),t.otherwise("/")}function AppController(e,t,n,r,o,a,i){function c(){a(function(){i.get()},3e5),s(),t.isAuthenticated||o.connect(),e.getCounter().then(function(e){p.counter=new Set(e.data.unreadChatsIds),o.counter=p.counter})}function s(){e.get().then(function(e){p.user=e.data,r.putObject("currentUser",p.user),p.ponchesList=[],p.user.ponches.forEach(function(e){p.ponchesList.push(e.name)})}),e.getInterests().then(function(e){p.related=[],e.data.forEach(function(e){p.related.push(e.name)})})}function u(){p.show=!1}function l(){t.removeToken()}function g(){p.$broadcast("rebuild:me")}function d(e){return n.getUserImg(e)}function m(){return p.counter?p.counter.size:0}function f(t){e.putPonches(t).then(function(){p.show=!1,s()})}var p=this;p.logout=l,p.scrollBuild=g,p.getUserImgUrl=d,p.getCounter=m,p.submitPonches=f,p.hidePicker=u,c()}function getSignedUserInfo(e){function t(){return e({url:GOOGLE_IP+"profile",method:"GET"})}function n(){return e({url:GOOGLE_IP+"ponches",method:"GET"})}function r(t){return e({url:GOOGLE_IP+"profile/ponches",method:"PUT",data:{ponches:t}})}function o(){return e({url:GOOGLE_IP+"profile/counters",method:"GET"})}return{get:t,getCounter:o,getInterests:n,putPonches:r}}function SignInController(e,t,n){function r(r){o.encoded=btoa("clientapp:123456"),t.getAccessToken(r,{headers:{Authorization:"Basic "+o.encoded,"Content-Type":"application/x-www-form-urlencoded;charset=utf-8"}}).then(function(){e.go("app")},function(e){"401"===e.status?o.isValid=!1:o.conncction=!1,n(function(){o.isValid=!0,o.conncction=!0},5e3)})}var o=this;o.isValid=!0,o.conncction=!0,o.login=r}function addUser(e){function t(t){return e({url:GOOGLE_IP+"signup",method:"POST",data:t,headers:{"Content-Type":"application/json"}})}return{create:t}}function SignUpController(e,t,n,r,o){function a(a){i.userInfo={email:a.email,name:a.firstName,surname:a.lastName,dateBirthday:"1997-12-20",gender:a.genderMale?"1":"2",password:a.password,passwordConfirm:a.passwordConfirm},e.create(i.userInfo).then(function(e){t.setToken(e.data),r.putObject(a),o.get()}).then(function(){n.go("app")})}var i=this;i.signUp=a}function conneccityMap(e){return{compile:function(t){e.initMap(t[0])}}}function conneccityMarker(e){return{scope:{marker:"=data"},link:function(t,n){e.drawMarker(t.marker,n.type)}}}function MapCreateController(e,t,n,r){function o(){n.getAll().then(function(e){M.markers=e.data}),e.$watchGroup([function(){return t.cardsArray},function(){return t.coordinatesMap}],function(e,n){e[0]&&e[0]!==n[0]&&(M.cardVisible=!0,M.cardInfo=t.cardsArray,M.cardCounter=0),e[1]&&(M.coordinates=t.coordinatesMap)})}function a(){M.filterState=!M.filterState}function i(){M.peopleState=!M.peopleState,M.eventState=!1,M.meetingState=!1}function c(){M.meetingState=!e.meetingState,M.eventState=!1,M.peopleState=!1}function s(){M.meetingState=!1,M.peopleState=!1,M.eventState=!M.eventState}function u(){M.cardVisible=!1}function l(){M.cardCounter>0&&(M.cardCounter-=1)}function g(){M.cardCounter<M.cardInfo.length-1&&(M.cardCounter+=1)}function d(e){return r.getDistance(e)}function m(e){return r.formatDate(e)}function f(e,t){return r.getAddress(e,t)}function p(){t.zoomIn()}function h(){t.zoomOut()}function v(){var e={meetingStartAtFrom:r.getUnixTime(M.meetingTimeFrom),meetingStartAtTo:r.getUnixTime(M.meetingTimeTo),meetingMembersCountFrom:M.meetingMembersFrom,meetingMembersCountTo:M.meetingMembersTo,eventStartAtFrom:r.getUnixTime(M.eventTimeFrom),eventStartAtTo:r.getUnixTime(M.eventTimeTo),eventMembersCountFrom:M.eventMembersFrom,eventMembersCountTo:M.eventMembersTo,userGender:M.getGender(M.genderMale,M.genderFemale),userAgeFrom:M.ageFrom,userAgeTo:M.ageTo};n.getFilteredInfo(e).then(function(e){t.clearMap(),M.markers=e.data})}function C(){t.centerMapToUser()}function I(e,t){return r.getGender(e,t)}var M=this;M.coordinates=new Map,M.filterState=!1,M.peopleState=!1,M.meetingState=!1,M.eventState=!1,M.cardVisible=!1,M.cardCounter=0,M.toggleState=a,M.togglePeople=i,M.toggleMeeting=c,M.toggleEvent=s,M.toggleCard=u,M.getPreviousCard=l,M.getNextCard=g,M.getFormattedDistance=d,M.parseDate=m,M.getAddress=f,M.zoomIn=p,M.zoomOut=h,M.filterMap=v,M.centerMap=C,M.getGender=I,o()}function mapCreate(e,t){var n=this;n.map=null,n.cluster=null,n.markersMap=new Map,n.coordinatesMap=new Map,n.cardsArray=[],n.geocoder=new google.maps.Geocoder,n.centerMapToUser=function(){n.map.setCenter(new google.maps.LatLng(t.getObject("currentUser").latitude,t.getObject("currentUser").longitude)),n.map.setZoom(10)},n.initMap=function(t){n.map=new google.maps.Map(t,{center:{lat:49,lng:26},zoom:8,disableDefaultUI:!0,minZoom:2}),n.markerCluster=new MarkerClusterer(n.map,[],{gridSize:70,zoomOnClick:!1,styles:[{height:51,url:"img/cluster.png",width:54,fontFamily:"Roboto",textSize:14,textColor:"#898989"},{height:51,url:"img/cluster-favorite.png",width:54,fontFamily:"Roboto",textSize:14,textColor:"#ffffff"}]}),n.markerCluster.setCalculator(r),google.maps.event.addListener(n.markerCluster,"clusterclick",function(t){var r=t.getMarkers();n.cardsArray=[];for(var o=0;o<r.length;o+=1)n.cardsArray.push(n.markersMap.get(r[o]));e.$digest()})};var r=function(e){for(var t in e)if(n.markersMap.get(e[t]).hasPonchesMatches)return{text:e.length,index:2};return{text:e.length,index:1}};n.drawMarker=function(e,t){function r(){c+=1,2===c&&(u.width=400,u.height=600,l.drawImage(d,0,3,300,420),l.arc(150,160,110,0,2*Math.PI,!0),l.clip(),l.drawImage(g,20,40,250,250),l.clip(),n.createMarker(u.toDataURL(),e,new google.maps.Size(60,85)))}function o(){c+=1,2===c&&(u.width=400,u.height=400,l.drawImage(d,0,0,400,400),l.arc(200,190,140,0,2*Math.PI,!0),l.clip(),l.drawImage(g,45,35,310,310),l.clip(),n.createMarker(u.toDataURL(),e,new google.maps.Size(50,50)))}function a(){c+=1,2===c&&(u.width=400,u.height=600,l.drawImage(d,0,0,400,430),i(75,60,250,250,0),l.clip(),l.drawImage(g,50,30,300,300),n.createMarker(u.toDataURL(),e,new google.maps.Size(50,70)))}function i(e,t,n,r,o){l.beginPath(),l.moveTo(e+o,t),l.lineTo(e+(n-o),t),l.quadraticCurveTo(e+n,t,e+n,t+o),l.lineTo(e+n,t+(r-o)),l.quadraticCurveTo(e+n,t+r,e+(n-o),t+r),l.lineTo(e+o,t+r),l.quadraticCurveTo(e,t+r,e,t+(r-o)),l.lineTo(e,t+o),l.quadraticCurveTo(e,t,e+o,t),l.closePath()}var c=0,s=void 0,u=document.createElement("canvas"),l=u.getContext("2d"),g=new Image,d=new Image;switch(t){case"meeting":d.src="img/meeting-marker.png",g.src=e.photos?e.photos.photo200px:"img/test/meeting_icon.png",s=r;break;case"event":g.src=e.photos?e.photos.photo200px:"img/test/event_icon.png",d.src=e.hasPonchesMatches?"img/event-marker-favorite.png":"img/event-marker.png",s=a;break;default:g.src=e.photos?e.photos.photo200px:"img/test/user_icon.png",d.src=e.hasPonchesMatches?"img/user-marker-favorite.png":"img/user-marker.png",s=o}g.onload=s,g.crossOrigin="anonymous",d.onload=s,d.crossOrigin="anonymous"},n.createMarker=function(t,r,o){var a=new google.maps.Marker({position:new google.maps.LatLng(r.latitude,r.longitude),icon:{url:t,size:o,scaledSize:o},animation:google.maps.Animation.DROP});n.markersMap.set(a,r),a.addListener("click",function(){n.cardsArray=[],n.cardsArray.push(n.markersMap.get(a)),e.$digest()}),n.markerCluster.addMarker(a)},n.drawDefaultMarker=function(e){n.map.setCenter({lat:e.latitude,lng:e.longitude+.005})},n.getAddress=function(t){n.geocoder.geocode({latLng:new google.maps.LatLng(t[0],t[1])},function(r,o){o===google.maps.GeocoderStatus.OK&&r[0]&&(n.coordinatesMap.set(t.join("|"),r[0].address_components[1].short_name+",\n              "+r[0].address_components[0].short_name),e.$digest())})},n.clearMap=function(){n.markerCluster.clearMarkers()},n.zoomIn=function(){n.map.setZoom(n.map.getZoom()+1)},n.zoomOut=function(){n.map.setZoom(n.map.getZoom()-1)}}function getMapInfo(e){function t(){return e({url:GOOGLE_IP+"map",method:"GET",params:{}})}function n(t){function n(e){var n=GOOGLE_IP+"map?";for(t in e)e[t]&&(n+=t+"="+e[t]+"&");return n=n.slice(0,-1)}return e({url:n(t),method:"GET",params:{}})}return{getAll:t,getFilteredInfo:n}}function mapResize(){return{templateUrl:"views/mapResize.html"}}function mapFilter(){return{templateUrl:"views/mapFilter.html"}}function mapUserPosition(){return{templateUrl:"views/mapCUP.html"}}function card(){return{templateUrl:"views/mapCard.html"}}function socketFactory(e,t,n){var r=this,o=new WebSocket("ws://api.conneccity.net/dev/notifications?token="+e.getToken().access_token);this.counter=new Set,this.chatMessage={},this.message={},this.connect=function(){o.onopen=function(){},o.onclose=function(){},o.onmessage=function(e){var o=JSON.parse(e.data);r.message=o.payload,r.message.sender.id!==n.getObject("currentUser").id&&r.counter.add(o.payload.chatId),"MESSAGE_READ"===o.type?r.counter.delete(o.payload.chatId):r.chatMessage[o.payload.chatId]=o.payload.id,t.$digest()},o.onerror=function(){}}}function placePicker(e){return{template:"<conneccity-map class='map'></conneccity-map>",link:function(t){var n=void 0,r=void 0;google.maps.event.addListener(e.map,"click",function(o){n&&n.setMap(null),n=new google.maps.Marker({position:o.latLng,draggable:!0,map:e.map}),r={lat:n.position.lat(),lng:n.position.lng()},t.placePicker=r})}}}function PonchPickerController(){function e(e){if(r.my.length<5&&e){for(var t=0;t<r.my.length;t+=1)if(r.my[t]===e)return;r.my.push(e),r.item=""}o=!0}function t(e){for(var t=0;t<r.my.length;t+=1)r.my[t]===e&&(r.my.splice(t,1),o=!0)}function n(){o?r.submitFunc({ponches:r.my}):r.hideFunc()}var r=this,o=!1;r.add=e,r.delete=t,r.submit=n}function ponchPicker(){return{scope:{my:"=my",related:"=related",hideFunc:"&",submitFunc:"&"},templateUrl:"views/ponchPicker.html",controller:"PonchPickerController",controllerAs:"ponchPickerVm"}}function UsersController(e,t,n){function r(){t.get().then(function(e){s.users=e.data}),e.$watch(function(){s.$broadcast("scrollRebuild")})}function o(e){return n.getEventListImg(e)}function a(e){return n.formatDate(e)}function i(e){return n.getDistance(e)}function c(e){return n.getUserListImg(e)}var s=this;s.getEventImg=o,s.parseDate=a,s.getFormattedDistance=i,s.getUserImgUrl=c,r()}function getUsers(e){function t(){return e({url:GOOGLE_IP+"users?count=50",method:"GET"})}return{get:t}}function UserProfileController(e,t,n,r,o){function a(){t.get(n.id).then(function(e){h.user=e.data,t.getEvents(h.user.id).then(function(e){h.events=e.data})}),t.getChatId(n.id).then(function(e){h.chatId=e.data.id}),e.$watch(function(){e.$broadcast("scrollRebuild")})}function i(e){t.getEvents(h.user.id,e).then(function(e){h.events=e.data})}function c(e){return r.getEventListImg(e)}function s(e){return r.formatDate(e)}function u(){h.aboutBox=!h.aboutBox}function l(e){return r.getAge(e)}function g(e,t){return r.getAddress(e,t)}function d(e){return r.getDistance(e)}function m(e){return r.getLastSeenTime(e)}function f(e){return r.getUserImg(e)}function p(){o.userId=h.user.id}var h=this;h.aboutBox=!1,h.getFilteredEventsList=i,h.getEventImg=c,h.parseDate=s,h.toggleAbout=u,h.getAge=l,h.getAddress=g,h.getFormattedDistance=d,h.lastSeenFormatted=m,h.getUserImgUrl=f,h.setUser=p,a()}function getUserData(e){function t(t){return e({url:GOOGLE_IP+"users/"+t,method:"GET"})}function n(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";return e({url:GOOGLE_IP+"users/"+t+"/events/"+n,method:"GET"})}function r(t){return e({url:GOOGLE_IP+"users/"+t+"/chat",method:"GET"})}return{get:t,getEvents:n,getChatId:r}}function SignedUserProfileController(e,t,n,r){function o(){t.getEvents(m.user.id).then(function(e){m.events=e.data}),e.$watch(function(){e.$broadcast("scrollRebuild")})}function a(e){return n.getEventListImg(e)}function i(e){return n.formatDate(e)}function c(e){t.getEvents(m.user.id,e).then(function(e){m.events=e.data})}function s(){m.aboutBox=!e.aboutBox}function u(e){return n.getLastSeenTime(e)}function l(e){return n.getAge(e)}function g(e,t){return n.getAddress(e,t)}function d(e){return n.getUserImg(e)}var m=this;m.user=r.getObject("currentUser"),m.isProfile=!0,m.aboutBox=!1,m.getEventImg=a,m.parseDate=i,m.getFilteredEventsList=c,m.toggleAbout=s,m.lastSeenFormatted=u,m.getAge=l,m.getAddress=g,m.getUserImgUrl=d,o()}function MeetingsController(e,t,n,r,o){function a(){t.get().then(function(e){m.meetings=e.data}),e.$watch(function(){e.$broadcast("rebuild:me")})}function i(e,t){return n.getAddress(e,t)}function c(e){return n.getDistance(e)}function s(e){return n.formatDate(e)}function u(e){t.get(e).then(function(e){m.meetings=e.data})}function l(e){r.join(e).then(function(){o.reload()})}function g(e){r.leave(e),o.reload()}function d(e){return n.getMeetingStatusIconStyle(e)}var m=this;m.getAddress=i,m.getDistance=c,m.getTime=s,m.getFilteredMeetings=u,m.accept=l,m.decline=g,m.getStatusStile=d,a()}function getMeetings(e){function t(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return e({url:GOOGLE_IP+"meetings/"+t,method:"GET"})}return{get:t}}function MeetingProfileController(e,t,n,r,o,a,i){function c(){n.get(r.id).then(function(e){p.meeting=e.data,i.drawDefaultMarker(p.meeting)}),n.sendMessage(r.id).then(function(e){p.chatId=e.data.id}),e.$watch(function(){e.$broadcast("scrollRebuild")})}function s(e,n){return t.getAddress(e,n)}function u(e){return t.formatDate(e)}function l(e){return t.getUserImg(e)}function g(e){n.join(e)}function d(e){n.leave(e).success(function(){o.go("app.meetings")})}function m(e){return t.getMeetingStatusIconStyle(e)}function f(e){return a.getObject("currentUser").id===e}var p=this;p.getAddress=s,p.parseDate=u,p.getUserImg=l,p.join=g,p.leave=d,p.getStatusStile=m,p.checkPermition=f,c()}function getMeetingInfo(e){function t(t){return e({url:GOOGLE_IP+"meetings/"+t,method:"GET"})}function n(t){return e({url:GOOGLE_IP+"meetings/"+t+"/members",method:"GET"})}function r(t){return e({url:GOOGLE_IP+"meetings/"+t+"/members",method:"POST"})}function o(t){return e({url:GOOGLE_IP+"meetings/"+t+"/members",method:"DELETE"})}function a(t){return e({url:GOOGLE_IP+"meetings/"+t+"/chat",method:"GET"})}return{get:t,getMembers:n,join:r,leave:o,sendMessage:a}}function CreateMeetingController(e,t,n,r,o,a){function i(){return t.getGoogleMapsSrc([s.user.latitude,s.user.longitude])}function c(t){a.id?e.update({startAt:t.startAt,latitude:s.placePicker.lat,longitude:s.placePicker.lng,description:t.description,invitedIds:n.userId?[n.userId]:s.meeting.invitedIds},a.id).then(function(){n.userId="",r.go("app.meetings")}):e.create({startAt:t.startAt,latitude:s.placePicker.lat,longitude:s.placePicker.lng,description:t.description,invitedIds:n.userId?[n.userId]:s.meeting.invitedIds}).then(function(){n.userId="",r.go("app.meetings")})}var s=this;s.user=n.getObject("currentUser"),s.meeting={},s.getMapSrc=i,s.create=c,o.get(a.id).then(function(e){var t=e.data;s.meeting.invitedIds=[],s.meeting.startAt=new Date(t.startAt),s.meeting.latitude=t.latitude,s.meeting.longitude=t.longitude;for(var r in t.members)t.members[r].id!==n.getObject("currentUser").id&&s.meeting.invitedIds.push(t.members[r].id);s.meeting.description=t.description})}function createMeeting(e){function t(t){return e({url:GOOGLE_IP+"meetings/",method:"POST",data:t})}function n(t,n){return e({url:GOOGLE_IP+"meetings/"+n,method:"PUT",data:t})}return{create:t,update:n}}function EventsController(e,t,n,r){function o(){t.get().then(function(e){g.events=e.data}),e.$watch(function(){e.$broadcast("rebuild:me")})}function a(e){t.get(e).then(function(e){g.events=e.data})}function i(){return r.getObject("currentUser").id}function c(e){return n.getDistance(e)}function s(e){return n.formatDate(e)}function u(e,t){return n.getAddress(e,t)}function l(e){return n.getEventListImg(e)}var g=this;g.getCurrentUserId=i,g.getFilteredEvents=a,g.getFormattedDistance=c,g.parseDate=s,g.getAddress=u,g.getEventImg=l,o()}function getEvents(e){function t(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return e({url:GOOGLE_IP+"events/"+t,method:"GET"})}return{get:t}}function getEventInfo(e){function t(t){return e({url:GOOGLE_IP+"events/"+t,method:"GET"})}function n(t){return e({url:GOOGLE_IP+"events/"+t+"/members",method:"GET"})}function r(t){return e({url:GOOGLE_IP+"events/"+t+"/members",method:"POST"})}function o(t){return e({url:GOOGLE_IP+"events/"+t+"/members",method:"DELETE"})}function a(t){return e({url:GOOGLE_IP+"events/"+t+"/chat",method:"GET"})}return{get:t,getMembers:n,join:r,leave:o,sendMessage:a}}function EventProfileController(e,t,n,r,o){function a(){t.get(n.id).then(function(e){m.event=e.data}),t.getMembers(n.id).then(function(e){m.members=e.data}),t.sendMessage(n.id).then(function(e){m.chatId=e.data.id}),e.$watch(function(){e.$broadcast("scrollRebuild")})}function i(e,t){return r.getAddress(e,t)}function c(e){return r.formatDate(e)}function s(e){return r.getUserImg(e)}function u(e){t.join(e).success(function(){m.toggleMember()})}function l(e){t.leave(e).success(function(){m.toggleMember()})}function g(){m.event.isMember?(m.event.isMember=!1,m.members.shift()):(m.members.unshift(o.getObject("currentUser")),m.event.isMember=!0)}function d(e){return o.getObject("currentUser").id===e}var m=this;m.join=u,m.leave=l,m.getAddress=i,m.parseDate=c,m.getUserImg=s,m.toggleMember=g,m.checkPermition=d,a()}function CreateEventController(e,t,n,r,o,a){function i(){a.get(o.id).then(function(e){var t=e.data;u.event.name=t.name,u.event.startAt=new Date(t.startAt),u.event.latitude=t.latitude,u.event.longitude=t.longitude,u.event.description=t.description,u.event.price=t.priceFrom})}function c(t){o.id?e.update({name:t.name,startAt:t.startAt,latitude:u.placePicker.lat,longitude:u.placePicker.lng,description:t.description,priceFrom:t.price},o.id).then(function(){r.go("app.events")}):e.create({name:t.name,startAt:t.startAt,latitude:u.placePicker.lat,longitude:u.placePicker.lng,description:t.description,priceFrom:t.price}).then(function(){r.go("app.events")})}function s(){return t.getGoogleMapsSrc([u.user.latitude,u.user.latitude])}var u=this;u.user=n.getObject("currentUser"),u.pickerVisible=!1,u.event={},u.create=c,u.getMapSrc=s,i()}function createEvent(e){function t(t){return e({url:GOOGLE_IP+"events/",method:"POST",data:t})}function n(t,n){return e({url:GOOGLE_IP+"events/"+n,method:"PUT",data:t})}return{create:t,update:n}}function ChatListController(e,t,n){function r(){t.get().then(function(e){c.chats=e.data})}function o(t){return e.getUserImgUrl(t)}function a(t){return e.getLastSeenTime(t)}function i(e){return n.counter.has(e)}var c=this;c.getUserImg=o,c.getLastSeenTime=a,c.getState=i,r()}function getChats(e){function t(){return e({url:GOOGLE_IP+"chats/",method:"GET"})}return{get:t}}function schrollBottom(){return{scope:{schrollBottom:"="},link:function(e,t){e.$watchCollection("schrollBottom",function(e){e&&(t[0].scrollTop=t[0].scrollHeight)})}}}function getChat(e){function t(t){return e({url:GOOGLE_IP+"chats/"+t+"/messages",method:"PUT"})}function n(t,n){return e({url:GOOGLE_IP+"chats/"+t+"/messages",data:{message:n},method:"POST"})}function r(t){return e({url:GOOGLE_IP+"chats/"+t+"/messages",method:"GET"})}function o(t){return e({url:GOOGLE_IP+"chats/'"+t,method:"GET"})}return{read:t,send:n,get:o,getMessages:r}}function ChatController(e,t,n,r,o,a){function i(){r.get(o.id).then(function(e){m.chat=e.data}).then(function(){r.getMessages(o.id).then(function(e){m.messages=e.data})}),e.$watch(function(){return t.message},function(n,r){if(n&&n!==r){if(n.chatId===o.id&&m.messages.unshift(n),n.chatId===o.id){var a=1;do t.chatMessage[n.chatId]>=m.messages[a].id&&(m.messages[a].readState=1),a+=1;while(!m.messages[a].readState)}m.message="",n.sender.id!==e.currentUserId&&t.counter.add(n.chatId)}})}function c(e){return n.getTime(e)}function s(e){return n.getUserImgUrl(e)}function u(e){return n.getTime(e)}function l(e){return e===m.currentUserId}function g(e){r.read(o.id),e&&r.send(o.id,e).then(function(){m.message="",t.counter.delete(o.id)})}function d(e){return!e.readState&&a.getObject("currentUser").id!==e.sender.id}var m=this;m.currentUserId=a.getObject("currentUser").id,m.messages=[],m.getTime=c,m.getUserImg=s,m.getLastSeenTime=u,m.checkSender=l,m.sendMessage=g,m.getStatus=d,i()}function formatter(e){function t(t,n){var r=e.coordinatesMap.get([t,n].join("|"));return!r&&t&&n&&e.getAddress([t,n]),r}function n(e){return e<1e3?e+" m":(e/1e3).toFixed(1)+" km"}function r(e,t){return e&&t?null:e?1:t?2:null}function o(e){return new Date(e).getTime()/1e3}function a(e){var t=new Date,n=new Date(e);return t.getYear()-n.getYear()-!!(t.getMonth()-n.getMonth())}function i(e){var t=6e4,n=60*t,r=24*n,o="en-us",a=new Date,i=new Date(e),c=new Date(a-i);return c>r?i.toLocaleDateString(o):c>n?(c/n).toFixed(0)+" hours ago":c>t?(c/t).toFixed(0)+" minutes ago":c<t?(c/1e3).toFixed(0)+" seconds ago":void 0}function c(e){return e||"img/test/user_icon.png"}function s(e){return e||"img/test/user_icon.png"}function u(e){return e||"img/test/profile-card-bg.jpg"}function l(e){return"DECLINED"===e?"meeting-status-icon_declined":"INVITED"===e?"meeting-status-icon_invited":"meeting-status-icon_accepted"}function g(e){var t=new Date(e),n=t.getHours();n=n<10?"0"+n:n;var r=t.getMinutes();return r=r<10?"0"+r:r,n+":"+r}function d(e){var t=_slicedToArray(e,2),n=t[0],r=t[1];return"https://www.google.com.ua/maps/@"+n+","+r+",12z"}function m(e){var t=new Date(e);return t.toDateString()}return{getAddress:t,getDistance:n,getGender:r,getUnixTime:o,getAge:a,getLastSeenTime:i,getUserListImg:c,getUserImg:s,getEventListImg:u,getMeetingStatusIconStyle:l,getTime:g,getGoogleMapsSrc:d,formatDate:m}}var _slicedToArray=function(){function e(e,t){var n=[],r=!0,o=!1,a=void 0;try{for(var i,c=e[Symbol.iterator]();!(r=(i=c.next()).done)&&(n.push(i.value),!t||n.length!==t);r=!0);}catch(e){o=!0,a=e}finally{try{!r&&c.return&&c.return()}finally{if(o)throw a}}return n}return function(t,n){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),GOOGLE_IP="http://93.77.133.213:8080/";angular.module("conneccityApp",["ngAnimate","ngScrollbar","ngResource","ui.router","signIn","signUp","conneccityMap","users","userProfile","meetings","events","dataFormatter","ngCookies","angular-oauth2","chatList","chat","eventProfile","meetingProfile","geolocation","createMeeting","createEvent","websocket","placePicker","ponchPicker"]).run(AppRun),AppRun.$inject=["$rootScope","$state","OAuth","$location"],angular.module("conneccityApp").config(appConfig),appConfig.$inject=["$stateProvider","$urlRouterProvider","OAuthProvider","OAuthTokenProvider"],angular.module("conneccityApp").controller("AppController",AppController),AppController.$inject=["getSignedUserInfo","OAuthToken","formatter","$cookies","socketFactory","$interval","getUserLocation"],angular.module("conneccityApp").factory("getSignedUserInfo",getSignedUserInfo),getSignedUserInfo.$inject=["$http"],angular.module("signIn",[]),angular.module("signIn").controller("SignInController",SignInController),SignInController.$inject=["$state","OAuth","$timeout"],angular.module("signUp",["geolocation","ui.router"]),angular.module("signUp").factory("addUser",addUser),addUser.$inject=["$http"],angular.module("signUp").controller("SignUpController",SignUpController),SignUpController.$inject=["addUser","OAuthToken","$state","$cookies","getUserLocation"],angular.module("conneccityMap",["ngResource","ui.router"]),angular.module("conneccityMap").directive(conneccityMap),conneccityMap.$inject=["mapCreate"],angular.module("conneccityMap").directive(conneccityMarker),conneccityMarker.$inject=["mapCreate"],angular.module("conneccityMap").controller("MapCreateController",MapCreateController),MapCreateController.$inject=["$scope","mapCreate","getMapInfo","formatter"],angular.module("conneccityMap").service("mapCreate",mapCreate).factory("getMapInfo",getMapInfo),mapCreate.$inject=["$rootScope","$cookies"],getMapInfo.$inject=["$http"],angular.module("conneccityMap").directive(mapResize),angular.module("conneccityMap").directive(mapFilter),angular.module("conneccityMap").directive(mapUserPosition),angular.module("conneccityMap").directive(card),angular.module("geolocation",[]),angular.module("geolocation").factory("getUserLocation",["setLocation",function(e){function t(){navigator.geolocation?navigator.geolocation.getCurrentPosition(function(t){e.set({latitude:t.coords.latitude,longitude:t.coords.longitude})}):e.set({latitude:45,longitude:45})}return{get:t}}]).factory("setLocation",["$http",function(e){function t(t){return e({url:GOOGLE_IP+"map",method:"POST",data:t,headers:{"Content-Type":"application/json"}})}return{set:t}}]),angular.module("websocket",[]),angular.module("websocket").service("socketFactory",socketFactory),socketFactory.$inject=["OAuthToken","$rootScope","$cookies"],angular.module("placePicker",["conneccityMap"]),angular.module("placePicker").directive(placePicker),placePicker.$inject=["mapCreate"],angular.module("ponchPicker",[]),angular.module("ponchPicker").controller(PonchPickerController),angular.module("ponchPicker").directive(ponchPicker),angular.module("users",["ngScrollbar"]),angular.module("users").controller("UsersController",UsersController),UsersController.$inject=["$scope","getUsers","formatter"],angular.module("users").factory("getUsers",getUsers),getUsers.$inject=["$http"],angular.module("userProfile",["ngScrollbar"]),angular.module("userProfile").controller("UserProfileController",UserProfileController),UserProfileController.$inject=["$scope","getUserData","$stateParams","formatter","$cookies"],angular.module("userProfile").factory("getUserData",getUserData),getUserData.$inject=["$http"],angular.module("userProfile").controller("SignedUserProfileController",SignedUserProfileController),SignedUserProfileController.$inject=["$scope","getUserData","formatter","$cookies"],angular.module("meetings",[]),angular.module("meetings").controller("MeetingsController",MeetingsController),MeetingsController.$inject=["$scope","getMeetings","formatter","getMeetingInfo","$state"],angular.module("meetings").factory("getMeetings",getMeetings),getMeetings.$inject=["$http"],angular.module("meetingProfile",["conneccityMap"]),angular.module("meetingProfile").controller("MeetingProfileController",MeetingProfileController),MeetingProfileController.$inject=["$scope","formatter","getMeetingInfo","$stateParams","$state","$cookies","mapCreate"],angular.module("meetingProfile").factory("getMeetingInfo",getMeetingInfo),getMeetingInfo.$inject=["$http"],angular.module("createMeeting",[]),angular.module("createMeeting").controller("CreateMeetingController",CreateMeetingController),CreateMeetingController.$inject=["createMeeting","formatter","$cookies","$state","getMeetingInfo","$stateParams"],angular.module("createMeeting").factory("createMeeting",createMeeting),createMeeting.$inject=["$http"],angular.module("events",[]),angular.module("events").controller("EventsController",EventsController),EventsController.$inject=["$scope","getEvents","formatter","$cookies"],angular.module("events").factory("getEvents",getEvents),getEvents.$inject=["$http"],angular.module("eventProfile",[]),angular.module("eventProfile").factory("getEventInfo",getEventInfo),getEventInfo.$inject=["$http"],angular.module("eventProfile").controller("EventProfileController",EventProfileController),EventProfileController.$inject=["$scope","getEventInfo","$stateParams","formatter","$cookies"],angular.module("createEvent",[]),angular.module("createEvent").controller("CreateEventController",CreateEventController),CreateEventController.$inject=["createEvent","formatter","$cookies","$state","$stateParams","getEventInfo"],angular.module("createEvent").factory("createEvent",createEvent),createEvent.$inject=["$http"],angular.module("chatList",[]),angular.module("chatList").controller("ChatListController",ChatListController),ChatListController.$inject=["formatter","getChats","socketFactory"],angular.module("chatList").factory("getChats",getChats),getChats.$inject=["$http"],angular.module("chat",["websocket"]),angular.module("chat").directive(schrollBottom),angular.module("chat").factory("getChat",getChat),getChat.$inject=["$http"],angular.module("chat").controller("ChatController",ChatController),ChatController.$inject=["$scope","socketFactory","formatter","getChat","$stateParams","$cookies","$rootScope"],angular.module("dataFormatter",[]),angular.module("dataFormatter").factory("formatter",formatter),formatter.$inject=["mapCreate"];
"use strict";(self.webpackChunkreact_first_project=self.webpackChunkreact_first_project||[]).push([[353],{7353:(s,e,a)=>{a.r(e),a.d(e,{default:()=>v});a(5043);const t={mainContent:"Messages_mainContent__Okdyr",dialogsItems:"Messages_dialogsItems__y80lo",activeLink:"Messages_activeLink__ObOLR",messages:"Messages_messages__8s+pC",message:"Messages_message__O19dD",textarea:"Messages_textarea__92Mzj",button:"Messages_button__ccvvi"};var i=a(1675),n=a(579);const m=s=>{const e=`/messages/${s.id}`;return(0,n.jsx)("div",{className:`${t.dialog}`,children:(0,n.jsx)(i.k2,{to:e,className:s=>{let{isActive:e}=s;return e?t.activeLink:""},children:s.name})})},g=s=>(0,n.jsxs)("div",{className:`${t.message}`,children:[(0,n.jsx)("img",{src:`${s.itemData.image}`,alt:"ava"}),s.itemData.message]});var d=a(5963),c=a(3842),r=a(4111),l=a(2876);const o=(0,r.d)(15),x=(0,c.A)({form:"addMessage"})((s=>(0,n.jsxs)("form",{onSubmit:s.handleSubmit,children:[(0,n.jsx)("div",{children:(0,n.jsx)(d.A,{className:t.textarea,component:l.TM,validate:[r.A,o],name:"newMessageText",placeholder:"Write your message here..."})}),(0,n.jsx)("div",{children:(0,n.jsx)("button",{className:t.button,children:"Send message"})})]}))),_=s=>{const e=s.dialogsList.map((s=>(0,n.jsx)(m,{id:s.id,name:s.name},s.id))),a=s.messagesList.map((s=>(0,n.jsx)(g,{itemData:s},s.id)));return(0,n.jsxs)("div",{className:t.mainContent,children:[(0,n.jsx)("div",{className:t.dialogsItems,children:e}),(0,n.jsxs)("div",{children:[(0,n.jsx)("div",{className:t.messages,children:a}),(0,n.jsx)(x,{onSubmit:e=>{s.sendMessage(e.newMessageText)}})]})]})};var h=a(9821),j=a(3003),u=a(7863);const v=(0,a(3923).Zz)(u.H,(0,j.Ng)((s=>({dialogsList:s.messagesPage.dialogsList,messagesList:s.messagesPage.messagesList,newMessageText:s.messagesPage.newMessageText})),(s=>({sendMessage:e=>{const a=(0,h.g)(e);s(a)}}))))(_)},7863:(s,e,a)=>{a.d(e,{H:()=>g});var t=a(1675),i=a(3003),n=a(579);const m=s=>({isAuth:s.auth.isAuth}),g=s=>(0,i.Ng)(m)((e=>e.isAuth?(0,n.jsx)(s,{...e}):(0,n.jsx)(t.C5,{to:"/login"})))}}]);
//# sourceMappingURL=353.3cd5d1a7.chunk.js.map
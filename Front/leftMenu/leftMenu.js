import Axios from '../axios'
import $ from 'jquery'

class LeftMenu{
    constructor() {
        let leftMenu = this;
        document.addEventListener('DOMContentLoaded', ()=>{
            this.init();
        });
    }
    init() {
        Axios.get("/leftMenu")
            .then((res) => {
                let ul = document.getElementById("leftMenu");
                this.createMenu(res.data,ul);
            })
            .then(this.eventListener);
    }
    createMenu(menuData, parentElement) {
        menuData.forEach((data)=>{
            if(!data.upId){
                const li = document.createElement("li");
                const a= document.createElement("a");
                a.href = CONTEXTPATH+data.url;
                a.textContent = data.menuNm;
                li.setAttribute("id",data.menuId);
                li.appendChild(a);
                if(CONTEXTPATH+data.url === window.location.pathname){
                    li.classList.add('item');
                    li.classList.add('item-on');
                }
                parentElement.appendChild(li);
            }else {
                const menuItem = document.getElementById(data.upId);
                menuItem.querySelector('a').setAttribute("class","has-sub-off");
                const div = menuItem.querySelector('div');
                if(!div){
                    const anchorTag = menuItem.querySelector('a:first-child');
                    anchorTag.href = '#';
                    const div = document.createElement("div");
                    const ul = document.createElement("ul");
                    const li = document.createElement("li")
                    const a = document.createElement("a")
                    if(CONTEXTPATH+data.url === window.location.pathname){
                        menuItem.querySelector('a').setAttribute("class","has-sub-on");
                        li.classList.add('sub-item-on');
                    }
                    a.href = CONTEXTPATH+data.url;
                    a.textContent = data.menuNm;
                    li.appendChild(a);
                    ul.appendChild(li)
                    div.appendChild(ul);
                    div.setAttribute("class","sub-menu-box");
                    menuItem.appendChild(div);
                }else{
                    const ul = div.querySelector('ul');
                    const li = document.createElement("li")
                    const a = document.createElement("a")
                    if(CONTEXTPATH+data.url === window.location.pathname){
                        li.classList.add('sub-item-off');
                    }
                    a.href = CONTEXTPATH+data.url;
                    a.textContent = data.menuNm;
                    li.appendChild(a);
                    ul.appendChild(li);
                    div.appendChild(ul);
                }
            }
        })
    }

    eventListener(){
        $('.has-sub-off').click(function(){
            let self = $(this);
            let next = self.next();
            if (!$(this).hasClass('has-sub-on')) {
                next.find('.sub-2depth').hide();
                self.removeClass('has-sub-off');
                self.addClass('has-sub-on');
                next.stop().slideDown();
            } else {
                self.removeClass('has-sub-on');
                self.addClass('has-sub-off');
                next.stop().slideUp();
            }
        });
        $('.has-sub-on').click(function(){
            let self = $(this);
            let next = self.next();
            if (!$(this).hasClass('has-sub-on')) {
                next.find('.sub-2depth').hide();
                self.removeClass('has-sub-off');
                self.addClass('has-sub-on');
                next.stop().slideDown();
            } else {
                self.removeClass('has-sub-on');
                self.addClass('has-sub-off');
                next.stop().slideUp();
            }
        });
        $('.sub-menu-box ul > li > a').click(function(){
            $(this).next().stop().slideToggle();
        });
    }
}

export default new LeftMenu();
import Axios from '../axios';
export class Main{
    constructor() {
        document.addEventListener('DOMContentLoaded', () => {
            this.init();
        });
    }
    init(){
        const pwdPop= document.querySelector("#userPwdInit");
        if(pwdPop){
            document.querySelector(".pwdInit").addEventListener("click",()=>{
                const pwdck= document.querySelector(".pwdCk").value;
                const pwd= document.querySelector(".pwd").value;
                if(pwdck === pwd){
                    this.update(pwd);
                }else{
                    alert("비밀번호를 확인해 주세요");
                }
            })
        }
    }
    update(pwd){
        const data = {userPwd:pwd};
        Axios.put("/comm/userPwdUpdate",data)
            .then((response)=>{
                logout();
            })
    }
}

export default new Main();
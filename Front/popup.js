/**
 * 팦업창 보이기 지우기 이벤트
 * @param div 팦업 Element
 * @param option true : false
 */
export function pop(div, option){
    if(option){
        div.style.display = 'block';
    }else{
        div.style.display = 'none';
    }

}
export function scrollEndEvt(div, table, evt, page) {
    let tableDiv = document.getElementById(div);
    let scrollableTable = document.getElementById(table);
    let scrollTop = scrollableTable.scrollTop;
    let maxScrollHeight = tableDiv.scrollHeight - scrollableTable.clientHeight;
    if (maxScrollHeight === scrollTop) {
        evt(Number(page));
    }
}
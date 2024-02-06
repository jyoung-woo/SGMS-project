import Axios from './axios';

export function stdgCdBox(stdgDiv, cd) {
    if (cd) {
        createCtpv(stdgDiv, cd);
    } else {
        createCtpv(stdgDiv);
    }
}


function createCtpv(stdgDiv, cd) {
    const selectElementsInMyDiv = stdgDiv.querySelectorAll('select');
    selectElementsInMyDiv.forEach(select => select.remove());
    Axios.get("/comm/ctpvList")
        .then((response) => {
            const data = response.data;
            const select = document.createElement("select");
            select.className = 'userForm-select ctpv';
            select.style.width = 'calc(100% - 400px)';
            const option = document.createElement("option");
            option.textContent = '선택';
            option.value = '';
            select.appendChild(option);
            data.forEach((item) => {
                const option = document.createElement("option");
                option.value = item.stdgCd;
                option.textContent = item.ctpvNm;
                select.appendChild(option);
            })
            stdgDiv.appendChild(select);
            if (cd) {
                if (cd.slice(0, 2) !== '36') {
                    select.value = cd.slice(0, 2);
                    createSgg(stdgDiv, cd);
                } else {
                    select.value = cd.slice(0, 5);
                    createStty(stdgDiv, cd);
                }
            }
            select.addEventListener("change", () => {
                    if (document.querySelector(".sgg")) {
                        document.querySelector(".sgg").remove();
                    }
                    if (document.querySelector(".stty")) {
                        document.querySelector(".stty").remove();
                    }
                    if (document.querySelector(".stli")) {
                        document.querySelector(".stli").remove();
                    }
                createSgg(stdgDiv);
                }
            );
        })
}

function createSgg(stdgDiv, cd) {
    const ctpv = document.querySelector(".ctpv");
    if (document.querySelector(".sgg") != null) {
        document.querySelector(".sgg").remove();
    }
    if (ctpv.value === '') return;
    const params = {stdgCd: ctpv.value}
    Axios.get("/comm/sggList", {params})
        .then((response) => {
            const data = response.data;
            const select = document.createElement("select");
            select.className = "userForm-select sgg";
            select.style.width = "calc(100% - 420px)";
            if (data.length <= 0) {
                createStty(stdgDiv);
            } else {
                const option = document.createElement("option");
                option.value = '';
                option.textContent = 'All';
                select.appendChild(option);
                data.forEach((item) => {
                    const option = document.createElement("option");
                    option.value = item.stdgCd;
                    option.textContent = item.sggNm;
                    select.appendChild(option);
                })
                stdgDiv.appendChild(select);
                if (cd) {
                    select.value = cd.slice(2, 5);
                    createStty(stdgDiv, cd);
                }
                select.addEventListener("change", () => {
                    createStty(stdgDiv);
                });
            }
        })
}

function createStty(stdgDiv, cd) {
    if (document.querySelector(".stty") != null) {
        document.querySelector(".stty").remove();
    }
    const sgg = document.querySelector(".sgg");
    const select = document.createElement("select");
    select.className = "userForm-select stty";
    select.style.width = "calc(100% - 420px)";
    /* sgg 가업는 특별 자치시일경우는 else */
    if (sgg) {
        /* All 이 아닐경우*/
        if (sgg.value !== '') {
            const stdgCd = document.querySelector(".ctpv").value + sgg.value;
            const params = {stdgCd: stdgCd};
            const option = document.createElement("option");
            option.value = '';
            option.textContent = 'All';
            select.appendChild(option);
            Axios.get('/comm/sttyList', {params})
                .then((response) => {
                    const data = response.data;
                    data.forEach((item) => {
                        const option = document.createElement("option");
                        option.value = item.stdgCd;
                        option.textContent = item.sttyEndNm;
                        select.appendChild(option);
                    })
                    stdgDiv.appendChild(select);
                    if (cd) {
                        select.value = cd.slice(5, 8);
                        createStli(stdgDiv, cd);
                    }
                    select.addEventListener("change", () => {
                        createStli(stdgDiv);
                    });
                })
        }
    } else {
        const stdgCd = document.querySelector(".ctpv").value;
        const params = {stdgCd: stdgCd};
        const option = document.createElement("option");
        option.value = '';
        option.textContent = 'All';
        select.appendChild(option);
        Axios.get('/comm/sttyList', {params})
            .then((response) => {
                const data = response.data;
                data.forEach((item) => {
                    const option = document.createElement("option");
                    option.value = item.stdgCd;
                    option.textContent = item.sttyEndNm;
                    select.appendChild(option);
                })
                stdgDiv.appendChild(select);
                if (cd) {
                    select.value = cd.slice(5, 8);
                    createStli(stdgDiv, cd);
                }
                select.addEventListener("change", () => {
                    createStli(stdgDiv);
                });
            });
    }

    function createStli(stdgDiv) {
        if (document.querySelector(".stli") != null) {
            document.querySelector(".stli").remove();
        }
        const ctpv = document.querySelector(".ctpv");
        const stty = document.querySelector(".stty");
        const sgg = document.querySelector(".sgg");
        const select = document.createElement("select");
        select.className = "userForm-select stli";
        select.style.width = "calc(100% - 430px)";
        if (sgg) {
            if (stty.value !== '') {
                const stdgCd = ctpv.value + sgg.value + stty.value;
                const params = {stdgCd: stdgCd};
                Axios.get("/comm/stliList", {params})
                    .then((response) => {
                        const data = response.data;
                        data.forEach((item) => {
                            const option = document.createElement("option");
                            option.value = item.stdgCd;
                            option.textContent = item.stliNm;
                            select.appendChild(option);
                            select.appendChild(option);
                            stdgDiv.appendChild(select);
                        })
                        if (cd) {
                            select.value = cd.slice(8, 10);
                        }
                    })
            }
        } else {
            const stdgCd = ctpv.value + stty.value;
            const params = {stdgCd: stdgCd};
            Axios.get("/comm/stliList", {params})
                .then((response) => {
                    const data = response.data;
                    data.forEach((item) => {
                        const option = document.createElement("option");
                        option.value = item.stdgCd;
                        option.textContent = item.stliNm;
                        select.appendChild(option);
                        select.appendChild(option);
                        stdgDiv.appendChild(select);
                    })
                    if (cd) {
                        select.value = cd.slice(8, 10);
                    }
                })
        }
    }

}
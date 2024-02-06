create table public.sys_cd (
   sys_cd character varying(6) primary key not null, -- 시스템코드
   sys_cd_nm character varying(256) not null, -- 시스템코드명
   depth numeric not null, -- 깊이
   up_cd character varying(6), -- 상위코드
   doc character varying(2000) -- 설명
);
comment on table public.sys_cd is '시스템_코드';
comment on column public.sys_cd.sys_cd is '시스템코드';
comment on column public.sys_cd.sys_cd_nm is '시스템코드명';
comment on column public.sys_cd.depth is '깊이';
comment on column public.sys_cd.up_cd is '상위코드';
comment on column public.sys_cd.doc is '설명';

create table public.stdg(
    stdg_cd varchar primary key , -- 법정동코드
    ctpv_nm varchar(40) not null ,  -- 시도명
    sgg_nm  varchar(40),    --시군구명
    stty_end_nm   varchar(40),  --읍면동명
    stli_nm varchar(40) -- 리명
);
comment on table public.stdg is '법정동테이블';
comment on column public.stdg.stdg_cd is '법정동테이블';
comment on column public.stdg.ctpv_nm is '시도명';
comment on column public.stdg.sgg_nm is '시군구명';
comment on column public.stdg.stty_end_nm is '읍면동명';
comment on column public.stdg.stli_nm is '리명';


create table public."user" (
   user_id character varying(20) primary key not null, -- 아이디
   user_pwd character varying(200) not null, -- 비밀번호
   user_email character varying(30) not null, -- 이메일
   use_yn character(1) not null default 'N'::bpchar, -- 사용여부
   look_yn character(1) not null default 'N'::bpchar, -- 잠금여부
   init_pwd_yn character(1) not null default 'N'::bpchar, --초기비밀번호 설정
   fail_cnt numeric(10) not null , -- 로그인 실패 cnt
   company_nm varchar(40) , -- 기업명
   auth_cd character(6) not null, -- 권한코드
   crt_ymd character(8) not null, -- 생성일자
   mdfcn_ymd character(8), -- 수정일자
   user_end_ymd character(8), -- 계정종료일
   stdg_cd varchar, -- 법정도코드
   doc character varying(2000), -- 설명
   foreign key (auth_cd) references public.sys_cd (sys_cd)
);
comment on table public."user" is '사용자 정보';
comment on column public."user".user_id is '아이디';
comment on column public."user".user_pwd is '비밀번호';
comment on column public."user".user_email is '이메일';
comment on column public."user".use_yn is '사용여부';
comment on column public."user".look_yn is '잠금여부';
comment on column public."user".init_pwd_yn is '초기비밀번호 설정';
comment on column public."user".fail_cnt is '로그인 실패 cnt';
comment on column public."user".company_nm is '기업명';
comment on column public."user".auth_cd is '권한코드';
comment on column public."user".crt_ymd is '생성일자';
comment on column public."user".mdfcn_ymd is '수정일자';
comment on column public."user".user_end_ymd is '계정종료일';
comment on column public."user".stdg_cd is '법정도코드';
comment on column public."user".doc is '설명';



create table public.menu (
    menu_id character(6) primary key not null, -- 메뉴아이디
    menu_nm character varying(100), -- 메뉴이름
    doc character varying(2000), -- 메뉴설명
    url character varying(100) not null, -- 메뉴URL
    up_id character varying(16), -- 상위메뉴아이디
    depth numeric, -- 메뉴단계
    "order" numeric, -- 메뉴순번
foreign key (menu_id) references public.sys_cd (sys_cd)
);
comment on table public.menu is '메뉴테이블';
comment on column public.menu.menu_id is '메뉴아이디';
comment on column public.menu.menu_nm is '메뉴이름';
comment on column public.menu.doc is '메뉴설명';
comment on column public.menu.url is '메뉴URL';
comment on column public.menu.up_id is '상위메뉴아이디';
comment on column public.menu.depth is '메뉴단계';
comment on column public.menu."order" is '메뉴순번';

create table public.menu_auth (
    menu_id character(6) not null, -- 메뉴아이디
    auth_cd character(6) not null, -- 권한 코드
    aces_cd character(4) not null, -- 접근가능코드
    doc character varying(2000), -- 설명
    primary key (menu_id, auth_cd),
    foreign key (auth_cd) references public.sys_cd (sys_cd)
    match simple on update no action on delete no action,
    foreign key (menu_id) references public.menu (menu_id)
);
comment on table public.menu_auth is '메뉴권한테이블';
comment on column public.menu_auth.menu_id is '메뉴아이디';
comment on column public.menu_auth.auth_cd is '권한 코드';
comment on column public.menu_auth.aces_cd is '접근가능코드';
comment on column public.menu_auth.doc is '설명';

create table public.obsv_info (
    obsv_cd character varying(6) not null, -- 관측소 코드
    stdg_cd varchar not null , -- 법정동코드
    obsv_sn character varying(10) not null, -- 관측소 시리얼번호
    obsv_nm character varying(20) not null, -- 관측소 이름
    oper_yn character(1) not null, -- 운영현황
    lat numeric(12,10) not null, -- 위도(latitude)
    lot numeric(12,10) not null, -- 경도(longitude)
    addr character varying(50), -- 상세 주소
    rdn_addr character varying(200), -- 도로명 주소
    use_yn character(1) default 'Y'::bpchar, -- 사용 여부
    use_type character varying(100), -- 사용 용도
    elev numeric, -- 표고
    dig_depth numeric, -- 굴착깊이
    csi_dia numeric, -- 케이싱구경
    drk_yn character(1), -- 음용여부
    instl_ymd character(8), -- 설치일자
    doc character varying(2000), -- 설명
    primary key (obsv_cd, obsv_sn),
    foreign key (obsv_cd) references public.sys_cd (sys_cd),
    foreign key (stdg_cd) references public.stdg (stdg_cd)
);
create unique index obsv_info_unique_key on obsv_info using btree (obsv_cd);
comment on table public.obsv_info is '관측소 정보';
comment on column public.obsv_info.obsv_cd is '관측소 코드';
comment on column public.obsv_info.obsv_sn is '관측소 시리얼번호';
comment on column public.obsv_info.obsv_nm is '관측소 이름';
comment on column public.obsv_info.oper_yn is '운영현황';
comment on column public.obsv_info.lat is '위도(latitude)';
comment on column public.obsv_info.lot is '경도(longitude)';
comment on column public.obsv_info.stdg_cd is '법정동코드';
comment on column public.obsv_info.addr is '상세 주소';
comment on column public.obsv_info.rdn_addr is '도로명 주소';
comment on column public.obsv_info.use_yn is '사용 여부';
comment on column public.obsv_info.use_type is '사용 용도';
comment on column public.obsv_info.elev is '표고';
comment on column public.obsv_info.dig_depth is '굴착깊이';
comment on column public.obsv_info.csi_dia is '케이싱구경';
comment on column public.obsv_info.drk_yn is '음용여부';
comment on column public.obsv_info.instl_ymd is '설치일자';
comment on column public.obsv_info.doc is '설명';


create table public.obsv_data (
    obsv_cd character varying(6) not null, -- 관측소 코드
    msrt_dt character varying(20) not null, -- 측정 날짜
    msrt_cd character varying(30) not null, -- 측정항목 코드
    msrt_value character varying(20), -- 관측 데이터 값
    primary key (obsv_cd, msrt_dt, msrt_cd),
    foreign key (obsv_cd) references public.obsv_info (obsv_cd)
);
comment on column public.obsv_data.obsv_cd is '관측소 코드';
comment on column public.obsv_data.msrt_dt is '측정 날짜';
comment on column public.obsv_data.msrt_cd is '측정항목 코드';
comment on column public.obsv_data.msrt_value is '관측 데이터 값';



create table public.realtime_info (
    obsv_cd character varying(6) not null, -- 관측소 코드
    obsv_dt character varying(30) not null, -- 관측시간
    msrt_cd character varying not null,
    msrt_value numeric,
    primary key (obsv_cd, msrt_cd, obsv_dt)
);
comment on column public.realtime_info.obsv_cd is '관측소 코드';
comment on column public.realtime_info.obsv_dt is '관측시간';

create table public.rtu_info (
    rtu_id character varying(6) not null, -- RTU 아이디
    rtu_sn character varying(15) not null, -- RTU 시리얼번호
    obsv_cd character varying(6), -- 관측소 코드
    rtu_model character varying(30), -- RTU 모델명
    rtu_maker character varying(30), -- RTU 제작사
    rtu_spec character varying(20), -- RTU 스펙
    rtu_status character varying(20), -- RTU 상태
    instl_ymd character varying(8), -- RTU 도입일자
    rtu_use_yn character varying(1), -- RTU 사용여부
    rtu_type character varying(20), -- RTU 유형
    rtu_telno character varying(10), -- 전화번호
    protocol character varying(30), -- 프로토콜
    modem_sn character varying(30), -- 모뎀 시리얼번호
    modem_tel character varying(30), -- 모뎀 번호
    primary key (rtu_id, rtu_sn),
    foreign key (obsv_cd) references public.obsv_info (obsv_cd)
);
create unique index rtu_info_unique_key on rtu_info using btree (rtu_id);
comment on table public.rtu_info is '관측소 RTU 정보';
comment on column public.rtu_info.rtu_id is 'RTU 아이디';
comment on column public.rtu_info.rtu_sn is 'RTU 시리얼번호';
comment on column public.rtu_info.obsv_cd is '관측소 코드';
comment on column public.rtu_info.rtu_model is 'RTU 모델명';
comment on column public.rtu_info.rtu_maker is 'RTU 제작사';
comment on column public.rtu_info.rtu_spec is 'RTU 스펙';
comment on column public.rtu_info.rtu_status is 'RTU 상태';
comment on column public.rtu_info.instl_ymd is 'RTU 도입일자';
comment on column public.rtu_info.rtu_use_yn is 'RTU 사용여부';
comment on column public.rtu_info.rtu_type is 'RTU 유형';
comment on column public.rtu_info.rtu_telno is '전화번호';
comment on column public.rtu_info.protocol is '프로토콜';
comment on column public.rtu_info.modem_sn is '모뎀 시리얼번호';
comment on column public.rtu_info.modem_tel is '모뎀 번호';

create table public.sensor_info (
    sensor_id character varying(6) not null, -- 센서 아이디
    rtu_id character varying(6),
    sensor_sn character varying(10) not null, -- 센서 시리얼번호
    sensor_nm character varying(20), -- 센서 이름
    sensor_type character varying(20), -- 센서 유형
    sensor_maker character varying(20), -- 센서 제작사
    user_port character varying(10), -- 유저 포트
    cable_len character varying(10), -- 케이블 랜
    sensor_status character varying(20), -- 센서 상태
    sensor_depth character varying(10), -- 센서 심도
    sensor_p_range character varying(20), -- 센서 P 길이
    sensor_c_range character varying(20), -- 센서 C 길이
    doc character varying(2000), -- 설명
    primary key (sensor_id, sensor_sn),
    foreign key (rtu_id) references public.rtu_info (rtu_id)
);
comment on table public.sensor_info is '관측소 센서 정보';
comment on column public.sensor_info.sensor_id is '센서 아이디';
comment on column public.sensor_info.sensor_sn is '센서 시리얼번호';
comment on column public.sensor_info.sensor_nm is '센서 이름';
comment on column public.sensor_info.sensor_type is '센서 유형';
comment on column public.sensor_info.sensor_maker is '센서 제작사';
comment on column public.sensor_info.user_port is '유저 포트';
comment on column public.sensor_info.cable_len is '케이블 랜';
comment on column public.sensor_info.sensor_status is '센서 상태';
comment on column public.sensor_info.sensor_depth is '센서 심도';
comment on column public.sensor_info.sensor_p_range is '센서 P 길이';
comment on column public.sensor_info.sensor_c_range is '센서 C 길이';
comment on column public.sensor_info.doc is '설명';



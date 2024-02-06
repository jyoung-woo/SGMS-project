package com.sodasys.sgms.realTime.vo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * packageName    : com.sodasys.sgms.realTime.vo
 * fileName       : SearchVo
 * author         : 이예지
 * date           : 2024-01-30
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2024-01-30        이예지            최초 생성
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SearchVo {
    String searchType;
    String searchKeyword;
}

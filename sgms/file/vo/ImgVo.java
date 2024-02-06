package com.sodasys.sgms.file.vo;

import org.springframework.web.multipart.MultipartFile;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ImgVo {
    private MultipartFile file;
    private String originalName;
    private String mime;
    private String newName;

    public ImgVo(MultipartFile file, String obsvNm) {
        this.file = file;
        this.mime = file.getContentType();
        this.originalName = file.getOriginalFilename();
        int idx = originalName.lastIndexOf(".");
        String ex = originalName.substring(idx);
        this.newName = obsvNm.concat(ex);
    }
}

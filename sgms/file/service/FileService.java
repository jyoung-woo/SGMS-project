package com.sodasys.sgms.file.service;

import org.apache.tomcat.util.http.fileupload.FileUploadException;

import com.sodasys.sgms.file.vo.ImgVo;

public interface FileService {
    public void uploadImg(ImgVo vo) throws FileUploadException;
}

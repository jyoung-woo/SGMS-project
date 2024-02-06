package com.sodasys.sgms.file.controller;

import javax.annotation.Resource;

import org.apache.tomcat.util.http.fileupload.FileUploadException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.sodasys.sgms.file.service.impl.FileServiceImpl;
import com.sodasys.sgms.file.vo.ImgVo;

@RestController
@RequestMapping("/file")
public class FileController {
    @Resource(name = "fileServiceImpl")
    private FileServiceImpl fService;

    @PostMapping(value = "/upload", consumes = "multipart/form-data")
    public ResponseEntity<String> uploadImg(@RequestParam(value = "file") MultipartFile file,
            @RequestParam(value = "obsvNm") String obsvNm)
            throws FileUploadException {

        fService.uploadImg(new ImgVo(file, obsvNm));

        return ResponseEntity.status(HttpStatus.OK).body("TestString");
    }
}

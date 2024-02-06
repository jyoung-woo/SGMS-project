package com.sodasys.sgms.file.service.impl;

import java.io.File;

import javax.servlet.ServletContext;

import org.apache.tomcat.util.http.fileupload.FileUploadException;
import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import com.sodasys.sgms.file.service.FileService;
import com.sodasys.sgms.file.vo.ImgVo;

@Service("fileServiceImpl")
public class FileServiceImpl extends EgovAbstractServiceImpl implements FileService {
    // @Value("${file.uploadDir}")
    // private String uploadDir;

    @Autowired
    private ServletContext ctx;

    @Override
    public void uploadImg(ImgVo vo) throws FileUploadException {
        String webPath = "/uploadImgs/";
        String realPath = ctx.getRealPath(webPath);
        File uploadPath = new File(realPath);

        if (!uploadPath.exists())
            uploadPath.mkdirs();

        File svFile = new File(uploadPath, vo.getNewName());
        try {
            if (vo.getMime().startsWith("image/")) {
                throw new FileUploadException("E: File upload. MIME type");
            }
            // TODO 기등록 관측소에 대해 이미지 업로드 시 확장자가 다를 경우 이를 처리하는 기능이 필요함
            vo.getFile().transferTo(svFile);
        } catch (Exception e) {
            throw new FileUploadException("E: File upload. " + e.getMessage());
        }
    }

}

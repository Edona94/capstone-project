package com.github.edona94.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;
@Service
public class CVService {
    private final Cloudinary cloudinary;

    public CVService(Cloudinary cloudinary) {
        this.cloudinary = cloudinary;
    }

    public String uploadCV(MultipartFile cv) throws IOException {
        Map result = cloudinary.uploader().upload(cv.getBytes(), ObjectUtils.emptyMap());
        return result.get("url").toString();
    }

    public String deleteCV(String url) throws IOException {
        int startOfPublicId = url.lastIndexOf('/') + 1;
        int endOfPublicId = url.indexOf('.', startOfPublicId);
        String publicId = url.substring(startOfPublicId, endOfPublicId);
        Map result = cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
        return result.get("result").toString();
    }
}

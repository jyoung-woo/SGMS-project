package com.sodasys.sgms.comn.excelUtil;

import java.io.IOException;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.apache.poi.xssf.streaming.SXSSFCell;
import org.apache.poi.xssf.streaming.SXSSFRow;
import org.apache.poi.xssf.streaming.SXSSFSheet;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;

import com.sodasys.sgms.comn.excelUtil.annotation.ExcelColumn;

public class ExcelUtil {
    public static void excelDownload(List<?> data, String fileName, HttpServletResponse response){
        if(data.isEmpty()){
            return;
        }
        //"attachment;filename={filename}.xlsx"
        String ctntDps = "attachment;filename="+fileName+".xlsx";
    	SXSSFWorkbook workbook = new SXSSFWorkbook();

		SXSSFSheet sheet = (SXSSFSheet) workbook.createSheet();
		SXSSFRow row = sheet.createRow(0);
        SXSSFCell cell = null;

		sheet.setRandomAccessWindowSize(100);

		makeExcelHeader(data,sheet,row,cell);
		makeExcelBody(data,sheet,row,cell);

        response.setContentType("ms-vnd/excel");
        response.setHeader("Content-Disposition", ctntDps);
        
        try {
            workbook.write(response.getOutputStream());
        } catch (IOException e) {
            throw new RuntimeException(e);
        } finally {
            closeWB(workbook);
        }
    }

    private static void closeWB(SXSSFWorkbook wb){
        try {
            wb.close();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    private static void makeExcelBody(List<?> data, SXSSFSheet sheet, SXSSFRow row, SXSSFCell cell){
        int rowCount = 1;
        int columnStartIdx = 0;

        for(Object vo: data){
            row = sheet.createRow(rowCount++);
            makeBodyRow(vo,row,cell,columnStartIdx);
        }
    }
    
    private static void makeBodyRow(Object vo, SXSSFRow row, SXSSFCell cell, int columnStartIdx){
        int colIdx = columnStartIdx;
        for(Field field : vo.getClass().getDeclaredFields()){
            if(field.isAnnotationPresent(ExcelColumn.class)){
                cell = row.createCell(colIdx++);
                field.setAccessible(true);
                try {
                    Object value = field.get(vo);
                    if (value instanceof Number) {
                        Number numberValue = (Number) value;
                        cell.setCellValue(numberValue.doubleValue());
                    }
                    cell.setCellValue(value == null ? "" : value.toString());
                }catch (IllegalAccessException e) {
                    throw new RuntimeException(e);
                }
            }
        }
    }

    private static void makeExcelHeader(List<?> data,SXSSFSheet sheet, SXSSFRow row, SXSSFCell cell){
        //primitive type이라 call by ref
        int headerNum = 0;

		for(String header:getHeaderNames(data)) {
	        cell = row.createCell(headerNum++);
	        cell.setCellValue(header);
		}
    }

    private static List<String> getHeaderNames(List<?> data){
        List<String> headerNames = new ArrayList<>();
        for(Field fld: data.get(0).getClass().getDeclaredFields()){
            if(fld.isAnnotationPresent(ExcelColumn.class)){
                headerNames.add(fld.getAnnotation(ExcelColumn.class).headerName());
            }
        }
        return headerNames;
    }
}

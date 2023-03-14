package com.flakkeeverhuizers.exception;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.lang.reflect.Field;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

public class Generator {

    private static String ENTITY_PATH = "src/main/java/com/flakkeeverhuizers/db/entity/";
    private static String REPO_PATH = "src/main/java/com/flakkeeverhuizers/db/repository/";
    private static String RESPONSE_PATH = "src/main/java/com/flakkeeverhuizers/controller/model/response/";
    private static String EXCEPTION_PATH = "src/main/java/com/flakkeeverhuizers/exception/";
    private static String SERVICE_PATH = "src/main/java/com/flakkeeverhuizers/service/";

    private static String ENTITY_TO_DTO_PATH = "src/main/java/com/flakkeeverhuizers/controller/common/";


    private static String ENTITY_PACKAGE = "package com.flakkeeverhuizers.db.entity;";
    private static String REPO_PACKAGE = "package com.flakkeeverhuizers.db.repository;";
    private static String RESPONSE_PACKAGE = "package com.flakkeeverhuizers.controller.model.response;";
    private static String EXCEPTION_PACKAGE = "package com.flakkeeverhuizers.exception;";
    private static String SERVICE_PACKAGE = "package com.flakkeeverhuizers.service;";

    private static String SQL_FILE_PATH = "/Users/kevynmiranda/Documents/sql.sql";
    private static String ENTITY_TO_DTO_PACKAGE = "package com.flakkeeverhuizers.controller.common;";


    public static void main(String[] args) {
        createFindMethodsInService("Relocations", "RelocationResponse", "RelocationsResponse",
                "RelocationsRepository", "", "", "", true); //Nao apagar


    }
    public static void mainni(String[] args) {
        // Entity and repo
        convertSqlToInput(SQL_FILE_PATH);

        String tableName = "address_floor_space_boxes";
        String entityName = creationOfEntityAndRepo(tableName, convertSqlToInput(SQL_FILE_PATH));

        /**********************/


        // Response and find method
        String originPath = ENTITY_PATH + entityName + ".java";

        String singularResponseClassName = fromPluralToSingular(entityName) + "Response";
        String pluralResponseClassName = entityName + "Response";

        String targetSingularPath = RESPONSE_PATH + singularResponseClassName + ".java";
        String targetPluralPath = RESPONSE_PATH + pluralResponseClassName + ".java";
        createSingularResponse(originPath, targetSingularPath, singularResponseClassName);
        createPluralResponse(targetPluralPath, pluralResponseClassName, singularResponseClassName);


        List<String> entities = List.of("AddressComments", "Addresses", "AddressFloors", "AddressFloorSpaces", "AddressTypes",
                "Boxes", "Countries", "Floors", "HouseTypes", "ItemCategories", "LiftOptions", "Vias", "VatRates", "Spaces"
                , "AddressFloorSpaceBoxes", "AddressFloorSpaceItems", "BranchAddresses", "ExtendedUser", "MovingActivities",
                "MovingDays", "Notes", "Quotations", "VatRates", "Relocations", "RelocationLabels", "Scenarios", "User");
        // entityToDto
        createEntityToDto("EntityToDTO", entities);

        String serviceName = entityName + "Service";
        String repoName = entityName + "Repository";
        String serviceCompletePath = SERVICE_PATH + serviceName + ".java";

        // create service class with save method
        //createService(serviceCompletePath, serviceName, repoName, entityName, entityName + "Request");


        // Find method
        createFindMethodsInService(entityName, singularResponseClassName, pluralResponseClassName,
                repoName, "", "", "", true); //Nao apagar


        /******************************/
        // Exception
        String exceptionName = "";
        String exceptionCompletePath = EXCEPTION_PATH + exceptionName +".java";
        //createException(exceptionCompletePath, exceptionName, "NOT_FOUND"); Nao apagar
    }

    public static List<List<String>> convertSqlToInput(String completePath) {
        Path filePath = Paths.get(completePath);
        List<List<String>> attributes = new ArrayList<>();
        try (BufferedReader reader =
                     Files.newBufferedReader(filePath, StandardCharsets.UTF_8)) {

            String line;
            int position = 0;

            while ((line = reader.readLine()) != null) {
                String[] partsOfLine = line.split(" ");

                String fieldTableName = partsOfLine[0].replace("`", "").replace("`", "").trim();
                String fieldClassName = convertTableFieldToClassField(fieldTableName, false);
                String fieldType = convertType(partsOfLine[1], fieldTableName, position);
                String typeCardinality = "";

                // Verifica se e a primeira linha do aqruivo e se contem _id na string
                if (position != 0 && fieldTableName.contains("_id")) {
                    typeCardinality = "manyToOne";
                }

                attributes.add(List.of(fieldType, fieldClassName, '"' + fieldTableName + '"', typeCardinality));
                position++;
            }
        } catch (IOException e) {
            System.out.println(e.getStackTrace());
        }
        return attributes;
    }

    public static String convertTableFieldToClassField(String fieldName, Boolean toClassName) {
        StringBuilder sb = new StringBuilder(fieldName.replace("_id", ""));
        for (int i = 0; i < sb.length(); i++) {
            if (sb.charAt(i) == '_') {
                sb.deleteCharAt(i);
                sb.replace(i, i + 1, String.valueOf(Character.toUpperCase(sb.charAt(i))));
            }
        }

        if (toClassName)
            return firstCharUpperCase(sb.toString());

        return sb.toString();
    }


    public static String creationOfEntityAndRepo(String tableName, List<List<String>> attributes) {
        String tableNameWithQuotationMarks = '"' + tableName + '"';
        String entityName = convertTableFieldToClassField(tableName, true);
        String fileType = ".java";
        String entityClass = entityName + fileType;

        Map<String, String> findBy = new HashMap<>();

        try {
            findBy = getAllAttributesAndTypes(Class.forName(completeClassPath(entityName, ENTITY_PACKAGE)).newInstance());
        }catch (Exception e){

        }

        createEntity(ENTITY_PATH + entityClass, entityName, tableNameWithQuotationMarks, attributes); //Nao apagar
        createRepo(REPO_PATH + entityName + "Repository" + fileType, entityName, entityName + "Repository", findBy);
        return entityName;
    }

    public static void createEntity(String completePath, String entityName, String tableName, List<List<String>> attributes) {
        Path newFilePath = Paths.get(completePath);
        try (BufferedWriter writer =
                     Files.newBufferedWriter(newFilePath, StandardCharsets.UTF_8)) {

            writer.write(ENTITY_PACKAGE+"\n\n\n");

            writer.write("import lombok.AllArgsConstructor;\n");
            writer.write("import lombok.Data;\n");
            writer.write("import lombok.NoArgsConstructor;\n");
            writer.write("import org.hibernate.annotations.GenericGenerator;\n");
            writer.write("import org.hibernate.annotations.Type;\n\n");

            writer.write("import javax.persistence.*;\n");
            writer.write("import java.util.UUID;\n\n\n");

            writer.write("@Entity\n");
            writer.write("@Table(name = " + tableName + ")\n");
            writer.write("@Data\n");

            writer.write("@AllArgsConstructor\n");
            writer.write("@NoArgsConstructor\n");
            writer.write("public class " + entityName + " {\n\n\n");

            for (int i = 0; i < attributes.size(); i++) {
                if (i == 0) {
                    attributes.get(i).get(0);

                    String type = '"' + "uuid-char" + '"';
                    String generator = '"' + "uuid2" + '"';
                    String columType = '"' + "char(36)" + '"';

                    writer.write("\t@Id\n");
                    writer.write("\t@GeneratedValue(generator = " + generator + ")\n");
                    writer.write("\t@GenericGenerator(name = " + generator + ", strategy = " + generator + ")\n");
                    writer.write("\t@Column(name = " + attributes.get(i).get(2) + ", updatable = false, nullable = false, columnDefinition = " + columType + ")\n");
                    writer.write("\t@Type(type = " + type + ")\n");
                    writer.write("\tprivate " + attributes.get(i).get(0) + " id;\n\n");
                } else {
                    if (attributes.get(i).get(3).equals("manyToOne")) {
                        writer.write("\t@ManyToOne(fetch = FetchType.LAZY)\n");
                        writer.write("\t@JoinColumn(name = " + attributes.get(i).get(2) + ")\n");
                        writer.write("\tprivate " + attributes.get(i).get(0) + " " + attributes.get(i).get(1) + ";\n\n");
                    } else if (attributes.get(i).get(3).equals("manyToMany")) {

                    } else if (attributes.get(i).get(3).equals("oneToOne")) {

                    } else {
                        writer.write("\t@Column(name = " + attributes.get(i).get(2) + ")\n");
                        writer.write("\tprivate " + attributes.get(i).get(0) + " " + attributes.get(i).get(1) + ";\n\n");
                    }
                }
            }

            writer.write("}");

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static void createRepo(String completePath, String entityName, String repoName, Map<String, String> findBy) {
        Path newFilePath = Paths.get(completePath);
        try (BufferedWriter writer =
                     Files.newBufferedWriter(newFilePath, StandardCharsets.UTF_8)) {

            writer.write(REPO_PACKAGE+"\n\n\n");

            writer.write("import com.flakkeeverhuizers.db.entity." + entityName + ";\n");
            writer.write("import org.springframework.data.jpa.repository.JpaRepository;\n");
            writer.write("import org.springframework.stereotype.Repository;\n\n");

            writer.write("import java.util.List;\n");
            writer.write("import java.util.UUID;\n\n");

            writer.write("@Repository\n");
            writer.write("public interface " + repoName + " extends JpaRepository<" + entityName + ", UUID> {\n");

            for(String field : findBy.keySet()){
                if(!field.equals("id")) {
                    writer.write("\tList<" + entityName + "> findBy" + firstCharUpperCase(field) + "(" + findBy.get(field) + " " + field + ");\n");
                }
            }

            writer.write("}");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static void createSingularResponse(String completeOriginPath, String completeTargetPath, String singularResponseClassName) {
        Path originPath = Paths.get(completeOriginPath);
        Path targetPath = Paths.get(completeTargetPath);

        try (BufferedReader reader = Files.newBufferedReader(originPath, StandardCharsets.UTF_8);
             BufferedWriter writer = Files.newBufferedWriter(targetPath, StandardCharsets.UTF_8)) {

            String line;
            List<String> undesiredAnnotations =
                    List.of("@Entity", "@Table", "@Id", "@Gener", "@Column", "@Type", "@Many", "@One", "@Join", "@Lob");

            List<String> nativeJavaTypes =
                    List.of("String", "int", "Integer", "Boolean", "LocalDateTime", "BigDecimal", "double", "UUID");

            while ((line = reader.readLine()) != null) {
                Boolean validLine = true;

                for (String annotation : undesiredAnnotations) {
                    if (line.contains(annotation)) {
                        validLine = false;
                    }
                }

                if (validLine) {
                    if (line.contains("package")) {
                        writer.write(RESPONSE_PACKAGE);
                    } else if (line.contains("public class")) {
                        writer.write("public class " + singularResponseClassName + " {\n");
                    } else {
                        if (!line.equals("") && line.contains("private")) {
                            Boolean isNativeJavaType = false;
                            for (String type : nativeJavaTypes) {
                                if (line.contains(type)) {
                                    isNativeJavaType = true;
                                }
                            }

                            if (!isNativeJavaType) {
                                String[] partsOfLine = line.trim().split(" ");
                                writer.write("\t" + partsOfLine[0] + " " + fromPluralToSingular(partsOfLine[1]) + "Response " + partsOfLine[2] + "\n");
                            } else {
                                writer.write(line + "\n");
                            }
                        } else {
                            writer.write(line + "\n");
                        }
                    }
                }
            }

        } catch (Exception e) {

        }
    }

    public static void createPluralResponse(String completeTargetPath, String pluralResponseClassName, String singularResponseClassName) {
        Path targetPath = Paths.get(completeTargetPath);

        try (BufferedWriter writer = Files.newBufferedWriter(targetPath, StandardCharsets.UTF_8)) {
            writer.write(RESPONSE_PACKAGE+"\n\n\n");

            writer.write("import lombok.AllArgsConstructor;\n");
            writer.write("import lombok.Data;\n");
            writer.write("import lombok.NoArgsConstructor;\n\n");

            writer.write("import java.util.List;\n\n\n");

            writer.write("@Data\n");
            writer.write("@NoArgsConstructor\n");
            writer.write("@AllArgsConstructor\n");

            writer.write("public class " + pluralResponseClassName + " {\n\n");

            String fieldName = firstCharLowerCase(pluralResponseClassName);
            writer.write("\tprivate List<" + singularResponseClassName + "> " + fieldName.replace("Response", "") + ";\n");
            writer.write("}");

        } catch (Exception e) {

        }
    }

    public static void createService(String completeTargetPath, String serviceName, String repoName, String entityName, String requestName){
        Path targetPath = Paths.get(completeTargetPath);

        try (BufferedWriter writer = Files.newBufferedWriter(targetPath, StandardCharsets.UTF_8)) {
            List<String>  allAttributes = getAllAttributes(Class.forName(completeClassPath(entityName, ENTITY_PACKAGE)).newInstance());
            writer.write(SERVICE_PACKAGE+"\n\n\n");

            writer.write("import com.flakkeeverhuizers.db.entity.*;\n");
            writer.write("import com.flakkeeverhuizers.db.repository.*;\n");
            writer.write("import lombok.RequiredArgsConstructor;\n");
            writer.write("import lombok.extern.slf4j.Slf4j;\n");
            writer.write("import org.springframework.stereotype.Service;\n\n");

            writer.write("import java.util.ArrayList;\n");
            writer.write("import java.util.List;\n");
            writer.write("import static com.flakkeeverhuizers.controller.common.EntityToDTO.*;\n\n");


            writer.write("@RequiredArgsConstructor\n");
            writer.write("@Slf4j\n");
            writer.write("@Service(value = " + '"' + firstCharLowerCase(serviceName) + '"'+ ")\n");
            writer.write("public class " + serviceName + "{\n\n");

            writer.write("\tprivate final " + repoName + " " + firstCharLowerCase(repoName) + ";\n\n");

            writer.write("\tpublic void save("+ requestName + " " + firstCharLowerCase(requestName) + ") {\n");

            writer.write("\t\t" + entityName + " " + firstCharLowerCase(entityName) + " = new " + entityName + "();\n");


            for(String attribute : allAttributes){
                writer.write("\t\t" + firstCharLowerCase(entityName) + setMethodFromFieldName(attribute)
                        .replace("***", firstCharLowerCase(requestName) + getMethodFromFieldName(attribute).replace(";", ""))+"\n");

            }

            writer.write("\t\t"+ firstCharLowerCase(repoName) + ".save(" + firstCharLowerCase(entityName) + ");\n");
            writer.write("\t}\n");
            writer.write("}");

        }catch (Exception e){

        }

    }

    public static void createEntityToDto(String converterName, List<String> entities){
        Path targetPath = Paths.get(ENTITY_TO_DTO_PATH + converterName + ".java");

        try (BufferedWriter writer = Files.newBufferedWriter(targetPath, StandardCharsets.UTF_8)) {
            writer.write(ENTITY_TO_DTO_PACKAGE+"\n\n\n");
            writer.write("import com.flakkeeverhuizers.controller.model.response.*;\n");
            writer.write("import com.flakkeeverhuizers.db.entity.*;\n\n");

            writer.write("public class " + converterName + "{\n\n");

            for(String entity : entities){
                String singularResponseClassName = fromPluralToSingular(entity) + "Response";

                writer.write("\tpublic static " +  singularResponseClassName + " " + firstCharLowerCase(entity) + "To" + singularResponseClassName + "(" + entity + " " + firstCharLowerCase(entity) + "){\n");

                writer.write("\t\t" + singularResponseClassName + " " + firstCharLowerCase(singularResponseClassName) + " = new "+ singularResponseClassName + "();\n");
                try{
                    List<String> allAttributes = getAllAttributes(Class.forName(completeClassPath(entity, ENTITY_PACKAGE)).newInstance());
                    for(String attribute : allAttributes){
                        writer.write("\t\t" + firstCharLowerCase(singularResponseClassName) + setMethodFromFieldName(attribute)
                                .replace("***", firstCharLowerCase(entity) + getMethodFromFieldName(attribute).replace(";", "")) + "\n");

                    }

                }catch (Exception e){

                }
                writer.write("\n");
                writer.write("\t\treturn " + firstCharLowerCase(singularResponseClassName) + ";\n");
                writer.write("\t}\n\n");
            }

            writer.write("}");
        }catch (Exception e){

        }
    }

    public static void createFindMethodsInService(String entityName, String singularResponseName, String pluralResponseName, String varRepo,
                                                  String customFindMethod, String customParam, String customParamsType, Boolean returnList) {
        String pluralAttributeName = "";

        try{
            pluralAttributeName = getAllAttributes(Class.forName(completeClassPath(pluralResponseName, RESPONSE_PACKAGE)).newInstance()).get(0);
        }catch (Exception e){
        }

        String methodParamsInRepo = customParam.equals("") ? "getSort(sortedBy, orderBy)" : customParam;
        String methodParamsInService = customParam.equals("") ? "String sortedBy, String orderBy" : customParamsType + " " + customParam;
        String methodNameInRepo = customFindMethod.equals("") ? "findAll" : "findBy" + firstCharUpperCase(customFindMethod);
        String methodNameInService = customFindMethod.equals("")
                ? "findAll" + pluralResponseName.replace("Response", "")
                : "find" + pluralResponseName.replace("Response", "") + "By" + firstCharUpperCase(customFindMethod);

        String returnType = pluralResponseName;
        String varReturn = firstCharLowerCase(pluralResponseName);

        String listType = singularResponseName;
        String varList = firstCharLowerCase(pluralResponseName.replace("Response", ""));

        String varInList = firstCharLowerCase(listType);
        String varElement = firstCharLowerCase(singularResponseName.replace("Response", ""));

        System.out.println("\n\n");
        System.out.println("public " + returnType + " " + methodNameInService + "(" + methodParamsInService +") {");
        System.out.println("\t" + returnType + " " + varReturn + " = new " + returnType + "();");
        System.out.println("\tList<" + listType + "> " + varList + " = new ArrayList<>();\n");

        if(returnList) {
            System.out.println("\t" + firstCharLowerCase(varRepo) + "." + methodNameInRepo + "(" + methodParamsInRepo + ").forEach(" + varElement + " -> {");

        }else{
            System.out.println("\t" + entityName + " " + fromPluralToSingular(varList) + " = " +  firstCharLowerCase(varRepo) + "."
                    + methodNameInRepo + "(" + methodParamsInRepo + ").orElseThrow(() -> new RuntimeException(" + '"' + '"' + "));\n");

        }
        System.out.println("\t\t" + listType + " " + varInList + " = " + firstCharLowerCase(entityName) + "To" + singularResponseName + "(" + varElement + ");");//= new " + listType + "();"); // recebe do metodo de conversao dentro do entitytodto


        System.out.println("");
        System.out.println("\t\t" + varList + ".add(" + varInList + ");");

        if(returnList) {
            System.out.println("\t});\n");
        }

        System.out.println("\t" + varReturn + ".set" + firstCharUpperCase(pluralAttributeName) + "(" + varList + ");");
        System.out.println("\treturn " + varReturn + ";");
        System.out.println("}");
    }

    public static void createException(String completePath, String exceptionName, String httpCode){
        Path newFilePath = Paths.get(completePath);

        try (BufferedWriter writer = Files.newBufferedWriter(newFilePath, StandardCharsets.UTF_8)) {
            writer.write(EXCEPTION_PACKAGE+"\n\n\n");

            writer.write("public class "+ exceptionName + " extends RuntimeException{\n\n");
            writer.write("\tpublic " + exceptionName + " (String message) {\n");
            writer.write("\t\tsuper(message);\n");
            writer.write("\t}\n");
            writer.write("}");

            System.out.println("@ExceptionHandler(value = {" + exceptionName + ".class})");
            System.out.println("@ResponseStatus(code = HttpStatus." + httpCode + ")");
            System.out.println("public ResponseEntity<GlobalErrorResponse> handleException(" + exceptionName +" e) {");
            System.out.println("\tlog.warn(" + '"' + "Error: {} : {}" + '"' + ", e.getClass(), e.getMessage());");
            System.out.println("\tlog.warn(" + '"' + "Error: " + '"' + ", e);");
            System.out.println("\t return new ResponseEntity<>(new GlobalErrorResponse(e.getClass().getSimpleName(), e.getMessage()), HttpStatus." + httpCode +");");
            System.out.println("}");

        }catch (Exception e){

        }
    }

    public static String setMethodFromFieldName(String field){
        return ".set" + firstCharUpperCase(field) + "(***);";
    }

    public static String getMethodFromFieldName(String field){
        return ".get" + firstCharUpperCase(field) + "();";
    }

    public static Map<String, String> getAllAttributesAndTypes(Object obj){
        Map<String, String> allAttributes = new HashMap<>();
        Field[] declaredFields = obj.getClass().getDeclaredFields();
        for (Field field : declaredFields) {
            if (!field.isAccessible()) {
                allAttributes.put(field.getName(), field.getType().getSimpleName());
            }
        }
        return  allAttributes;
    }

    public static List<String> getAllAttributes(Object obj){
        List<String> allAttributes = new ArrayList<>();
        Field[] declaredFields = obj.getClass().getDeclaredFields();
        for (Field field : declaredFields) {
            if (!field.isAccessible()) {
                allAttributes.add(field.getName());
            }
        }
        return  allAttributes;
    }

    public static String convertType(String originalType, String fieldName, int position) {
        //se for a primeira linha do aquivo, e esperado que seja a linha com o id da tabela
        if (position == 0) {
            return "UUID";
        }

        //se nao for a primeiar linha mas tem id, logo e uma linha que contem uma chave estrangeira
        if (position != 0 && fieldName.toLowerCase(Locale.ROOT).contains("id")) {
            return convertTableFieldToClassField(fieldName, true);
        }

        if (originalType.toLowerCase(Locale.ROOT).contains("int")) {
            if (originalType.toLowerCase(Locale.ROOT).contains("tiny")) {
                return "Boolean";
            }
            return "int";
        }

        if (originalType.toLowerCase(Locale.ROOT).contains("varchar") ||
                originalType.toLowerCase(Locale.ROOT).contains("text")) {
            return "String";
        }

        if (originalType.toLowerCase(Locale.ROOT).contains("datetime")) {
            return "LocalDateTime";
        }

        if (originalType.toLowerCase(Locale.ROOT).contains("decimal")) {
            return "BigDecimal";
        }

        if (originalType.toLowerCase(Locale.ROOT).contains("double")) {
            return "double";
        }

        return originalType;
    }

    public static String fromPluralToSingular(String plural){
        if(plural.endsWith("es")){
            if (plural.endsWith("ies")) {
                return plural.substring(0, plural.length() - 3) + "y";
            } else if (plural.charAt(plural.length() - 3) == 's' || plural.charAt(plural.length() - 3) == 'h' || plural.charAt(plural.length() - 3) == 'x'){
                return plural.substring(0, plural.length() - 2);
            } else {
                plural.substring(0, plural.length()-1);
            }
        }
        return plural.substring(0, plural.length()-1);
    }

    public static String firstCharUpperCase(String s) {
        return s.substring(0, 1).toUpperCase(Locale.ROOT) + s.substring(1);
    }

    public static String firstCharLowerCase(String s) {
        return s.substring(0, 1).toLowerCase(Locale.ROOT) + s.substring(1);
    }

    public static String completeClassPath(String className, String packagePath){
        return packagePath
                .replace("package", "")
                .replace(";","")
                .trim() + "." + className;
    }
}

package com.example.crud.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.ResultSet;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/test")
public class DatabaseTestController {

    @Autowired
    private DataSource dataSource;

    @GetMapping("/db-connection")
    public ResponseEntity<Map<String, Object>> testDatabaseConnection() {
        Map<String, Object> response = new HashMap<>();

        try (Connection connection = dataSource.getConnection()) {
            // Test if connection is valid
            boolean isValid = connection.isValid(5);
            response.put("connectionValid", isValid);

            if (isValid) {
                // Get database metadata
                DatabaseMetaData metaData = connection.getMetaData();
                response.put("databaseProductName", metaData.getDatabaseProductName());
                response.put("databaseProductVersion", metaData.getDatabaseProductVersion());
                response.put("driverName", metaData.getDriverName());
                response.put("driverVersion", metaData.getDriverVersion());
                response.put("url", metaData.getURL());
                response.put("userName", metaData.getUserName());

                // Get catalog (database name)
                String catalog = connection.getCatalog();
                response.put("currentDatabase", catalog);

                // List all tables in the database
                ResultSet tables = metaData.getTables(catalog, null, "%", new String[] { "TABLE" });
                StringBuilder tableList = new StringBuilder();
                int tableCount = 0;
                while (tables.next()) {
                    if (tableCount > 0)
                        tableList.append(", ");
                    tableList.append(tables.getString("TABLE_NAME"));
                    tableCount++;
                }
                response.put("tableCount", tableCount);
                response.put("tables", tableList.toString());

                response.put("status", "SUCCESS");
                response.put("message", "Database connection is working properly!");
            } else {
                response.put("status", "FAILED");
                response.put("message", "Connection is not valid");
            }

        } catch (Exception e) {
            response.put("status", "ERROR");
            response.put("message", e.getMessage());
            response.put("errorType", e.getClass().getName());
            return ResponseEntity.status(500).body(response);
        }

        return ResponseEntity.ok(response);
    }

    @GetMapping("/xampp-status")
    public ResponseEntity<Map<String, String>> checkXamppStatus() {
        Map<String, String> response = new HashMap<>();

        try (Connection connection = dataSource.getConnection()) {
            response.put("status", "CONNECTED");
            response.put("message", "XAMPP MySQL is running and accessible");
            response.put("database", connection.getCatalog());
        } catch (Exception e) {
            response.put("status", "DISCONNECTED");
            response.put("message", "Cannot connect to XAMPP MySQL: " + e.getMessage());
            response.put("suggestion", "Please ensure XAMPP is running and MySQL service is started");
            return ResponseEntity.status(503).body(response);
        }

        return ResponseEntity.ok(response);
    }
}

package com.example.crud.controller;

import com.example.crud.entity.Item;
import com.example.crud.service.ItemService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/items")
public class ItemController {

    @Autowired
    private ItemService itemService;

    @GetMapping("/")
    public String welcome() {
        return "Welcome to the Inventory Management API! 🚀";
    }

    @GetMapping
    public List<Item> getAllItems() {
        return itemService.getAllItems();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Item> getItemById(@PathVariable Long id) {
        return itemService.getItemById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Item createItem(@Valid @RequestBody Item item) {
        return itemService.saveItem(item);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Item> updateItem(@PathVariable Long id, @Valid @RequestBody Item itemDetails) {
        return itemService.getItemById(id)
                .map(item -> {
                    item.setName(itemDetails.getName());
                    item.setDescription(itemDetails.getDescription());
                    item.setPrice(itemDetails.getPrice());
                    item.setCategory(itemDetails.getCategory());
                    item.setQuantity(itemDetails.getQuantity());
                    item.setImageUrl(itemDetails.getImageUrl());
                    return ResponseEntity.ok(itemService.saveItem(item));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteItem(@PathVariable Long id) {
        if (itemService.getItemById(id).isPresent()) {
            itemService.deleteItem(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}

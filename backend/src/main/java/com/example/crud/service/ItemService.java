package com.example.crud.service;

import com.example.crud.entity.Item;
import com.example.crud.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ItemService {

    @Autowired
    private ItemRepository itemRepository;

    public List<Item> getAllItems() {
        return itemRepository.findAll();
    }

    public Optional<Item> getItemById(@org.springframework.lang.NonNull Long id) {
        return itemRepository.findById(id);
    }

    public Item saveItem(@org.springframework.lang.NonNull Item item) {
        return itemRepository.save(item);
    }

    public void deleteItem(@org.springframework.lang.NonNull Long id) {
        itemRepository.deleteById(id);
    }
}

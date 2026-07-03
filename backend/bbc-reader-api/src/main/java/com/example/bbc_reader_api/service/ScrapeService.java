package com.example.bbc_reader_api.service;

import com.example.bbc_reader_api.dto.ScrapeResponse;
import org.springframework.stereotype.Service;

@Service
public class ScrapeService {
    public ScrapeResponse scrape(String url) {
        return new ScrapeResponse("Dummy Title", "Dummy Body", null);
    }
}

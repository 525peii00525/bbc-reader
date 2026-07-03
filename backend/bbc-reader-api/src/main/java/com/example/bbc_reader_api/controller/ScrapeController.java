package com.example.bbc_reader_api.controller;

import org.springframework.web.bind.annotation.*;
import com.example.bbc_reader_api.dto.ScrapeResponse;
import com.example.bbc_reader_api.dto.ScrapeRequest;
import com.example.bbc_reader_api.service.ScrapeService;

@RestController
@RequestMapping("/api")
public class ScrapeController {
    private final ScrapeService scrapeService;
    public ScrapeController(ScrapeService scrapeService) {
        this.scrapeService = scrapeService;
    }
    @PostMapping("/scrape")
    public ScrapeResponse scrape(@RequestBody ScrapeRequest request) {
        return scrapeService.scrape(request.url());
    }
    
}

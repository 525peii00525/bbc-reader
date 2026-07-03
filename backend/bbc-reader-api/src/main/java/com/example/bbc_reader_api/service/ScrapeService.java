package com.example.bbc_reader_api.service;
import com.example.bbc_reader_api.client.BbcClient;
import com.example.bbc_reader_api.dto.ScrapeResponse;

import org.jsoup.nodes.Document;
import org.springframework.stereotype.Service;

@Service
public class ScrapeService {
    private final BbcClient bbcClient;

    public ScrapeService(BbcClient bbcClient) {
        this.bbcClient = bbcClient;
    }

    public ScrapeResponse scrape(String url) {
        try{
            Document document = bbcClient.fetch(url);
            // Call the BBC client to scrape the content
        return  new ScrapeResponse(
                document.title(),
                document.body().text(),
                null
            );
        } catch (Exception e) {
            throw new RuntimeException("BBCページの取得に失敗しました", e);
        }
    }
}

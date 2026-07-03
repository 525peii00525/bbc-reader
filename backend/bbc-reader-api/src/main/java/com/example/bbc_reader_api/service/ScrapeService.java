package com.example.bbc_reader_api.service;
import com.example.bbc_reader_api.client.BbcClient;
import com.example.bbc_reader_api.dto.ScrapeResponse;
import com.example.bbc_reader_api.parser.ArticleParser;
import org.jsoup.nodes.Document;
import org.springframework.stereotype.Service;

@Service
public class ScrapeService {
    private final BbcClient bbcClient;
    private final ArticleParser articleParser;
    public ScrapeService(BbcClient bbcClient, ArticleParser articleParser) {
        this.bbcClient = bbcClient;
        this.articleParser = articleParser;
    }

    public ScrapeResponse scrape(String url) {
        try{
            Document document = bbcClient.fetch(url);
            // Call the BBC client to scrape the content
            String title = articleParser.extractTitle(document);
            String body = articleParser.extractBody(document);
        return  new ScrapeResponse(
                title,
                body,
                null
            );
        } catch (Exception e) {
            throw new RuntimeException("BBCページの取得に失敗しました", e);
        }
    }
}

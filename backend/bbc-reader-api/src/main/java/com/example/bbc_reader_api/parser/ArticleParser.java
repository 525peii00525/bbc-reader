package com.example.bbc_reader_api.parser;

import org.jsoup.nodes.Document;
import org.springframework.stereotype.Component;

@Component
public class ArticleParser {
    public String extractTitle(Document document) {
        return document.title();
    }
}

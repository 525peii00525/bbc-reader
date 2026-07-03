package com.example.bbc_reader_api.parser;

import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.springframework.stereotype.Component;

@Component
public class ArticleParser {
    public String extractTitle(Document document) {
        return document
                .select("h1").text();
    }

    public String extractBody(Document document) {
    Element textArea = document.selectFirst("div.widget-richtext div.text");

    if (textArea == null) {
        return "";
    }

    StringBuilder body = new StringBuilder();

    for (Element element : textArea.children()) {

    String tag = element.tagName();

    if ("h3".equals(tag) && "Vocabulary".equals(element.text())) {
        break;
    }

    if ("p".equals(tag) || "h3".equals(tag)) {
        body.append(element.text()).append("\n\n");
    }
    }

    return body.toString().trim();
    }
}

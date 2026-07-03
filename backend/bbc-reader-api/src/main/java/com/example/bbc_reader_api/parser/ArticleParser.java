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
        if (element.tagName().equals("h3")
                && element.text().equalsIgnoreCase("Vocabulary")) {
            break;
        }

        if (element.tagName().equals("p")) {
            body.append(element.text()).append("\n\n");
        }
    }

    return body.toString().trim();
    }
}

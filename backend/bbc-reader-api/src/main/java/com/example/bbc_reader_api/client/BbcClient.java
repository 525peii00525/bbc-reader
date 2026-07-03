package com.example.bbc_reader_api.client;
import java.io.IOException;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.springframework.stereotype.Component;

@Component
public class BbcClient {
    public Document fetch(String url) throws IOException {
        return Jsoup.connect(url).get();
    }
}

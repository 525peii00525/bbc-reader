export function splitSentences(text: string): string[] {
    const sentenceEndings = /([.?!\n])/g;
    const sentences = text.split(sentenceEndings).reduce((acc: string[], part: string) => {
        if (part === "\n") {
        // 何もしない（改行は捨てる）
        } else if (part.match(sentenceEndings)) {
             if (acc.length > 0) {
                acc[acc.length - 1] += part;
            }
        } else if (part.trim()) {
        // 新しい文として追加
        acc.push(part.trim()); // Add the new sentence if it's not empty
        }
        return acc;
    }, []);
    return sentences;
}
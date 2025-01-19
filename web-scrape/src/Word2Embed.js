import nlp from 'compromise';

export function Word2Embed(listOfWords) {
    // Convert the list of words into a string
    const sentence = listOfWords.join(' ');

    // Use compromise to process the sentence
    const doc = nlp(sentence);

    // Extract meaningful information, such as entities, topics, or other relevant NLP features
    const embedded = {
        // Example: Extracting named entities (people, places, etc.)
        people: doc.people().out('array'),
        places: doc.places().out('array'),
        topics: doc.topics().out('array'),
        verbs: doc.verbs().out('array'),
        adjectives: doc.adjectives().out('array'),
        sentence: sentence // the original sentence
    };

    // Return the embedded information
    return embedded;
}

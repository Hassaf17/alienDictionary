let alienAlphabet = (words) => {


    if (words.length === 0) {
        return '';
    }
    
    let charMap = {}; // value is the list of letters that come after the key
    let charPreReqCount = {}; // value is how many times key needed a pre req letter
    let queue = [];
    let result = [];
    
    for (let i = 0; i < words.length; i++) {

        // initializing 
        // wert and woo
        // charMap : { w: [], e: [], r: [], t: [], o: [] } 
        // charPreReqCount : { w: 0, e: 0, r: 0, t: 0, o: 0 } 
        const chars = words[i].split('');
        
        for (let j = 0; j < chars.length; j++) {
            if (!charMap[chars[j]]) {
                charMap[chars[j]] = [];
                charPreReqCount[chars[j]] = 0;
            }
        }
        

        
      
        // skip the first one or same word
        if (i === 0 || words[i] === words[i - 1]) {
            continue;
        }
        
        const cur = words[i];
        const prev = words[i - 1];
        j = 0;

        
      
        // only comparing the first non equal characters of two words - wert vs woo j = 1
        while(j < cur.length && j < prev.length && cur.charAt(j) === prev.charAt(j)) {
            j++;
        }
      
      
        
        // since words are in order, wert and woo after skipping w, becomes ert and oo, e will have higher order than o
        
        charMap[prev.charAt(j)].push(cur.charAt(j));
        // { w: [], e: [ 'o' ], r: [], t: [], o: [] } 
        charPreReqCount[cur.charAt(j)]++;
        // { w: 0, e: 0, r: 0, t: 0, o: 1 } 
        
    }

    // these will be the roots since there are no prereq needed to use them
    Object.keys(charPreReqCount).forEach(char => {
        if (charPreReqCount[char] === 0) {
            queue.push(char);
        }
    });
      
    // for those that we know are root chars
    while(queue.length > 0) {

        const rootChar = queue.shift();     
        result.push(rootChar);

        for (i = 0; i < charMap[rootChar].length; i++) {

            // charRequiresRoot would be o
            var charRequiresRoot = charMap[rootChar][i];
            charPreReqCount[charRequiresRoot]--;
            // o: 1 -> o: 0 then o gets added to queue which gets popped into result
            if (charPreReqCount[charRequiresRoot] === 0) {
                queue.push(charRequiresRoot);
            }
        }
    }

    return result;
}
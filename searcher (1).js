//Azan Bin Zahid
//20100206
//both functions are working great
//search function has issues only with command line argument, manuallly it is working as per required


const fs = require ('fs')
const path = require ('path')

const index = (out, dir, result = {}) => {
	fs.readdir(dir, (err, wow)=>{
		if (fs.statSync(dir).isDirectory()) {console.log(dir, "with", wow.length, " file(s) found")}
	})
    fs.readdirSync(dir).forEach((file) => {
        const fPath = path.join(dir, file);
        if (fs.statSync(fPath).isDirectory()) {
        	return index(out, fPath, result);
        }
        fs.readFile(fPath, 'utf-8', (err, txtInput)=>{
         	
           if (err) return console.log("err")
            
            let line_by_line = txtInput.split('\r\n');
            for (j = 0; j < line_by_line.length; j++) { 
                 
                 let words = line_by_line[j].split(' ');
                 for (i = 0; i < words.length; i++) {

                   const a = words[i].replace(/[^A-Za-z]/gi, '')

                   if(a.length>=10){ 
                   const path_line = {file:fPath, line : []}
 
                    if (a in result){


                         let flag = 0;
                         for (var k = 0; k < 50; k++) {
                         	if (result[a].length==k+1 &&(result[a][k].file == path_line.file)) {
                         		result[a][k].line.push(j+1); flag = 1; break;
                         	}
                         }

                           if (flag == 0) {path_line.line.push(j+1); result[a].push(path_line)}
                    	
                    }
                    else {path_line.line.push(j+1); result[a] = [path_line]; }  
                    
                    
                    var my= JSON.stringify(result)
         	        fs.writeFile(out, my, (err)=>{
         	       	if (err) console.log("err")
         	         })
            	    }
         	     }
               }   
           })
    })
};


const search = (Index, words_list)=>{


let output = []
for (var word_iterator = 0; word_iterator < words_list.length; word_iterator++) {
	let word_to_search = words_list[word_iterator]
	let word = []

fs.readFile(Index, 'utf-8', (err, JSONformat)=>{
    if(JSONformat) {
	    const JSONfileStore = JSON.parse(JSONformat); 
	    if(word_to_search in JSONfileStore) {word.push(JSONfileStore[word_to_search]);

	    for (var i = 0; i < word.length; i++) {
	    	for (var j = 0; j < word[i].length; j++) {
                for (var line_loop = 0; line_loop < word[i][j].line.length; line_loop++) {
                	const found_index = word[i][j].line[line_loop];

	    		fs.readFile(word[i][j].file, 'utf-8', (err, data)=>{
	    			if(data){

	    				let line_by_line = data.split('\r\n');
	    				for (var line_iterator = 0; line_iterator < line_by_line.length; line_iterator++) {
	    					if(line_iterator==found_index-1){

                                
	    					    console.log(line_by_line[line_iterator], " \[line ", line_iterator, "\]")
	    					    
	    					}
	    				}
	    			}
	    	  })
	    	}
	      }
	    }
	  }
	}
   })
  }
}


// search("myIndex.JSON",["introduced","comforting"])


// index('myIndex.JSON','test');

if(process.argv[2]=="search") {search(process.argv[3], process.argv[4]);}
if(process.argv[2]=="index") {index(process.argv[3], process.argv[4]);}


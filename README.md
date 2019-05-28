## Introduction

The Google Search, a phenomenon that very computer scientist can be proud of. The Google search is the culmination and intersection of many different domains in computer science, in order to operate at the scale that it does. However, as complex as the Google search system is at scale, in theory it isn't all that bad to grasp. Google's web crawlers "index" the web, and the search system quickly goes over that index and retrieves results whenever we do a search. This then also grabs small snippets from the websites given in the index to show on the results page (Do a search yourself and observe this).

Every search pings a highly optimized data structure, looking up and compiling hundreds of relevant links to answer search queries in sub-second times. You're going to get a unique insight into how these processes come together because you're going to make a very simplified version of this search mechanism to work on text files offline, searching for words in them.

## Your Objective

The objective is simple. You need to build a "searcher.js" file that can both index and lookup words in a given set of text files, which may span across multiple folders or sub-folders in a given directory. First you'll use your created system to index every word (longer than 3 characters) in every text file in your target folder (directory), and then you will be able to use that index to search for where words appear in the files in our directory. The sample Setup will explain this further.

## Sample Setup

Here is a sample setup of the problem: Mydirectory contains three folders ("A","B","C"), where A, B and C each contain 4 populated text files each. This is no indication of the eventual problem size, your problem should be able to deal with an arbitrary folder. Using our searcher.js program, we will first index these files to create a "lookup" file (A JSON file) that will contain words and the locations of where those words appear in the different files. This is effectively a dictionary data structure.

Example: The word "Computer" appears in file "MyDirectory/A/text1.txt" on line number 23 and 56 and appears in file "MyDirectory/B/text5.txt" on line number 32 and 91, then the dictionary should have:
```
{"Computer" : [{ "file" : MyDirectory/A/text1.txt", "line": [23,56]}, { "file" :"MyDirectory/B/text5.txt", "line" :[32,91]}]}
```
This is a JSON file format, look this up online. The Word, the files that contain it, and the lines on which it appears in those specific files.

By the end of the indexing process, your program will output a single JSON file that will contain this dictionary for all words in all the files present in your target directory.

Then when we search, we can ask our searcher.js file to go over our JSON file, and retrieve results for where our search terms show up in their respective files.

Continuing on the previous example, let's assume we ask "Searcher.js" to lookup the words ["Computer"], in all the files using our JSON file as an index (think of it now as a table of contents for any book). It should print out lines 23 and 56 from MyDirectory/A/text1.txt and lines 32 and 91 from MyDirectory/B/text5.txt to show us that the word(s) "Computer" appears in these lines in these files.

Understand this overall goal first, feel free to draw on a piece of paper to fully get what's going on and then continue.

## Assignment requirements

You will create a single file "searcher.js" which will take arguments from the command line to direct it for what needs to be done (lookup how to parse command line arguments online).

The following two commands are what you will have to support by the end of this task:
```
 "node searcher.js index myIndex.JSON MyDirectory"
 "node searcher.js search myIndex.JSON [ list of words to search for ]"
```
The first command should create the JSON itself, and populate it and then the second command will use it for lookup. The 'index' and 'search' keywords will set the mode for searcher.js and tell it what we want it to do. MyDirectory will be the name of the parent directory containing subfolders and files. The list of words will be what we want to search in every file in the parent directory.

## Possible approach for indexing

1. Use the 'Path' library to be able to recursively go through your parent directory looking for text files to parse, sending callbacks for when a folder is completely scanned. Use callbacks to determine progress, and keep printing this progress on the command line:
```
"Folder with 5 files found"
"New Subfolder found"
"New Subfolder found"
"MyDirectory fully Scanned"
```

2. Initiate calls on all the text files found, appending to an in-memory dictionary for every word encountered in the files and where. Use the readFile function from the 'fs' (fileSystem) library to accomplish this task, and don't forget to change the byte encoding for the file to a readable string format after reading the file. (one way to do this is fs.readFile(filename, 'utf-8', callback)). Use callbacks here (count using number of calls initiated and the number of callbacks obtained) to represent progress on the command line:

A way to break down the full text of the file into different numbered lines is to use the split function with ('\n') end-of-line tags and to number lines like that. Try doing this with a small test text sample first to see how it works. Then try searching for different words in that small sample, to figure this out first before coding it in. Remember you can use 'node' interpreter in the command line to test small pieces of code just as you did with Haskell.

```
"13 files parsed"
"14 files parsed"
"15 files parsed"
"parsing complete"
```
3. Await all callbacks to complete, for all files to be fully indexed and parsed. You may use promises here, but it is not required. It will however make your life a little easier, using the Promise.all construct to await task completion.

4. Once all callbacks have been obtained and all the files parsed and indexed into a single large dictionary, save this output to a JSON file with whatever name was provided in the command line argument (use the function json.stringify() with your in-memory dictionary as argument, to convert to a JSON object).

5. Rejoice, you just indexed something!

## Possible approach for lookup

1. This time, we start with the JSON file and parse over the list of files that contain a certain word as well as where that word occurs on whichever line or sets of lines (using json.Parse() with the file data as argument and you'll get back your original in-memory dictionary)

2. For each occurence send off a call to open the file, read it to the desired line and copy the line over to a list of results.

3. Once all the results have been compiled, print them all out to command line.

4. Rejoice, (x2) you compiled results!

## Rules

  * Libraries, you can use the 'path' and the 'fs' libraries to accomplish this task. You can also use the JSON stringify and Parse functions built into the standard library. Use whatever other library you wish.

  * You will find text files to parse yourself online, and create your own folder structure to parse through. Make it as complicated as you can for testing your code properly

  * Here are some examples for files you may want to convert to txt files and store in your folder, create an intricate folder structure

    -> https://www.gutenberg.org/files/11/11.txt (Alice in wonderland)

    -> https://archive.org/stream/AAMilneWinnieThePooh/A_A_Milne_-_Winnie-the-Pooh_djvu.txt

    Find a few of these files and create a folder structure to test this, the following is an example of this
```
    folder: MyDirectory
    (
      folder:A ('a.txt', 'b.txt', folder:E ('c.txt')),

      folder:B ('d.txt'),

      folder:C ('e.txt'),

      folder:D ('f.txt')
    )
```
## Further directions

 
If you can accomplish all of that in good time, why restrict yourself to offline only! You've made an indexing and searching system, the skies the limit for what you can do now! Wanna try taking this online?  

Want to make your own command line version of Google? WITH Usable hyperlinks?!  

What if you could find a way to create a Google Search for a certain query, send off the query online await it's results coming back and then parse the results to pull out all the result links from the search. But rather than use Google's snippets for a certain search query, we can make our own! Perhaps you could find a node library that does the same thing? That's up to you and your style of problem solving.  

You can use the HTTPS library for it's '.get' function to create GET requests to ask for webpages (create a google search query using this). Observe how the queries are created by doing a few searches yourself. Send off GET requests (using https.get) for all of those webPages extracted from the Google Search and once you get the HTML back, parse it and pick out keywords from the HTML and print the lines we find them in on command line. Restrict yourself to 3 per webpage. You can use the 'parse5' library to parse through webpage HTML content and look for 'href' tags for external links to other sites (these links are the blue links you see in a Google Result). The parse5 libary makes this a lot easier, you can pipe the result through a parser object and use it to look for href tags.

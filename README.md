https://diegodelias.github.io/Access-Live-Public-Data/house-starter-page.html




Your task

You have been asked to upgrade the code you have to use live data with AJAX, and to take advantage of Vue.

Vue is an open-source progressive JavaScript framework to make it easier to display data in HTML.

The first important change you'll make will be to replace the code that gets the test data from local files with AJAX calls to get real data from the ProPublica site instead. 

The second change is to follow best practices and clean up the JavaScript and HTML code. One step is to move most of the JavaScript from the HTML file over into its own .js file. The other step is to use Vue to reduce the amount of JavaScript needed to update the HTML.



Background

HTML Templating

Constructing HTML by concatenating strings is simple at first, but rapidly gets very hard to maintain as the HTML and CSS gets more complex. Therefore, virtually all web programming frameworks include templating libraries that let you define HTML patterns, in HTML files, and then combine those patterns with data to create the actual HTML on the final pages.

Vue is a JavaScript framework for building user interfaces. It lets you write the HTML you want to use, and add attributes and {{ value }} forms to insert data and repeat forms.

For example, suppose we want to display a simple list of links to employees. Here's how you could write that in your HTML file using Vue:

<ul>
  <li v-for="employee in employees">
    <a v-bind:href="employee.url">{{ employee.name }}</a>
  </li>
</ul>
This is nice and readable, and much easier to edit than JavaScript concatenating strings. Vue adds a few special notations for your HTML. The ones shown here are:
{{ expression }} to insert the value of a JavaScript expression into HTML text
v-bind:attribute="expression" to insert the value of a JavaScript  expression into a tag attribute
<tag v-for="var in expression">...</tag> to repeat some HTML element for every item in the list returned by a JavaScript expression. var will be set to each item in turn, just like a JavaScript for loop.

For Vue annotations to work requires a few additional steps:


Put the HTML that you want Vue to scan and change inside an HTML element with some distinct ID. The ID app is often used but not required.
Load the Vue JavaScript library.
Add JavaScript code to create a Vue object that connects the HTML with the data.
Set the data.

Here's an outline of how that might work here:


<!DOCTYPE HTML>
<html>
<head>
...
</head>
<body id="app">
...
  <ul>
    <li v-for="employee in employees">
      <a v-bind:href="employee.url">{{ employee.name }}</a>
    </li>
  </ul>
...
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script>
var app = new Vue({
  el: '#app',
  data: {
    employees: [
    ]
  }
});

app.employees = [ 
  { name: "John Smith", url: "http://company/jsmith.html" },
  { name: "Mary Jones", url: "http://company/mjones.html" }
];

</script>
</body>
</html>
The Vue object is a place to store data to be displayed.  Only when you want to update the display should you update the Vue data.  Internally Vue is smart about checking to see what needs to be changed on the page.  More complex calculations should be done in JavaScript when preparing the data to pass to the HTML.

CDN (Content Distribution Networks)

Strictly speaking, a Content Distribution Network (CDN) is a network of web servers that contain duplicated content, placed at various locations around the world to reduce congestion and long-distance network traffic. The term has informally been extended to refer to web sites that host commonly needed web resources, such as JavaScript libraries, reducing the need for millions of copies of jQuery and other popular tools.

AJAX and Browser Security 

AJAX gives code on a web page the ability to send information to another web server. This raises security concerns. A malicious or hacked web page might contain code that sends your personal information wherever it pleases. To be safe, therefore, by default browsers only allow a web page to send AJAX if

It is running on a web server, under some domain, e.g., superior.widgets.com
The AJAX is sending information to a URL in the same domain, or
The web service on the other domain implements cross-origin resource sharing (CORS)

For this reason, to test AJAX code, you need to be running a web server (see 'Python' below), and, if you want to get data from another service, they must implement CORS, or you must use special methods to get the data. See Resources for more on this.

DRY

You always want to avoid duplicating code. Duplicated code means that when you find a bug or see a way to improve something, you have to make the same change in multiple places. In software development, this is called being DRY (Don't Repeat Yourself).

In JavaScript, one technique to avoid duplication is to refactor the bits that make code different into a data object. Then you write one body of code, and pass it different data objects for different situations.

For example, suppose you have several pages where some part of each page is to be filled in with data from an AJAX call, and then stored/rendered with Vue. A DRY solution would define a function, call it renderRemoteData(), that is called on each page with code like this:

<script type="text/javascript">
renderRemoteData({ url: "https:remote-temperature.com",
  target: "display-table"
  });
</script>
Here, the target is the ID for elements on the page where the Vue data appears, and the URL gives the function the information it needs to make the AJAX call. Just one code file to define renderRemoteData() and its subfunctions is needed.

Python

Python is a modern general purpose programming language. It comes pre-installed on Linux and Macintosh machines and is easily installed on Windows machines. 

We won't be doing any Python programming, but we will need its built-in web server. That's because you can only do AJAX calls from pages running on a real server.


Install Python (if necessary)

To do AJAX calls, you are going to need to run a web server on your machine. The simplest way to do that is to install the Python programming language. Python comes with a simple web server.

You may have Python already installed.

1. Open a command shell.

2. Execute the command python --version

TIP: Note the double-dash

3. If you have Python, you'll see the version come up and you should be all set.

4. Otherwise, go to python.org to download a Python version for your operating system.

5. Now test that the web server works. In a command shell:

cd to the folder with your HTML
Start the Python web server with 
python -m SimpleHTTPServer (for v2)   or    python -m http.server (for v3)

TIP: Note the single dash and capitalization

6. Go to your browser and open http://localhost:8000/senate-data.html 
(or whatever you called the HTML file for your Senate data).

7. If you see your Senate page, you're fine. If not, debug.

TIP: At any point you can stop the server with control-C in the command shell.

TIP: Remember to cd to the correct directory before starting the server.


Add code to load Vue 

There are two ways to do this.

Load Vue directly from CDN's, i.e., web sites that host copies of these libraries 
Download copies of the libraries and load them locally 

The fastest way to get started is the first approach. You just need to create SCRIPT tags with the right SRC attributes. It also means there's less code in your web app folder. Most CDNs have fast servers, duplicated around the world, so there's no major delay getting the code.

The first small step is to add the SCRIPT elements to load Vue to all your HTML files. They should be placed before the SCRIPT element that loads your own code.
Verify in the Developer Console that the libraries load and introduce no errors when you reload the page.

Replace the Static JSON data with a call to the ProPublica server

You're going to be adding more code to your JavaScript.

1. In your Senate web page, comment out the SCRIPT element that loads the Senate data.

TIP: you could delete this, but commenting out will make it easier to switch back if you need to for some reason.

2. Now your code should break because data is undefined. To fix that,

1. Put var data as a line by itself at the start of your code inside the $(function() {…}) See Duckett's JavaScript and jQuery p. 405 for an example of declaring a global variable this way.

2. Follow it with a fetch() JavaScript call that

Gets data from the ProPublica API url (You used this url in the very first task to retrieve the JSON data file from ProPublica server).  See javascript How to make AJAX calls for how to use fetch(). 
TIP: Don't forget to include your API key as a header!

Calls a success function that sets data to the data retrieved

3. Debug until the page works as it used to.

TIP: This has to be done using your Python web server. Just double-clicking on your HTML file won't work, because a double-clicked HTML file can't call AJAX. (See step 1 of this PoA to review how to use your Python web server.)

SUBMIT: Submit your Senate HTML file for mentor review. 

Submit call to the ProPublica server Tarea
Sin finalizar: Submit call to the ProPublica server
Implement Vue in HTML and JS for Senate Page

Using Vue is relatively straightforward. (See javascript How to Create HTML with Vue)

Open your main Senate page html and js file.

1. Add a div in the html for Vue to use and fill like this: 

<div class="container" id="app">   </div>
2. Inside this element, put the Vue data template that: 

1. Loops over the elements of an array

2. Creates a TR element with TD's containing {{…}} elements for the data you want to insert.  See below for example. 

<tbody>
   <tr v-for="(value, key) in senators">
     <td>{{value.first_name}} {{value.middle_name}} {{value.last_name}}</td> 
     <td>{{...}}</td>
     <td>{{...}}</td>
     <td>{{...}}</td>
     <td>{{...}}</td>
   </tr>
 </tbody> 
3. Inside js file create a Vue instance similar to: 

var app = new Vue({  
  el: '#app',  
  data: {    
    ...  
  }
}); 
4. Create an empty array in the Vue instance that will store just the part of the data you need. (e.g., an array called senators.)

5. In your fetch() function, assign the data into your new empty Vue array. (e.g. app.senateData = ...)

TIP: You can assign this array to any part of the data.  You do not have to store all of the live data if it is not going to be used in the HTML or if it is nested and will make calling it in the HTML difficult.

6. Test in console to see if the data is being called and to check for errors. 

7. Debug until the page works as it used to.

SUBMIT: Submit for mentor review your Senate HTML code with Vue, plus the JavaScript that uses Vue data instance to create the HTML.

Submit Implement Vue in HTML and JS for Senate Tarea
Sin finalizar: Submit Implement Vue in HTML and JS for Senate
Implement Vue in HTML and JS for Senate Statistics Pages 

This will be very similar to what you did for the Senate main page.  The only difference is that you will be setting the Vue data to be the results of the calculations needed for the statistics page.  

Open your main Senate Loyalty page html and js file.

1. Add a div in the html for Vue to use and fill like this: 


<div class="container" id="app">   </div> 
2. Inside this element, put the Vue data template that: 

1. Loops over the elements of an array

2. Creates a TR element with TD's containing {{…}} elements for the data you want to insert.  See below for example. 

<tbody>
   <tr v-for="(value, key) in partyInfo">
      <td>{{...}}</td>
      <td>{{...}}</td>
      <td>{{...}}</td>
   </tr>
</tbody> 
3. Inside js file create another Vue instance similar to the below.  Fill it with the data keys that you need for your HTML table.  This data can be nested and designed based on how you will use it. 

var app = new Vue({  
  el: '#app',  
  data: {    
    ...  
  }
}); 
4. Assign the correct Vue data to the result of each calculation function as the last step of each calculation function.  (e.g. app.data.partyInfo.democratPartyCount = ....)

5. Call the calculation functions as the last step of the fetch() call.

6. Test in console to see if the data is being called/assigned correctly and to check for errors. 

7. Debug until the page works as it used to.

SUBMIT: Submit for mentor review your Senate Statistics HTML code with Vue, plus the JavaScript that uses Vue data instance to create the HTML.

Submit Implement Vue in HTML and JS for Senate Statistics Tarea
Sin finalizar: Submit Implement Vue in HTML and JS for Senate Statistics
Repeat with the other pages

Now that you have the JavaScript fetch() and Vue working for your Senate main page and Senate Loyalty page, repeat the same steps for your other web page(s).

Try to do this and make your code as DRY as possible.

SUBMIT: When your pages are working with live data and coded with Vue, submit your project with acces to public data.


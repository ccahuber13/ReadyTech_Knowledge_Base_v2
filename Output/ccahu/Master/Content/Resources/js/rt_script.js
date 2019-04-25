/*========================================================================
  Author: Christopher C. Huber
  Date:   02/13/2017
  Last Updated: 12/13/2018
==========================================================================*/



// *******************************************************************************************
// User interface controller module

var UIController = (() => {
    // List of used DOM HTML classes and IDs
    var DOMstrings = {
      date: '#date',
      body: 'body',
      relatedTopic: '.rel-topic',
      relatedArticlesCont: '.rel-articles-container',
      dlFile: '.dl-file',
      TOCcontainer: '.table-of-contents-container',
      navTogRight: '.navbar-toggler-right',
      navTogRightMenu: '.navbar-toggler-right-menu',
      displayMenu: 'displayMenu',
      headings: 'h2,h3'
    }
  
    // Make public to the controller
    return {
      // Scan the page for items with .rel-topic class and build a related topics menu if it exists.
      addRelatedTopics: () => {
        let relTopicsList, relTopHTML, relTopBottomHTML, el, title, link, RelToplineItem, relTopString, relatedArticlesContainer;
  
        relTopHTML = `<nav role="Related Articles" class="rel-table-of-contents card bg-light">
                        <div class="card-header">Related Articles</div>
                          <ul class="list-group list-group-flush">`;
        
        relTopBottomHTML = `</ul></nav>`;
        // Build node list of .rel-topic classes (related topics)
        relTopicsList = document.querySelectorAll(DOMstrings.relatedTopic);
        relatedArticlesContainer = document.querySelector(DOMstrings.relatedArticlesCont);
        // Build an array from nodelist
        const relTopArr = Array.from(relTopicsList);
        // For each node list item build the HTML string to be added to the menu
        relTopArr.forEach((el) => {
          title = el.textContent;
          link = el.getAttribute('href')
          RelToplineItem = `<li class="list-group-item"><a href="${link}">${title}</a></li>`;
          relTopHTML += RelToplineItem;
        });
        // Build complete HTML string (related topics menu) to be inserted into page
        relTopString = relTopHTML += relTopBottomHTML;
        // If a related topic exists add innerHTML to page
        if(relTopicsList[0]) {
          relatedArticlesContainer.innerHTML = relTopString;
        // If .rel-topic does not exist, do not display related topics menu
        } else {
          relatedArticlesContainer.style.display = 'none;';
        };
       
      },
  
      // Build a PDF Guides floating menu to the right, similar to addRelatedTopics function.
      addPDFGuides: () => {
        let NodeList, TopHTML, BottomHTML, el, title, link, lineItem, BuiltString, TOCcontainer, Arr;
     
        TopHTML = `<nav role="downloads" class="rel-table-of-contents card bg-light">
                      <div class="card-header">PDF Guides
                        <i class="rt-home-icon">
                                    <svg width="2.5rem" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72">
                                        <title>pdf-article</title>
                                        <polyline points="46.71 32.43 46.71 20.29 28.43 2 1 2 1 66 16.71 66" fill="none" stroke="#004276" stroke-linecap="round"
                                        stroke-linejoin="round" stroke-width="3px" />
                                        <polyline points="28.43 2 28.43 20.29 46.71 20.29" fill="none" stroke="#004276" stroke-linecap="round"
                                        stroke-linejoin="round" stroke-width="3px" />
                                        <text transform="translate(27.97 57.16)" font-size="16" fill="#004276" font-weight="bold" font-family="Raleway-Medium, Raleway">PD<tspan
                                          x="21.42" y="0" letter-spacing="-0.02em">F</tspan></text>
                                        <rect x="22" y="37.96" width="43" height="28.04" rx="1.64" ry="1.64" opacity="0.75" stroke="#004276"
                                        stroke-linecap="round" stroke-linejoin="round" stroke-width="3px" fill="none" />
                                    </svg>
                                  </i>
                      </div>
                      <ul class="list-group list-group-flush">`;
        BottomHTML = `</ul></nav>`;
  
        NodeList = document.querySelectorAll(DOMstrings.dlFile);
        container = document.querySelector(DOMstrings.TOCcontainer);
        Arr = Array.from(NodeList);
        Arr.forEach((el) => {
          title = el.textContent;
          link = el.getAttribute('href')
          lineItem = `<li class="list-group-item"><a href="${link}">${title}</a></li>`;
          TopHTML += lineItem;
        });
        BuiltString = TopHTML += BottomHTML;
        
        if(NodeList[0]) {
          container.innerHTML = BuiltString;
        };
      },
  
      // Mobile nav menu - right side hamburger. Toggle display on and off.
      mobileNav: () => {
        document.querySelector(DOMstrings.navTogRightMenu).classList.toggle(DOMstrings.displayMenu);
        console.log('clicked');
      },
  
      // Expose DOM strings to other modules
      getDOMstrings: () => {
        return DOMstrings;
      },
  
      // Set an ID for all h2 and h3 headings. Allows to link to Table of Contents.
      setHeadingID: () => {
        const headings = document.querySelectorAll(DOMstrings.headings)
        headings.forEach((cur, i) => {
          cur.setAttribute('id', i);
        });
        console.log(headings);
      },
  
      // Set current date (year) - (month) is optional
      displayMonth: () => {
        var now, year;
        // months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        // returns date of today
        now = new Date();
        year = now.getFullYear();
        // month = now.getMonth();
        document.querySelector(DOMstrings.date).textContent = year;
      }
  
    }
    
  })();
  
  // *******************************************************************************************
  // Primary contorller module
  
  var controller = ((UICtrl) => {
    // Expose DOMstrings to controller
    var DOM = UICtrl.getDOMstrings();
  
    var setupEventListeners = (() => {
      document.querySelector(DOM.navTogRight).addEventListener('click', UICtrl.mobileNav);
    });
  
  
    // Initialize on page load
    return {
      init: () => {
        console.log('rt_script is running');
        // Display month in footer on pages.
        UICtrl.displayMonth();
        // Add related topics panel to the right margin if present
        UICtrl.addRelatedTopics();
        // Add related PDF guides panel to the right margin if present
        UICtrl.addPDFGuides();
  
        setupEventListeners();
  
        UICtrl.setHeadingID();
      }
    }
  
  })(UIController);
  
  // Initialize on page load
  controller.init();
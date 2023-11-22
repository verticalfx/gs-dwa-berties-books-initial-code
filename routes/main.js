module.exports = function(app, shopData) {

    // Handle our routes
    app.get('/',function(req,res){
        res.render('index.ejs', shopData)
    });

    app.get('/about',function(req,res){
        res.render('about.ejs', shopData);
    });

    app.get('/search',function(req,res){
        res.render("search.ejs", shopData);
    });

    app.get('/search-result', function (req, res) {
        // Takes in the keyword and search type from the query string
        let keyword = req.query.keyword;
        let searchType = req.query.searchType;

        // Initialise the SQL query
        let sqlquery;

        // Check the search type and set the SQL query accordingly
        if (searchType == "basic"){
            sqlquery = "SELECT * FROM books WHERE name = '" + keyword + "'";
        } else if (searchType == "advanced"){
            sqlquery = "SELECT * FROM books WHERE name LIKE '%" + keyword + "%'";
        }
        
        // Execute the SQL query and return the results
        db.query(sqlquery, (err, result) => {
            if (err) {
                res.redirect('./'); 
            }

            // Create a new object called newData and add the result to it
            let newData = Object.assign({}, shopData, {availableBooks: result});
            console.log(newData);
            res.render('search-result.ejs', newData)
        });
    });


    app.get('/register', function (req,res) {
        res.render('register.ejs', shopData);                                                                     
    });              

    app.post('/registered', function (req,res) {
        // saving data in database
        res.send(' Hello '+ req.body.first + ' '+ req.body.last +' you are now registered!  We will send an email to you at ' + req.body.email);                                                                              
    }); 

    app.get('/list', function(req, res) {
        let sqlquery = "SELECT * FROM books"; // query database to get all the books
        // execute sql query
        db.query(sqlquery, (err, result) => {
            if (err) {
                res.redirect('./'); 
            }

            // Create a new object called newData and add the result to it
            let newData = Object.assign({}, shopData, {availableBooks: result});
            console.log(newData);
            res.render('list.ejs', newData)
         });
    });

    // Add a new route for /addbook
    app.get('/addbook', function(req, res) {
        // Render the addbook.ejs file
        res.render('addbook.ejs', shopData);
    });

    app.post('/bookadded', function (req,res) {
        // saving data in database
        let sqlquery = "INSERT INTO books (name, price) VALUES (?,?)";
        // execute sql query
        let newrecord = [req.body.name, req.body.price];
        // Execute the SQL query and return the results
        db.query(sqlquery, newrecord, (err, result) => {
          if (err) {
            return console.error(err.message);
          }
          else {
            res.send(' This book is added to database, name: '
                      + req.body.name + ' price '+ req.body.price);
          }
        });
  });    

  app.get('/bargainbooks', function(req, res) {
        let sqlquery = "SELECT * FROM books WHERE price < 20"; // query database to get all the books
        // execute sql query
        db.query(sqlquery, (err, result) => {
            if (err) {
                res.redirect('./'); 
            }

            // Create a new object called newData and add the result to it
            let newData = Object.assign({}, shopData, {availableBooks: result});
            console.log(newData);
            res.render('bargainbooks.ejs', newData)
        });
  });

}

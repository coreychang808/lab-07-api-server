('use strict')

module.exports = (err, req,res,next) => {
    console.log('Server error');
    res.status(500);
    res.send(`Error: ${err}`);
    res.end();
  };
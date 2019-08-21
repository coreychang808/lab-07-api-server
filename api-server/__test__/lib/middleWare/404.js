('use strict')

module.exports = (req,res,next) => {
    console.log('Unknown Route');
    res.status(404);
    res.send('Page\'s not here man');
    res.end();
  };
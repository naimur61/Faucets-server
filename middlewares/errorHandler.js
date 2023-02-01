// Nof Found 
const notFound = (req, res, next) => {
   const error = new Error(`Not Found ${req.originalUrl}`);
   // res.status(404);
   error.statusCode = 404;
   next(error);
}

// Error Handler 
const errorHandler = (error, req, res, next) => {
   const statusCode = error.statusCode || 500;
   res.status(statusCode);
   res.json({
      message: error?.message,
      stack: error?.stack
   });
};

module.exports = { errorHandler, notFound };
const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Parodo pilną klaidos steką
  
    // Jei klaida yra JSON formato, grąžina ją
    const status = err.status || 500;
    const message = err.message || "Internal Server Error";
  
    res.status(status).json({
      status: "error",
      message,
    });
  };
  
  export default errorHandler;
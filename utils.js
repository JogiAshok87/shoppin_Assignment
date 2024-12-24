const isProductURL = (url) => {
    const patterns = [/\/product\//, /\/item\//, /\/p\//];
    return patterns.some((pattern) => pattern.test(url));
  };
  
  module.exports = { isProductURL };
  
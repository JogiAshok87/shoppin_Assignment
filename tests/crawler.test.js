const { isProductURL } = require("../utils");

test("Valid product URLs", () => {
  const urls = [
    "https://example.com/product/123",
    "https://example.com/item/456",
    "https://example.com/p/789"
  ];
  urls.forEach((url) => {
    expect(isProductURL(url)).toBe(true);
  });
});

test("Invalid product URLs", () => {
  const urls = [
    "https://example.com/about",
    "https://example.com/contact",
    "https://example.com/blog/123"
  ];
  urls.forEach((url) => {
    expect(isProductURL(url)).toBe(false);
  });
});

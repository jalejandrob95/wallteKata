require("dotenv").config();
const { expect } = require("chai");
const convertCurrency = require("../src/api/currencyApi");

describe("convertCurrency", () => {
  it("should return the converted currency", async () => {
    const sourceCurrency = "USD";
    const targetCurrency = "EUR";
    const amount = "1";
    const data = await convertCurrency(sourceCurrency, targetCurrency, amount);
    expect(data).to.have.property("curency").that.is.equal("EUR");
    expect(data).to.have.property("price").that.is.a("number");
  });

  it("should throw an error for invalid response data", async () => {
    // Mocking an invalid response
    const invalidData = {
      results: null,
    };

    // Mock the fetch function to return the invalid data
    const originalFetch = global.fetch;
    global.fetch = () => Promise.resolve({ json: () => invalidData });

    const sourceCurrency = "USD";
    const targetCurrency = "EUR";
    const amount = "1";

    // Perform the test
    try {
      await convertCurrency(sourceCurrency, targetCurrency, amount);
    } catch (error) {
      expect(error).to.be.an("error");
      expect(error.message).to.equal("Invalid response data");
    }

    // Restore the original fetch function
    global.fetch = originalFetch;
  });

  it("should handle network errors", async () => {
    // Mock the fetch function to simulate a network error
    const originalFetch = global.fetch;
    global.fetch = () => Promise.reject(new Error("Network error"));

    const sourceCurrency = "USD";
    const targetCurrency = "EUR";
    const amount = "1";

    // Perform the test
    try {
      await convertCurrency(sourceCurrency, targetCurrency, amount);
    } catch (error) {
      expect(error).to.be.an("error");
      expect(error.message).to.equal("Network error");
    }

    // Restore the original fetch function
    global.fetch = originalFetch;
  });
});

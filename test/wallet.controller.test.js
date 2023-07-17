/* require("dotenv").config();
const chai = require("chai");
const sinon = require("sinon");
const chaiHttp = require("chai-http");
const walletService = require("../src/services/wallet.service");
const app = require("../src/index");

chai.use(chaiHttp);

const expect = chai.expect;
const should = chai.should();

describe("get", () => {
  it("should return wallets successfully", async () => {
    const response = await chai.request(app).get("/v1/wallet/");
    should.exist(response.body.message);
    should.exist(response.body.data);
    response.body.data.should.be.a("array");

    expect(response).to.have.status(200);
    expect(response.body.message).to.equal("success");
  });
});

describe("getById", () => {
  it("should return a wallet by ID successfully", async () => {
    const response = await chai.request(app).get("/api/wallets/1");

    expect(response).to.have.status(200);
    expect(response.body.message).to.equal("success");
  });
});

describe("create", () => {
  it("should create a wallet successfully", async () => {
    const walletMock = { id: 1, name: "Wallet 1" };
    walletService.create = sinon
      .stub()
      .withArgs("test@example.com")
      .resolves(walletMock);

    const response = await chai
      .request(app)
      .post("/api/wallets")
      .send({ email: "test@example.com" });

    expect(response).to.have.status(200);
    expect(response.body.message).to.equal("success");
    expect(response.body.data).to.deep.equal(walletMock);
  });
});

describe("updateOne", () => {
  it("should update a wallet successfully", async () => {
    const walletMock = { id: 1, name: "Updated Wallet" };
    walletService.updateOne = sinon
      .stub()
      .withArgs(1, "new-email@example.com")
      .resolves(walletMock);

    const response = await chai
      .request(app)
      .put("/api/wallets/1")
      .send({ email: "new-email@example.com" });

    expect(response).to.have.status(200);
    expect(response.body.message).to.equal("success");
    expect(response.body.data).to.deep.equal(walletMock);
  });
});

describe("deleteOne", () => {
  it("should delete a wallet successfully", async () => {
    const walletMock = { id: 1, name: "Wallet 1" };
    walletService.deleteOne = sinon.stub().withArgs(1).resolves(walletMock);

    const response = await chai.request(app).delete("/api/wallets/1");

    expect(response).to.have.status(200);
    expect(response.body.message).to.equal("success");
    expect(response.body.data).to.deep.equal(walletMock);
  });
});
 */

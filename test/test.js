const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../index");

chai.use(chaiHttp);
chai.should();

describe("Animes", () => {
  describe("GET /", () => {
    it("All animes listed", (done) => {
      chai
        .request(app)
        .get("/")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });

    it("Single Anime", (done) => {
      const id = 1;
      chai
        .request(app)
        .get(`/${id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });

    it("Non existing Anime", (done) => {
      chai
        .request(app)
        .get(`/papas`)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a("object");
          done();
        });
    });
  });
});

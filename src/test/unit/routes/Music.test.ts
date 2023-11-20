import { expect } from "chai";
import request from "supertest";
import { runServer } from "../../../app/application/bin/server"; // Import your Express app
import assert from "assert";
import axios from "axios";
import supertest from "supertest";

describe("GET /api/music", () => {
  it("should return a list of music", async () => {
    const response = await request(runServer).get(
      "http://localhost:3000/api/v1/music"
    );

    expect(response.status).to.equal(200);
    
    // expect(response.body).to.be.an("array");
    // Add more assertions as needed to validate the response data
  });
});

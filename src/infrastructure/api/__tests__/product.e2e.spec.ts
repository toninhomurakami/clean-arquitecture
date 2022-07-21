import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E (End to End) test from product", () => {

    beforeEach(async () => {
        await sequelize.sync({force: true})
    });
    afterAll(async () => {
        //await sequelize.close()
    });

    it("should create a Product", async() => {
        const response = await request(app)
            .post("/product")
            .send({
                name: "Product 1",
                description: "Description 1",
                amount: 7,
                price: 12
            });
        expect(response.status).toBe(200);
        expect(response.body.name).toBe("Product 1");
        expect(response.body.description).toBe("Description 1");
        expect(response.body.amount).toBe(7);
        expect(response.body.price).toBe(12);
    });

    it("should not creat a product", async () => {
        const response = await request(app)
            .post("/product")
            .send({
                name: "Product"
            });
        expect(response.status).toBe(500);
    });

    it("should list products", async () => {
        await request(app)
            .post("/product")
            .send({
                name: "Product 1",
                description: "Description 1",
                amount: 7,
                price: 12
            });
        await request(app)
            .post("/product")
            .send({
                name: "Product 2",
                description: "Description 2",
                amount: 11,
                price: 21
            });

        const listResponse = await request(app).get("/product").send();
        expect(listResponse.status).toBe(200);
        expect(listResponse.body.products.length).toBe(2);

        expect(listResponse.body.products[0].name).toBe("Product 1");
        expect(listResponse.body.products[0].description).toBe("Description 1");
        expect(listResponse.body.products[0].amount).toBe(7);
        expect(listResponse.body.products[0].price).toBe(12);

        expect(listResponse.body.products[1].name).toBe("Product 2");
        expect(listResponse.body.products[1].description).toBe("Description 2");
        expect(listResponse.body.products[1].amount).toBe(11);
        expect(listResponse.body.products[1].price).toBe(21);
    });

});
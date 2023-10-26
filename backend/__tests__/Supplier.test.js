const createServer = require("../createServer");
const supertest = require("supertest")
const { MongoMemoryServer } = require("mongodb-memory-server")
const mongoose = require("mongoose");
const Suppliers = mongoose.model("Suppliers");
const app = createServer();
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Mzg3MDI1MWI0ZWIzNjRiZWZjODAwNjgiLCJlbWFpbCI6InJ1YmFpeWF0QG1pbmRzZXQuc3dpc3MiLCJmaXJzdE5hbWUiOiJNb2hhbW1hZCIsImxhc3ROYW1lIjoiUnViYWl5YXQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2ODI0NDQzOTYsImV4cCI6MTY4MzA0OTE5Nn0.1lsIZ5asQ9m4WTJlsEDcC0OBK2gSy8Op2kyGrJDSaZU"


const supplierPayload = {
    id: "JZie9FN9a1g",
    name: "Test Supplier",
    products: [],
    email: "test@test.com",
    phone: "12345678"
}
const supplierPayload2 = {
    id: "KSie4FN9a5g",
    name: "Test Supplier 2",
    products: [],
    email: "test2@test.com",
    phone: "3456786543"
}

const supplierPayload3 = {
    id: "FZre9dN6a1g",
    name: "Test Supplier 3",
    products: [],
    email: "test3@test.com",
    phone: "435455678"
}

const supplierPayload4 = {
    id: "HZef5bFN9a5f",
    name: "Test Supplier 4",
    products: [],
    email: "test4@test.com",
    phone: "399786543"
}
describe("Supplier", () => {
    beforeAll(async () => {
        const mongoServer = await MongoMemoryServer.create();

        await mongoose.connect(mongoServer.getUri());
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoose.connection.close();
    });

    describe("get single supplier route", () => {

        describe("given the user is not logged in", () => {
            it("should return a 401", async () => {
                const supplierId = "supplier-123";
                const { statusCode } = await supertest(app).get(`/api/suppliers/details/${supplierId}`)
                expect(statusCode).toBe(401);
            });
        });

        describe("given the supplier does not exist", () => {
            it("should return null", async () => {
                const supplierId = "supplier-123";
                const response = await supertest(app).get(`/api/suppliers/details/${supplierId}`).set('x-auth-token', token);
                expect(response.body.supplier).toBe(null)
            });
        });

        describe("given the supplier does exist", () => {
            it("should return a 200 status and the supplier", async () => {
                const supplier = await Suppliers.create(supplierPayload);
                const response = await supertest(app).get(`/api/suppliers/details/${supplier._id.toString()}`).set('x-auth-token', token)
                expect(response.statusCode).toBe(200);
                expect(response.body.supplier.email).toBe(supplier.email);
            });
        });
    });

    describe("create supplier route", () => {
        describe("given the user is not logged in", () => {
            it("should return a 401", async () => {
                const { statusCode } = await supertest(app).post("/api/suppliers/create")
                expect(statusCode).toBe(401);
            });
        });

        describe("given the user is logged in", () => {
            it("should return a 200 and create the supplier", async () => {

                const { statusCode, body } = await supertest(app)
                    .post("/api/suppliers/create")
                    .set('x-auth-token', token)
                    .send(supplierPayload2);

                expect(statusCode).toBe(200);
                expect(body.success).toBe(true)
            });
        });
    });
    describe("edit supplier route", () => {
        describe("given the user is not logged in", () => {
            it("should return a 401", async () => {
                const supplierId = "supplier-123";
                const { statusCode } = await supertest(app).patch(`/api/suppliers/edit/${supplierId}`)
                expect(statusCode).toBe(401);
            });
        });

        describe("given the user is logged in", () => {
            it("should return a 200 and update the supplier", async () => {
                const supplier = await Suppliers.create(supplierPayload3);

                const { statusCode, body } = await supertest(app)
                    .patch(`/api/suppliers/edit/${supplier._id.toString()}`)
                    .set('x-auth-token', token)
                    .send({ name: "new name" });

                expect(statusCode).toBe(200);
                expect(body.success).toBe(true)
            });
        });
    });

    describe("delete supplier route", () => {
        describe("given the user is not logged in", () => {
            it("should return a 401", async () => {
                const supplierId = "supplier-123";
                const { statusCode } = await supertest(app).delete(`/api/suppliers/delete/${supplierId}`)
                expect(statusCode).toBe(401);
            });
        });

        describe("given the user is logged in", () => {
            it("should return a 200 and delete the supplier", async () => {
                const supplier = await Suppliers.create(supplierPayload4);
                const { statusCode, body } = await supertest(app)
                    .delete(`/api/suppliers/delete/${supplier._id.toString()}`)
                    .set('x-auth-token', token)

                expect(statusCode).toBe(200);
                expect(body.success).toBe(true)
            });
        });
    });
});

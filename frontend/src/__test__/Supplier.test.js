import { act } from "@testing-library/react";
import axiosTokenInstance from "./../utils/axios"
import configureStore from 'redux-mock-store'
import thunk from "redux-thunk";

const middleWares = [thunk]
const mockStore = configureStore(middleWares);
jest.mock("./../utils/axios", () => ({
    ...jest.requireActual("./../utils/axios"),
    post: jest.fn(),
    get: jest.fn()
}))


describe("Api testing", () => {
    beforeEach(() => {
        jest.useRealTimers();
    });


    it("get Suppliers list api", async () => {
        const store = mockStore({})
        const supplierListDemo = [
            {
                name: "test",
                email: "test@gmail.com",
                phone: "0124356"
            }
        ]
        let expectedData
        function fetchData() {
            return () => {
                return axiosTokenInstance.get("suppliers/list").then((response) => {
                    expectedData = response.data
                })
            };
        }

        axiosTokenInstance.get.mockImplementationOnce(() => Promise.resolve({ data: supplierListDemo }));

        await act(() => {
            store.dispatch(fetchData())
        })
        expect(expectedData).toEqual(supplierListDemo)
    })

    it("create Supplier api", async () => {
        const store = mockStore({})
        const supplier = {
            name: "test",
            email: "test@gmail.com",
            cell: "0124356"
        }
        const successResponse = { success: true };
        let expectedData
        function fetchData() {
            return () => {
                return axiosTokenInstance.post("suppliers/create", supplier).then((response) => {
                    expectedData = response.data
                })
            };
        }

        axiosTokenInstance.post.mockImplementationOnce(() => Promise.resolve({ data: successResponse }));

        await act(() => {
            store.dispatch(fetchData())
        })
        expect(expectedData).toEqual(successResponse)
    })
});
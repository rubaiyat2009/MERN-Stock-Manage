import { login, register, verify } from "../auth/authSlice";
import { addNewProduct, deleteProduct, updateProduct } from "../products/productsSlice";
import { addNewCategory } from "../productCategory/productCategorySlice";
import { addNewSupplier, deleteSupplier, updateSupplier } from "../suppliers/suppliersSlice";
import { addUser, deleteSingleUser } from "../users/userSlice";
import { addNewUnit } from "../productUnit/productUnitSlice";
const { createSlice } = require("@reduxjs/toolkit")

const initialState = {
    notifications: [],
    isOpen: false,
    modalClose: false,
    isEditMode: false
}

const notificationReducer = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotification: (state, { payload }) => {
            state.notifications.push(payload);
            state.isOpen = true;
        },
        closeNotification: (state) => {
            state.isOpen = false
        },
        updateModalStatus: (state) => {
            state.modalClose = false;
        },
        closeModal: (state) => {
            state.modalClose = true;
        },
        enableEditMode: (state) => {
            state.isEditMode = true;
        },
        disableEditMode: (state) => {
            state.isEditMode = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.rejected, (state, { payload }) => {
            state.notifications.push({
                severity: "error",
                message: payload.message
            })
            state.isOpen = true;
        })
        builder.addCase(register.fulfilled, (state, { payload }) => {
            state.notifications.push({
                severity: "success",
                message: payload.message
            })
            state.isOpen = true;
        }).addCase(register.rejected, (state, { payload }) => {
            state.notifications.push({
                severity: "error",
                message: payload.message
            })
            state.isOpen = true;
        })
        builder.addCase(addUser.fulfilled, (state, { payload }) => {
            state.notifications.push({
                severity: "success",
                message: payload.message
            })
            state.isOpen = true;
            state.modalClose = true;
        }).addCase(addUser.rejected, (state, { payload }) => {
            state.notifications.push({
                severity: "error",
                message: payload.message
            })
            state.isOpen = true;
        })

        builder.addCase(deleteSingleUser.fulfilled, (state, { payload }) => {
            state.notifications.push({
                severity: "success",
                message: payload.message
            })
            state.isOpen = true;
        }).addCase(deleteSingleUser.rejected, (state, { payload }) => {
            state.notifications.push({
                severity: "error",
                message: payload.message
            })
            state.isOpen = true;
        })
        builder.addCase(verify.fulfilled, (state, { payload }) => {
            state.notifications.push({
                severity: "success",
                message: payload.message
            })
            state.isOpen = true;
        }).addCase(verify.rejected, (state, { payload }) => {
            state.notifications.push({
                severity: "error",
                message: payload.message
            })
            state.isOpen = true;
        })

        builder.addCase(addNewSupplier.fulfilled, (state, { payload }) => {
            state.notifications.push({
                severity: "success",
                message: payload.message
            })
            state.isOpen = true;
            state.modalClose = true;
        }).addCase(addNewSupplier.rejected, (state, { payload }) => {
            state.notifications.push({
                severity: "error",
                message: payload.message
            })
            state.isOpen = true;

        })
        builder.addCase(updateSupplier.fulfilled, (state, { payload }) => {
            state.notifications.push({
                severity: "success",
                message: payload.message
            })
            state.isOpen = true;
            state.modalClose = true;
        }).addCase(updateSupplier.rejected, (state, { payload }) => {
            state.notifications.push({
                severity: "error",
                message: payload.message
            })
            state.isOpen = true;

        })
        builder.addCase(deleteSupplier.fulfilled, (state, { payload }) => {
            state.notifications.push({
                severity: "success",
                message: payload.message
            })
            state.isOpen = true;
            state.modalClose = true;
        }).addCase(deleteSupplier.rejected, (state, { payload }) => {
            state.notifications.push({
                severity: "error",
                message: payload.message
            })
            state.isOpen = true;
        })
      

        builder.addCase(addNewProduct.fulfilled, (state, { payload }) => {
            state.notifications.push({
                severity: "success",
                message: payload.message
            })
            state.isOpen = true;
            state.modalClose = true;
        }).addCase(addNewProduct.rejected, (state, { payload }) => {
            state.notifications.push({
                severity: "error",
                message: payload.message
            })
            state.isOpen = true;
        })
        builder.addCase(updateProduct.fulfilled, (state, { payload }) => {
            state.notifications.push({
                severity: "success",
                message: payload.message
            })
            state.isOpen = true;
            state.isEditMode = false;
        }).addCase(updateProduct.rejected, (state, { payload }) => {
            state.notifications.push({
                severity: "error",
                message: payload.message
            })
            state.isOpen = true;
        })

        builder.addCase(addNewCategory.fulfilled, (state, { payload }) => {
            state.notifications.push({
                severity: "success",
                message: payload.message
            })
            state.isOpen = true;

        }).addCase(addNewCategory.rejected, (state, { payload }) => {
            state.notifications.push({
                severity: "error",
                message: payload.message
            })
            state.isOpen = true;
        })
        builder.addCase(addNewUnit.fulfilled, (state, { payload }) => {
            state.notifications.push({
                severity: "success",
                message: payload.message
            })
            state.isOpen = true;

        }).addCase(addNewUnit.rejected, (state, { payload }) => {
            state.notifications.push({
                severity: "error",
                message: payload.message
            })
            state.isOpen = true;
        })

        builder.addCase(deleteProduct.fulfilled, (state, { payload }) => {
            state.notifications.push({
                severity: "success",
                message: payload.message
            })
            state.isOpen = true;
            state.modalClose = true;
        }).addCase(deleteProduct.rejected, (state, { payload }) => {
            state.notifications.push({
                severity: "error",
                message: payload.message
            })
            state.isOpen = true;
        })       

    }
})

export const { setNotification, closeNotification, updateModalStatus, closeModal, enableEditMode, disableEditMode } = notificationReducer.actions;

export default notificationReducer.reducer;
const express = require("express");
const router = express.Router();
const contactService = require("../services/contact.service");

// Tạo yêu cầu liên hệ mới
router.post("/create", async (req, res) => {
    try {
        const contactData = req.body;
        const newContact = await contactService.createContact(contactData);
        return res.status(201).json({
            status: true,
            message: "Yêu cầu liên hệ đã được tạo thành công!",
            data: newContact,
        });
    } catch (error) {
        console.error("Lỗi tạo yêu cầu liên hệ:", error.message);
        return res.status(500).json({
            status: false,
            message: "Lỗi server!",
        });
    }
});

// Lấy danh sách yêu cầu liên hệ
router.get("/list", async (req, res) => {
    try {
        const contacts = await contactService.getAllContacts();
        return res.status(200).json({
            status: true,
            message: "Lấy danh sách yêu cầu liên hệ thành công!",
            data: contacts,
        });
    } catch (error) {
        console.error("Lỗi lấy danh sách yêu cầu liên hệ:", error.message);
        return res.status(500).json({
            status: false,
            message: "Lỗi server!",
        });
    }
});

// Cập nhật trạng thái yêu cầu liên hệ
router.put("/update/:id", async (req, res) => {
    try {
        const contactId = req.params.id;
        const updateData = req.body;
        const updatedContact = await contactService.updateContact(contactId, updateData);
        if (!updatedContact) {
            return res.status(404).json({
                status: false,
                message: "Yêu cầu liên hệ không tồn tại!",
            });
        }
        return res.status(200).json({
            status: true,
            message: "Cập nhật yêu cầu liên hệ thành công!",
            data: updatedContact,
        });
    } catch (error) {
        console.error("Lỗi cập nhật yêu cầu liên hệ:", error.message);
        return res.status(500).json({
            status: false,
            message: "Lỗi server!",
        });
    }
});

// Xóa yêu cầu liên hệ
router.delete("/delete/:id", async (req, res) => {
    try {
        const contactId = req.params.id;
        const deletedContact = await contactService.deleteContact(contactId);
        if (!deletedContact) {
            return res.status(404).json({
                status: false,
                message: "Yêu cầu liên hệ không tồn tại!",
            });
        }
        return res.status(200).json({
            status: true,
            message: "Xóa yêu cầu liên hệ thành công!",
        });
    } catch (error) {
        console.error("Lỗi xóa yêu cầu liên hệ:", error.message);
        return res.status(500).json({
            status: false,
            message: "Lỗi server!",
        });
    }
});

module.exports = router;

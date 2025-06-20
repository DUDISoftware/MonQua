const allowedImageTypes = ['image/jpeg', 'image/png', 'image/webp'];

const validateImage = (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ message: "Vui lòng tải lên ảnh!" });
  }

  if (!allowedImageTypes.includes(req.file.mimetype)) {
    return res.status(415).json({ message: "Chỉ hỗ trợ JPG, PNG, hoặc WEBP!" });
  }

  next();
};

module.exports = validateImage;

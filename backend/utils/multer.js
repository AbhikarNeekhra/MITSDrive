const multer = require('multer');
const uuid = require('uuid');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const destination = '/home/ajrathor09182/mits_data/backend/public/drive/storage' + (req.body.path === null ? req.body.path : '/');
        cb(null, destination);
    },
    filename: (req, file, cb) => {
        if (req.session.userId) {
            const uniqueFileName = `${uuid.v4().substring(0, 12)}`;
            cb(null, uniqueFileName);
        } else {
            cb(new Error('User is not logged in'));
        }
    }
});

const storage2 = multer.diskStorage({
    destination: (req, photo, cb) => {
        const destination = '/home/ajrathor09182/mits_data/backend/public/drive/photos';
        cb(null, destination);
    },
    filename: (req, photo, cb) => {
        if (req.session.userId) {
            const uniqueFileName = req.session.userId;
            cb(null, uniqueFileName);
        } else {
            cb(new Error('User is not logged in'));
        }
    }
});

const upload = multer({ storage: storage });
const upload2 = multer({ storage: storage2 });

module.exports = { upload, upload2 };
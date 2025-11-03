import multer, {diskStorage} from "multer";

const multerStorage = diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        const nombre = new Date().getTime().toString();
        cb(null, `${nombre}.jpg`);
    }
});

export const upload = multer({
    storage: multerStorage

});
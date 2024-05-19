const express = require('express');
const connection = require('../pool/pool');
const { upload, upload2 } = require('../utils/multer');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const fs = require('fs');
const uuid = require('uuid');


const router = express.Router();

const basepath = '/home/ajrathor09182/mits_data/backend/public/drive/storage';
const imagepath = '/home/ajrathor09182/mits_data/backend/public/drive/photos'

router.post('/login', upload.none(), (req, res) => {
  const { userId, pass } = req.body;
  console.log(req.body)
  if (!userId || !pass) {
    return res.status(400).json({ message: 'Please enter all fields' });
  }
  password = bcrypt.hashSync(pass, 10);
  connection.query(
    `SELECT auth.*, users.*, department.*
      FROM auth
      LEFT JOIN users ON auth.username = users.username
      LEFT JOIN department ON auth.username = department.username
      WHERE auth.username = $1`,
    [userId],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal Server Error' });
      }

      if (results.rowCount == 0 || !bcrypt.compareSync(pass, results.rows[0].password)) {
        return res.status(400).json({ message: 'Email/Username is incorrect or password is incorrect' });
      }
      req.session.userId = userId;
      req.session.type = results.rows[0].type;
      req.session.department = results.rows[0].department
      req.session.batch = results.rows[0].batch
      req.session.limit = results.rows[0].limit

      console.log(results.rows[0].type)
      if (results.rows[0].type === 'admin') {
        req.session.root = '/'
      } else {
        req.session.root = results.rows[0].folder
      }
      return res.status(200).json(results.rows[0]);
    }
  );
});

router.get('/logout', upload.none(), (req, res) => {
  req.session.destroy();
  return res.status(200).json({ message: 'Logged out successfully' });
});

router.get('/checklogin', upload.none(), (req, res) => {
  console.log(req.session.userId)
  if (req.session.userId) {
    return res.status(200).json({ loggedIn: true });
  } else {
    return res.status(200).json({ loggedIn: false });
  }
});

router.post('/register', upload.none(), (req, res) => {
  const {
    fullName,
    username,
    email,
    pass,
    mobile,
    gender,
    department,
    batch
  } = req.body;
  let verification = false, type, insertedUser;

  if (!fullName || !username || !email || !pass || !gender) {
    return res.status(400).json({ otpSent: false, message: 'Please enter all fields' });
  }
  let image = 'avatar_';
  if (gender == 'male') {
    const male = [5, 7, 12, 13, 14, 15, 17, 18, 25]
    image += male[Math.floor(Math.random() * 11) + 1]
  } else if (gender == 'female') {
    const female = [1, 3, 6, 8, 10, 11, 16, 20, 21, 23, 24, 26, 27]
    image += female[Math.floor(Math.random() * 13) + 1]
  } else {
    const others = [2, 10, 19, 22]
    image += others[Math.floor(Math.random() * 4) + 1]
  }
  image += '.jpg'

  console.log(imagepath + '/' + image)
  fs.copyFileSync(imagepath + '/' + image, imagepath + '/' + email);
  image = '/drive/photos/' + email

  let password = bcrypt.hashSync(pass, 10);

  connection.query('SELECT * FROM users WHERE email = $1', [email], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ otpSent: false, message: 'Internal Server Error' });
    }
    console.log(results)

    if (results.rowCount > 0) {
      return res.status(400).json({ otpSent: false, message: 'Email already exists' });
    }

    // Check if the username is already registered
    connection.query('SELECT * FROM users WHERE username = $1', [username], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ otpSent: false, message: 'Internal Server Error' });
      }

      if (results.rowCount > 0) {
        return res.status(400).json({ otpSent: false, message: 'Username already exists' });
      }
      else {
        connection.query('SELECT * FROM faculty WHERE email = $1', [email], (err, results) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ otpSent: false, message: 'Internal Server Error' });
          }
          if (results.rowCount > 0) {
            type = 'faculty';
          } else {
            type = 'student';
          }
          const query =
            'INSERT INTO users (fullname, username, email, gender, mobile,verification,create_time,image,department,batch) VALUES ($1, $2, $3, $4, $5, $6,$7,$8,$9,$10) RETURNING id';
          const values = [fullName, username, email, gender, mobile, verification, new Date().getTime(), image, department, batch];
          console.log(query)
          connection.query(query, values, (err, results) => {
            if (err) {
              console.error(err);
              return res.status(500).json({ otpSent: false, message: 'Internal Server Error' });
            }

            const insertedId = results.rows[0].id;
            insertedUser = {
              id: insertedId,
              fullName,
              username,
              email,
              mobile,
              gender,
            };

            function generateOTP(digits) {
              const min = Math.pow(10, digits - 1);
              const max = Math.pow(10, digits) - 1;
              return Math.floor(Math.random() * (max - min + 1)) + min;
            }

            const otp = generateOTP(6);
            const currentTimestamp = new Date().getTime();
            const expiryTimestamp = new Date(currentTimestamp);
            expiryTimestamp.setMinutes(expiryTimestamp.getMinutes() + 5);


            // Store OTP in the table
            const otpQuery = 'INSERT INTO otp_verification (email, otp, otp_expiry, password,type) VALUES ($1, $2, $3, $4,$5)';
            const otpValues = [email, otp, expiryTimestamp.getTime(), password, type];

            connection.query(otpQuery, otpValues, (err, results) => {
              if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Internal Server Error' });
              }

              // Send OTP via Nodemailer
              const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: 'anujrathor09182@gmail.com',
                  pass: 'vnrj xtbt hrxj gaac',
                },
              });


              const mailOptions = {
                from: 'rosanova.support@gmail.com',
                to: email,
                subject: 'OTP verification',
                text: `Your OTP is: ${otp}`,
              };

              transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                  console.error(err);
                  return res.status(400).json({ otpSent: false, message: 'Error sending OTP' });
                }
                return res.status(200).json({ otpSent: true, message: 'OTP sent successfully' });
              });
            });
          });
        }
        );
      }
    }
    );
  });

});

router.post('/verifyotp', upload.none(), (req, res) => {
  const { email, otp } = req.body;
  console.log(req.body)

  // Validate the request body
  if (!email || !otp) {
    return res.status(400).json({ message: 'Invalid Request !' });
  }

  const otpQuery = 'SELECT * FROM otp_verification WHERE email = $1 AND otp = $2 ORDER BY id ASC';
  const otpValues = [email, otp];

  connection.query(otpQuery, otpValues, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }

    if (results.rowCount == 0) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    const otpEntry = results.rows[0];
    console.log(otpEntry)
    const currentTimestamp = new Date().getTime();
    const otpExpiry = parseInt(otpEntry.otp_expiry);
    const password = otpEntry.password.toString();

    if (otpExpiry < currentTimestamp) {
      return res.status(400).json({ message: 'OTP expired, Please Resend it' });
    }

    const checkUserQuery = 'SELECT * FROM users WHERE email = $1';
    const checkUserValues = [email];

    connection.query(checkUserQuery, checkUserValues, (err, results1) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal Server Error' });
      }

      if (results1.rowCount > 0) {

        const authCheckQuery = 'SELECT * FROM auth WHERE username = $1';
        const authCheckValues = [results1.rows[0].username];
        console.log(authCheckValues)

        connection.query(authCheckQuery, authCheckValues, (err, results) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal Server Error' });
          }
          if (results.rowCount > 0) {

            const updatePasswordQuery = 'UPDATE auth SET password = $1 WHERE  username = $2';
            const updatePasswordValues = [password, results.rows[0].username];

            connection.query(updatePasswordQuery, updatePasswordValues, (err, results) => {
              if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Internal Server Error' });
              }

              // Delete the OTP entry from the verification table


              const deleteOtpQuery = 'DELETE FROM otp_verification WHERE email = $1';
              const deleteOtpValues = [email];

              connection.query(deleteOtpQuery, deleteOtpValues, (err, results) => {
                if (err) {
                  console.error(err);
                  return res.status(500).json({ message: 'Internal Server Error' });
                }

                return res.status(200).json({ message: 'Password updated successfully' });
              }
              );
            });
          } else {


            const type = otpEntry.type;
            console.log(results1.rows[0].username)
            const authQuery = 'INSERT INTO auth (username, password, type) VALUES ($1, $2, $3)';
            const authValues = [results1.rows[0].username, password, type.toLowerCase()];


            connection.query(authQuery, authValues, (err, results) => {
              if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Internal Server Error' });
              }

              // Delete the OTP entry from the verification table
              const deleteOtpQuery = 'DELETE FROM otp_verification WHERE email = $1';
              const deleteOtpValues = [email];

              connection.query(deleteOtpQuery, deleteOtpValues, (err, results) => {
                if (err) {
                  console.error(err);
                  return res.status(500).json({ message: 'Internal Server Error' });
                }
                const verificationUpdateQuery = 'UPDATE users SET verification = true WHERE email = $1';
                const verificationUpdateValues = [email];

                connection.query(verificationUpdateQuery, verificationUpdateValues, (err, results) => {
                  if (err) {
                    console.error(err);
                    return res.status(500).json({ message: 'Internal Server Error' });
                  }

                  return res.status(200).json({ message: 'Password updated successfully' });
                });
              });
            });
          }
        });
      }
      else {
        return res.status(400).json({ message: 'User not found' });
      }
    });
  });
});

router.post('/resendotp', upload.none(), (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Invalid Request !' });
  }

  const query = 'SELECT * FROM users WHERE email = $1';
  const values = [email];

  connection.query(query, values, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }

    if (results.rowCount == 0) {
      return res.status(400).json({ message: 'User not found' });
    }

    const user = results.rows[0];
    const username = user.username;

    function generateOTP(digits) {
      const min = Math.pow(10, digits - 1);
      const max = Math.pow(10, digits) - 1;
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const otp = generateOTP(6);
    const currentTimestamp = new Date().getTime();
    const expiryTimestamp = new Date(currentTimestamp);
    expiryTimestamp.setMinutes(expiryTimestamp.getMinutes() + 5);

    const getOtpDetailes = 'SELECT * FROM otp_verification WHERE email = $1 ORDER BY id ASC';
    const getOtpDetailesValues = [email];

    let password, type;

    connection.query(getOtpDetailes, getOtpDetailesValues, (err, results) => {

      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
      if (results.rowCount > 0) {
        password = results.rows[0].password;
        type = results.rows[0].type;

        const otpQuery = 'INSERT INTO otp_verification (email, otp, otp_expiry, password,type) VALUES ($1, $2, $3, $4,$5)';
        const otpValues = [email, otp, expiryTimestamp.getTime(), password, type];

        connection.query(otpQuery, otpValues, (err, results) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal Server Error' });
          }

          const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'anujrathor09182@gmail.com',
              pass: 'vnrj xtbt hrxj gaac',
            },
          });

          const mailOptions = {
            from: 'rosanova.support@gmail.com',
            to: email,
            subject: 'OTP verification',
            text: `Your OTP is: ${otp}`,
          };

          transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
              console.error(err);
              return res.status(500).json({ message: 'Internal Server Error' });
            }

            return res.status(200).json({ message: 'OTP sent successfully' });
          });
        });
      }
    });
  });
});

router.post('/forgotpass', upload.none(), (req, res) => {

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Invalid Request !' });
  }

  const query = 'SELECT * FROM auth WHERE username = $1';
  const values = [email];

  connection.query(query, values, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }

    if (results.rowCount == 0) {
      return res.status(400).json({ message: 'User not found' });
    }

    const user = results.rows[0];
    const type = user.type;
    const username = user.username;

    function generateOTP(digits) {
      const min = Math.pow(10, digits - 1);
      const max = Math.pow(10, digits) - 1;
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const otp = generateOTP(6);
    const currentTimestamp = new Date().getTime();
    const expiryTimestamp = new Date(currentTimestamp);
    expiryTimestamp.setMinutes(expiryTimestamp.getMinutes() + 5);
    const encryptedPassword = bcrypt.hashSync(password, 10);

    // Store OTP in the table
    const otpQuery = 'INSERT INTO otp_verification (email, otp, otp_expiry, password,type) VALUES ($1, $2, $3, $4,$5)';
    const otpValues = [email, otp, expiryTimestamp.getTime(), encryptedPassword, type];

    connection.query(otpQuery, otpValues, (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal Server Error' });
      }

      // Send OTP via Nodemailer
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'anujrathor09182@gmail.com',
          pass: 'vnrj xtbt hrxj gaac',
        },
      });

      const mailOptions = {
        from: 'rosanova.support@gmail.com',
        to: email,
        subject: 'OTP verification',
        text: `Your OTP is: ${otp}`,
      };

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Internal Server Error' });
        }

        return res.status(200).json({ message: 'OTP sent successfully' });
      });
    });
  });
});

router.post('/edituser', upload.none(), (req, res) => {
  const { userId } = req.session;

  const {
    fullName,
    username,
    gender,
    department,
    mobile,
  } = req.body;

  let verification = true; // It seems like there's a typo, it should be "verification"

  const updateUserFields = [];
  const updateValues = [];

  // Check if the mobile number is already registered by another user
  if (!username) {
    return res.status(400).json({ message: 'Invalid Request !' });
  }
  // Check if the email is already registered by another user
  if (department) {
    updateUserFields.push(`department = $${updateValues.length + 1}`);
    updateValues.push(department);
  }
  if (mobile) {
    updateUserFields.push(`mobile = $${updateValues.length + 1}`);
    updateValues.push(mobile);
  }
  if (fullName) {
    updateUserFields.push(`fullName = $${updateValues.length + 1}`);
    updateValues.push(fullName);
  }

  if (gender) {
    updateUserFields.push(`gender = $${updateValues.length + 1}`);
    updateValues.push(gender);
  }

  updateValues.push(username);
  // Update the user's information in the database
  let updateQuery =
    'UPDATE users SET ' + updateUserFields.join(', ') + ' WHERE username = $' + updateValues.length; // Use $1 for userId
  console.log(updateQuery);
  console.log(updateValues);
  connection.query(updateQuery, updateValues, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }

    // If password is provided, update the authentication information

    return res.status(200).json({ message: 'User updated successfully', updateValues });

  });
});

router.post('/changepic', upload2.single('photo'), (req, res) => {
  const { userId } = req.session;
  const filepath = '/drive/photos/' + userId;

  // Update the user's information in the database
  const updateQuery = 'UPDATE users SET image = $1 WHERE email = $2';
  const updateValues = [filepath, userId];

  connection.query(updateQuery, updateValues, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }

    return res.status(200).json({ message: 'Profile picture updated successfully', profilepic: filepath });
  });
}
);

router.post('/createfolder', upload.none(), async (req, res) => {
  try {
    const { name, path, access, tags, privacy, category } = req.body;
    const folderName = uuid.v4().substring(0, 6);
    console.log(folderName)
    const root = req.session.root
    let folderpath
    if (!req.session.userId && !root) {
      return res.status(400).json({ error: 'User Not Logged in' });
    }

    if (!path || path === 'null' || path === null) {
      folderpath = root
    } else {
      folderpath = path
    }
    console.log(folderpath)

    if (!folderName) {
      return res.status(400).json({ error: 'Invalid Request !' });
    }

    let fileaccess = '', filetags = '', fileprivacy = '', filecategory = '', owner;

    if (access) {
      fileaccess = access;
    }
    if (tags) {
      filetags = tags;
    }
    if (privacy) {
      fileprivacy = privacy;
    }
    if (category) {
      filecategory = category;
    }
    if (req.session.type == 'faculty') {
      owner = req.session.email
    } else if (req.session.type == 'department') {
      owner = req.session.department
    } else if (req.session.type == 'admin') {
      owner = req.session.type
    } else {
      return res.status(500).json({ error: 'Something went wrong login again' });
    }

    const folderQuery = 'SELECT * FROM file WHERE path = $1';
    connection.query(folderQuery, [folderpath], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      const folder = results.rows[0];

      if (!folder) {
        return res.status(404).json({ error: 'Folder not found' });
      }
      const sameFolderQuery = 'SELECT * FROM file WHERE parent = $1 and name= $2';
      connection.query(sameFolderQuery, [folderpath, name], (err, results2) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Internal server error' });
        }
        if (results2.rowCount > 0) {
          return res.status(400).json({ error: 'Same Folder exits' });
        }

        let folderPath;
        if (folderpath != '/') {
          folderPath = `${folderpath}/${folderName}`;
        } else {
          folderPath = `${folderpath}${folderName}`;
        }

        fs.mkdirSync(basepath + folderPath);

        const query = 'INSERT INTO file (name, path, type,owner,date,access,privacy,tags,category,parent) VALUES ($1, $2, $3,$4,$5,$6,$7,$8,$9,$10)';
        connection.query(query, [name, folderPath, 'folder', req.session.userId, new Date(), fileaccess, fileprivacy, filetags, filecategory, folderpath], (err, results) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal server error' });
          }
          res.status(200).json({ message: 'Folder created successfully' });
        });

      });
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/uploadfile', upload.single('file'), async (req, res) => {
  try {
    const { path, access, tags, privacy, category, name } = req.body;
    const { filename, size, originalname } = req.file;
    const parts = originalname.split('.');
    const filetype = parts[parts.length - 1];
    const root = req.session.root
    let folderpath
    if (!req.session.userId && !root) {
      return res.status(400).json({ error: 'User Not Logged in' });
    }

    if (!path || path === 'null' || path === null) {
      folderpath = root
    } else {
      folderpath = path
    }
    console.log(folderpath)

    if (!req.file && !name) {
      return res.status(400).json({ error: 'Invalid Request !' });
    }
    if (!req.session.userId) {
      return res.status(400).json({ error: 'User Not Logged in' });
    }

    let fileaccess, filetags, fileprivacy, filecategory;

    if (access) {
      fileaccess = access;
    }
    if (tags) {
      filetags = tags;
    }
    if (privacy) {
      fileprivacy = privacy;
    }
    if (category) {
      filecategory = category;
    }

    const folderQuery = 'SELECT * from file WHERE path = $1';
    connection.query(folderQuery, [folderpath], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      const folder = results.rows[0];

      if (!folder) {
        return res.status(404).json({ error: 'Folder not found' });
      }

      const sameFolderQuery = 'SELECT * FROM file WHERE parent = $1 and name= $2';
      connection.query(sameFolderQuery, [folderpath, name], (err, results2) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Internal server error' });
        }
        if (results2.rowCount > 0) {
          fs.unlink(`${folderpath}/${filename}`, (err) => {
            if (err) {
              console.error(`Error deleting file: ${err.message}`);
            } else {
              console.log('File deleted successfully');
            }
          });
          return res.status(400).json({ error: 'Same File exits' });
        }

        let filepath
        if (folderpath === '/') {
          filepath = '/' + filename;
        } else {
          filepath = `${folderpath}/${filename}`;
        }
        let foldersize = folder.size + size;
        const updateQuery = 'UPDATE file SET size = $1 WHERE path = $2';
        connection.query(updateQuery, [foldersize, folderpath], (err, results) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal server error' });
          }

          const fileQuery = 'INSERT INTO file (name, path, type,size, date,access,owner,tags,privacy,category,parent) VALUES ($1, $2, $3, $4,$5,$6,$7,$8,$9,$10,$11)';
          const fileValues = [name, filepath, filetype, size, new Date(), fileaccess, req.session.userId, filetags, fileprivacy, filecategory, folderpath];
          connection.query(fileQuery, fileValues, (err, results) => {
            if (err) {
              console.error(err);
              return res.status(500).json({ error: 'Internal server error' });
            }
            res.status(200).json({ message: 'File uploaded successfully' });
          });
        });
      });
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/editfile', upload.none(), async (req, res) => {
  try {
    const { path, access, tags, privacy, category } = req.body;

    if (!path) {
      return res.status(400).json({ error: 'Invalid Request !' });
    }
    if (!req.session.userId) {
      return res.status(400).json({ error: 'User Not Logged in' });
    }

    let fileaccess, filetags, fileprivacy, filecategory;

    if (access) {
      fileaccess = access;
    }
    if (tags) {
      filetags = tags;
    }
    if (privacy) {
      fileprivacy = privacy;
    }
    if (category) {
      filecategory = category;
    }

    const fileQuery = 'SELECT * FROM file WHERE path = $1';
    connection.query(fileQuery, [path], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      const file = results.rows[0];

      if (!file) {
        return res.status(404).json({ error: 'File not found' });
      }

      const updateQuery = 'UPDATE file SET access = $1, tags = $2, privacy = $3, category = $4 WHERE path = $5';
      connection.query(updateQuery, [fileaccess, filetags, fileprivacy, filecategory, path], (err, results) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Internal server error' });
        }
        res.status(200).json({ message: 'File updated successfully' });
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/deletefile', upload.none(), async (req, res) => {
  try {
    const { path } = req.body;

    if (!path) {
      return res.status(400).json({ error: 'Invalid Request !' });
    }

    const fileQuery = 'SELECT * FROM file WHERE path = $1';
    connection.query(fileQuery, [path], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      const file = results.rows[0];

      if (!file) {
        return res.status(404).json({ error: 'File not found' });
      }

      const binQuery = 'update file set bin = $1 where path = $2';
      connection.query(binQuery, [true, path], (err, results) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Internal server error' });
        }
        res.status(200).json({ message: 'File deleted successfully' });
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
})

router.post('/restorefile', upload.none(), async (req, res) => {
  try {
    const { path } = req.body;

    if (!path) {
      return res.status(400).json({ error: 'Invalid Request !' });
    }

    const fileQuery = 'SELECT * FROM file WHERE path = $1';
    connection.query(fileQuery, [path], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      const file = results.rows[0];

      if (!file) {
        return res.status(404).json({ error: 'File not found' });
      }

      const binQuery = 'update file set bin = $1 where path = $2';
      connection.query(binQuery, [false, path], (err, results) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Internal server error' });
        }
        res.status(200).json({ message: 'File restored successfully' });
      });
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
})

router.post('/favorite', upload.none(), async (req, res) => {
  const { path } = req.body;
  const { userId } = req.session;

  if (!path) {
    return res.status(400).json({ error: 'Invalid Request !' });
  }
  const fileQuery = 'SELECT * FROM file WHERE path = $1';
  connection.query(fileQuery, [path], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    const file = results.rows[0];

    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }

    const favoriteQuery = 'SELECT * FROM favorite WHERE username = $1 AND path = $2';
    connection.query(favoriteQuery, [userId, path], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
      }

      if (results.rowCount === 0) {
        const query = 'INSERT INTO favorite (username, path) VALUES ($1, $2)';
        const values = [userId, path];
        connection.query(query, values, (err, results) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal server error' });
          }
          res.status(200).json({ message: 'File added to favorite successfully' });
        });
      } else {
        const query = 'DELETE FROM favorite WHERE username = $1 AND path = $2';
        const values = [userId, path];
        connection.query(query, values, (err, results) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal server error' });
          }
          res.status(200).json({ message: 'File Removed from favorite successfully' });
        });
      }
    });
  })
})

router.post('/share', upload.none(), async (req, res) => {
  const { path, email, name } = req.body;
  const { userId } = req.session;

  if (!path && !email && !name) {
    return res.status(400).json({ error: 'Invalid Request !' });
  }

  const fileQuery = 'SELECT * FROM file WHERE path = $1';
  connection.query(fileQuery, [path], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    const file = results.rows[0];

    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }

    let shared = results.rows[0].shared;

    if (shared === null) {
      shared = {
        access: [],
      };
    }

    const isDuplicate = shared.access.some((entry) => entry.email === email);

    if (!isDuplicate) {
      shared.access.push({ name, email });
    }

    const update = 'UPDATE file SET shared = $1 WHERE path = $2';
    connection.query(update, [shared, path], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      return res.status(200).json({ message: 'Email Added in shared' });
    })
  })

}
);

router.post('/removeshare', upload.none(), async (req, res) => {
  const { path, email } = req.body;
  const { userId } = req.session;

  if (!path && !email) {
    return res.status(400).json({ error: 'Invalid Request !' });
  }

  const fileQuery = 'SELECT * FROM file WHERE path = $1';
  connection.query(fileQuery, [path], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    const file = results.rows[0];

    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }

    const shared = results.rows[0].shared;
    shared.access = shared.access.filter((list) => list.email !== email);

    const update = 'UPDATE file SET shared = $1 WHERE path = $2';
    connection.query(update, [shared, path], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      return res.status(200).json({ message: 'Email removed from shared' });
    })
  })
}
);

router.post('/resetpath', upload.none(), async (req, res) => {
  const { path } = req.body;
  const { userId } = req.session;

  if (!path) {
    return res.status(400).json({ error: 'Invalid Request !' });
  }

  if (!req.session.userId) {
    return res.status(400).json({ error: 'User Not Logged in' });
  }

  const checkFileQuery = 'SELECT * FROM file WHERE path = $1';
  connection.query(checkFileQuery, [path], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    const file = results.rows[0];

    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }

    const base = file.split('/').pop();
    const newpath = base.join('/') + uuid.v4.substring(0, 8);

    try {
      fs.unlinkSync(basepath + path);
      if (file.type === 'folder') {
        fs.renameSync(basepath + file.path, base + newpath);
      }
      else {
        fs.renameSync(basepath + file.path, base + newpath + '.' + file.type);
      }
      const resetQuery = 'UPDATE file SET path = $1 WHERE path = $2';
      pool.query(resetQuery, [newpath, path], (err, results) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Internal server error' });
        }
        res.status(200).json({ message: 'File path reset successfully' });
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });
}
);

router.post('/gethomefiles', upload.none(), async (req, res) => {
  try {
    const { userId, root } = req.session;

    if (!root) {
      return res.status(400).json({ error: 'Invalid Request!' });
    }

    const getFilesQuery = `
      SELECT 
        file.*, 
        CASE 
          WHEN favorite.path IS NOT NULL AND favorite.username = $3 THEN true
          ELSE false
        END AS isFavorite
      FROM file
      LEFT JOIN favorite ON file.path = favorite.path
      WHERE 
        file.parent = $1 AND file.bin = $2
        AND (
          (file.owner = $3 AND file.privacy = 'private')
          OR (file.owner != $3 AND file.privacy != 'private')
          OR (file.owner = $3 AND file.privacy != 'private')
        )
      ORDER BY 
        isFavorite DESC, 
        file.name ASC
    `;

    const values = [root, false, userId];

    connection.query(getFilesQuery, values, (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
      }

      res.status(200).json({ files: results.rows });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/getfiles', upload.none(), async (req, res) => {
  try {
    const { path } = req.body;
    const { userId } = req.session;

    if (!path) {
      return res.status(400).json({ error: 'Invalid Request!' });
    }

    const getFilesQuery = `
      SELECT 
        file.*, 
        CASE 
          WHEN favorite.path IS NOT NULL AND favorite.username = $3 THEN true
          ELSE false
        END AS isFavorite
      FROM file
      LEFT JOIN favorite ON file.path = favorite.path
      WHERE 
        file.parent = $1 AND file.bin = $2
        AND (
          (file.owner = $3 AND file.privacy = 'private')
          OR (file.owner != $3 AND file.privacy != 'private')
          OR (file.owner = $3 AND file.privacy != 'private')
        )
      ORDER BY 
        isFavorite DESC, 
        file.name ASC
    `;

    const values = [path, false, userId];

    connection.query(getFilesQuery, values, (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
      }

      res.status(200).json({ files: results.rows });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/getrecentviews', upload.none(), async (req, res) => {
  try {
    const { userId } = req.session;

    const getRecentViewsQuery = `
      SELECT DISTINCT ON (file.path)
          file.*,
          CASE
              WHEN favorite.path IS NOT NULL AND favorite.username = $1 THEN true
              ELSE false
          END AS isFavorite
      FROM viewed
      JOIN file ON viewed.path = file.path
      LEFT JOIN favorite ON file.path = favorite.path
      WHERE viewed.username = $1
      ORDER BY file.path,viewed.date DESC
      LIMIT 15;
    `;

    const values = [userId];

    connection.query(getRecentViewsQuery, values, (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
      }

      res.status(200).json({ files: results.rows });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.post('/getshared', upload.none(), async (req, res) => {
  try {
    const { userId } = req.session;

    const getSharedFilesQuery = `
      SELECT
        file.*,
        CASE
          WHEN favorite.path IS NOT NULL AND favorite.username = $1 THEN true
          ELSE false
        END AS isFavorite
      FROM file
      LEFT JOIN favorite ON file.path = favorite.path
      WHERE
        $1 IN (SELECT jsonb_array_elements(file.shared->'access')->>'email')
        AND file.bin = $2
      ORDER BY
        isFavorite DESC,
        file.name ASC
    `;

    const values = [userId, false];

    connection.query(getSharedFilesQuery, values, (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
      }

      res.status(200).json({ files: results.rows });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/getfilebycategory', upload.none(), async (req, res) => {
  try {
    const { category } = req.body
    const { userId, department, batch } = req.session;

    const getFilesQuery = `
  SELECT
    file.*,
    CASE
      WHEN favorite.path IS NOT NULL AND favorite.username = $1 THEN true
      ELSE false
    END AS isFavorite
  FROM file
  LEFT JOIN favorite ON file.path = favorite.path
  WHERE
    file.bin = $2 AND
    file.category = $3 AND
    (
      $1 IN (SELECT jsonb_array_elements(file.shared->'access')->>'email')
      OR LOWER(access) LIKE LOWER($4)
      OR LOWER(access) LIKE LOWER($5)
      OR LOWER(access) LIKE LOWER($6)
      OR file.privacy = 'public'
    )
  ORDER BY
    isFavorite DESC,
    file.name ASC
`;

    const values = [userId, false, category, department, batch, `${department}-${batch}`];

    connection.query(getFilesQuery, values, (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
      }

      res.status(200).json({ files: results.rows });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/getbin', upload.none(), async (req, res) => {
  try {
    const { userId } = req.session;

    const getFilesQuery = `
      SELECT 
        file.*, 
        CASE 
          WHEN favorite.path IS NOT NULL AND favorite.username = $2 THEN true
          ELSE false
        END AS isFavorite
      FROM file
      LEFT JOIN favorite ON file.path = favorite.path
      WHERE 
      file.bin = $1
        AND file.owner = $2 
      ORDER BY 
        isFavorite DESC, 
        file.name ASC
    `;

    const values = [true, userId];

    connection.query(getFilesQuery, values, (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
      }

      res.status(200).json({ files: results.rows });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/searchusers', upload.none(), async (req, res) => {
  try {
    const { keyWord } = req.body;

    if (!keyWord) {
      return res.status(400).json({ error: 'Invalid Request!' });
    }

    const values = [`%${keyWord}%`];

    const searchQuery = `
      SELECT id,  fullname as name, username, 'user' AS type FROM users
      WHERE (LOWER(fullname) LIKE LOWER($1) OR LOWER(email) LIKE LOWER($1))
      
      UNION
      
      SELECT id, name, username, 'department' AS type FROM department
      WHERE LOWER(name) LIKE LOWER($1)
    `;

    connection.query(searchQuery, values, (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
      }

      res.status(200).json({ users: results.rows });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/storeviewed', upload.none(), async (req, res) => {
  try {
    const { path } = req.body;
    const { userId } = req.session;

    if (!path) {
      return res.status(400).json({ error: 'Invalid Request!' });
    }

    const storeViewedQuery = `
      INSERT INTO viewed (username, path, date)
      VALUES ($1, $2, NOW())
    `;

    const values = [userId, path];

    await connection.query(storeViewedQuery, values);

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/storedownload', upload.none(), async (req, res) => {
  try {
    const { path } = req.body;
    const { userId } = req.session;

    if (!path) {
      return res.status(400).json({ error: 'Invalid Request!' });
    }

    const storeDownloadQuery = `
      INSERT INTO downloads (username, path, date)
      VALUES ($1, $2, NOW())
    `;

    const values = [userId, path];

    await connection.query(storeDownloadQuery, values);

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const pool = require("./db");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const app = express();
const {
  OAuth2Client
} = require("google-auth-library");

const client =
  new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID
  );
console.log(process.env.PORT);

app.use(cors());
app.use(express.json());

/* TEST ROUTE */

app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json(result.rows);
  } catch (err) {
    console.log(err);
    res.status(500).send("Database Error");
  }
});

/* COUNSELLING */

app.post("/counselling", async (req, res) => {
  try {
    const { name, mobile, percentile } = req.body;

    const newLead = await pool.query(
      `INSERT INTO counselling_leads
      (name, mobile, percentile)
      VALUES ($1, $2, $3)
      RETURNING *`,
      [name, mobile, percentile]
    );

    res.json(newLead.rows[0]);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      error: err.message,
    });

  }
});

/* SIGNUP */

app.post("/signup", async (req, res) => {
  try {

    const {
      name,
      email,
      mobile,
      password,
    } = req.body;

    // Name Validation

    if (!name || name.trim().length < 3) {
      return res.status(400).json({
        message: "Name must be at least 3 characters"
      });
    }

    // Email Validation

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        message: "Invalid Email Address"
      });
    }

    // Mobile Validation

    if (!/^[6-9]\d{9}$/.test(mobile)) {
      return res.status(400).json({
        message: "Invalid Mobile Number"
      });
    }

    // Password Validation

    if (password.length < 8) {
      return res.status(400).json({
        message: "Password must be at least 8 characters"
      });
    }

    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({
        message: "Email Already Exists"
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user = await pool.query(
      `
      INSERT INTO users
      (name, email, mobile, password)
      VALUES ($1, $2, $3, $4)
      RETURNING *
      `,
      [
        name,
        email,
        mobile,
        hashedPassword
      ]
    );

    res.json(user.rows[0]);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      error: err.message
    });

  }
});

/* LOGIN */

app.post("/login", async (req, res) => {

  try {

    const { email, password } = req.body;

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        message: "Invalid Email Address"
      });
    }

    if (!password || password.length < 8) {
      return res.status(400).json({
        message: "Invalid Password"
      });
    }

    const user = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (user.rows.length === 0) {
      return res.status(400).json({
        message: "User Not Found"
      });
    }

    const validPassword =
      await bcrypt.compare(
        password,
        user.rows[0].password
      );

    if (!validPassword) {
      return res.status(400).json({
        message: "Wrong Password"
      });
    }

    res.json(user.rows[0]);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      error: err.message
    });

  }

});

app.post("/google-login", async (req, res) => {

  try {

    const { credential } = req.body;

    const ticket =
      await client.verifyIdToken({
        idToken: credential,
        audience:
          process.env.GOOGLE_CLIENT_ID,
      });

    const payload =
      ticket.getPayload();

    const {
      name,
      email
    } = payload;

    let user =
      await pool.query(
        "SELECT * FROM users WHERE email=$1",
        [email]
      );

    if (user.rows.length === 0) {

      const newUser =
        await pool.query(
          `
          INSERT INTO users
          (name,email,mobile,password)
          VALUES($1,$2,$3,$4)
          RETURNING *
          `,
          [
            name,
            email,
            "",
            "google_login"
          ]
        );

      return res.json(
        newUser.rows[0]
      );
    }

    res.json(user.rows[0]);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message:
        "Google Login Failed"
    });

  }

});

/* COLLEGE PREDICTOR */

app.get("/predict/:percentile/:category", async (req, res) => {

  try {

    const { percentile, category } = req.params;

    let column = "gopeno_percentile";

    if (category === "EWS") {
      column = "ews_percentile";
    }

    if (category === "TFWS") {
      column = "tfws_percentile";
    }

    const result = await pool.query(
      `
      SELECT *
      FROM colleges
      WHERE ${column} <= $1
      ORDER BY ${column} DESC
      LIMIT 20
      `,
      [percentile]
    );

    res.json(result.rows);

  } catch (err) {

    console.log(err);
    res.status(500).send("Error");

  }

});
app.post("/forgot-password", async (req, res) => {

  try {

    const { email, password } = req.body;

    const hashedPassword =
      await bcrypt.hash(password, 10);

    await pool.query(
      `
      UPDATE users
      SET password = $1
      WHERE email = $2
      `,
      [hashedPassword, email]
    );

    res.json({
      message: "Password Updated"
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      error: err.message
    });

  }

});

app.get("/admin/stats", async (req, res) => {
  try {

    const users = await pool.query(
      "SELECT COUNT(*) FROM users"
    );

    const leads = await pool.query(
      "SELECT COUNT(*) FROM counselling_leads"
    );

    res.json({
      totalUsers: users.rows[0].count,
      totalLeads: leads.rows[0].count,
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      error: err.message,
    });

  }
});
app.get("/admin/leads", async (req, res) => {
  try {

    const leads = await pool.query(
      "SELECT * FROM counselling_leads ORDER BY id DESC"
    );

    res.json(leads.rows);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      error: err.message,
    });

  }
});
app.get("/admin/leads", async (req, res) => {
  try {

    const leads = await pool.query(
      `
      SELECT *
      FROM counselling_leads
      ORDER BY id DESC
      `
    );

    res.json(leads.rows);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      error: err.message,
    });

  }
});
app.get("/admin/users", async (req, res) => {

  try {

    const users = await pool.query(
      `
      SELECT
      id,
      name,
      email,
      mobile,
      role
      FROM users
      ORDER BY id DESC
      `
    );

    res.json(users.rows);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      error: err.message,
    });

  }

});
app.delete("/admin/leads/:id", async (req, res) => {

  try {

    const { id } = req.params;

    await pool.query(
      "DELETE FROM counselling_leads WHERE id = $1",
      [id]
    );

    res.json({
      message: "Lead Deleted"
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      error: err.message
    });

  }

});
app.listen(process.env.PORT, () => {
  console.log(
    `Server Running On Port ${process.env.PORT}`
  );
});
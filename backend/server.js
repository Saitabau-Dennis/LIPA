const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");
// Load environment variables from .env file
require("dotenv").config();

// Initialize Express app
const app = express();
app.use(cors());
app.use(express.json());

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// POST /api/auth/register - To sign up a new user
app.post("/api/auth/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          full_name: name,
        }
      }
    });

    if (error) {
      // If Supabase returns an error, send it to the frontend
      return res.status(400).json({ error: error.message });
    }

    // If signup is successful, send a success message.
    // Supabase automatically sends a confirmation email .
    res
      .status(201)
      .json({
        message:
          "User created successfully. Please check your email to confirm.",
        user: data.user
      });
  } catch (error) {
    res.status(500).json({ error: "An internal error occurred." });
  }
});

// Define the port and start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
